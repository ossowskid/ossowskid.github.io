// HTML FORMATING
const root = document.createElement('div');
const mainSection = document.createElement('section');
const h1Information = document.createElement('div');
const h1Text = document.createElement('h1');
const mainContent = document.createElement('div');
const addedBills = document.createElement('div');
const billsBefore = document.createElement('div');
const billName = document.createElement('div');
const billAmount = document.createElement('div');
const addBillName = document.createElement('input');
const addBillNameName = document.createElement('p');
const addBillAmount = document.createElement('input');
const addBillAmountAmount = document.createElement('p');
const chooseTypeOfBill = document.createElement('div');
const chooseTypeOfBillCheckbox = document.createElement('div');
const chooseTypeOfBillCredit = document.createElement('input');
const chooseTypeOfBillBill = document.createElement('input');
const creditInfo = document.createElement('div');
const billInfo = document.createElement('div');
const billCreditParagraph = document.createElement('p');
const billBillParagraph = document.createElement('p');
const billsAddedParagraph = document.createElement('p');
const billsAddedAmountParagraph = document.createElement('p');
const billsAddedBoxForName = document.createElement('div');
const billsAddedBoxForAmoune = document.createElement('div');
const namesOfBills = document.createElement('div');
const amountOfBills = document.createElement('div');
const buttonSubmit = document.createElement('button');

chooseTypeOfBillCredit.setAttribute("type", "checkbox");
chooseTypeOfBillBill.setAttribute("type", "checkbox");
addBillName.setAttribute("name", "name");
addBillAmount.setAttribute("name", "amount");


root.append(mainSection);
mainSection.append(h1Information);
mainSection.append(mainContent);
mainContent.append(addedBills);
mainContent.append(billsBefore);
billsBefore.append(billName);
billsBefore.append(billAmount);
billsBefore.append(chooseTypeOfBill);
addedBills.append(billsAddedBoxForName);
addedBills.append(billsAddedBoxForAmoune);
billsAddedBoxForName.append(billsAddedParagraph);
billsAddedBoxForAmoune.append(billsAddedAmountParagraph);

chooseTypeOfBill.append(chooseTypeOfBillCheckbox);
creditInfo.append(billCreditParagraph);
billInfo.append(billBillParagraph);
billName.append(addBillNameName);
billAmount.append(addBillAmountAmount);

chooseTypeOfBillCheckbox.append(creditInfo);
chooseTypeOfBillCheckbox.append(billInfo);

chooseTypeOfBillCheckbox.append(billInfo);
chooseTypeOfBillCheckbox.append(creditInfo);
billInfo.append(chooseTypeOfBillBill);
creditInfo.append(chooseTypeOfBillCredit);
billsAddedBoxForName.append(namesOfBills);
billsAddedBoxForAmoune.append(amountOfBills);
billsBefore.append(buttonSubmit);


billName.append(addBillName);
billAmount.append(addBillAmount);
h1Information.append(h1Text);

h1Text.innerText = "Let me help you to control your bills!"
billCreditParagraph.innerText = "Credits";
billBillParagraph.innerText = "Bills";
addBillNameName.innerText = "Name of the bill:";
addBillAmountAmount.innerText = "Amount of the bill: "
billsAddedParagraph.innerText = "Bill Name:"
billsAddedAmountParagraph.innerText = "Bill Amount: "
buttonSubmit.innerText = "Add bills";


root.classList.add('root');
mainSection.classList.add('main_section');
h1Information.classList.add('h1_information');
mainContent.classList.add('main_content');
addedBills.classList.add('bills_added');
billsBefore.classList.add('bills_before-add');
chooseTypeOfBillCheckbox.classList.add('choose_bill');
chooseTypeOfBillBill.classList.add('bill-checkbox');
chooseTypeOfBillCredit.classList.add('credit-checkbox');
billCreditParagraph.classList.add('info');
billBillParagraph.classList.add('info');
creditInfo.classList.add('choose');
billInfo.classList.add('choose');
billName.classList.add('bill');
billName.classList.add('bill_name');
billAmount.classList.add('bill');
billAmount.classList.add('bill_amount');
addBillName.classList.add('name_bill');
addBillAmount.classList.add('amount_bill');
billsAddedBoxForName.classList.add('bills_added');
billsAddedBoxForName.classList.add('name');
billsAddedBoxForAmoune.classList.add('bills_added');
billsAddedBoxForAmoune.classList.add('amount');
namesOfBills.classList.add('bills_added');
namesOfBills.classList.add('names-added');
amountOfBills.classList.add('bills_added');
amountOfBills.classList.add('amounts-added');
buttonSubmit.classList.add('submit');



document.querySelector('body').append(root);

// JS SCRIPTS


const nameAndAmount = {};
const nameArray = [];

addBillName.addEventListener('input', inputHandler);
addBillAmount.addEventListener('input', inputHandler);

function inputHandler (event) {
    nameAndAmount[event.target.name] = event.target.value;
    console.log(event.target.value);
};

buttonSubmit.addEventListener('click', () => {
    nameAndAmount.name;
    const nameAddedValue = document.createElement('div');
    nameAddedValue.classList.add('bill-name-added');
    nameAddedValue.innerText = nameAndAmount.name;
    namesOfBills.append(nameAddedValue);
    
});
