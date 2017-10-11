import io from 'socket.io-client';
import jpeg from 'jpeg-js';
import './main.css';

const socket = io('http://localhost:8081');
const image = document.querySelector('#stream');
const width = 640;
const height = 480;

socket.on('connect', () => {
	console.log('Connected');
});

socket.on('data', data => {
	console.log(data);
	const rawImageData = {
		data,
		width,
		height,
	};
	const jpegImageData = jpeg.encode(rawImageData, 75);
	const blob = new Blob([new Uint8Array(jpegImageData.data)]);
	const reader = new FileReader();
	reader.onload = e => (image.src = e.target.result);
	reader.readAsDataURL(blob);
});
