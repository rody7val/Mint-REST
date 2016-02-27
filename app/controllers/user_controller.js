var User = require('../models/user');
var email = require('../util/email');
var config = require('../../config');
var jsonwebtoken = require('jsonwebtoken');
var secretKey = config.secretKey;

/**
 * Create new user token for verification.
 * @param user
 * @returns {number}
 */
function createToken(user) {
	var token = jsonwebtoken.sign({
		_id: user._id,
		name: user.name,
		username: user.username,
		email: user.email
	}, secretKey, {
		expiresInMinutes: 1440
	});
	return token;
}
/**
 * Create new user and save in database.
 */
exports.signup = function(req, res) {
	var user = new User({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});
	var toekn = createToken(user);
	user.save(function (err) {
		if (err) {
				res.send(err);
				return;
		}
		res.json({
			success: true,
			message: "User has been created",
			token: toekn
		});
	});
	/**
	 * Sending email to registered user.
	 */
	email.sendMail(req.body.email);
}
/**
 * Get all users from the database.
 */
exports.getAll = function (req, res) {
	User.find({}, function (err, users) {
		if (err) {
			res.send(err);
			return;
		}
		res.json(users);
	});
}
/**
 * Taking username and password.
 * Creating a new login.
 */
exports.login = function (req, res) {
	User.findOne({
	    username: req.body.username
	}).select('name username password').exec(function (err, user) {
		if (err) throw err;
		if (!user) {
			res.send({message: "User doenst exist"});
		} else if (user) {
			var validPassword = user.comparePassword(req.body.password);
			if (!validPassword) {
				res.send({message: "Invalid Password"});
			} else {
				var token = createToken(user);
				res.json({
					success: true,
					message: "Successfuly login!",
					token: token
				});
			}
		}
	});
}
/**
 * Search with the username and check if there is a user available or not.
 **/
exports.searchUserWithEmail = function (req, res) {
	User.findOne({email: req.param('email')}, function (err, user) {
		if (err) {
			res.send(err);
			return
		}
		res.json(user);
	});
}
/**
 * Getting about logged user.
 */
exports.me = function (req, res) {
	res.json(req.decoded);
	console.log(req.decoded);
}