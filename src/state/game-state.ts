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
		//текущий уровень
		level: number;
		//сторона
		side: HeroSide;
		//спрайт
		sprite: PIXI.Sprite;
	}[];
	//текстуры препятствий
	texturesObstacles: {
		normal: PIXI.Texture[],
		alternative: PIXI.Texture[]
	};

	heroState: HeroState;
	trackSprite: PIXI.Sprite;
	packSprite: PIXI.Sprite;
	healthSprite: PIXI.Sprite;
}

export type NextStateHandler = (state: GameState, app: PIXI.Application) => void;