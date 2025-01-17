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
global.mixin = mixin;
global.create = create;
var { 
  game,
  activeGameSystems
 } = require("@crash-landed/game.js");
var { 
  startInterface
 } = require("@crash-landed/dom.js"),
    { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  Sight
 } = require("@crash-landed/systems/sight.js"),
    { 
  player
 } = require("@crash-landed/units.js"),
    { 
  getCardinalDirectionName
 } = require("@crash-landed/directions.js"),
    { 
  generateMainRoad
 } = require("@crash-landed/world-gen.js"),
    { 
  tiles
 } = require("@crash-landed/tiles.js"),
    { 
  PathFinding
 } = require("@crash-landed/systems/path-finding.js"),
    { 
  Velocity
 } = require("@shared/systems/velocity.js"),
    { 
  getTileNoise
 } = require("@crash-landed/noise.js"),
    { 
  ItemGroup
 } = require("@crash-landed/units.js"),
    noise = require("@shared/noise.js"),
    config = require("@crash-landed/config.js");
const p=player;
const v=p.velocity.vector;
const gameScale=config.gameScale;
p.physics.scale = config.gameScale;
p.physics.forces = [];
game.tiles = tiles;
PathFinding.tiles = tiles;
Velocity.realTime__QUERY = false;
Position.wraps__QUERY = false;
Sight.registerTileGraph(tiles);
p.sprite.selectSequence("east");
var { 
  TileGenerator
 } = require("@crash-landed/world-gen/worker.js");
const generator=TileGenerator.spawn();
var setupTile = (function setupTile$(tileData) {
  /* setup-tile eval.sibilant:71:0 */

  const tile=tiles.get(tileData.x, tileData.y);
  tile.entity.ground.type = tileData.type;
  const v=getTileNoise(tile.x, tile.y);
  (function() {
    if (((v.x + v.y) > 16 && tile.entity.ground.type === "floweryGrass")) {
      const item=ItemGroup.spawn();
      item.physics.scale = config.gameScale;
      const tileContainer=tile.entity.container;
      item.pos.x = tile.worldPos.x;
      item.pos.y = tile.worldPos.y;
      return tileContainer.add(item.entity);
    }
  }).call(this);
  const groundStats=tile.entity.ground.stats;
  const x_=(Math.abs(Math.round((tile.x * v.x))) % (groundStats.spriteCoordMaxX - groundStats.spriteCoordMinX));
  const y_=(Math.abs(Math.round((tile.y * v.y))) % (groundStats.spriteCoordMaxY - groundStats.spriteCoordMinY));
  const coords=[ (x_ + tile.entity.ground.stats.spriteCoordMinX), (y_ + tile.entity.ground.stats.spriteCoordMinY) ];
  return tile.entity.floorSprite.selectTile(...coords);
});
generator.start();
generator.load().then(((nil) => {
	
  const initialTiles=[];
  tiles.get(0, 0).traverseArea(((tile) => {
  	
    return initialTiles.push({ 
      x:tile.x,
      y:tile.y
     });
  
  }), 64);
  return generator.getTiles(initialTiles);

})).then(((initialTiles) => {
	
  initialTiles.tiles.each(((data) => {
  	
    return setupTile(data);
  
  }));
  game.start();
  return game.events.on("tick", ((t) => {
  	
    (function() {
      if ((t % 10) === 0) {
        return p.sprite.step();
      }
    }).call(this);
    const directionName=getCardinalDirectionName(v);
    (function() {
      if (p.los) {
        const safeTiles=[];
        p.los.unloadedTiles.each(((tile) => {
        	
          return (function() {
            if (!(tile.sent__QUERY)) {
              safeTiles.push({ 
                x:tile.x,
                y:tile.y
               });
              return tile.sent__QUERY = true;
            }
          }).call(this);
        
        }));
        return (function() {
          if (safeTiles.length) {
            return generator.getTiles(safeTiles).then(((data) => {
            	
              return data.tiles.each(((tileData) => {
              	
                p.los.loadingTiles.delete(tiles.get(tileData.x, tileData.y));
                return setupTile(tileData);
              
              }));
            
            }));
          }
        }).call(this);
      }
    }).call(this);
    return p.sprite.selectSequence(directionName);
  
  })).once("error", ((err) => {
  	
    console.log("error on", "tick", "of", "game.events", "given", "t()");
    return console.log(err);
  
  }));

}));
startInterface();