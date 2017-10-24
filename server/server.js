var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.listen(3000, () => {
	console.log(`Server running on port ${port}`);
});

module.exports = {app};
// var newTodo = new Todo({
// 	text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
// 	console.log('Saved todo', doc);

// }, (e) => {
// 	console.log('Unable to save todo');
// });

// var newTodo = new Todo({
// 	text: '  hey  '
// });

// newTodo.save().then((doc) => {
// 	console.log('Saved todo', doc);

// }, (e) => {
// 	console.log('Unable to save todo');
// 	console.log(e);
// });

// var newUser = new User({
// 	email: '  1 '
// });

// newUser.save().then((doc) => {
// 	console.log('Saved todo');
// 	console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
// 	console.log('Unable to save todo');
// 	console.log(e);
// });