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


let url = new URL(location.href);
let params = new URLSearchParams(url.search);

let city_name = params.get('city');
city_name = city_name.toLowerCase();

//global variable

var category = [];
var low;
var high;

// fetching the data
var apiData = [];
callApi = async () => {
  const returnData = await fetch(`https://qtrip-dynamic-asingh88029.herokuapp.com/adventures?city=${city_name}`).then(response => response.json());
  apiData = returnData.slice();
  return returnData;
}
var prevdata;

app = async () => {
  await callApi();
  getFiltersFromLocalStroge();

  onChange();

  if (category == null) {
    apiData.forEach((value) => {
      prevdata = card(value);
    });
  }
  else {
    filterMethod();

  }
}

app()

const display_cat = (value) => {
  const category = document.createElement("div");
  category.setAttribute("class", "category");
  category_show.appendChild(category);
  category.innerHTML = value
}



//create card using this function
const card = (element) => {
  const card = document.createElement("div");
  card.setAttribute("id", "card");
  card_group.appendChild(card);

  const cardImage = document.createElement("div");
  cardImage.setAttribute("id", "card_img");
  card.appendChild(cardImage);

  const images = document.createElement("img");
  images.setAttribute("src", element.image);
  cardImage.appendChild(images);


  //onclick image change page
  images.onclick = function () {
    location.href = `/Pages/advantures/detail/?adventure=${element.id}`;
  }

  const cardText = document.createElement("div");
  cardText.setAttribute("id", "card_text");
  card.appendChild(cardText);

  const nameCost = document.createElement("div");
  nameCost.setAttribute("id", "name_cost");
  cardText.appendChild(nameCost);

  const name = document.createElement("div");
  name.setAttribute("id", "name");
  name.innerHTML = `${element.name}`;
  nameCost.appendChild(name);

  const cost1 = document.createElement("div");
  cost1.setAttribute("id", "cost1");
  cost1.innerHTML = `₹ ${element.costPerHead}`;
  nameCost.appendChild(cost1);


  const durationCost = document.createElement("div");
  durationCost.setAttribute("id", "duration_cost");
  cardText.appendChild(durationCost);

  const duration = document.createElement("div");
  duration.setAttribute("id", "duration");
  duration.innerHTML = "Duration";
  durationCost.appendChild(duration);

  const cost2 = document.createElement("div");
  cost2.setAttribute("id", "cost2");
  cost2.innerHTML = `${element.duration} Hours`;
  durationCost.appendChild(cost2);

  const cardCat = document.createElement("div");
  cardCat.setAttribute("id", "cat_div_box");
  cardCat.innerHTML = `${element.category}`;
  card.appendChild(cardCat);
}




//onChange method
const onChange = (() => {
  cat_value = document.getElementById("filter_by_cat").value;
  duration_value = document.getElementById("filter_by_duration").value;
  low = duration_value.slice(0, 2);
  high = duration_value.slice(3);

  document.getElementById("card_group").innerHTML = "";
  if (cat_value != "none") {
    for (var i = 0; i <= category.length; i++) {
      if (category.indexOf(cat_value) === -1) {
        category.push(cat_value);
      }
    }
  }
  setFiltersFromLocalStorage();
  getFiltersFromLocalStroge();

  filterMethod();
})




//filter method
filterMethod = async () => {
  await callApi();

  document.getElementById("category_show").innerHTML = "";
  category.forEach((val) => {
    display_cat(val);
  })


  let filterdata = apiData.filter((element) => {

    if (category.length === 0)
      return (element.duration > low && element.duration <= high);
    else
      return (element.category === category[0] || element.category === category[1] || element.category === category[2] ||
        element.category === category[3]) && (element.duration > low && element.duration <= high);
  });
  console.log("filtered");
  console.log(filterdata);

  filterdata.forEach((ele) => {
    card(ele);
  })
}


//clear category
const clear_cat = () => {
  category = [];
  localStorage.setItem("key", JSON.stringify(category));
  document.getElementById("card_group").innerHTML = "";
  document.getElementById("category_show").innerHTML = "";
  document.getElementById("disabled").selected = true;
  filterMethod();
}

//clear duration
const clear_duration = () => {
  document.getElementById("disabled_dur").selected = true;
  duration_value = document.getElementById("filter_by_duration").value;
  low = duration_value.slice(0, 2);
  high = duration_value.slice(3);
  localStorage.setItem('high', high.toString());
  localStorage.setItem('low', low.toString());
  document.getElementById("card_group").innerHTML = "";
  filterMethod();
}



//get filtered value 
const setFiltersFromLocalStorage = () => {
  localStorage.setItem('key', JSON.stringify(category));
  localStorage.setItem('high', high.toString());
  localStorage.setItem('low', low.toString());
}

const getFiltersFromLocalStroge = () => {
  category = JSON.parse(window.localStorage.getItem('key'));
  high = parseInt(window.localStorage.getItem('high'));
  low = parseInt(window.localStorage.getItem('low'));
  console.log(category);
}

