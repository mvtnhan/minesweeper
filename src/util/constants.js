const BOARD_GAME = {
  Easy: {
    numRow: 8,
    numColumn: 10,
    numBomb: 10,
  },

  Medium: {
    numRow: 12,
    numColumn: 14,
    numBomb: 35,
  },

  Hard: {
    numRow: 14,
    numColumn: 18,
    numBomb: 60,
  },
};

const MINE_COLOR = () => {
  let colors = ["orange", "darkgreen", "cyan", "violet", "yellow"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export { BOARD_GAME, MINE_COLOR };
