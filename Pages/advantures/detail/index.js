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

//getting the id through url
let url = new URL(location.href);
let params = new URLSearchParams(url.search);

let adventures_id = params.get('adventure');

//Global Variable
var apiData={};

//fetching api for details
callApi = async () => {
    returndata= await fetch(`https://qtrip-dynamic-asingh88029.herokuapp.com/adventures/detail/?adventure=${adventures_id}`).
    then((response)=> {
       return response.json();
    });
    apiData = JSON.parse(JSON.stringify(returndata));
    return returndata;
}




app= async()=> {
    await callApi();
    console.log(apiData);
    details(apiData);

}

//adventure detail card
var total;
var adventureId;
const details =(data) => {
adventureId=data.id;
console.log(adventureId);
adventureDetailCard=document.getElementById('adventure_detail_card');
const adventureName= document.createElement('div');
adventureName.setAttribute("id","adventure_name");
adventureDetailCard.appendChild(adventureName);
adventureName.innerHTML=`${data.name}`

const adventureDescription= document.createElement('div');
adventureDescription.setAttribute("id","adventure_description");
adventureDetailCard.appendChild(adventureDescription);
adventureDescription.innerHTML=`${data.subtitle}`

adventureDetailCard.appendChild(document.getElementById("carousel"));



document.getElementById(`image1`).setAttribute("src",`${data.images[0]}`);
document.getElementById(`image2`).setAttribute("src",`${data.images[1]}`);
document.getElementById(`image3`).setAttribute("src",`${data.images[2]}`);



const hr=document.createElement('HR');
adventureDetailCard.appendChild(hr);

const adventureHeading = document.createElement('div');
adventureHeading.setAttribute("id","adventure_heading");
adventureDetailCard.appendChild(adventureHeading);
adventureHeading.innerHTML=`About the Experience`;


const adventureContent = document.createElement('div');
adventureContent.setAttribute("id","adventure_content");
adventureDetailCard.appendChild(adventureContent);
adventureContent.innerHTML=`${data.content}`;


var costPerHead= document.getElementById("cost_per_head");
costPerHead.innerHTML=`₹ ${data.costPerHead}`
total=`${data.costPerHead}`;

document.getElementById("total_price").innerHTML=`₹ 0`;

let available= `${data.available}`

if(available==='false'){
    document.getElementById("reservation_form").style.display="none"
}
else{
    document.getElementById("sold_out").style.display="none"
    document.getElementById("greeting").style.display="none"
}

}

const totalValue=() => {
    const number = document.getElementById("pricing").value;
    document.getElementById("total_price").innerText=`₹ ${total*number}`;
    
}




totalValue()
app();

// sending data to server
var myForm=document.getElementById("myForm")
myForm.addEventListener('submit', function(e)
{

    //getting the value of form 
    e.preventDefault();
    var kvpairs = [];
    for ( var i = 0; i < myForm.elements.length-1; i++ ) {
       var e = myForm.elements[i];
       kvpairs.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value));
    }
    var queryString = kvpairs.join("&");
    console.log(queryString)
    console.log(queryString);


   
    fetch('https://qtrip-dynamic-asingh88029.herokuapp.com/reservations/new', {
        method: 'POST',
        headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `${queryString}&adventure=${adventureId}`
    })
    .then(res=> {return res.json()})
    .then(res => {
        // Handle response
        console.log('Response: ', res);
        alert('Success')
        location.reload();
    })
    .catch(err => {
        // Handle error
        console.log('Error message: ', err);
        alert('Failed')
    });
    
    
});











