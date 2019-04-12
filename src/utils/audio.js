const au_play = new Audio('/audio/drop.mp3');
const au_result = new Audio('/audio/shuffle.mp3');

function result(sound) {
  let url = `${window.location.href}audio/${sound}.mp3`;
  if (url !== au_result.src) {
    au_result.src = url;
  }
  au_result.currentTime = 0;
  au_result.play();
}

function play(sound) {
  let url = `${window.location.href}audio/${sound}.mp3`;
  if (url !== au_play.src) {
    au_play.src = url;
  }
  au_play.currentTime = 0;
  au_play.play();
}

const audio = {
  play,
  result,
}

export default audio;