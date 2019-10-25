$(document).ready(function() {
  apiKey = 'a35408144a5c190a5dad6b16befef222';
  function currentWeather(city) {
    var queryUrl =
      'http://api.openweathermap.org/data/2.5/weather?q=' +
      city +
      '&APPID=' +
      apiKey;
    $.ajax({
      url: queryUrl,
      method: 'GET'
    }).then(function(response) {
      console.log(response);
    });
  }

  $('#button-addon2').on('click', function() {
    cityName = $('#citySearch').val();
    currentWeather(cityName);
  });
});
