var { 
  Dot
 } = require("@shared/systems/rendering/dot.js"),
    { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  Velocity
 } = require("@shared/systems/velocity.js"),
    { 
  Physics
 } = require("@shared/systems/physics/index.js"),
    { 
  Component,
  System,
  EntityGroup
 } = require("@shared/ecs.js"),
    { 
  rgba
 } = require("@obstacles/colors.js"),
    { 
  Collision,
  placeEntity
 } = require("@shared/systems/collision.js"),
    { 
  game,
  activeGameSystems
 } = require("@obstacles/game.js"),
    config = require("@obstacles/config.js");
const plants=create(EntityGroup)("Plants", [ Dot, Position, Physics, Collision, Velocity ], game.ent);
var spawnPlant = (function spawnPlant$(x_y$18, mass) {
  /* spawn-plant eval.sibilant:21:0 */

  var x = x_y$18[0],
      y = x_y$18[1];

  var plant = plants.spawn([ Dot, Position, Physics, Collision, Velocity ]);
  game.systems.get(Dot, plant).color = rgba(0, 255, 0, 255);
  game.systems.get(Physics, plant).mass = mass;
  game.systems.get(Physics, plant).scale = mass;
  game.systems.get(Physics, plant).forces = [ Friction ];
  game.systems.get(Position, plant).x = x;
  game.systems.get(Position, plant).y = y;
  game.systems.get(Position, plant).z = 0;
  return placeEntity(plant, game, config);
});
exports.plants = plants;
exports.spawnPlant = spawnPlant;
var { 
  Friction,
  SignalField
 } = require("@obstacles/forces.js");