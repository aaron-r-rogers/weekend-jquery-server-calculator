$(document).ready(onReady);

let clickedOperation = '';
//global var for selected operation
let clickedInput = [];
//global array for calculator number selection

function onReady() {
	console.log('so ready');
	$('.operation').on('click', onGetOperation);
	//operation click listener
	$('#operationForm').on('submit', onEquals);
	//equals/submit click listener
	$('#clear').on('click', clearInputs);
	//clear button click listener
	$('.number').on('click', appendNums);
	//number buttons click listener

	let ajaxOptions = {
		method: 'GET',
		url: '/results'
	};

	$.ajax(ajaxOptions).then((response) => {
		console.log('ajax request complete', response);
		render(response);
	});
}

function onGetOperation() {
	clickedOperation = $(this).text();
	//gets text of selected operation for global variable
	console.log('selected operation:', clickedOperation);
	appendOperation(clickedOperation);
}

function onEquals(event) {
	event.preventDefault(); //prevents page reload
	newInput = $('#formulaInput')//makes DOM string server ready
		.val()
		.split('+')
		.join(',')
		.split('-')
		.join(',')
		.split('*')
		.join(',')
		.split('/')
		.join(',')
		.split(',');//this feels hacky; better way?
	console.log('new input:', newInput);
	let calc = {
		num1: newInput[0],
		operation: clickedOperation,
		num2: newInput[1]
	}; //creates object with two numbers and operation
	console.log('calc is:', calc);

	$.ajax({
		method: 'POST',
		url: '/math',
		data: calc //this will become req.body on the server
	})
		.then((response) => {
			console.log('POST response', response);
		})
		.catch((err) => {
			console.log('POST failed😱');
			alert('Something has gone wrong. Try again later');
		}); //this is what happens with no server response
	refresh();
}

function clearInputs() {
	//$('#formulaInput').value = '';
	$('#calcResult').empty();
	clickedInput = [];
	$('#formulaInput').empty();
	//clears input fields on DOM
}

function refresh() {
	let ajaxOptions = {
		method: 'GET',
		url: '/results'
	};

	$.ajax(ajaxOptions).then((response) => {
		console.log('ajax request complete', response);
		render(response);
	})//updates history after /math POST
	.catch((err) => {
		console.log('GET failed😱');
		alert('Something has gone wrong. Try again later');
	}); //this is what happens with no server response
}

function render(results) {
	console.log('results are:', results);
	$('#historical').empty();//prevents duplicates
	$('#calcResult').append(`
        <h2>${results.output}</h2>`);//appends current calculation
	let historicalArray = results.historical;
	for (let entry of historicalArray) {
		$('#historical').append(`
            <li>${entry}</li>`);
	}//loops through/appends array of historical results
}

function appendNums() {
	clickedNum = $(this).text();
	clickedInput.push(clickedNum);
	renderInputs();//adds clicked number to array
}

function appendOperation() {
	clickedInput.push(clickedOperation);
	renderInputs();//adds clicked operand to array
}

function renderInputs() {
	$('#formulaInput').empty();//prevents duplicates
	$('#formulaInput').append(clickedInput.toString().replaceAll(',', ''));
	console.log(clickedInput.toString().replaceAll(',', ''));
}//appends array of clicked numbers and operands to DOM sans commas
