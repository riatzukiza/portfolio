Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1121 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1183 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
var { 
  Interface
 } = require("@kit-js/interface");
global.mixin = mixin;
global.create = create;
var { 
  rocks,
  spawnRock,
  rockGenStep
 } = require("@obstacles/entities/rocks.js"),
    { 
  ants,
  spawnAnt,
  clearAnts
 } = require("@obstacles/entities/ants.js"),
    { 
  plants,
  spawnPlant
 } = require("@obstacles/entities/plants.js"),
    { 
  trailSegments,
  spawnAntTrailSegment
 } = require("@obstacles/entities/trail-segments.js"),
    { 
  home,
  homePos
 } = require("@obstacles/entities/home.js"),
    config = require("@obstacles/config.js");
var clear = (function() {
  /* eval.sibilant:19:11 */

  return arguments[0].clear();
});
var nextSpawnTime = 0;
var nextSpawn = ((game) => {
	
  nextSpawnTime += game.ticker.elapsed;
  return (function() {
    if ((nextSpawnTime > (1000 / config.spawnRate) && ants.group.size <= config.antLimit)) {
      spawnAnt([ homePos.x, homePos.y ], home);
      return nextSpawnTime = 0;
    }
  }).call(this);

});
exports.nextSpawn = nextSpawn;
exports.rockGenStep = rockGenStep;
exports.spawnRock = spawnRock;
exports.spawnPlant = spawnPlant;
exports.spawnAnt = spawnAnt;
exports.ants = ants;
exports.plants = plants;
exports.rocks = rocks;
exports.home = home;
exports.homePos = homePos;
exports.clearAnts = clearAnts;
exports.trailSegments = trailSegments;
exports.spawnAntTrailSegment = spawnAntTrailSegment;