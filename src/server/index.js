const darknet = require('@moovel/yolo');
const io = require('socket.io')(8081);
const spawn = require('child_process').spawn;
const fs = require('fs');

// ffmpeg -f rawvideo -s 768x576 -pix_fmt bgr24 -i data.modified.raw data.png
const ffmpegPipe = (dimensions, filename) => {
	const ffmpeg = spawn(
		'ffmpeg',
		[
			'-loglevel',
			'warning',
			'-f',
			'rawvideo',
			'-pix_fmt',
			'rgb24', // or 'rgb24' if color channels are swapped
			'-s',
			`${dimensions.width}x${dimensions.height}`,
			'-y',
			'-i',
			'-',
			filename,
		],
		{
			stdio: ['pipe', process.stdout, process.stderr],
		}
	);
	return ffmpeg.stdin;
};
darknet.detect(
	{
		cfg: './cfg/yolo.cfg',
		weights: './yolo.weights',
		data: './cfg/coco.data',
	},
	(modified, original, detections, dimensions) => {
		ffmpegPipe(dimensions, 'detected.jpg').write(modified, () => {
			fs.readFile('detected.jpg', (err, buf) => {
				io.emit('data', buf.toString('base64'));
				console.log('sent');
			});
		});
	}
);
