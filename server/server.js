const express = require('express');

const bodyParser = require('body-parser');

const app = express();

//Looks at everything in public folder and sets endpoints when called
app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//listen on port 5000
const port = 5000;
app.listen(port, () => {
    console.log(`I'm listening`);
});

//POST /math endpoint
app.post('/math', (req, res) => {
    console.log('posting calc inputs', req.body);
    mathCalc(req.body);
    res.sendStatus(201);
});

//GET /results endpoint
app.get('/results', (req, res) => {
    console.log('getting results');
    res.send({output: calcResult, historical: historicalCalc});
});

let historicalCalc = [];
let calcResult = '';

function mathCalc (calcObject) {
    console.log('in mathCalc with:', calcObject);
    let sign = calcObject.operation
    switch (sign) {//switch statement to join operation with calculation
        case '+':
            calcResult = Number(calcObject.num1) + Number(calcObject.num2);
            break;//Number() required to prevent concatenation
        case '-':
            calcResult = calcObject.num1 - calcObject.num2;
            break;
        case '*':
            calcResult = calcObject.num1 * calcObject.num2;
            break;
        case '/':
            calcResult = calcObject.num1 / calcObject.num2;
            break;
    }
    makeFormula(calcObject);
    console.log('calculated result:', calcResult);
    return calcResult;
}

function makeFormula (calcObject) {//takes in unadultered object
    formulaArray = (Object.values(calcObject));//object to array of values
    let firstPart = formulaArray.toString();//num1, operator, num3 as string
    let newOutput = `${firstPart}=${calcResult}`;//combines last line with calculated value
    historicalCalc.push(newOutput.replaceAll(',', ''));//gets rid of commas and adds to array
    console.log('new historical array:', historicalCalc);
}