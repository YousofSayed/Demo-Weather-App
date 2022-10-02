const apiKey = '22c3707aea6a1b4d381de911f5a4a1ac';
let input = document.getElementById('input'),
    warnning = document.getElementById('warnning'),
    search = document.getElementById('search'),
    img = document.getElementById('imgstate'),
    result = document.getElementById('result'),
    deg = document.getElementById('deg'),
    celsius = document.getElementById('celsius'),
    state = document.getElementById('state'),
    city = document.getElementById('city'),
    locandcity = document.getElementById('locandcity'),
    country = document.getElementById('country'),
    getLoctionBtn = document.getElementById('getLoction'),
    maxDegreeAndHumidity = document.getElementById('maxDegreeAndHumidity'),
    maxDegree = document.getElementById('max-deg'),
    humidity = document.getElementById('humidity');


let bg_img = document.getElementById('bg-i');
    ImgsBodyForMornning = "img/morning/Capture-116.webp",
    ImgsBodyForEvenning = "img/Evenning or sunny/photo-1586791965591-15d8892f6dd6.jfif",
    ImgsBodyFornight = "img/night/photo-1509773896068-7fd415d91e2e.jfif"
    clockHours = document.getElementById('hours'),
    pmOrAm = document.getElementById('pmOram'),
    clockMinutes = document.getElementById('minutes'),
    stateOFDay = document.getElementById('stateOfDay');
// minutes,
// hours;


//Start set Time
setInterval(() => {
    const date = new Date;
    const hours = (date.getHours());
    const minutes = (date.getMinutes())
    if (hours >= 18 && hours === 24 && hours <= 5) {
        bg_img.src = ImgsBodyFornight;
        stateOFDay.textContent = 'Good Night';
    }
     if (hours >= 5 && hours < 14) {
        bg_img.src = ImgsBodyForMornning;
        stateOFDay.textContent = 'Good Mornning';
    }
     if (hours >= 14 && hours < 18) {
        bg_img.src = ImgsBodyForEvenning;
        stateOFDay.textContent = 'Good Evenning';
    }


    clockHours.textContent = hours -12 ;
    if (+clockHours.textContent <= 0){
        clockHours.textContent = 12 - hours
    }
    clockMinutes.textContent = "0" + minutes;
    if (+clockMinutes.textContent >= 10){
        clockMinutes.textContent = minutes;
    }

    if (hours <= 12) {
        pmOrAm.textContent = 'AM';
    } else {
        pmOrAm.textContent = 'PM';
    }
}, 1)
//End set Time

