var firebaseConfig = {
                apiKey: "AIzaSyBpPivjVpWfqBCz2dAUy8OyLmpW-hulf-8",
                authDomain: "controlbillapi.firebaseapp.com",
                databaseURL: "https://controlbillapi-default-rtdb.europe-west1.firebasedatabase.app",
                projectId: "controlbillapi",
                storageBucket: "controlbillapi.appspot.com",
                messagingSenderId: "894275465013",
                appId: "1:894275465013:web:c09afa652431fefab5667c",
                measurementId: "G-Y6R02SYFN3"
            };
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            firebase.analytics();

const nameAndAmount = [];
const amount = [];

const billName = document.getElementById("billname");
const billValue = document.getElementById('billvalue');
const sendButton = document.getElementById('add-bill');
const billNameContainer = document.getElementById('bill-name-container');
const billValueContainer = document.getElementById('bill-value-container');
const idForm = document.getElementById('id-form');
const billCheckbox = document.getElementById('normal-bill');
const creditCheckbox = document.getElementById('credit-bill');
const checbkboxContainer = document.getElementById('bill-type-container');
const valueCounter = document.getElementById('value-counter');
const valueSum = document.getElementById('value-sum');
const bill = document.getElementsByTagName('bill');
const resetButton = document.getElementById('remove-bill');
const trashBin = document.getElementById('trash-bin');

billName.addEventListener('input', inputHandler);
billValue.addEventListener('input', inputHandler);
billCheckbox.addEventListener('change', inputHandler);
creditCheckbox.addEventListener('change', inputHandler);

function inputHandler(event) {
    nameAndAmount[event.target.name] = event.target.value;
};

function getValues() {
    return fetch(`https://controlbillapi-default-rtdb.europe-west1.firebasedatabase.app/bills.json`)
        .then(response => response.json())
}
 getValues().then(data => {
    const formatedData = Object.keys(data).map(key => ({ id: key, ...data[key] }))
        
     formatedData.forEach((item, id) => {
        
        const nameAdded = document.createElement('div');
        const valueAdded = document.createElement('div');
        const billCheckboxAdded = document.createElement('div');
        const trashIconAdded = document.createElement('div');
        trashIconAdded.classList.add('bill-name-added')
        trashIconAdded.classList.add('trash-icon');
        trashIconAdded.classList.add('trash-icon:hover');
        
         trashIconAdded.addEventListener('click', () => {
             fetch(`https://controlbillapi-default-rtdb.europe-west1.firebasedatabase.app/bills/${item.id}.json`, {
                method: `DELETE`,
            }).then(() => window.location.reload())
        })

        nameAdded.classList.add('bill-name-added');
        valueAdded.classList.add('bill-name-added');
        billCheckboxAdded.classList.add('bill-name-added');
        

        nameAdded.innerText = item.billname;
        valueAdded.innerText = item.billvalue + 'zł';
        billCheckboxAdded.innerText = item.billtype;

        billNameContainer.appendChild(nameAdded);
        billValueContainer.appendChild(valueAdded);
        checbkboxContainer.appendChild(billCheckboxAdded);
        trashBin.appendChild(trashIconAdded);
     })
     
     const valueFromDatabase = formatedData.reduce((acc, item) =>
         acc + Number(item.billvalue)
         , 0);
     valueSum.innerHTML = valueFromDatabase + 'zł';
  })
getValues();

idForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const trashIconAdded = document.createElement('div');
    trashIconAdded.classList.add('bill-name-added');
    trashIconAdded.classList.add('trash-icon');
    trashIconAdded.classList.add('trash-icon:hover');
    trashBin.append(trashIconAdded);

    const nameAdded = document.createElement('div');
    nameAdded.classList.add('bill-name-added');
    nameAdded.innerText = nameAndAmount.billName;
    billNameContainer.append(nameAdded);

    const valueAdded = document.createElement('div');
    valueAdded.classList.add('bill-name-added');
    valueAdded.innerText = nameAndAmount.billValue + 'zł';
    billValueContainer.append(valueAdded);
    amount.push(nameAndAmount.billValue)
   
    const billCheckboxAdded = document.createElement('div');
    billCheckboxAdded.classList.add('bill-name-added');
    billCheckboxAdded.innerText = nameAndAmount.billtype;
    checbkboxContainer.append(billCheckboxAdded);

    

function sumValue() {
        const numberArray = amount.map(Number);
        const values = numberArray.reduce(function (acc, val) {
            return acc + val;
        }, 0);
        valueSum.innerHTML = values + 'zł';
    }
    sumValue();


    function addValues() {
        fetch(`https://controlbillapi-default-rtdb.europe-west1.firebasedatabase.app/bills.json`, {
            method: `POST`,
            body: JSON.stringify({billname: nameAndAmount.billName, billtype: nameAndAmount.billtype, billvalue: nameAndAmount.billValue })
        })
        
    }
    addValues();

});
 

idForm.addEventListener('reset', () => {
    function deleteValues() {
        fetch(`https://controlbillapi-default-rtdb.europe-west1.firebasedatabase.app/bills/.json`, {
            method: `DELETE`,
        }).then(() => window.location.reload())
    }
    deleteValues();
})

