const colors = {
   green: "\x1b[32m",
   blue: "\x1b[34m",
   yellow: "\x1b[33m",
   red: "\x1b[31m",
   black: "\x1b[30m",
   magenta: "\x1b[35m",
   cyan: "\x1b[36m",
   white: "\x1b[37m",
   gray: "\x1b[90m",
};

const log = (text, color) => {
   let word = text;
   if (color) {
      word = colors[color] + text + `\x1b[0m`;
   }
   console.log(word);
};

const chalk = (text, color) => colors[color] + text + `\x1b[0m`;

module.exports = { log, chalk };
