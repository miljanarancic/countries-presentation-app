let moon = $('.fa-moon')

moon.on('click', () => {
  moon.toggleClass('far')
  moon.toggleClass('fas')

  if(moon.hasClass('far')) {
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

let countries = []

$.ajax({
  url: 'https://restcountries.eu/rest/v2/all',
  method: 'GET',
  success: function (response) {
    response.forEach(country => {
      createCard(country)
      countries = response;
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
  flag.attr('alt', "flag")

  const name = $('<span></span>');
  name.addClass('countries__cards__card__name');
  name.text(country.name);

  const population = $('<p></p>');
  population.html('<span>Population: </span>' + country.population);

  const region = $('<p></p>');
  region.addClass("countries__cards__card__region")
  region.html('<span>Region: </span>' + country.region);

  const capital = $('<p></p>');
  capital.html('<span>Capital: </span>' + country.capital);

  card.append(flag, name, cardData);
  cardData.append(capital, region, population);

  cards.append(card)
}

function aboutCountry (country) {
  $(".countries").addClass("hide")
  $('.country').removeClass('hide')
  $('.country__button').removeClass('hide')
  $('.country__image__flag').attr('src', country.flag);
  $('.country__name').text(country.name);
  $('.country__native-name').html('<span>Native name: </span>' + country.nativeName);
  $('.country__population').html('<span>Population: </span>' + country.population);
  $('.country__region').html('<span>Region: </span>' + country.region);
  $('.country__subregion').html('<span>Sub Region: </span>' + country.subregion);
  $('.country__capital').html('<span>Capital: </span>' + country.capital);
  $('.country__domain').html('<span>Top Level Domain: </span>' + country.topLevelDomain);
  $('.country__currencies').html('<span>Currencies: </span>' + country.currencies.map(currency => currency.name).join(", "));
  $('.country__languages').html('<span>Languages: </span>' + country.languages.map(language => language.name).join(", "));
 
  let borderCountries = $('.country__info__border')
  borderCountries.html('<span>Border Countries: </span>')
  country.borders.forEach(border => { 
    
    let borderCountry = $('<span></span>');
    const borderCountryData = countries.find(c => c.alpha3Code === border);
    borderCountry.text(borderCountryData.name)
    borderCountry.addClass('country__info__border__country')
    borderCountries.append(borderCountry)
    borderCountry.on('click', () => aboutCountry(borderCountryData))
  })
}

$('.countries__search__wrapper__input').on('keyup', (event) => {
  $('.countries__cards__card').each(function(){
    if($(this).find('.countries__cards__card__name').text().toLowerCase().startsWith(event.target.value.toLowerCase())) {
      $(this).removeClass("hidden")
    } else {
      $(this).addClass("hidden")
    }
  })
})

$('.countries__search__dropdown').on('change', (event) => {
  $('.countries__cards__card').each(function(){
    if($(this).find('.countries__cards__card__region').text().includes(event.target.value)) {
      $(this).removeClass("hidden")
    } else {
      $(this).addClass("hidden")
    }
  })
})

$('.country__button').on('click', () => {
  $('.countries').toggleClass('hide')
  $('.country').toggleClass('hide')
  $('.country__button').addClass('hide')
})

