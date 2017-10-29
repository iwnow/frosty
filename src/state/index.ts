import States from './states';
import { textures } from '../textures';
import { GameState } from './game-state';
import failHandler from './fail';
import playHandler from './play';
import playAltHandler from './play-alt';
import startHandler from './start';
import setupHandler from './setup';

export const getInitialState: () => GameState = () => ({
	state: States.setup,
	prevState: null,
	sprites: new Map()
});

const nextState = (currentState: GameState, stage: PIXI.Container) => {
	switch (currentState.state) {
		case States.setup:
			setupHandler(currentState, stage);
			break;
		case States.play:
			playHandler(currentState, stage);
			break;
		case States.playAlt:
			playAltHandler(currentState, stage);
			break;
		case States.start:
			startHandler(currentState, stage);
			break;
		case States.fail:
			failHandler(currentState, stage);
			break;
		default:
			break;
	}
	return currentState;
}

export const getState: (stage: PIXI.Container) => GameState
	= ((state: GameState) =>
		(stage: PIXI.Container) => nextState(state, stage)
	)(getInitialState())