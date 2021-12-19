$(document).ready(onReady);

let clickedOperation = '';
//global var for selected operation

function onReady () {
    console.log('so ready');
    $('.operation').on('click', onGetOperation);
    //operation click listener
    $('#operationForm').on('submit', onEquals);
    //equals/submit click listener
    $('#clear').on('click', clearInputs);
    //clear button click listener

    let ajaxOptions = {
        method: 'GET',
        url: '/results'
    };

    $.ajax(ajaxOptions)
        .then((response) => {
            console.log('ajax request complete', response);
            render(response);
        });
}

function onGetOperation () {
    clickedOperation = $(this).text();
    //gets text of selected operation for global variable
    console.log('selected operation:', clickedOperation);
}

function onEquals (event) {
    event.preventDefault();//prevents page reload
    newInput = $('#formulaInput').val().
        split('+').join(',').split('-').join(',').split('*').join(',').split('/').join(',').split(',');
    console.log('testing:', newInput);
    let calc = {
        num1: newInput[0],
        operation: clickedOperation,
        num2: newInput[1]
    };//creates object with two numbers and operation
    console.log('calc is:', calc);

    $.ajax({
        method: 'POST',
        url: '/math',
        data: calc//this will become req.body on the server
    })
        .then((response) => {
            console.log('POST response', response);
            //refresh();
        })
        .catch((err) => {
            console.log('POST failed😱');
            alert('Something has gone wrong. Try again later');
        });//this is what happens with no server response
    refresh();
}

function clearInputs () {
    $('#firstNumber').val('');
    $('#secondNumber').val('');
    $('#firstNumber').focus();
    $('#calcResult').empty();
    //clears input fields on DOM
}

function refresh () {
    let ajaxOptions = {
        method: 'GET',
        url: '/results'
    };

    $.ajax(ajaxOptions)
        .then((response) => {
            console.log('ajax request complete', response);
            render(response);
        });
}

function render (results) {
    console.log('results are:', results)
    $('#historical').empty();
    $('#calcResult').append(`
        <h2>${results.output}</h2>`);
    let historicalArray = results.historical;
    for (let entry of historicalArray) {
        $('#historical').append(`
            <li>${entry}</li>`);
    }
}