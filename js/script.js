let citiesbtn = document.querySelector(".citiesbtn");
let input = document.querySelector(".container input");
let weather = document.querySelector(".weather");
let time = document.querySelector(".time");
let error = document.querySelector(".error");

let days = ['sunday','monday', 'tuesday', 'wednesday', 'thursday', 
    'friday', 'saturday'];

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',  'September', 'October', 'November', 'December'];


const apiKay = "d199768834cab32dcffed3d11d9b074a";
let currentcity = "Kushtia";
let timezoneOffset = 21600

citiesbtn.classList.add("hidden");

async function getweather(){
    try{
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentcity}&appid=${apiKay}&units=metric`;
    let response = await fetch(apiUrl);
    let api = await response .json();

    let temp = api.main.temp;
    let location = api.name;
    let description = api.weather [0].description; 
    timezoneOffset = api.timezone
    weather.innerHTML = `Location: <b>${location}</b> || Temp: <b>${temp}ºc</b> || Weather: <b>${description}</b> `
    }catch(error){
        error.innerHTML = "Please check your internet connection......!"
        console.log(error)
    }
    
}

function getTime(){
    let now = new Date();
    let utc = now.getTime() + now.getTimezoneOffset() * 60000;
    let localTime = new Date(utc + timezoneOffset * 1000)
    console.log(localTime)

    let day = localTime.getDay();
    let date = localTime.getDate();
    let month = localTime.getMonth();
    let year = localTime.getFullYear();
    let hour = localTime.getHours();
    let minute = localTime.getMinutes();
    let second = localTime.getSeconds();
    let ampm = hour >=12 ? "PM" : "AM"
    hour = hour % 12;
    hour = hour ? hour: 12;

    time.innerHTML = `Today: <b>${days[day]}</b>, ${date} ${months[month]},${year}  ||
     Time: <b><span class="text-red-900">${hour .toString() .padStart(2, "0")}:${minute .toString() .padStart(2, "0")}:${second .toString() .padStart(2, "0")} ${ampm}</span></b>`
}
async function getcities(){
   try{
    let response = await fetch("https://countriesnow.space/api/v0.1/countries/population/cities");
    let cityApi = await response.json();
    citiesbtn.innerHTML = ""
    
    cityApi.data.forEach(item =>{
        let button = document.createElement("button");
        button.classList.add("py-2", "rounded", "bg-slate-300", "text-black")
        button.innerHTML = item.city
        citiesbtn.append(button)
    })
   }catch(error){
    citiesbtn.innerHTML = "Something went wrong"
   }
   
}
input.addEventListener("input", function(element){

if(element.target.value.length >= 0){

    citiesbtn.classList.remove("hidden");

    citiesbtn.classList.remove( "opacity-0", "invisible")
    citiesbtn.classList.add( "opacity-100", "visible")
}
else{
    citiesbtn.classList.add( "opacity-0", "invisible")
    citiesbtn.classList.remove( "opacity-100", "visible")
}
    let allButtons = document.querySelectorAll(".citiesbtn button");
    let inputValue = element.target.value.toLowerCase().toString()

    allButtons.forEach((element)=>{
        if(element.innerHTML.toLowerCase().toString().includes(inputValue)){

            element.classList.remove("hidden")
        }else{
            element.classList.add("hidden")

        }
        element.addEventListener("click", function() {
            currentcity= element.innerHTML
            input.value = element.innerHTML
            getweather()
            citiesbtn.classList.add( "opacity-0", "invisible")
            citiesbtn.classList.remove( "opacity-100", "visible")
            // console.log(currentcity)
            citiesbtn.classList.remove("hidden");
        })
    })
});
setInterval(getTime, 1000)
   getweather()
   getTime()
   getcities()

