import textures from './textures';

textures.images().forEach(i => document.body.appendChild(i));

// const gameDiv = document.getElementById('game') as HTMLDivElement;

// const height = gameDiv.clientHeight,
// 	width = gameDiv.clientWidth;

// const renderer = PIXI.autoDetectRenderer(width, height);

// gameDiv.appendChild(renderer.view);

// const stage = new PIXI.Container();

// renderer.render(stage);

