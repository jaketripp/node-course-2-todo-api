const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '59efa9450043d918270cf48d11';
var id = '59e23040bb4cb6a0187e6966';

// if (!ObjectID.isValid(id)){
// 	console.log('ID not valid');
// }

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
	// todo not found
// 	if (!todo) {
// 		return console.log('ID not found');
// 	}
// 	console.log('Todo By ID', todo);
// }).catch((e) => {
// 	console.log(e);
// });

// query works but no user
// print user to screen
// error

// he used a second arg in the then, i'm using a catch
// i think i like catch syntax better
User.findById(id).then((user) => {
	if (!user) {
		return console.log('User not found');
	}
	console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));

// if statement inside if no error is thrown but no todo is found
// catch statement for errors thrown