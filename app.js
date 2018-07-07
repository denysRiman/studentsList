const app = require('express')();
const bodyParser = require('body-parser');
const fBConnection = require('./firebaseConnection');
const firebase = require('firebase-admin');
const serviceAccount = require('./firebaseKey.json');

app.set('view engine', 'ejs');
app.use(bodyParser());


firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://nodejsdatabase-4762b.firebaseio.com'
});


let studentsNames = ['Vladimir', 'Valentina','Valerij'];


app.get('/', function(req, res) {

    fBConnection.getCustomers(firebase).once('value', function(snap) {
        let students = snap.val();

        res.render('home', {
            students: students,
            list: studentsNames
        })
    });
});

app.post('/', function(req, res) {
    studentsNames.push(req.body.user.name);
    res.redirect('/');
});



app.get('/info/:student', function(req, res) {
    res.render('student', {
        student: req.params.student.age
    })
});




app.listen(3000);
console.log('listening on port 3000');

