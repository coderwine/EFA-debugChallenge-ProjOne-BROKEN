var weatherAPI = 'http://api.weatherstack.com/current';

// GLOBAL VARIABLES
let weatherURL;
let search;

// LOCATING ELEMENTS
const formInput = document.getElementById('#cityInput');

let weatherFetch = () => {

    search = formInput.value;
    weatherURL = `${weatherAPI}?access_key=${key}&query=${search}`;

    async function weather() {
        let res = fetch(weatherURL);
        let data = res.json();

        weatherCard(data);
    }

    weather()
    
    cityLocation = search;
}

function weatherCard(apiData) {

    formInput.value = '';
    wCardDisplay.style = 'display: revisible';

    // VARIABLES
    let location = apiData.location;
    let current = apiData.current;
    let fahDeg = 32;
    let temp = current.temperature;
    let fLike = current.feelslike;
    let precip = apiData.current.precip;

    //  CREATE / LOCATE
    const city = document.getElementById('jumboCity');
    const mainCard = document.querySelector('.displayCard');
    const cardDiv = document.createElement('div');
    const imgDiv = document.createElement('div');
    const cardImg = document.createElement('img');
    const cardBodyDiv = document.createElement('div');
    const bodyDiv = document.createElement('div');
    const header = document.createElement('h5');
    const ul = document.createElement('ul');

    switch(true) {
            case precip >= 75 && temp < 33:
                jumbo.setAttribute(
                    'styles', 
                    'background: url("../assets/01-coldSnow.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover;'
                )
                break;
            case precip >= 75 && temp <= 75:
                jumbo.setAttribute(
                    'styles', 
                    'background: url("../assets/02-warmRain.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover;'
                )
                break;
            case precip >= 75 && temp > 75:
                jumbo.setAttribute(
                    'styles', 
                    'background: url("../assets/03-summerRain.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover;'
                )
                break;
            case temp < 33:
                jumbo.setAttribute(
                    'styles', 
                    'background: url("../assets/04-winter.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover; height: 100vh'
                )
                break;
            case temp < 75:
                jumbo.setAttribute(
                    'styles', 
                    'background: url("../assets/05-spring.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover;'
                )
                break;
            case temp > 75:
                jumbo.setAttribute(
                    'styles', 
                    'background: url("../assets/06-summer.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover;'
                )
                break;
            default:
                jumbo.setAttribute(
                    'styles', 
                    'background: url("../assets/baseBG-IMG.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover;'
                )
                break;
    }

    // CLEANUP
    while(mainCard.firstChild) {
        console.log(mainCard.firstChild)
    }    

    // ATTRIBUTES
    city.innerText = `${location.name}, ${location.region}`;
    cardDiv.className = ' row no-gutters';
    imgDiv.className = 'col-md-4';
    cardImg.className = 'card-img';
    cardImg.src =  current.weather_icons[0];
    cardImg.alt = current.weather_descriptions[0];
    cardBodyDiv.className = 'col-md-8';
    bodyDiv.className = 'card-body';
    header.className = 'card-title';
    ul.innerHTML = `
        <li>Temp:       ${temp.toFixed(1)} &#x2109;</li>
        <li>Feels Like: ${fLike.toFixed(1)} &#x2109;</li>
        <li>Humidity:   ${humidity}%</li>
        <li>UV Index:   ${uv_index}</li>
        <li>Wind Dir:   ${wind_dir}</li>
    `;

    // INPUT VALUES
    header.innerText = current.weather_descriptions[0];

    // BUILD CARD
    imgDiv.appendChild(cardImg);
    cardDiv.appendChild(imgDiv);
    bodyDiv.appendChild(header);
    cardBodyDiv.appendChild(bodyDiv);
    cardDiv.appendChild(cardBodyDiv);
    mainCard.appendChild(cardDiv);

}