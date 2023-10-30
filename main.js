// How to start running the code: start server (open in powershell in programming folder) ./ngrok http 8080 
const express = require('express');
const querystring = require('qs');
const app = express();
require("dotenv").config();

//generates random string needed for the app.get(/login, function(req,res){})
function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

var client_id = process.env.client_id;
var client_secret = process.env.client_secret;
var vercelUri ='https://amiri3x3.vercel.app/'// this will change each fresh ngrok
var redirect_uri =`${vercelUri}/callback`;

//my PC to spotify
app.get('/login', function(req,res){
    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email user-top-read';

    res.redirect('https://accounts.spotify.com/authorize?'+
        querystring.stringify({
            response_type: 'token',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

app.use(express.static('public'))
app.listen(process.env.PORT||3000)
module.exports=app
