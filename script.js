$(document).ready(function() {
    $("#cityButton").click(function (event) {
        var formContent = $("#city").val();
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
                            $('#day' + i + "weather").find('.temp').text("Temp: " + ((data.list[i].main.feels_like - 273.15) * (9/5) + 32).toFixed(2) + " F°");
                            $('#day' + i + "weather").find('.wind').text("Wind: " + (data.list[i].wind.speed).toFixed(2) + " MPH");
                            $('#day' + i + "weather").find('.humid').text("Humidity: " + (data.list[i].main.humidity) + "%");
                        }
                })
            })
    });
});