import { textures } from '../textures';
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
	endDigTime?: number;
}

export interface GameState {
	getInitial: () => GameState,
	state: States;
	prevState: States | null;

	//высота над уровнем 0 default = 0
	levelH: number;
	//координата пола
	bottomY: number;
	//координата потолка
	topY?: number;
	//высота шага (длина сдвига / высота ячейки в которую помещается препятствие / половина высоты героя)
	stepH: number;
	leftCenterX: number;
	rightCenterX: number;

	//уровни
	viewTrackLevels: {
		min: number,
		max: number
	};
	//препятствия
	obstacles: {
		level: number;
		side: HeroSide;
		sprite: PIXI.Sprite;
		removed: boolean;
	}[];
	//текстуры препятствий
	texturesObstacles: {
		normal: PIXI.Texture[],
		alternative: PIXI.Texture[]
	};

	textureHole: PIXI.Texture;
	holes: {
		level: number;
		sprite: PIXI.Sprite;
	}[];

	heroState: HeroState;
	trackSprite: PIXI.extras.TilingSprite;
	packSprite: PIXI.Sprite;
	healthSprite: PIXI.Sprite;
}

export type NextStateHandler = (state: GameState, app: PIXI.Application) => void;