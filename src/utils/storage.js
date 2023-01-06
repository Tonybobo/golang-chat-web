import Storage from '@google-cloud/storage';

const storage = new Storage({
	keyFileName: 'key.json'
});

const bucket = storage.bucket('go-chat');

export const getFile = (media) => {
	return media;
	// const fileName = media.split('https://storage.cloud.google.com/go-chat/')[1];
	// const file = bucket.file(fileName);
	// return file.get().then(function (data) {
	// 	console.log(data);
	// });
};
