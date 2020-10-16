var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

let user ={}

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

// Facebook Strategy
passport.use(new FacebookStrategy({
        clientID: '672212493465791',
        clientSecret:'f7f6ac497cd5c237607b4df941164105',
        callbackURL: "http://localhost:5000/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        user = { ...profile };
        done(null, profile);
    }));

//Google Startegy...
passport.use(new GoogleStrategy({
    clientID:"549256600944-upsevvhrk743fhf27mpfknfdemrodu21.apps.googleusercontent.com",
    clientSecret:"-WCrT97qog6jRCqtCIP3iRfG",
    callbackURL: "http://localhost:5000/google/callback"
},
(accessToken, refreshToken, profile, done) => {
    user = { ...profile };
    done(null, profile);
}));






