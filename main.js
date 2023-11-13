const url = './data.json';
let countries = [];

document.addEventListener('DOMContentLoaded', function() {
  getAllCountries().then( countryList => {
    countries = countryList;
    document.getElementById('searchCountry').addEventListener('keyup', filterCountries, false);
    loadCountryCards(countryList)

  });
  
}, false);

function getAllCountries(){
  return fetch(url).then( response => response.json()).then(response => response);
}

function displayCountries(countryList){
  
}

function loadCountryCards(countryList){

  const flagsLayout = document.getElementById('flags-layout');
  

  countryList.forEach( country => {
    const countryData = {
      flag: country.flags.svg,
      name: country.name,
      population: country.population,
      region: country.region,
      capital: country.capital
    }
    const flagLayoutDiv = document.createElement('div');
    flagLayoutDiv.classList.add('flag-card');
    flagsLayout.appendChild(flagLayoutDiv);

    createCountryFlag(countryData, flagLayoutDiv)
    const cardDivElement = document.createElement('div');
    flagLayoutDiv.appendChild(cardDivElement);
    createCountryTitle(countryData, cardDivElement);
    createCountryInfo(countryData, cardDivElement);
  });
}

function createCountryFlag(countryData, parentElement){
  const imgElement = document.createElement('img');
  imgElement.setAttribute('src', countryData.flag);
  imgElement.setAttribute('alt', `flag-${countryData.name}`);
  parentElement.appendChild(imgElement);
}

function createCountryTitle(countryData, parentElement){
  const h2Element = document.createElement('h2');
  const textNode = document.createTextNode(countryData.name);
  h2Element.appendChild(textNode);
  parentElement.appendChild(h2Element);
}

function createCountryInfo(countryData, parentElement){
  const countryInfo = ['population', 'region', 'capital'];

  countryInfo.forEach( info => {
    const paragraphElement = document.createElement('p');
    parentElement.appendChild(paragraphElement);
    const spanElement = document.createElement('span');
    spanElement.classList.add('bold');
    paragraphElement.appendChild(spanElement);
    spanElement.innerHTML = `${info}: `;
    let text;
    if(info === 'population'){
      text = document.createTextNode(countryData[info].toLocaleString());
    } else {
      text = document.createTextNode(countryData[info]);
    }
    
    paragraphElement.appendChild(text);
  });
}

function filterCountries(event) {
  const value = event.currentTarget.value;

  document.getElementById('flags-layout').replaceChildren();

  if(value.length === 0){
    loadCountryCards(countries);
    return;
  }
  const capitalLetterValue = value.charAt(0).toUpperCase() + value.slice(1)
  const countryListFiltered = countries.filter( country => country.name.includes(capitalLetterValue));
  loadCountryCards(countryListFiltered);
}

function darkMode(){
  console.log('Dark mode pressed')
}