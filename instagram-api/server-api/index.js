// To make https calls
let request = require('request');

const data  = {
	token: '<YOUR_TOKEN>',
	userid: '<YOUR_USERID>'
};

let url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token='+data.token+'&&count=';

// num_photos: how much photos do you want to get, default: 10
exports.getRecentMedia = (num_photos=10, cb) => {
	request({
		url: url + num_photos,
		json: true
	}, function (error, response, body) {
		// console.log(response);
		if (!error && response.statusCode === 200) {
		    cb(body);
		} else {
			cb(null);
		}
	});
};