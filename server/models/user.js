const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		// can't have 2 of the same email in the database
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: `{VALUE} is not a valid email`
		}

	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]

});

UserSchema.methods.toJSON = function() {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

// instance method
// i.e a user
UserSchema.methods.generateAuthToken = function(){
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	user.tokens.push({access, token});

	return user.save().then(() => {
		return token;
	});
};

// model method
// i.e. User model
UserSchema.statics.findByToken = function(token){
	var User = this;
	var decoded;

	try {
		decoded = jwt.verify(token, 'abc123');
	} catch (e) {
		return Promise.reject();
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

UserSchema.statics.findByCredentials = function(email, textPassword){
	var User = this;

	return User.findOne({email}).then((user) => {

		if (!user) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(textPassword, user.password, (err, passwordsMatch) => {
				if (passwordsMatch) {
					resolve(user);
				} else {
					reject();
				}
			});
		});

	}).catch((e) => {
		res.status(400).send(e);
	});
};

UserSchema.pre('save', function (next) {
	var user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}

});

var User = mongoose.model('User', UserSchema);

module.exports = {User};
