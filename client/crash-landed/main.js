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
  Physics
 } = require("@shared/systems/physics/index.js"),
    { 
  Friction
 } = require("@crash-landed/forces.js"),
    { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  Velocity
 } = require("@shared/systems/velocity.js"),
    { 
  PlayerSprites
 } = require("@crash-landed/systems/sprites/player.js"),
    { 
  FloorSprites
 } = require("@crash-landed/systems/sprites/floor.js"),
    { 
  PropsSprites
 } = require("@crash-landed/systems/sprites/basic-props.js"),
    { 
  Sight
 } = require("@crash-landed/systems/sight.js"),
    { 
  TileVisibility
 } = require("@crash-landed/systems/visibility.js"),
    { 
  PathFinding
 } = require("@crash-landed/systems/path-finding.js"),
    { 
  GroundTypes
 } = require("@crash-landed/systems/floor-type.js"),
    { 
  Metabolisim
 } = require("@crash-landed/systems/metabolisim.js"),
    { 
  Containers
 } = require("@crash-landed/systems/containers.js"),
    { 
  MentalState
 } = require("@crash-landed/systems/mental-state.js"),
    { 
  Item
 } = require("@crash-landed/systems/item.js"),
    { 
  EntityGroup
 } = require("@shared/ecs/entity-group.js"),
    { 
  UnitGroup,
  UnitInstance
 } = require("@shared/units.js"),
    { 
  Vector
 } = require("@shared/vectors.js"),
    { 
  Trie
 } = require("@shared/data-structures/trees/trie.js"),
    noise = require("@shared/noise.js"),
    config = require("@crash-landed/config.js");
console.log(config.dimensions);
var { 
  TileGraph,
  TileNode
 } = require("@shared/tiles.js");
Velocity.realTime__QUERY = false;
game.start();
const gameScale=config.gameScale;
const tiles=TileGraph.spawn(gameScale, [ FloorSprites, TileVisibility, GroundTypes, Containers ], game);
UnitGroup.game = game;
var ItemUnit = UnitInstance.define("ItemUnit", { 
  get data(  ){ 
    
      return this.entity.itemInterface;
    
   },
  get container(  ){ 
    
      return this.data.container;
    
   },
  consume( entity ){ 
    
      return this.data.consume(entity);
    
   }
 });
var ItemGroup = UnitGroup.define("ItemGroup", { 
  interface:ItemUnit,
  template:false,
  groupName:"item",
  types:[ PropsSprites, Item ]
 });
var PlayerUnit = UnitInstance.define("PlayerUnit", { 
  get sprite(  ){ 
    
      return this.entity.playerSprite;
    
   },
  get pathing(  ){ 
    
      return this.entityCurrentPath;
    
   },
  get mindState(  ){ 
    
      return this.entity.mindState;
    
   },
  get needs(  ){ 
    
      return this.entity.needs;
    
   },
  get los(  ){ 
    
      return this.entity.lineOfSight;
    
   },
  get velocity(  ){ 
    
      return this.entity.velocityInterface;
    
   },
  eat( item ){ 
    
      return this.needs.eat(item);
    
   }
 });
var Player = UnitGroup.define("Player", { 
  template:false,
  interface:PlayerUnit,
  groupName:"player",
  types:[ PlayerSprites, Velocity, Sight, PathFinding, Metabolisim, MentalState ]
 });
const p=Player.spawn();
p.pos.x = 0;
p.pos.y = 0;
const v=p.velocity.vector;
p.physics.scale = gameScale;
p.sprite.selectSequence("east");
const eigthTurn=((Math.PI * 2) / 8);
const east=0;
const southEast=eigthTurn;
const south=(eigthTurn * 2);
const southWest=(eigthTurn * 3);
const west=(eigthTurn * 4);
const northWest=(eigthTurn * 5);
const north=(eigthTurn * 6);
const northEast=(eigthTurn * 7);
Position.wraps__QUERY = false;
console.log(v.getAngle());
const directions=[ east, southEast, south, southWest, west, northWest, north, northEast ];
const directionNames=[ "east", "southEast", "south", "southWest", "west", "northWest", "north", "northEast" ];
var getCardinalDirection = (function getCardinalDirection$(vector) {
  /* get-cardinal-direction eval.sibilant:122:0 */

  const angle=vector.getAngle();
  return directions[(Math.abs(Math.round((angle / eigthTurn))) % 8)];
});
var directionActions = Interface.define("directionActions", { 
  north:[ 0, 1 ],
  northEast:[ 1, 1 ],
  east:[ 1, 0 ],
  southEast:[ 1, -1 ],
  south:[ 0, -1 ],
  southWest:[ -1, -1 ],
  west:[ -1, 0 ],
  northWest:[ -1, 1 ]
 });
