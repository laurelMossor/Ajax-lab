'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  fetch("/fortune")
    .then(response => response.text())
    .then(status => {
      document.querySelector("#fortune-text").innerHTML = status;
    });
}
const fortuneButton = document.querySelector('#get-fortune-button');
fortuneButton.addEventListener('click', showFortune);


// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;
  const queryString = new URLSearchParams({zipcode}).toString();
  const new_url = `/weather.json?${queryString}`;
  

  // TODO: request weather with that URL and show the forecast in #weather-info
  fetch(new_url)
    .then(response => response.json())
    .then(responseJson => {
      document.querySelector('#weather-info').innerHTML = responseJson['forecast'];
    });

}

document.querySelector('#weather-form').addEventListener('submit', showWeather);



// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      document.querySelector('#order-status').innerHTML = responseJson["msg"];
      if (responseJson['code'] === "ERROR") {
        document.querySelector('#order-status').classList.add('order-error');
      };
      });
  
      

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  };

document.querySelector('#order-form').addEventListener('submit', orderMelons);
