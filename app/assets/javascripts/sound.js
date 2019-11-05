let soundID = document.getElementById("player");
let playlist = [
  'Disco Fries feat. Raquel Castro - You Make Me (Diviners Remix).ts',
  'Gareth Emery & Alastor ft. London Thor - Hands (Diviners Remix).ts',
  'James Carter - Give Me Your Love (Diviners Remix).ts',
  'Thousand Years (ft. Patrick Baker).ts',
  'Insomnia - Ashley Tisdale.mp3'
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function playmusic() {
  soundID.src = "/assets/" + playlist[getRandomInt(playlist.length)]
  setTimeout(() => soundID.play(), 1000);
  soundID.loop = true;
}

playmusic();