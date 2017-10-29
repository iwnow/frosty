import States from './states';
import { textures } from '../textures';
import { GameState, HeroSide } from './game-state';
import failHandler from './fail';
import playHandler from './play';
import playAltHandler from './play-alt';
import startHandler from './start';
import setupHandler from './setup';

export const getInitialState: () => GameState = () => ({
	state: States.setup,
	levelH: 0,
	prevState: null,
	heroState: {
		spriteLeft: new PIXI.Sprite(textures.hero01),
		spriteRight: new PIXI.Sprite(textures.hero01),
		spriteLeftDig: new PIXI.Sprite(textures.hero02),
		spriteRightDig: new PIXI.Sprite(textures.hero02),
		spriteLeftFail: new PIXI.Sprite(textures.hero03),
		spriteRightFail: new PIXI.Sprite(textures.hero03),
		onSide: HeroSide.leftSide,
		isDigging: false,
		startDigTime: -1
	},
	trackSprite: new PIXI.extras.TilingSprite(textures.track),
	packSprite: new PIXI.Sprite(textures.treasure),
	healthSprite: new PIXI.Sprite(textures.timebar)
});

const nextState = (currentState: GameState, app: PIXI.Application) => {
	switch (currentState.state) {
		case States.setup:
			setupHandler(currentState, app);
			break;
		case States.play:
			playHandler(currentState, app);
			break;
		case States.playAlt:
			playAltHandler(currentState, app);
			break;
		case States.start:
			startHandler(currentState, app);
			break;
		case States.fail:
			failHandler(currentState, app);
			break;
		default:
			break;
	}
	return currentState;
}

const initialState = getInitialState();
window['__state'] = initialState;
export const getState: (app: PIXI.Application) => GameState
	= ((state: GameState) =>
		(app: PIXI.Application) => nextState(state, app)
	)(initialState)