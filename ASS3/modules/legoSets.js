const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function Initialize() {
    setData.forEach((setDataItem) => {
        const themeMatch = themeData.find((theme) => theme.id === setDataItem.theme_id);
        if (themeMatch) {
            // Create a copy of the "setData" object and add the "theme" property.
            const setWithTheme = { ...setDataItem, theme: themeMatch.name };
      
            // Add the updated object to the "sets" array.
            sets.push(setWithTheme);
          }
        });
      }
      
      function getAllSets() {
        return sets;
      }
      
      function getSetByNum(setNum) {
        return sets.find((set) => set.set_num === setNum);
      }
      
      function getSetsByTheme(theme) {
        const themeFilter = theme.toLowerCase();
        return sets.filter((set) => set.theme.toLowerCase().includes(themeFilter));
      }
      
      // Initialize the "sets" array when this module is first imported.
      Initialize();
      
      module.exports = {
        getAllSets,
        getSetByNum,
        getSetsByTheme,
      };

      console.log("All Sets:");
console.log(getAllSets());

console.log("\nSet by Set Number (001-1):");
console.log(getSetByNum("001-1"));

console.log("\nSets by Theme (Tech):");
console.log(getSetsByTheme("Tech"));