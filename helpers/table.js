const AsciiTable = require("ascii-table");
const { check } = require("./check");

const createTable = (variants) => {
   const rows = variants.map((move, index) => {
      let arr = [move];

      for (let i = 0; i < variants.length; i++) {
         const res = check(index, i, variants.length);
         if (res == -1) {
            arr.push("Win");
         } else if (res == 1) {
            arr.push("Lose");
         } else {
            arr.push("Draw");
         }
      }
      return arr;
   });

   const table = AsciiTable.factory({
      heading: ["v PC  \\ User >", ...variants],
      rows: rows,
   });
   return table;
};

module.exports = { createTable };
