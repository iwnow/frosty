import svgs from './svg';

export default () => Object.keys(svgs).map(key => {
	const img = new Image();
	img.src = 'data:image/svg+xml,' + svgs[key];
	return img;
})