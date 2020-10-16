const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport")
require("./server");
require('./threeServer');
app.use(cors());
app.use(passport.initialize());


passport.serializeUser((user, done) =>{
    done(null, user)
});

app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));
app.get("/google/callback",
    passport.authenticate("google"),
        (req, res) => {
            console.log(res, "yes res");
            // res.send("this is home page!");
            // res.redirect("/landingpage");
            res.redirect('http://localhost:3000/landingpage');
        });


app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
        // res.send("this is home page!");
        // res.redirect("/landingpage");
        res.redirect('http://localhost:3000/landingpage');

    });


app.get("/auth/github", passport.authenticate("github",{ scope: [ 'user:email' ] }));
app.get("/github/callback",
    passport.authenticate("github", { failureRedirect: '/' }),
    (req, res) => {
        // res.send("this is home page!");
        // res.redirect("/landingpage");
        res.redirect('http://localhost:3000/landingpage');

    });
    app.get("/auth/linkdin", passport.authenticate("linkedin"));
    app.get("/linkdin/callback",
        passport.authenticate("linkedin", { failureRedirect: '/' }),
        (req, res) => {
            // res.send("this is home page!");
            // res.redirect("/landingpage");
            res.redirect('http://localhost:3000/landingpage');
    
        });


app.listen((5000),(req,res)=>{
    console.log("working proparly....");
})