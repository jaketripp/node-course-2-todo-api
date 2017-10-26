const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

Todo.findOneAndRemove({_id: '59f1490e99f5522285c25771'}).then((todo) => {
	console.log(todo);
});

// syntactic sugar since you'll often find by id and remove
Todo.findByIdAndRemove('59f1490e99f5522285c25771').then((todo) => {
	console.log(todo);
});