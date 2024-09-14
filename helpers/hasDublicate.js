const hasDublicate = (arr) => {
   const set = new Set(arr);
   return !(set.size == arr.length);
};

module.exports = { hasDublicate };
