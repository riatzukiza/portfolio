Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1123 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1185 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var { 
  turnWeight
 } = require("@crash-landed/world-gen/modules/roads/weights.js");
var { 
  TerrainModule
 } = require("@crash-landed/world-gen/terrain-module.js");
const northEastTurn=TerrainModule.create(turnWeight, "grass", "grass", "grass", "grass", "stone", "stone", "grass", "stone", "grass");
exports.northEastTurn = northEastTurn;
const northWestTurn=TerrainModule.create(turnWeight, "grass", "grass", "grass", "stone", "stone", "grass", "grass", "stone", "grass");
exports.northWestTurn = northWestTurn;
const southWestTurn=TerrainModule.create(turnWeight, "grass", "stone", "grass", "stone", "stone", "grass", "grass", "grass", "grass");
exports.southWestTurn = southWestTurn;
const southEastTurn=TerrainModule.create(turnWeight, "grass", "stone", "grass", "grass", "stone", "stone", "grass", "grass", "grass");
exports.southEastTurn = southEastTurn;