var firebaseConfig = {
	apiKey: "AIzaSyBpPivjVpWfqBCz2dAUy8OyLmpW-hulf-8",
	authDomain: "controlbillapi.firebaseapp.com",
	databaseURL:
		"https://controlbillapi-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "controlbillapi",
	storageBucket: "controlbillapi.appspot.com",
	messagingSenderId: "894275465013",
	appId: "1:894275465013:web:c09afa652431fefab5667c",
	measurementId: "G-Y6R02SYFN3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const nameAndAmount = [];
const amount = [];

const billName = document.getElementById("billname");
const billValue = document.getElementById("billvalue");
const sendButton = document.getElementById("add-bill");
const billNameContainer = document.getElementById("bill-name-container");
const billValueContainer = document.getElementById("bill-value-container");
const idForm = document.getElementById("id-form");
const billCheckbox = document.getElementById("normal-bill");
const creditCheckbox = document.getElementById("credit-bill");
const checbkboxContainer = document.getElementById("bill-type-container");
const valueCounter = document.getElementById("value-counter");
const valueSum = document.getElementById("value-sum");
const bill = document.getElementsByTagName("bill");
const resetButton = document.getElementById("remove-bill");
const trashBin = document.getElementById("trash-bin");

billName.addEventListener("input", inputHandler);
billValue.addEventListener("input", inputHandler);
billCheckbox.addEventListener("change", inputHandler);
creditCheckbox.addEventListener("change", inputHandler);

function inputHandler(event) {
	nameAndAmount[event.target.name] = event.target.value;
}
valueSum.innerHTML = "0zł";
if (valueSum.innerHTML === "0zł") {
	const comment = document.createElement("div");
	comment.innerHTML = "Great value! 😎";
	valueSum.appendChild(comment);
}

function getValues() {
	return fetch(
		`https://controlbillapi-default-rtdb.europe-west1.firebasedatabase.app/bills.json`
	).then((response) => response.json());
}
getValues().then((data) => {
	const formatedData = Object.keys(data).map((key) => ({
		id: key,
		...data[key],
	}));
	valueSum.innerHTML = "0zł";
	if (valueSum.innerHTML === "0zł") {
		const comment = document.createElement("div");
		comment.innerHTML = "Great value! 😎";
		valueSum.appendChild(comment);
	}

	formatedData.forEach((item, id) => {
		const billNameTable = document.createElement("tr");
		const nameAdded = document.createElement("td");
		const valueAdded = document.createElement("td");
		const billCheckboxAdded = document.createElement("td");
		const trashBin = document.createElement("div");

		billNameTable.classList.add("bill-name-added");
		nameAdded.classList.add("bill-name-added");
		valueAdded.classList.add("bill-name-added");
		billCheckboxAdded.classList.add("bill-name-added");
		trashBin.classList.add("trash-icon");
		trashBin.classList.add("trash-icon:hover");

		nameAdded.innerText = item.billname;
		billCheckboxAdded.innerText = item.billtype;
		valueAdded.innerText = `${item.billvalue}zł`;

		billNameContainer.appendChild(nameAdded);
		checbkboxContainer.appendChild(billCheckboxAdded);
		billValueContainer.appendChild(billNameTable);
		billNameTable.appendChild(valueAdded);
		billNameTable.appendChild(trashBin);

		trashBin.addEventListener("click", () => {
			fetch(
				`https://controlbillapi-default-rtdb.europe-west1.firebasedatabase.app/bills/${item.id}.json`,
				{
					method: `DELETE`,
				}
			).then(() => window.location.reload());
		});
	});

	const valueFromDatabase = formatedData.reduce(
		(acc, item) => acc + Number(item.billvalue),
		0
	);
	valueSum.innerHTML = `${valueFromDatabase}zł`;

	if (valueFromDatabase >= 5000) {
		const comment = document.createElement("div");
		comment.innerHTML = "Your bills are too high! 😭";
		valueSum.appendChild(comment);
	} else if (valueFromDatabase >= 1) {
		const comment = document.createElement("div");
		comment.innerHTML = "Nice! 👌";
		valueSum.appendChild(comment);
	}
});

getValues();

idForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const billNameTable = document.createElement("tr");
	const nameAdded = document.createElement("td");
	const valueAdded = document.createElement("td");
	const billCheckboxAdded = document.createElement("td");
	const trashBin = document.createElement("div");

	billNameTable.classList.add("bill-name-added");
	nameAdded.classList.add("bill-name-added");
	valueAdded.classList.add("bill-name-added");
	billCheckboxAdded.classList.add("bill-name-added");
	trashBin.classList.add("trash-icon");
	trashBin.classList.add("trash-icon:hover");

	nameAdded.innerText = nameAndAmount.billName;
	billCheckboxAdded.innerText = nameAndAmount.billtype;
	valueAdded.innerText = `${nameAndAmount.billValue}zł`;
	amount.push(nameAndAmount.billValue);

	billNameContainer.appendChild(nameAdded);
	checbkboxContainer.appendChild(billCheckboxAdded);
	billValueContainer.appendChild(billNameTable);
	billNameTable.appendChild(valueAdded);
	billNameTable.appendChild(trashBin);

	function sumValue() {
		const numberArray = amount.map(Number);
		const values = numberArray.reduce(function (acc, val) {
			return acc + val;
		}, 0);
		valueSum.innerHTML = `${values}zł`;
		if (values >= 5000) {
			const comment = document.createElement("div");
			comment.innerHTML = "Your bills are too high! 😭";
			valueSum.appendChild(comment);
		} else if (values >= 1) {
			const comment = document.createElement("div");
			comment.innerHTML = "Nice! 👌";
			valueSum.appendChild(comment);
		}
	}
	sumValue();

	function addValues() {
		fetch(
			`https://controlbillapi-default-rtdb.europe-west1.firebasedatabase.app/bills.json`,
			{
				method: `POST`,
				body: JSON.stringify({
					billname: nameAndAmount.billName,
					billtype: nameAndAmount.billtype,
					billvalue: nameAndAmount.billValue,
				}),
			}
		);
	}
	addValues();
});

idForm.addEventListener("reset", () => {
	function deleteValues() {
		fetch(
			`https://controlbillapi-default-rtdb.europe-west1.firebasedatabase.app/bills/.json`,
			{
				method: `DELETE`,
			}
		).then(() => window.location.reload());
	}
	deleteValues();
});
