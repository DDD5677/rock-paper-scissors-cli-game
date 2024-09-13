const check = (compMove, userMove, allMoves) => {
   const p = Math.floor(allMoves / 2);
   return Math.sign(((compMove - userMove + p + allMoves) % allMoves) - p);
};

module.exports = { check };
