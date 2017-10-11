const darknet = require('@moovel/yolo');
const io = require('socket.io')(8081);
const path = require('path');

console.log(path.join(__dirname, 'cfg/yolo.cfg'));

darknet.detect(
	{
		cfg: './cfg/yolo.cfg',
		weights: './yolo.weights',
		data: './cfg/coco.data',
	},
	(modified, original, detections, dimensions) => {
		io.emit('data', modified);
	}
);
