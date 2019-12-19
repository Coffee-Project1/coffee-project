"use strict";

function renderCoffee(coffee) {
    var html = '<div class="coffee">';
    html += '<div class="d-flex align-items-baseline">';
    html += '<h3>' + coffee.name + '</h3>';
    html += '<p class="ml-3 text-secondary">' + coffee.roast + '</p>';
    html += '</div>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for (var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    if (selectedRoast === "all") {
        tbody.innerHTML = renderCoffees(coffees);
        return;
    }
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}


// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var tbody = document.querySelector('#tbody');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeSubmit = document.querySelector('#newSubmit');
var newRoast = document.querySelector('#new-roast-selection');
var coffeeName = document.querySelector('#newCoffeeName');
var coffeeSearch = document.getElementById('coffeeSearch');
var backSpace = "";


function coffeePlus() {
    var coffee = {id: 0, name: 'Coffee Name', roast: 'light'};
    coffee.name = coffeeName.value;
    coffee.roast = newRoast.value;
    coffees.push(coffee);
    tbody.innerHTML = renderCoffees(coffees);

}


function coffeeFinder(e) {
    backSpace += e.key.toLowerCase();
    var filteredCoffees = [];

    coffees.forEach(function (coffee) {
        if (coffee.name.toLowerCase().startsWith(backSpace)) {
            filteredCoffees.push(coffee)
        }
        tbody.innerHTML = renderCoffees(filteredCoffees);
    })

}

coffeeSearch.addEventListener("keypress", coffeeFinder);

coffeeSearch.addEventListener('keyup', function (e) {
    if (e.key === 'Backspace') {
        backSpace = backSpace.split('');
        backSpace.pop();
        backSpace = backSpace.join('');
        if (backSpace === '') {
            tbody.innerHTML = renderCoffees(coffees);
        }
    }
});


tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
coffeeSubmit.addEventListener('click', coffeePlus);