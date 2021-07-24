import audioGO from "../music/gameOver.mp3";
import audioGW from "../music/gameWin.mp3";
import audioRD from "../music/revealed.mp3";

const audioRevealed = () => {
  new Audio(audioRD).play();
};

const audioGameOver = () => {
  new Audio(audioGO).play();
};

const audioGameWin = () => {
  new Audio(audioGW).play();
};

export { audioRevealed, audioGameOver, audioGameWin };
