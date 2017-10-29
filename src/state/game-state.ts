import States from './states';

export interface GameState {
	state: States;
	prevState: States | null;
	sprites: Map<string, PIXI.Sprite>;
}

export type NextStateHandler = (state: GameState, stage: PIXI.Container) => void;