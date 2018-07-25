const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;
//maily used for configuration purpases
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
//setting up middlewware
app.use(express.static(__dirname + "/public")); //express.static is used to serve static files. //_dirname stores the path to project directory
//making own middleware
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + "\n", (err)=>{
        if(err)
            console.log(err);
    });
    next();
});
// app.use((req, res, next)=>{
//    res.render('maintainance.hbs');
// });
// this method allows us to handle http get request.
app.get('/', (req, res)=>{
    res.render('home.hbs',{
        "pageTitle" : "Home",
        "welcomeText" : "Welcome to my website"
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        "pageTitle" : "About",
    });
});
app.get('/bad', (req, res)=>{
    res.send({
        "errorMessage"  : "404 Not found"
    });
});
//this function is used to bind a port on our machine to our app.
app.listen(port, ()=>{
    console.log(`server is up at port ${port}`);
});