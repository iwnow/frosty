import SvgObj from './svg-obj';
import svgs from './svg';

export default () => {
	let images = {};

	Object.keys(svgs).forEach(key => {
		const img = new Image();
		img.src = 'data:image/svg+xml,' + svgs[key];
		images[key] = img;
	})
	return <SvgObj<HTMLImageElement>>images;
}