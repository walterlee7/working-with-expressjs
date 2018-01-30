const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

//set a variable to abbr. the path
let datapath = path.join(__dirname, '../submissions.json');

// *** middleware that was used for terminal logging URL requests
// app.use((req, res, next) => {
//     console.log(req.originalUrl);
//     next();
// });

// *** middleware that was used to append to a file in sync with request URLs
// app.use((req, res, next) => {
//     fs.appendFileSync('log.txt', `${req.url}\n`);
//     next();
// })


app.use(bodyParser.urlencoded({ extended: false }));

// takes name and email inputs from HTML form and posts the server response to '/contact-form'
app.post('/contact-form', (req, res) => {

    console.log(req.body.name);
    console.log(req.body.email);

    //created an object for name and email
    let person = {
        name: req.body.name,
        email: req.body.email,
    }

    //the server response
    res.send("Thanks");

    //appends 'submissions.json' with HTML form inputs, which becomes string values
    fs.appendFileSync('submissions.json', `This is the name: ${person.name}, and this is the email: ${person.email}.\n`);
});

// middleware for setting the path to the main folder 'public'
app.use(express.static(path.join(__dirname, '../public')));


// routes the datapath variable to the '/formsubmissions' URL
router.get('/formsubmissions', (req, res) => {

    // reads and encodes the file from 'datapath'
    fs.readFile(datapath, {
        encoding: "UTF-8",
    }, (err, data) => {

        //variable that globally replaces the '\n' string with the HTML <br>
        let dat = data.replace(/\n/g, '<br />');

        //sends the response to the '/formsubmissions' URL
        res.send(dat);
    });
});

// middleware for setting the router
app.use(router);

// listens for client responses on port 3000
app.listen(3000);

// *** code for showing how params works
// app.get('/order/:id', (req, res) => {
//     let id = req.params.id;
//     res.send(id);
// });






