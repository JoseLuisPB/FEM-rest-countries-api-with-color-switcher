const url = '../data.json';
let countries = [];
let country;

document.addEventListener('DOMContentLoaded', function() {
  let urlParams = new URLSearchParams(document.location.search);
  getAllCountries().then(response => {
    countries = response;
    country = response.find( country => country.alpha3Code === urlParams.get('alpha3Code'));
    console.log(country)
    createCountryFlag(country['flag']);
    createCountryName(country['name']);
    createCountryInfo(country);
    if(country['borders']){
      const countryBorderNames = getCountryBorderNames(country['borders']);
      createCountryBordersBtn(countryBorderNames);
    }
  })
  
}, false);

function getAllCountries(){
  return fetch(url).then( response => response.json()).then(response => response);
}

function createCountryFlag(flag){
  const countryFlag = document.querySelector('#countryFlag');
  countryFlag.setAttribute('src', flag);
  countryFlag.setAttribute('alt', `flag`);
}

function createCountryName(name){
  document.querySelector('#countryName').innerHTML = name;
}

function createCountryInfo(info){
  const itemInfoToDisplay = [
    { property: 'nativeName', title: 'Native Name', data: info['nativeName']},
    { property: 'topLevelDomain', title: 'Top Level Domain', data: info['topLevelDomain']},
    { property: 'population', title: 'Population', data: info['population']},
    { property: 'currencies', title: 'Currencies', data: info['currencies']},
    { property: 'region', title: 'Region', data: info['region']},
    { property: 'languages', title: 'Languages', data: info['languages']},
    { property: 'capital', title: 'Capital', data: info['capital']},
    { property: 'subregion', title: 'Sub Region', data: info['subregion']},
  ];
  const infoDiv = document.querySelector('#countryInfo');
  infoDiv.classList.add('info-layout');

  itemInfoToDisplay.forEach( item => {
    createInfoItem(item, infoDiv);
  });
}

function createInfoItem(infoItem, parentElement){
  const paragraphElement = document.createElement('p');
  parentElement.appendChild(paragraphElement);
  const spanElement = document.createElement('span');
  spanElement.classList.add('bold');
  spanElement.innerHTML = `${infoItem.title}: `;
  paragraphElement.appendChild(spanElement);

  let text = '';
  switch(infoItem.property){
    case 'population':
      text = document.createTextNode(infoItem.data.toLocaleString());
      break;
    
    case 'currencies':
      text = document.createTextNode(getCountryCurrencies(infoItem.data));
      break;

    case 'languages':
      text = document.createTextNode(getCountryLanguages(infoItem.data));
      break;
    case 'capital':
      paragraphElement.classList.add('capital-grid-placement');
    default: 
      text = document.createTextNode(infoItem.data);
  }

  paragraphElement.appendChild(text);
}

function getCountryCurrencies(currencies){
  const currencyList = [];
  currencies.forEach( currency => {
    currencyList.push(currency.name);
  });

  return currencyList.join(', ');
}

function getCountryLanguages(languages){
  const languageList = [];
  languages.forEach( currency => {
    languageList.push(currency.name);
  });

  return languageList.join(', ');
}

function returnToIndex(){
  window.location.href = '../index.html';
}

function getCountryBorderNames(borderList){
  const borderData = [];
  borderList.forEach( border => {
    const borderInfo = countries.find( country => country.alpha3Code === border);
    borderData.push({alpha3Code: borderInfo.alpha3Code, name: borderInfo.name})
  });
  return borderData;
}

function createCountryBordersBtn(borderData){
  
  const borderDiv = document.querySelector('#borders');
  const span = document.createElement('span');
  span.classList.add('bold');
  span.innerHTML = 'Border Countries:'
  borderDiv.appendChild(span);
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('borderBtnLayout');
  borderDiv.appendChild(buttonsDiv);
  borderData.forEach( border => {
    const button = document.createElement('button');
    button.classList.add('borderBtn');
    buttonsDiv.appendChild(button);
    button.innerHTML = border.name;
    button.addEventListener('click', () => {
      window.location.href = `./country-detail.html?alpha3Code=${border.alpha3Code}`
    });
  })
  
}