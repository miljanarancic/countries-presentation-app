let moon = $('.fa-moon')

moon.on('click', () => {
  moon.toggleClass('far')
  moon.toggleClass('fas')

  if(moon.hasClass("far")) {
    document.documentElement.style.setProperty("--primary-background", "white")
    document.documentElement.style.setProperty("--page-background", "hsl(0, 0%, 98%)")
    document.documentElement.style.setProperty("--font-color", "black")
    document.documentElement.style.setProperty("--box-shadow-color", "rgba(133, 133, 133, 0.4)")
  }
  else {
    document.documentElement.style.setProperty("--primary-background", "hsl(209, 23%, 22%)")
    document.documentElement.style.setProperty("--page-background", "hsl(207, 26%, 17%)")
    document.documentElement.style.setProperty("--font-color", "white")
    document.documentElement.style.setProperty("--box-shadow-color", "hsl(200, 15%, 8%)")
  }
})

$.ajax({
  url: 'https://restcountries.eu/rest/v2/all',
  method: 'GET',
  success: function (response) {
    response.forEach(country => {
      createCard(country)
    })
  }
})

function createCard (country) {
  const cards = $('.countries__cards');

  const card = $('<div></div>');
  card.addClass('countries__cards__card');
  card.on('click', () => aboutCountry(country))

  const cardData = $('<div></div>');
  cardData.addClass('countries__cards__card__data');

  const flag = $('<img />');
  flag.attr('src', country.flag);

  const name = $('<h2></h2>');
  name.addClass('countries__cards__card__name');
  name.text(country.name);

  const population = $('<p></p>');
  population.html('<span>Population: </span>' + country.population);

  const region = $('<p></p>');
  region.html('<span>Region: </span>' + country.region);

  const capital = $('<p></p>');
  capital.html('<span>Capital: </span>' + country.capital);

  card.append(flag, name, cardData);
  cardData.append(capital, region, population);

  cards.append(card)
}

function aboutCountry (country) {

  let countries = $(".countries")
  countries.css("display", "none")
  let countryFlag = $(".country__flag")
  let countryData = $(".country__info")
  let countryDataLeft = $(".country__info__data__left")
  let countryDataRight = $(".country__info__data__right")

  const flag = $('<img />');
  flag.attr('src', country.flag);
  countryFlag.append(flag)

  const name = $('<h2></h2>');
  name.addClass('countries__cards__card__name');
  name.text(country.name);

  const nativeName = $('<p></p>');
  nativeName.html('<span>Native name: </span>' + country.nativeName);

  const population = $('<p></p>');
  population.html('<span>Population: </span>' + country.population);

  const region = $('<p></p>');
  region.html('<span>Region: </span>' + country.region);

  const subRegion = $('<p></p>');
  subRegion.html('<span>Sub Region: </span>' + country.subregion);

  const capital = $('<p></p>');
  capital.html('<span>Capital: </span>' + country.capital);

  const topLevelDomain = $('<p></p>');
  topLevelDomain.html('<span>Top Level Domain: </span>' + country.topLevelDomain);

  const currencies = $('<p></p>');
  currencies.html('<span>Currencies: </span>' + country.currencies.map(currency =>currency.name).join(", "));

  const languages = $('<p></p>');
  languages.html('<span>Languages: </span>' + country.languages.map(language =>language.name).join(", "));

  countryData.prepend(name)
  countryDataLeft.append(nativeName, population, region, subRegion, capital)
  countryDataRight.append(topLevelDomain, currencies, languages)

  console.log(country)
}