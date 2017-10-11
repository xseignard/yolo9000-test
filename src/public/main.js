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
	image.src = `data:image/jpeg;base64,${data}`;
});
