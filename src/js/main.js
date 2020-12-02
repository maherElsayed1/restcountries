const countriesContainer = document.querySelector('#countries');
const modalContent = document.querySelector('.modal-content');

// fetch Countries data
const getCountries = async () => {
    let url = 'https://restcountries.eu/rest/v2/all';
    let loader = `<div class="loading"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>`;
    countriesContainer.innerHTML = loader;
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

// Displaying Countries
const displayCountries = async () => {
    let countries = await getCountries();
    countriesContainer.innerHTML = null;
    for (let i = 0; i < countries.length; i++) {
        countriesContainer.innerHTML += `
                <div class="col-sm-6 col-md-4 country-container">
                    <div class="country">
                        <div class="country__flag">
                            <img src="${countries[i].flag}" alt="${countries[i].name}" />
                        </div>
                        <h3 class="country__name">${countries[i].name}</h3>
                        <button type="button" class="country__more" data-index="${i}">More Details</button>
                    </div>
                </div>
            `
    }
}

// Handle Content in the Modal
const handleModalContent = async () => {
    let countries = await getCountries();
    document.querySelector('#countries').addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.matches('.country__more')) {
            let index = e.target.getAttribute('data-index');

            modalContent.innerHTML = `
                <div class="modal-header">
                    <div class="modal-title">
                        <div class="countries-modal__flag">
                            <img src="${countries[index].flag}" alt="${countries[index].name}" />
                        </div>
                        <h4>${countries[index].name}</h4>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-6 countries-modal__item">
                            <h5 class="countries-modal__item-title">capital</h5>
                            <p>${countries[index].capital}</p>
                        </div>
                        <div class="col-sm-6 countries-modal__item">
                            <h5 class="countries-modal__item-title">region</h5>
                            <p>${countries[index].region}</p>
                        </div>
                        <div class="col-sm-6 countries-modal__item">
                            <h5 class="countries-modal__item-title">subregion</h5>
                            <p>${countries[index].subregion}</p>
                        </div>
                        <div class="col-sm-6 countries-modal__item">
                            <h5 class="countries-modal__item-title">population</h5>
                            <p>${countries[index].population}</p>
                        </div>
                        <div class="col-sm-6 countries-modal__item">
                            <h5 class="countries-modal__item-title">area</h5>
                            <p>${countries[index].area}</p>
                        </div>
                        <div class="col-sm-6 countries-modal__item">
                            <h5 class="countries-modal__item-title">currencies</h5>
                            ${countries[index].currencies.map(item => `<p>${item.symbol} (${item.name})</p>`).join("")}
                        </div>
                        <div class="col-sm-6 countries-modal__item">
                            <h5 class="countries-modal__item-title">languages</h5>
                            ${countries[index].languages.map(item => `<p>${item.name}</p>`).join("")}
                        </div>
                        <div class="col-sm-6 countries-modal__item">
                            <h5 class="countries-modal__item-title">timezones</h5>
                            ${countries[index].timezones.map(item => `<p>${item}</p>`).join("")}
                        </div>
                    </div>
                </div>
                `;
            $('#countryModal').modal('show')
        }
    })
}

displayCountries();
handleModalContent();