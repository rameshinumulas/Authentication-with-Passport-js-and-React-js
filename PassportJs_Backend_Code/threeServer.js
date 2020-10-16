var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});
//Github statergy....
passport.use(new GitHubStrategy({
    clientID:"c315c169cc303593c4c7",
    clientSecret:"c1e7c3e8fca5863cc85cbca21100d023f8495b59",
    callbackURL: "http://localhost:5000/github/callback"
},
(accessToken, refreshToken, profile, done) => {
    user = { ...profile };
    done(null, profile);
}));

passport.use(new LinkedInStrategy({
    clientID:"78tfrm95l23ejm",
    clientSecret:"2eALOMPKWeNSAmqo",
    callbackURL: "http://localhost:5000/linkdin/callback"
},
(accessToken, refreshToken, profile, done) => {
    user = { ...profile };
    done(null, profile);
}));
