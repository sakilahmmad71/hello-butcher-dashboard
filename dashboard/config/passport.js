const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('Users');
const Admin = mongoose.model('Admin');
const config = require('./config');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecret;

module.exports = (passport) => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			if (jwt_payload.role === 'admin') {
				Admin.findById(jwt_payload.id)
					.then((user) => {
						if (user) {
							return done(null, user);
						}
						return done(null, false);
					})
					.catch((err) => console.log(err));
			}

			if (jwt_payload.role === 'user') {
				User.findById(jwt_payload.id)
					.then((user) => {
						if (user) {
							return done(null, user);
						}
						return done(null, false);
					})
					.catch((err) => console.log(err));
			}
		})
	);
};
