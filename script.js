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
      var todaysDate = moment().format('MM/DD/YY');
      var iconId = response.weather[0].icon;
      $('#cityName').text(response.name + ' ' + todaysDate);
      $('#wicon').attr(
        'src',
        'http://openweathermap.org/img/wn/' + iconId + '.png'
      );
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
      console.log(response.list);
      // index = response.list;
      for (i = 5; i < 40; i += 8) {
        // Convert i to the current date
        day = (i - 5) / 8;

        console.log(response.list[i].dt_txt);

        // Pull date from API
        var rawDay = response.list[i].dt_txt;
        // Split the date from the time
        var splitDateTime = rawDay.split(' ');
        // Split the Month, Year, and Date into their own strings
        var splitMYD = splitDateTime[0].split('-');
        // Combine the strings into MM-DD-YYYY format
        var dateActual = splitMYD[1] + '/' + splitMYD[2] + '/' + splitMYD[0];

        // Pull temp from API
        var temp = response.list[i].main.temp;

        // Pull humidity from API
        var humidity = response.list[i].main.humidity;

        // Apply text to page
        $('#' + day + 'DayTitle').text(dateActual);
        $('#' + day + 'DaySymbol').text('Test');
        $('#' + day + 'DayTemp').text('Temp: ' + temp + 'ºF');
        $('#' + day + 'DayHumidity').text('Humidity: ' + humidity + '%');
      }
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
