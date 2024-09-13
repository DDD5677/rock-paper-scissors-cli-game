const readline = require("readline-sync");
const crypto = require("node:crypto");
const { check } = require("./helpers/check");
const { createTable } = require("./helpers/table");
const { log, chalk } = require("./helpers/log");

const variants = process.argv.slice(2);
if (!variants.length) {
   log("Please enter moves also. e.g. node main.js move1 move2 move3\n", "red");
   return;
}
if (!(variants.length % 2)) {
   log("Count of variants should be odd\n", "red");
   return;
}

let help = variants.reduce((a, move, index) => {
   a += `${index + 1} - ${move}\n`;
   return a;
}, `Available moves:\n`);
help = help + `0 - exit\n? - help\n`;

const salt = crypto.randomBytes(64).toString("hex").toUpperCase();
const random = Math.floor(Math.random() * variants.length);
const randomMove = variants[random];
const HMAC = crypto
   .createHash("SHA3-256")
   .update(salt + randomMove)
   .digest("hex")
   .toUpperCase();

const table = createTable(variants);

log(help, "magenta");
log(chalk("HMAC: ", "green") + HMAC);

let move = readline.question(chalk("Enter your move: ", "green"));

if (move == "?") {
   log(table.toString(), "magenta");
   move = readline.question(chalk("Enter your move: ", "green"));
}
if (move == 0) {
   return;
}

while (!variants[move - 1]) {
   log(help, "magenta");
   move = readline.question(chalk("Enter your move: ", "green"));
   if (move == "?") {
      log(table.toString(), "magenta");
      move = readline.question(chalk("Enter your move: ", "green"));
   }
   if (move == 0) {
      return;
   }
}
if (move == 0) {
   return;
}
log(chalk("Your move: ", "green") + variants[move - 1]);
const result = check(random, move - 1, variants.length);

log(chalk("PC move: ", "green") + randomMove);

if (result == -1) {
   log("You Win!", "green");
} else if (result == 1) {
   log("You Lose!", "red");
} else {
   log("Draw!", "yellow");
}

log(chalk("HMAC key:\n", "green") + salt);

log(
   "\nLink for checking result " +
      chalk("https://emn178.github.io/online-tools/sha3_256.html", "cyan") +
      " e.g. enter <HMAC key><PC move>"
);
