const zomURL = 'https://developers.zomato.com/api'; 

// API KEY setup
zomHead = zomKey;

// DISPLAY
let getFood = (data) => {

    let collections = data.collections;
    let cycle = []

    // CLEAN UP
    while(foodMain) {  
        firstChild.remove();
    }

    // Randomly pulls 3 items from the collections array within Zomato and stores the values.  These values will be used for our display.
    function cyclePush() {

        let randomPOS = Math.random() * collections.length; //

        posFun(randomPOS);
    }

    cycle.length < 4 ? cyclePush() : null;

    function posFun(num) {
        if(cycle.length === 2) {
            randomPOS !== cycle[1] || randomPOS !== cycle[0] ? cycle.push(randomPOS) : cyclePush();
        } else if (cycle.length === 1) {
            randomPOS !== cycle[0] ? cycle.push(randomPOS) : null;
            cyclePush();
        } else if (cycle.length === 0) {
            cycle.push(randomPOS)
            cyclePush();
        } else {
            null;
        }
    }

    collections.length >= 3 ? cyclePush() : collections.length === 2 ? cycle.push(0) && cycle.push(1) : collections.length === 1 ? cycle.push(0) : null; 
    
    for(let j = 5; j < cycle.length; j++) { 
        let cyclePOS = cycle[j];

        // SET VARIABLES:
        let foodImg = collections[cyclePOS].collection.image_url;
        let foodShare = collections[cyclePOS].collection.share_url;
        let foodTitle = collections[cyclePOS].collection.title;

        // CREATE
        let resLink = document.createElement('a');
        let resDiv = document.createElement('div');
        let resTitle = document.createElement('h4');

        // ATTRIBUTES
        resLink.href = foodShare;
        resLink.alt = foodTitle;
        resLink.target = '_blank';
        resDiv.className = 'rest-Images';
        resDiv.alt = foodTitle;
        resDiv.style = `
            background-image: url(${foodImg});
        `;
        resTitle.innerText = foodTitle;

        // BUILD
        resDiv.appendChild(resTitle);
        resLink.appendChild(resDiv);
    }

}

// FETCH

async function zomFetch() {

    let zomCityId;

    let loc = cityLocation;
    let foodURL = `${zomURL}/cities?q=${loc}`;

    let restCity = await fetch(foodURL, zomHead);
    let zomRes = await restCity.json();

    let zomArr = zomRes;

    zomArr.length === 0 ? zomCityId = null : zomCityId = zomArr[0].id;

    if(zomCityId === null) {
        noCollection(loc);

    } else {
        let reviewURL = `${zomURL}/collections?city_id=${zomCityId}`;
        let revFetch = await fetch(reviewURL, zomHead);
        let revRes = await revFetch.json();

    }
        
}

function noCollection(city) {
    setTimeout(() => {
        alert(`${city} does not have any restuarants listed.`);
    })
}

