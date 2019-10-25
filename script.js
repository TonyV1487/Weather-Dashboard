$(document).ready(function() {
  apiKey = 'a35408144a5c190a5dad6b16befef222';
  function currentWeather(city) {
    var queryUrl =
      'http://api.openweathermap.org/data/2.5/weather?q=' +
      city +
      '&units=imperial&APPID=' +
      apiKey;
    $.ajax({
      url: queryUrl,
      method: 'GET'
    }).then(function(response) {
      console.log(response);
      $('#cityName').text(response.name);
      $('#temp').text(`Temperature: ` + response.main.temp);
      $('#humidity').text(`Humidity: ` + response.main.humidity);
      $('#windSpeed').text(`Wind Speed: ` + response.wind.speed);
      $('#uvIndex').text(`UV Index; `);
      console.log(response.name);
    });
  }

  $('#button-addon2').on('click', function() {
    cityName = $('#citySearch').val();
    currentWeather(cityName);
  });
});