var getCardinalDirectionName = (function getCardinalDirectionName$(vector) {
  /* get-cardinal-direction-name eval.sibilant:139:0 */

  const angle=vector.getAngle();
  const i=(Math.abs(Math.round((angle / eigthTurn))) % 8);
  return directionNames[i];
});
Sight.registerTileGraph(tiles);
game.tiles = tiles;
var getTileNoise = (function getTileNoise$(x = this.x, y = this.y, z = config.noiseZ, angleZoom = config.angleZoom, force = 16, v = Vector.spawn(1, 1)) {
  /* get-tile-noise node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  v.setAngle((noise.simplex3((x / angleZoom / 5), (y / angleZoom / 5), (z / 10000)) * Math.PI * 2));
  const length=noise.simplex3(((x / 50) + 40000), ((x / 50) + 40000), (z / 10000));
  v.setLength((length * force));
  return v;
});
var getMoveNoise = (function getMoveNoise$(x = this.x, y = this.y, t = this.t, force = 16, v = Vector.spawn(1, 1)) {
  /* get-move-noise node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  v.setAngle((noise.simplex3((x / config.angleZoom / 5), (y / config.angleZoom / 5), (t * (config.noiseZ / 10000))) * Math.PI * 2));
  const length=noise.simplex3(((x / 50) + 40000), ((x / 50) + 40000), (t * (config.noiseZ / 10000)));
  v.setLength((length * force));
  return v;
});
const visited=(new Set());
const cellTypes=[ "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "grass", "brokenStone", "stone", "stone", "brokenStone" ];
var TileChunk = Interface.define("TileChunk", { 
  directions:[ [ "northWest", 0 ], [ "north", 1 ], [ "northEast", 2 ], [ "west", 3 ], [ "center", 4 ], [ "east", 5 ], [ "southWest", 6 ], [ "south", 7 ], [ "southEast", 8 ] ],
  chunks:[],
  weight:1,
  indexes:Interface.define("indexes", { 
    northWest:0,
    north:1,
    northEast:2,
    west:3,
    center:4,
    east:5,
    southWest:6,
    south:7,
    southEast:8
   }),
  init( data = [],weight = 1 ){ 
    
      this.data = data;this.weight = weight;
      this.chunks.push(this);
      return this;
    
   },
  create( weight,...data ){ 
    
      return create(TileChunk)(data, weight);
    
   },
  get( direction ){ 
    
      return this.data[this.indexes[direction]];
    
   },
  each( f = this.f,data = this.data,directions = this.directions ){ 
    
      return directions.each(((dir, i) => {
      	
        return f(data[dir[1]], dir[0], i);
      
      }));
    
   },
  every( f = this.f,data = this.data,directions = this.directions ){ 
    
      return directions.every(((dir, i) => {
      	
        return f(data[dir[1]], dir[0], i);
      
      }));
    
   }
 });
const roadWeight=1;
const turnWeight=0.1;
const adjacentStoneWeight=-10;
const paralellHorizontalRoads=TileChunk.create(adjacentStoneWeight, "stone", "stone", "stone", "grass", "grass", "grass", "stone", "stone", "stone");
const paralellVerticalRoads=TileChunk.create(adjacentStoneWeight, "stone", "grass", "stone", "stone", "grass", "stone", "stone", "grass", "stone");
const fullStone=TileChunk.create(adjacentStoneWeight, "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone");
const horizontalRoad=create(TileChunk)([ "grass", "grass", "grass", "stone", "stone", "stone", "grass", "grass", "grass" ]);
horizontalRoad.weight = roadWeight;
const grassBelowRoad=create(TileChunk)([ "stone", "stone", "stone", "grass", "grass", "grass", "grass", "grass", "grass" ]);
grassBelowRoad.weight = roadWeight;
const grassAboveRoad=create(TileChunk)([ "grass", "grass", "grass", "grass", "grass", "grass", "stone", "stone", "stone" ]);
grassAboveRoad.weight = roadWeight;
const flowersBelowRoad=create(TileChunk)([ "stone", "stone", "stone", "grass", "grass", "grass", "floweryGrass", "floweryGrass", "floweryGrass" ]);
flowersBelowRoad.weight = roadWeight;
const flowersAboveRoad=create(TileChunk)([ "floweryGrass", "floweryGrass", "floweryGrass", "grass", "grass", "grass", "stone", "stone", "stone" ]);
flowersAboveRoad.weight = roadWeight;
const verticalRoad=create(TileChunk)([ "grass", "stone", "grass", "grass", "stone", "grass", "grass", "stone", "grass" ]);
verticalRoad.weight = roadWeight;
const grassOnRightOfRoad=create(TileChunk)([ "stone", "grass", "grass", "stone", "grass", "grass", "stone", "grass", "grass" ]);
grassOnRightOfRoad.weight = roadWeight;
const grassOnLeftOfRoad=create(TileChunk)([ "grass", "grass", "stone", "grass", "grass", "stone", "grass", "grass", "stone" ]);
grassOnLeftOfRoad.weight = roadWeight;
const flowersOnRightOfRoad=create(TileChunk)([ "stone", "grass", "floweryGrass", "stone", "grass", "floweryGrass", "stone", "grass", "floweryGrass" ]);
flowersOnRightOfRoad.weight = roadWeight;
const flowersOnLeftOfRoad=create(TileChunk)([ "floweryGrass", "grass", "stone", "floweryGrass", "grass", "stone", "floweryGrass", "grass", "stone" ]);
flowersOnLeftOfRoad.weight = roadWeight;
const leftDiagonalRoad=TileChunk.create("stone", "grass", "grass", "grass", "stone", "grass", "grass", "grass", "stone", roadWeight);
const rightDiagonalRoad=TileChunk.create("grass", "grass", "stone", "grass", "stone", "grass", "stone", "grass", "grass", roadWeight);
const crossRoads=create(TileChunk)([ "grass", "stone", "grass", "stone", "stone", "stone", "grass", "stone", "grass" ]);
crossRoads.weight = 0.1;
const northEastTurn=create(TileChunk)([ "grass", "grass", "grass", "grass", "stone", "stone", "grass", "stone", "grass" ]);
northEastTurn.weight = turnWeight;
const wideNorthEastTurn=create(TileChunk)([ "stone", "stone", "stone", "stone", "grass", "grass", "stone", "grass", "grass" ]);
wideNorthEastTurn.weight = turnWeight;
const northWestTurn=create(TileChunk)([ "grass", "grass", "grass", "stone", "stone", "grass", "grass", "stone", "grass" ]);
northWestTurn.weight = turnWeight;
const wideNorthWestTurn=create(TileChunk)([ "stone", "stone", "stone", "grass", "grass", "stone", "grass", "grass", "stone" ]);
wideNorthWestTurn.weight = turnWeight;
create(TileChunk)([ "grass", "grass", "grass", "stone", "stone", "grass", "stone", "stone", "grass" ]);
const southWestTurn=create(TileChunk)([ "grass", "stone", "grass", "stone", "stone", "grass", "grass", "grass", "grass" ]);
southWestTurn.weight = turnWeight;
const wideSouthWestTurn=create(TileChunk)([ "grass", "grass", "stone", "grass", "grass", "stone", "stone", "stone", "stone" ]);
wideSouthWestTurn.weight = turnWeight;
const loneStoneWeight=-1;
TileChunk.create(loneStoneWeight, "grass", "grass", "grass", "grass", "stone", "grass", "grass", "grass", "grass");
TileChunk.create(loneStoneWeight, "grass", "stone", "grass", "grass", "grass", "grass", "grass", "grass", "grass");
TileChunk.create(loneStoneWeight, "stone", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass");
TileChunk.create(loneStoneWeight, "grass", "grass", "grass", "stone", "grass", "grass", "grass", "grass", "grass");
TileChunk.create(loneStoneWeight, "grass", "grass", "grass", "grass", "grass", "grass", "stone", "grass", "grass");
TileChunk.create(loneStoneWeight, "grass", "grass", "grass", "grass", "grass", "grass", "grass", "stone", "grass");
TileChunk.create(loneStoneWeight, "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grasss", "stone");
TileChunk.create(loneStoneWeight, "grass", "grass", "grass", "grass", "grass", "stone", "grass", "grasss", "grass");
TileChunk.create(loneStoneWeight, "grass", "grass", "stone", "grass", "grass", "grass", "grass", "grasss", "grass");
const roadEndStoneWeight=-1;
TileChunk.create(roadEndStoneWeight, "grass", "stone", "grass", "grass", "stone", "grass", "grass", "grass", "grass");
TileChunk.create(roadEndStoneWeight, "grass", "grass", "grass", "grass", "stone", "grass", "grass", "stone", "grass");
TileChunk.create(roadEndStoneWeight, "grass", "grass", "grass", "stone", "stone", "grass", "grass", "grass", "grass");
TileChunk.create(roadEndStoneWeight, "grass", "grass", "grass", "grass", "stone", "stone", "grass", "grass", "grass");
var generateMainRoad = (function generateMainRoad$() {
  /* generate-main-road eval.sibilant:576:0 */

  var tile = tiles.get(0, 0);
  var i = 0;
  console.log(tile.entity.ground.type);
  return (function() {
    var while$737 = undefined;
    while ((i < 256 && tile.entity.ground.type !== "stone")) {
      while$737 = (function() {
        ((i)++);
        tile.entity.ground.type = "stone";
        const v=getTileNoise(tile.x, tile.y);
        const direction=getCardinalDirectionName(v);
        v.despawn();
        tile = tile[direction];
        return console.log(v, direction, tile, tile.entity.ground.type);
      }).call(this);
    };
    return while$737;
  }).call(this);
});
const southEastTurn=create(TileChunk)([ "grass", "stone", "grass", "grass", "stone", "stone", "grass", "grass", "grass" ]);
southEastTurn.weight = turnWeight;
const field=create(TileChunk)([ "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass" ]);
field.weight = 1.1;
const meadow=create(TileChunk)([ "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass" ]);
meadow.weight = 1.1;
const grassyMeadow=create(TileChunk)([ "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass" ]);
grassyMeadow.weight = 1.1;
const otherGrassyMeadow=create(TileChunk)([ "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass" ]);
otherGrassyMeadow.weight = 1.1;
const loneFlower=create(TileChunk)([ "grass", "grass", "grass", "grass", "floweryGrass", "grass", "grass", "grass", "grass" ]);
loneFlower.weight = 2.1;
var nextType = 0;
var isFirstTile__QUERY = true;
var baseWeights = Interface.define("baseWeights", { 
  grass:1000,
  stone:0.1,
  floweryGrass:100
 });
