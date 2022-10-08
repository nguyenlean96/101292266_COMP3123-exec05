const express = require('express');
const app = express();
var fs = require('fs');
const router = express.Router();

const html_header = require('./src/header');
const html_footer = require('./src/footer');
const html_alert = require('./src/alert');
const html_render = (title, content='') => {
    return html_header(title) + content + html_footer;
}

const user = JSON.parse(fs.readFileSync('./user.json', 'utf8'));

router.get('/', (req, res) => {
  res.send(html_render('Welcome to Wk5 Lab Exercise'));
});

/*
/ Create new html file name home.html 
/ add <h1> tag with message "Welcome to ExpressJs Tutorial"
/ Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile(__dirname + '/statics/home.html');
});

/*
/ Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  
  // res.send('This is profile router');
  
  res.send(html_render('Profile', html_alert('user.JSON', JSON.stringify(user))));
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  let username = req.query.username;
  let password = req.query.password;

  let status = false;
  let message = "";
  if (username == user.username && password == user.password) {
    status = true;
    message = "User Is valid";
  } else if (username != user.username) {    
    status = false;
    message = "User Name is invalid";
  } else if (password != user.password) {
    status = false;
    message = "Password is invalid";
  }

  res.send(html_render(`Logged in as ${username}`, html_alert('user.JSON', JSON.stringify({
    status: status,
    message: message
  }))));

  res.send();
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req,res) => {
  let username = req.query.username;
  res.send(html_render(`<b>${username} successfully logout.<b>`));
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));