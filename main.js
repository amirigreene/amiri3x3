// How to start running the code: start server (open in powershell in programming folder) ./ngrok http 8080 
const querystring = require('qs');
require("dotenv").config();

var client_id = process.env.client_id;
var vercelUri ='https://amiri3x3.pages.dev';// this will change each fresh ngrok
var redirect_uri =`${vercelUri}/callback`;

//my PC to spotify
    var scope = 'user-read-private user-read-email user-top-read';

    console.log(('https://accounts.spotify.com/authorize?'+
        querystring.stringify({
            response_type: 'token',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
        })));


//Url string: https://accounts.spotify.com/authorize?response_type=token&client_id=7f0a4bec4636426cbd40e79793cd5150&scope=user-read-private%20user-read-email%20user-top-read&redirect_uri=https%3A%2F%2Fq1x2j85j-8080.use.devtunnels.ms%2F%2Fcallback