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

var apiData=[];
//fetch data of reservation
fetchData =async()=> {
    returnData= await fetch(`https://qtrip-dynamic-asingh88029.herokuapp.com/reservations/`)
    .then((response) => {
        return response.json();
    }).then((response2)=> {
        apiData=response2;
        return response2;
    }
    )
}

//make table of reservation
table = async ()=> {

    let table=document.createElement('table');
    document.getElementById("reservation_details").appendChild(table);
    let info=`${apiData.adventure}`

    let thead=document.createElement('thead');
    table.appendChild(thead);

    let tr= document.createElement('tr');
    thead.appendChild(tr);

    let th1=document.createElement('th');
    tr.appendChild(th1);
    th1.appendChild(document.createTextNode('Transaction ID'));

    let th2=document.createElement('th');
    tr.appendChild(th2);
    th2.appendChild(document.createTextNode('Booking Name'));

    let th3=document.createElement('th');
    tr.appendChild(th3);
    th3.appendChild(document.createTextNode('Adventure'));

    let th4=document.createElement('th');
    tr.appendChild(th4);
    th4.appendChild(document.createTextNode('Person(s)'));

    let th5=document.createElement('th');
    tr.appendChild(th5);
    th5.appendChild(document.createTextNode('Date'));

    let th6=document.createElement('th');
    tr.appendChild(th6);
    th6.appendChild(document.createTextNode('Price'));

    let th7=document.createElement('th');
    tr.appendChild(th7);
    th7.appendChild(document.createTextNode('Booking Time'));

    let th8=document.createElement('th');
    tr.appendChild(th8);
    th8.appendChild(document.createTextNode('Action'));


    let tbody=document.createElement('tbody');
    table.appendChild(tbody);

    await fetchData();
   var len=apiData.length;


   for(var i=0;i<len;i++){
    await fetchData();
    var trb=document.createElement('tr')
    tbody.appendChild(trb);
   

    var tdb1= document.createElement('td');
    trb.appendChild(tdb1);
    tdb1.innerHTML=`${apiData[i].id}`
   tdb1.style.fontWeight="bold";

    var tdb2= document.createElement('td');
    trb.appendChild(tdb2);
    tdb2.innerHTML=`${apiData[i].name}`;
   

    var tdb3= document.createElement('td');
    trb.appendChild(tdb3);
    tdb3.innerHTML=`${apiData[i].adventureName}`;
   

    var tdb4= document.createElement('td');
    trb.appendChild(tdb4);
    tdb4.innerHTML=`${apiData[i].person}`;
   

    var tdb5= document.createElement('td');
    trb.appendChild(tdb5);
    tdb5.innerHTML=`${apiData[i].id}`
    


    var tdb6= document.createElement('td');
    trb.appendChild(tdb6);
    tdb6.innerHTML=`${apiData[i].price}`


    var tdb7= document.createElement('td');
    trb.appendChild(tdb7);
    let date = new Date(`${apiData[i].time}`);
    var time = date.toLocaleTimeString();
    tdb7.innerHTML=`${date.getDate()} ${date.toLocaleString('en-us', { month: 'long' })} ${date.getFullYear()}, ${time}`



    var tdb8= document.createElement('td');
    tdb8.style.padding = "0px";
    trb.appendChild(tdb8);
    var anchor=document.createElement('a');
    anchor.setAttribute('id','adventure_anchor')
    anchor.href = `/Pages/advantures/detail/?adventure=${apiData[i].id}`;
    tdb8.appendChild(anchor);
    var div=document.createElement('div');
    div.setAttribute('id','adventure_btn')
    anchor.appendChild(div);
    div.innerHTML="Visit Adventure";

}
}

table_mobile=async()=>{
    let table=document.createElement('table');
    document.getElementById("reservation_details_mobile").appendChild(table);
    let info=`${apiData.adventure}`

    let thead=document.createElement('thead');
    table.appendChild(thead);

    let tr= document.createElement('tr');
    thead.appendChild(tr);

    let th1=document.createElement('th');
    tr.appendChild(th1);
    th1.appendChild(document.createTextNode('Transaction ID'));

    let th2=document.createElement('th');
    tr.appendChild(th2);
    th2.appendChild(document.createTextNode('Booking Name'));

    let tbody=document.createElement('tbody');
    table.appendChild(tbody);

    for(var i=0;i<2;i++){
        await fetchData();
        var trb_m=document.createElement('tr')
        tbody.appendChild(trb_m);
       
    
        var tdb1_m= document.createElement('td');
        trb_m.appendChild(tdb1_m);
        tdb1_m.innerHTML=`${apiData[i].id}`
       tdb1_m.style.fontWeight="bold";
    
        var tdb2_m= document.createElement('td');
        trb_m.appendChild(tdb2_m);
        tdb2_m.innerHTML=`${apiData[i].name}`;
    }

}


fetchData();
table();
table_mobile();