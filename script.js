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
      $('#cityName').text(response.name);
      $('#temp').text(`Temperature: ` + response.main.temp + ' °F');
      $('#humidity').text(`Humidity: ` + response.main.humidity + '%');
      $('#windSpeed').text(`Wind Speed: ` + response.wind.speed + ' MPH');
      // Create UV index URL query
      // Pull coordinates from the returned OBJ and pass coordinates into UV index API call

      var queryUrlUV =
        'http://api.openweathermap.org/data/2.5/uvi?appid=' +
        apiKey +
        '&lat=' +
        response.coord.lat +
        '&lon=' +
        response.coord.lon;

      // Create ajax call to UV index URL

      $.ajax({
        url: queryUrlUV,
        method: 'GET'
      }).then(function(responseUV) {
        $('#uvIndex').text(responseUV.value);
      });
    });
  }

  // Setup call for 5 day forecast

  function fiveDayForecast(city) {
    var queryUrl5day =
      'http://api.openweathermap.org/data/2.5/forecast?q=' +
      city +
      '&units=imperial&appid=' +
      apiKey;
    $.ajax({
      url: queryUrl5day,
      method: 'GET'
    }).then(function(response) {
      console.log(response);
    });
  }

  $('#button-addon2').on('click', function() {
    cityName = $('#citySearch').val();
    currentWeather(cityName);
    fiveDayForecast(cityName);
  });
  $('li').on('click', function() {
    cityName = $(this).text();
    currentWeather(cityName);
    fiveDayForecast(cityName);
  });
});
