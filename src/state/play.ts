import { NextStateHandler, HeroSide } from './game-state';
import { keyArrowLeft, keyArrowRight } from '../keyboard';

const playHandler: NextStateHandler = (state, app) => {
	const { trackSprite, heroState } = state,
		heroSprite = heroState.spriteLeft,
		positionHeroXOnLeft = trackSprite.x - (trackSprite.width / 2) - heroSprite.width / 2 - 10,
		positionHeroXOnRight = trackSprite.x + (trackSprite.width / 2) + heroSprite.width / 2 + 10,
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