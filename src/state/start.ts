import States from './states';
import { NextStateHandler } from './game-state';


const startHandler: NextStateHandler = (state) => {
	state.state = States.play;
}

export default startHandler;