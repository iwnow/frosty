import { NextStateHandler, HeroSide } from './game-state';
import { keyArrowLeft, keyArrowRight } from '../keyboard';

const playHandler: NextStateHandler = (state, app) => {
	const { trackSprite, heroState } = state,
		showDiggingTimeMs = 500;

	if (keyArrowLeft.key.isDown) {
		if (heroState.onSide === HeroSide.leftSide) {
			if (heroState.isDigging) {

			} else {

			}
		}
	}
}

export default playHandler;