function getData(param) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${apiKey}`).then((res) => {
        let myData = res.json();
        return myData;
    }).then((data) => {
        console.log(data);
        const cod = data.cod;
        console.log(data.cod);
        if (+cod > 200){
            result.style.display = 'none';
            locandcity.style.display = 'none';
            img.style.display = `none`;
            maxDegreeAndHumidity.style.display = 'none';
            warnning.style.cssText=`
            display: block; `

        }
        const weather = data.weather[0];
        const description = weather.description; //description
        const temp = data.main.temp;
        const degree = Math.trunc(temp - 273.15);
        const maxDegreeApi = Math.round(temp - 273.15);
        const nameCity = data.name;
        const nameCountry = data.sys.country;
        const humidityApi = data.main.humidity;
        result.style.display = 'block';
        locandcity.style.display = 'flex';
        img.style.display=`block`;
        celsius.style.display='block'
        maxDegreeAndHumidity.style.display = 'flex';

        //Start Conditions For ICons Of Weather
        if (description === 'clear sky') {
            img.src = "img/icons/clear sky.png";

            if (stateOFDay.textContent === 'Good Night') {
                img.style.filter=`grayscale(100%)`
            } 
        }

        if (description === 'few clouds') {
            img.src = "img/icons/few clouds.png";

            if (stateOFDay.textContent === 'Good Night') {
                img.style.filter = `grayscale(100%)`
            } 

        }

        if (description === 'scattered clouds') {
            img.src = "img/icons/scattered clouds.png";

            if (stateOFDay.textContent === 'Good Night') {
                img.style.filter = `grayscale(100%)`
            }

        }

        if (description.includes('clouds')) {
            img.src = "img/icons/broken clouds.png";

            if (stateOFDay.textContent === 'Good Night') {
                img.style.filter = `grayscale(100%)`
            }

        }

        if (description.includes('rain')) {
            img.src = "img/icons/shower rain.png";

            if (stateOFDay.textContent === 'Good Night') {
                img.style.filter = `grayscale(100%)`
            }

        }


        if (description.includes('thunderstorm')) {
            img.src = "img/icons/thunderstorm.png";

            if (stateOFDay.textContent === 'Good Night') {
                img.style.filter = `grayscale(100%)`
            }

        }

        if (description.includes('snow')) {
            img.src = "img/icons/snow.png";

            if (stateOFDay.textContent === 'Good Night') {
                img.style.filter = `grayscale(100%)`
            }

        }

        if (description.includes('mist')) {
            img.src = "img/icons/mist.png";

            if (stateOFDay.textContent === 'Good Night') {
                img.style.filter = `grayscale(100%)`
            }

        }
        //End Conditions For ICons Of Weather

        state.textContent = description;
        deg.textContent = degree;
        city.textContent = nameCity;
        country.textContent = nameCountry;
        maxDegree.textContent=maxDegreeApi;
        humidity.textContent = humidityApi + "%";
        console.log(description);
    })
}

input.addEventListener('input', () => {
    search.style.cssText =` opacity: 1;
        cursor: pointer;`

        if(input.value===''){
            search.style.cssText = ` opacity: 0;
        cursor: unset;`
            result.style.display = 'none';
            locandcity.style.display = 'none';
            img.style.display = `none`;
            celsius.style.display = 'none'
            maxDegreeAndHumidity.style.display = 'none';
            warnning.style.display = 'none';
        }
});

search.addEventListener('click',()=>{
    getData(input.value)
})


getLoctionBtn.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((sec)=>{
    
            let { latitude, longitude } = sec.coords;
             console.log(latitude);
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
            .then((res)=>{
                let data = res.json();
                return data
            })
            .then(data => {
                const weather = data.weather[0];
                const description = weather.description; //description
                const temp = data.main.temp;
                const degree = Math.trunc(temp - 273.15);
                const maxDegreeApi = Math.round(temp - 273.15);
                const nameCity = data.name;
                const nameCountry = data.sys.country;
                const humidityApi = data.main.humidity;
                result.style.display = 'block';
                locandcity.style.display = 'flex';
                img.style.display = `block`;
                celsius.style.display = 'block'
                maxDegreeAndHumidity.style.display = 'flex';

                //Start Conditions For ICons Of Weather
                if (description === 'clear sky') {
                    img.src = "img/icons/clear sky.png";

                    if (stateOFDay.textContent === 'Good Night') {
                        img.style.filter = `grayscale(100%)`
                    }
                }

                if (description === 'few clouds') {
                    img.src = "img/icons/few clouds.png";

                    if (stateOFDay.textContent === 'Good Night') {
                        img.style.filter = `grayscale(100%)`
                    }

                }

                if (description === 'scattered clouds') {
                    img.src = "img/icons/scattered clouds.png";

                    if (stateOFDay.textContent === 'Good Night') {
                        img.style.filter = `grayscale(100%)`
                    }

                }

                if (description.includes('clouds')) {
                    img.src = "img/icons/broken clouds.png";

                    if (stateOFDay.textContent === 'Good Night') {
                        img.style.filter = `grayscale(100%)`
                    }

                }

                if (description.includes('rain')) {
                    img.src = "img/icons/shower rain.png";

                    if (stateOFDay.textContent === 'Good Night') {
                        img.style.filter = `grayscale(100%)`
                    }

                }


                if (description.includes('thunderstorm')) {
                    img.src = "img/icons/thunderstorm.png";

                    if (stateOFDay.textContent === 'Good Night') {
                        img.style.filter = `grayscale(100%)`
                    }

                }

                if (description.includes('snow')) {
                    img.src = "img/icons/snow.png";

                    if (stateOFDay.textContent === 'Good Night') {
                        img.style.filter = `grayscale(100%)`
                    }

                }

                if (description.includes('mist')) {
                    img.src = "img/icons/mist.png";

                    if (stateOFDay.textContent === 'Good Night') {
                        img.style.filter = `grayscale(100%)`
                    }

                }
                //End Conditions For ICons Of Weather

                state.textContent = description;
                deg.textContent = degree;
                city.textContent = nameCity;
                country.textContent = nameCountry;
                maxDegree.textContent = maxDegreeApi;
                humidity.textContent = humidityApi + "%";
                console.log(description);
            })
              
        })
    }
})


// (( kelvinValue - 273.15) * 9/5) + 32










    // navigator.geolocation.getCurrentPosition((sec)=>{
    //     console.log(sec.coords);
    //     let {latitude , longitude} = sec.coords;
    //     console.log(latitude);

    //     fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${apiKey}`).then((res)=>{
    //         res.json()
    //     }).then(data => {console.log(data);})
    // })
