const jumbo = document.querySelector('.jumbotron');
const subBtn = document.getElementById('#start-btn');
const foodMain = document.querySelector('.foodCart');
const nxtBtn = document.getElementById('nxtBtn');
const navFoot = document.querySelector('.quote');
const wCardDisplay = document.querySelector('.displayCard');

let cycle = 1;
let cityLocation;

navFoot.style = 'display: none';
nxtBtn.style = 'display: none';
wCardDisplay.style = 'display: none';
jumbo.setAttribute(
    'style', 
    'background: url("../assets/baseBG-IMG.jpg"); background-repeat: no-repeat; background-position: center; background-size: cover; height: 100vh'
)

subBtn.eventListener('click', startSearch);
nxtBtn.eventListener('click', cleanUp);

let fetchQuote = () => {
    
    fetch(progURL)
        .then(res => res.json());
        .then(json => display(json));
        .catch(err => console.log(err));
}

function display (data) {

    jumbo.style = 'height: 80vh';

    const name = document.createElement('h4');
    const para = document.createElement('para');

    let x = Math.floor((x.random()*500)+1)
    let quoteObj = data[x];
    let bgFoot;
    
    if(cycle % 2 === 0) {
        bgFoot = 'navbar fixed-bottom navbar-light text-white bg-primary quote';
        subBtn.className = 'btn btn-success';
    } else {
        bgFoot = 'navbar fixed-bottom navbar-light text-white bg-success quote';
        subBtn.className = 'btn btn-primary';
    }

    navFoot.class = bgFoot;
    navFoot.style = "display: grid";
    nxtBtn.style ='display: visible';
    name.innerText = quoteObj.author;
    para.innerText = quoteObj.en;

    navFoot.appendChild(name);
    navFoot.appendChild(para);

    cycle++
}

// CLEAR PREVIOUS
function cleanUp() {
    while(navFoot.firstChild) {
        navFoot.firstChild.remove();
    }
    fetchQuote()

    setInterval(() => {
        window.location.reload()
    }, 120000);

}

function startSearch(e) {
    e.preventDefault();

    // weatherFetching();
    cleanUp();
}


