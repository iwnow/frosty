
const gameDiv = document.getElementById('game') as HTMLDivElement;

const height = gameDiv.clientHeight,
	width = gameDiv.clientWidth;

const renderer = PIXI.autoDetectRenderer(width, height);

gameDiv.appendChild(renderer.view);

const stage = new PIXI.Container();

renderer.render(stage);