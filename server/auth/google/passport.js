var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function (User, config) {
  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile)
      User.findOne({
        'google.id': profile.id
      }, function(err, user) {
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.username,
            // TODO: jmunsch 
            // profileInfo: {profilePicUrl: profile.photos[0].value}
            // photos: [ { value: 'https://lh4.googleusercontent.com/-HSoA0PZpnMU/AAAAAAAAAAI/AAAAAAAAAOk/XRA0g20bT0A/photo.jpg?sz=50' } ],
            provider: 'google',
            google: profile._json
          });
          user.save(function(err) {
            if (err) done(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));
};
