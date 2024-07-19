const apikey = "527833b191dedbbd23e2d4594c25bc76";
const apiCountryURL ="https://flagsapi.com/";




const cityinput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weathericonElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// Loader
const toggleLoader = () => {
    loader.classList.toggle("hide");
};


//funcoes
const getWeatherData = async(city)=>{
    toggleLoader();
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    toggleLoader();

   return data;
};
const showWeatherData = async (city)=>{
    const data = await getWeatherData(city);
    console.log(data);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weathericonElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src",`https://flagsapi.com/${data.sys.country}/flat/64.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}Km/h`;


    weatherContainer.classList.remove("hide");
};





//eventos
searchBtn.addEventListener("click", (e)=> {

    e.preventDefault();
    const city = cityinput.value;
    weatherContainer.classList.add("hide");
    showWeatherData(city);
});

cityinput.addEventListener("keyup", (e)=> {

    if(e.code === "Enter"){
        const city = e.target.value;
        weatherContainer.classList.add("hide");

        showWeatherData(city);
    }
});