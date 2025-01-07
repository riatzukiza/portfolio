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
  Game
 } = require("@shared/game.js"),
    { 
  Physics
 } = require("@shared/systems/physics/index.js"),
    { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  PlayerSprites
 } = require("@crash-landed/systems/sprites/player.js"),
    { 
  rendering
 } = require("@crash-landed/rendering.js"),
    { 
  Velocity
 } = require("@shared/systems/velocity.js"),
    { 
  Sight
 } = require("@crash-landed/systems/sight.js"),
    { 
  TileVisibility
 } = require("@crash-landed/systems/visibility.js"),
    config = require("@crash-landed/config.js");
var { 
  FloorSprites
 } = require("@crash-landed/systems/sprites/floor.js");
var activeGameSystems = [ Position, FloorSprites, PlayerSprites, Physics, Velocity, Sight, TileVisibility ];
var game = create(Game)(config, rendering, activeGameSystems, config.gameSpeed);
console.log({ 
  PlayerSprites,
  FloorSprites
 });
exports.game = game;
exports.activeGameSystems = activeGameSystems;