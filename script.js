'use strict';

let from = document.querySelector('#from');
let to = document.querySelector('#to');
let amountInput = document.querySelector('input');
let resultText = document.querySelector('#result');
let errorText = document.querySelector('#error');
let button = document.querySelector('button');

const API_KEY = '7f17c7a4a2msh8d269aaeef77cd2p167b00jsn7c3bf43b43e1';
const API_HOST = 'currency-converter-pro1.p.rapidapi.com';

async function fetchRates() {
    const url = `https://${API_HOST}/latest-rates?base=USD`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        populateDropdowns(data.result);
    } catch (error) {
        console.error(error);
    }
}

function populateDropdowns(rates) {
    for (const currency in rates) {
        let option = document.createElement("option");
        option.value = currency;
        option.textContent = currency;
        from.appendChild(option.cloneNode(true));
        to.appendChild(option);
    }
}

async function convertCurrency() {
    let amount = parseFloat(amountInput.value);

    let fromCurrency = from.value;
    let toCurrency = to.value;

    const url = `https://${API_HOST}/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.success) {
            resultText.textContent = `Result: ${data.result.toFixed(2)} ${toCurrency}`;
        } else {
            errorText.textContent = 'Error';
            amountInput.style.border = '2px solid red'
            errorText.style.color = 'red';
            setTimeout(() => {
                amountInput.style.border = '1px solid black'
                errorText.innerHTML = ' ';
            }, 2000)
        }
    } catch (error) {
        console.error(error);
    }
}

button.addEventListener('click', convertCurrency);

fetchRates();
