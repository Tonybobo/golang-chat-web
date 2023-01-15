import axios from 'axios';
import { SIGNED_URL } from './Constant';
import { v4 as uuidv4 } from 'uuid';

export async function getSignedUrl(file) {
	const media = file.type.split('/')[0];

	const fileName = `${media}/${file.name}-${uuidv4()}`;

	const response = await axios.post(SIGNED_URL, {
		method: 'PUT',
		fileName: fileName,
		contentType: file.type
	});

	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('PUT', response.data.url, true);
		xhr.onload = () => {
			const status = xhr.status;
			if (status === 200) resolve(fileName);
			else reject(status);
		};

		xhr.onerror = () => alert('Something Went Wrong. Please Try Again Later');

		xhr.setRequestHeader('Content-Type', file.type);
		xhr.send(file);
	});
}
