// var soundID = "bgm";

// function loadSound() {
// 	createjs.Sound.registerSound("assets/bgm.sound", soundID);
// }

// function playSound() {
// 	createjs.Sound.play(soundID);
// }

let soundID = document.getElementById("player");
let playlist = ['Go Shina.ts']

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function playmusic() {
	soundID.src = "/assets/" + playlist[getRandomInt(playlist.length)]
	setTimeout(() => soundID.play(), 1000);
	soundID.loop = true;
}

playmusic();