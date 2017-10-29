import States from './states';

export enum HeroSide {
	leftSide = 'leftSide',
	rightSide = 'rightSide',
}

export interface HeroState {
	onSide: HeroSide;
	spriteLeft: PIXI.Sprite;
	spriteRight: PIXI.Sprite;
	spriteLeftDig: PIXI.Sprite;
	spriteRightDig: PIXI.Sprite;
	spriteLeftFail: PIXI.Sprite;
	spriteRightFail: PIXI.Sprite;
	isDigging: boolean;
	startDigTime?: number;
}

export interface GameState {
	state: States;
	levelH: number;
	prevState: States | null;
	heroState: HeroState;
	trackSprite: PIXI.Sprite;
	packSprite: PIXI.Sprite;
	healthSprite: PIXI.Sprite;
}

export type NextStateHandler = (state: GameState, app: PIXI.Application) => void;