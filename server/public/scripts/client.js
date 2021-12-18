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
    let calc = {
        num1: $('#firstNumber').val(),
        operation: clickedOperation,
        num2: $('#secondNumber').val()
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
    clearInputs();
}

function clearInputs () {
    $('#firstNumber').val('');
    $('#secondNumber').val('');
    $('#firstNumber').focus();
    //clears input fields on DOM
}

// function render (results) {
//     results.output
//     results.historical
// }