// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}



$(document).ready(function() {
    $("#cityButton").click(function (event) {
        var formContent = $("#city").val();
        alert(formContent);

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
                })
            })
    });
});