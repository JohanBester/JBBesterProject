
// Generate a random number
export default function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};