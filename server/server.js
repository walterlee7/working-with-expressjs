const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

//set a variable to abbr. the path
let datapath = path.join(__dirname, '../submissions.json');

// -note: middleware to terminal
// app.use((req, res, next) => {
//     console.log(req.originalUrl);
//     next();
// });

// app.use((req, res, next) => {
//     fs.appendFileSync('log.txt', `${req.url}\n`);
//     next();
// })

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/contact-form', (req, res) => {
    console.log(req.body.email);
    console.log(req.body.name);
    let person = {
        email: req.body.email,
        name: req.body.name,
    }

    res.send("Thanks");
    fs.appendFileSync('submissions.json', `This is the name: ${person.name}, and this is the email: ${person.email}.\n`);
});

app.use(express.static(path.join(__dirname, '../public')));

router.get('/formsubmissions', (req, res) => {
    //res.send("where submissions will go");
    fs.readFile(datapath, {
        encoding: "UTF-8",
    }, (err, data) => {
        console.log(data);
        let dat = data.replace(/\n/g, '<br />');
        res.send(dat);
    });
});

app.use(router);

// app.get('/order/:id', (req, res) => {
//     let id = req.params.id;
//     res.send(id);
// });

// app.use('/order/:id', (req, res, next) => {
//     console.log("Hello");
//     next();
// });

app.listen(3000);

// app.get('/', (req, res, next) => {
//     res.send("Hello from the web server side...");
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// });

// app.get('/css/styles.css', (req, res) => {
//     res.sendFile(path.join(__dirname, '../css/styles.css'));
// });

// app.get('/js/app.js', (req, res) => {
//     res.sendFile(path.join(__dirname, '../js/app.js'));
// });

