$(document).ready(function () {
    var todaysDate = dayjs();
    retrieveFromLocalStorage();
    

    // Function to save an array to local storage
    function saveToLocalStorage(value) {
        const localStorageKey = "myArray";
        let myArray = JSON.parse(localStorage.getItem(localStorageKey)) || [];

        // Add the new value to the beginning of the array
        myArray.unshift(value);

        // If the array is longer than 5, remove the last element
        if (myArray.length > 5) {
            myArray.pop();
        }

        localStorage.setItem(localStorageKey, JSON.stringify(myArray));
    }

    // Function to retrieve the array from local storage and assign elements to buttons
    function retrieveFromLocalStorage() {
        const localStorageKey = "myArray";
        let myArray = JSON.parse(localStorage.getItem(localStorageKey)) || [];

        const buttonContainer = document.getElementById("button-container");
        buttonContainer.innerHTML = "";

        myArray.forEach((value) => {
            const button = document.createElement("button");
            button.innerText = value;
            button.classList.add("historyButton");
            buttonContainer.appendChild(button);
        });
    }


    $("#cityButton").click(function (event) {
        $('.wIcon').css('display', 'block');
        var formContent = $("#city").val();
        saveToLocalStorage(formContent);
        retrieveFromLocalStorage();
        $("#cityDisplay").text(formContent);
        fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + formContent + '&limit=1&appid=a3ca7c6257bb748d4cf6def79e5d06d0')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data[0].lat);
                console.log(data["lon"]);
                fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + data[0].lat + '&lon=' + data[0].lon + '&appid=a3ca7c6257bb748d4cf6def79e5d06d0')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        console.log(data.list[0].main.feels_like);
                        for (let i = 0; i < 7; i++) {
                            $('#day' + i + "weather").find('.date').text(todaysDate.add(i, "day").format('MM/DD/YYYY'));
                            $('#day' + i + "weather").find('.wIcon').attr('src', "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                            $('#day' + i + "weather").find('.temp').text("Temp: " + ((data.list[i].main.feels_like - 273.15) * (9 / 5) + 32).toFixed(2) + " F°");
                            $('#day' + i + "weather").find('.wind').text("Wind: " + (data.list[i].wind.speed).toFixed(2) + " MPH");
                            $('#day' + i + "weather").find('.humid').text("Humidity: " + (data.list[i].main.humidity) + "%");
                        }
                    })
            })
    });

    $(document).on("click", ".historyButton", function (event) {
        $('.wIcon').css('display', 'block');
        var formContent = $(this).text();
        $("#cityDisplay").text(formContent);
        fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + formContent + '&limit=1&appid=a3ca7c6257bb748d4cf6def79e5d06d0')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data[0].lat);
                console.log(data["lon"]);
                fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + data[0].lat + '&lon=' + data[0].lon + '&appid=a3ca7c6257bb748d4cf6def79e5d06d0')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        console.log(data.list[0].main.feels_like);
                        for (let i = 0; i < 7; i++) {
                            $('#day' + i + "weather").find('.date').text(todaysDate.add(i, "day").format('MM/DD/YYYY'));
                            $('#day' + i + "weather").find('.wIcon').attr('src', "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                            $('#day' + i + "weather").find('.temp').text("Temp: " + ((data.list[i].main.feels_like - 273.15) * (9 / 5) + 32).toFixed(2) + " F°");
                            $('#day' + i + "weather").find('.wind').text("Wind: " + (data.list[i].wind.speed).toFixed(2) + " MPH");
                            $('#day' + i + "weather").find('.humid').text("Humidity: " + (data.list[i].main.humidity) + "%");
                        }
                    })
            })
    });
});




