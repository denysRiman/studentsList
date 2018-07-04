const app = require('express')();
const fBConnection = require('./firebaseConnection');
const firebase = require('firebase-admin');

const serviceAccount = require('./firebaseKey.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://nodejsdatabase-4762b.firebaseio.com'
});


app.set('view engine', 'ejs');

student = ['Vladimir', 'Valentina','Valerij'];


app.get('/', function(req, res) {

    fBConnection.getCustomers(firebase).once('value', function(snap) {
        let students = snap.val();

        res.render('home', {
            students: students
        })
    });
});


app.get('/info/:student', function(req, res) {

    res.render('student', {
        student: req.params.student.age
    })
});


app.listen(3000);
console.log('listening on port 3000');

