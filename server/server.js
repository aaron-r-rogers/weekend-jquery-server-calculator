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