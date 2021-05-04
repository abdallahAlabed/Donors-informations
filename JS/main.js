'use strict'

function Doners(donerName, amount, age) {
    this.donerName = donerName;
    this.amount = amount;
    this.age = age;
    Doners.allDoners.push(this);
    save();

}
/////////////////////////////////////////////////////////////////////////
Doners.allDoners = [];
let donerHeder = ['Doner Name', 'Doner Age', 'Amount']
let myForm = document.getElementById('donation');
let container = document.getElementById('table');
let donationName = '';
let donat = 0;
/////////////////////////////////////////////////////////////////////////
myForm.addEventListener('submit', function (event) {
    event.preventDefault();
    donationName = event.target.name.value;
    donat = parseInt(event.target.amount.value);
    new Doners(donationName, donat, randomAge()).render();
})
/////////////////////////////////////////////////////////////////////////
function randomAge() {
    return Math.floor((Math.random() * 13)) + 18;
}
/////////////////////////////////////////////////////////////////////////
Doners.prototype.render = function () {
    let rowData = [];
    let sum =0;
    let table = document.createElement('table');
    document.getElementById('table').innerHTML = '';
    container.appendChild(table);
    let tr = document.createElement('tr');
    table.appendChild(tr);
    for (let index = 0; index < donerHeder.length; index++) {
        let th = document.createElement('th');
        tr.appendChild(th);
        th.textContent = donerHeder[index];
    }
    for (let index = 0; index < Doners.allDoners.length; index++) {
        sum += Doners.allDoners[index].amount;
        
    }
    for (let i = 0; i < Doners.allDoners.length; i++) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        rowData[0] = Doners.allDoners[i].donerName;
        rowData[1] = Doners.allDoners[i].amount;
        rowData[2] = Doners.allDoners[i].age;
        for (let j = 0; j < rowData.length; j++) {
            let td = document.createElement('td');
            tr.appendChild(td);
            td.textContent = rowData[j];
        }

    }
    let tr1 = document.createElement('tr');
    table.appendChild(tr1);
    let td = document.createElement('td');
    tr1.appendChild(td);
    td.textContent = 'Total: '+sum;
}
/////////////////////////////////////////////////////////////////////////
function save() {
    localStorage.setItem('doners', JSON.stringify(Doners.allDoners));

}
/////////////////////////////////////////////////////////////////////////
function getData() {
    let data = JSON.parse(localStorage.getItem('doners'));
    if (data) {
        Doners.allDoners = [];
        for (let index = 0; index < data.length; index++) {
            new Doners(data[index].donerName,data[index].amount,data[index].age).render();
        }
    }
}
/////////////////////////////////////////////////////////////////////////
getData();