const weights=Trie.spawn();
var getTileWeight = (function getTileWeight$(baseWeight, tileType) {
  /* get-tile-weight eval.sibilant:665:0 */

  
});
var PossibleState = Interface.define("PossibleState", { 
  init( configuration = this.configuration,collapsedState = null,isPossible__QUERY = true,weight = 0 ){ 
    
      this.configuration = configuration;this.collapsedState = collapsedState;this.isPossible__QUERY = isPossible__QUERY;this.weight = weight;
      return this;
    
   },
  test( tile = this.tile,configuration = this.configuration ){ 
    
      return (configuration.every(((tileType, direction) => {
      	
        return (function() {
          if (direction === "center") {
            this.collapsedState = tileType;
            return this.weight = (this.weight + (configuration.weight * baseWeights[tileType]));
          } else if (tile[direction].entity.ground.type === tileType) {
            return this.weight += (configuration.weight * baseWeights[tileType]);
          } else if (!(tile[direction].entity.ground.type)) {
            return true;
          } else if (tile[direction].entity.ground.type !== tileType) {
            return false;
          }
        }).call(this);
      
      })) && this.weight > 10);
    
   }
 });
TileNode.collapseWaveFunction = (function TileNode$collapseWaveFunction$(depth = 0, maxDepth = 2) {
  /* Tile-node.collapse-wave-function node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  const possibleStates=[];
  for (var chunkType of TileChunk.chunks)
  {
  const possibility=create(PossibleState)(chunkType);;
  if( possibility.test(this) ){ 
    possibleStates.push(possibility)
   }
  }
  ;
  var choices = Interface.define("choices", { 
    grass:0,
    stone:0,
    floweryGrass:0
   });
  return (function() {
    if (possibleStates.length === 1) {
      return possibleStates[0];
    } else if (possibleStates.length === 0) {
      return false;
    } else if ((possibleStates.length > 1 && maxDepth !== depth)) {
      var result = null;
      for (var state of possibleStates)
      {
      const unconfiguredNeigbors=[];;
      const isValid__QUERY=state.configuration.every(((tileType, direction) => {
      	
        const neighbor=this[direction];
        return (function() {
          if (direction === "center") {
            return true;
          } else if (!(neighbor.entity.ground.type)) {
            unconfiguredNeigbors.push(neighbor);
            const collapsedState=neighbor.collapseWaveFunction((depth + 1));
            return collapsedState;
          } else {
            return true;
          }
        }).call(this);
      
      }));;
      for (var neighbor of unconfiguredNeigbors)
      {
      neighbor.entity.ground.type = null;
      }
      ;
      if( isValid__QUERY ){ 
        result = state;;
        break
       }
      }
      ;
      return result;
    } else {
      return possibleStates.reduce(((mostLikely, state) => {
      	
        choices[state.collapsedState] += state.weight;
        return (function() {
          if (choices[state.collapsedState] > choices[mostLikely.collapsedState]) {
            return state;
          } else {
            return mostLikely;
          }
        }).call(this);
      
      }));
    }
  }).call(this);
});
TileNode.setup = (function TileNode$setup$(x = this.x, y = this.y) {
  /* Tile-node.setup node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  const v=getTileNoise(x, y);
  (function() {
    if (isFirstTile__QUERY) {
      isFirstTile__QUERY = false;
      return crossRoads.each(((tileType, direction) => {
      	
        console.log("initializing first chunk", tileType, direction);
        return (function() {
          if (direction === "center") {
            return this.entity.ground.type = tileType;
          } else {
            return this[direction].entity.ground.type = tileType;
          }
        }).call(this);
      
      }));
    } else if (!(this.entity.ground.type)) {
      const collapsedState=this.collapseWaveFunction();
      const choice=(function() {
        if (collapsedState) {
          return collapsedState.collapsedState;
        } else {
          return "floweryGrass";
        }
      }).call(this);
      return this.entity.ground.type = choice;
    }
  }).call(this);
  (function() {
    if (((v.x + v.y) > 16 && this.entity.ground.type === "floweryGrass")) {
      const item=ItemGroup.spawn();
      item.physics.scale = gameScale;
      const tileContainer=this.entity.container;
      item.pos.x = this.worldPos.x;
      item.pos.y = this.worldPos.y;
      return tileContainer.add(item.entity);
    }
  }).call(this);
  const groundStats=this.entity.ground.stats;
  const x_=(Math.abs(Math.round(v.x)) % (groundStats.spriteCoordMaxX - groundStats.spriteCoordMinX));
  const y_=(Math.abs(Math.round(v.y)) % (groundStats.spriteCoordMaxY - groundStats.spriteCoordMinY));
  const coords=[ (x_ + this.entity.ground.stats.spriteCoordMinX), (y_ + this.entity.ground.stats.spriteCoordMinY) ];
  this.entity.floorSprite.selectTile(...coords);
  return v.despawn();
});
p.physics.forces = [];
PathFinding.tiles = tiles;
generateMainRoad();
game.events.on("tick", ((t) => {
	
  (function() {
    if ((t % 10) === 0) {
      return p.sprite.step();
    }
  }).call(this);
  const directionName=getCardinalDirectionName(v);
  return p.sprite.selectSequence(directionName);

})).once("error", ((err) => {
	
  console.log("error on", "tick", "of", "game.events", "given", "t()");
  return console.log(err);

}));
startInterface();