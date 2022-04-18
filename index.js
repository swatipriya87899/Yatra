// hamburger of navBar css
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


var apiData = [];
//fetch api

const fetching = async () => {
    await fetch("https://qtrip-dynamic-asingh88029.herokuapp.com/cities")
        .then((response) => {
            return response.json();
        }).then((response2) => {
            if (apiData.length === 0) {
                apiData.push(response2);
            }
            return response2;

        })
}


// showing all cards
const app = async () => {
    await fetching();
    apiData[0].forEach(element => {

        card(element);

    });
}
app();


const searchFunction = async () => {
    document.getElementById("all_cities").innerHTML="";
    await fetching();
    let filter = document.getElementById('search').value;
    filter = filter.toLowerCase();
    console.log(filter)
    console.log(typeof (apiData[0][0]))
    for (let i = 0; i < 8; i++) {
        if (apiData[0][i].city.toString().toLowerCase() == filter) {
            card(apiData[0][i])
            console.log(apiData[0][i])
        }
    }



}



const card = (element) => {


    const cities = document.createElement("div");
    cities.setAttribute("class", "cities");
    document.getElementById("all_cities").appendChild(cities);

    const image = document.createElement("img");
    image.setAttribute("class", "city-image");
    image.src = element.image;
    cities.appendChild(image);

    image.onclick = function () {
        location.href = `/Pages/advantures/?city=${element.id}`;
    };

    const cityText = document.createElement("div");
    cityText.setAttribute("class", "city-text");
    cities.appendChild(cityText);

    const cityName = document.createElement("h3");
    cityName.setAttribute("class", "city-name");
    cityName.innerHTML = element.city;
    cityText.appendChild(cityName);

    const cityDescription = document.createElement("h5");
    cityDescription.setAttribute("class", "city-description");
    cityDescription.innerHTML = element.description;
    cityText.appendChild(cityDescription);
}






