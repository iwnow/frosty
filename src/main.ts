import './assets/css/main.css';
import { getState } from './state';
import 'pixi-layers';

const gameDiv = document.getElementById('canvas_wrap') as HTMLDivElement,
	height = gameDiv.clientHeight,
	width = gameDiv.clientWidth,
	app = new PIXI.Application(width, height, {
		transparent: true
	});


gameDiv.appendChild(app.view);

app.ticker.add(() => {
	getState(app);
});


//test
window['__app'] = app;

