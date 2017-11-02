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

//extends
app.stage['updateLayersOrder'] = () => {
	app.stage.children.sort((a: any, b: any) => {
		a.zIndex = a.zIndex || 0;
		b.zIndex = b.zIndex || 0;
		return a.zIndex - b.zIndex
	});
};

app.stage = new PIXI.display.Stage();
app.stage['group'].enableSort = true;

app.ticker.add(() => {
	getState(app);
	//app.stage['updateLayersOrder']();
});


//test
window['__app'] = app;

