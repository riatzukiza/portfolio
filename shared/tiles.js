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
var { 
  Spawnable
 } = require("@shared/data-structures/spawnable.js"),
    { 
  Trie
 } = require("@shared/data-structures/trees/trie.js"),
    { 
  EntityGroup
 } = require("@shared/ecs.js"),
    { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  Physics
 } = require("@shared/systems/physics/system.js");
var TileNode = Spawnable.define("TileNode", { 
  init( _x = this._x,_y = this._y,entity = this.entity,graph = this.graph ){ 
    
      this._x = _x;this._y = _y;this.entity = entity;this.graph = graph;
      entity.positionInterface.x = (this.graph.tileSize * _x);
      entity.positionInterface.y = (this.graph.tileSize * _y);
      return this;
    
   },
  get worldPos(  ){ 
    
      return this.entity.positionInterface;
    
   },
  get x(  ){ 
    
      return this._x;
    
   },
  get y(  ){ 
    
      return this._y;
    
   },
  get worldX(  ){ 
    
      return this.pos.x;
    
   },
  get worldY(  ){ 
    
      return this.pos.y;
    
   },
  get tileSize(  ){ 
    
      return this.graph.tileSize;
    
   },
  get north(  ){ 
    
      return graph.get(this.x, this.y);
    
   },
  get south(  ){ 
    
      return graph.get(this.x, this.y);
    
   },
  get east(  ){ 
    
      return graph.get(this.x, this.y);
    
   },
  get west(  ){ 
    
      return graph.get(this.x, this.y);
    
   },
  get northEast(  ){ 
    
      return graph.get((this.x + 1), (this.y + 1));
    
   },
  get northWest(  ){ 
    
      return graph.get((this.x - 1), (this.y + 1));
    
   },
  get southEast(  ){ 
    
      return graph.get((this.x + 1), (this.y - 1));
    
   },
  get southWest(  ){ 
    
      return graph.get((this.x - 1), (this.y - 1));
    
   },
  get edges(  ){ 
    
      return [ this.north, this.south, this.east, this.west, this.northEast, this.northWest, this.southEast, this.southWest ];
    
   }
 });
var TileGraph = Spawnable.define("TileGraph", { 
  init( tileSize = 30,tileProperties = [],game = this.game,trie = Trie.spawn(),tileEntities = create(EntityGroup)("tiles", [ Position, Physics ].concat(tileProperties), game.ent) ){ 
    
      this.tileSize = tileSize;this.tileProperties = tileProperties;this.game = game;this.trie = trie;this.tileEntities = tileEntities;
      return this;
    
   },
  getClosestFromWorldPos( x,y ){ 
    
      return this.get(Math.round((x / this.tileSize)), Math.round((y / this.tileSize)));
    
   },
  get( x,y ){ 
    
      return (function() {
        if (this.trie.has([ x, y ])) {
          return this.trie.get([ x, y ]);
        } else {
          const entity=this.tileEntities.spawn();
          entity.physicalProperties.scale = this.tileSize;
          const tile=TileNode.spawn(x, y, entity, this);
          tile.x = x;
          tile.y = y;
          return this.trie.set([ x, y ], tile);
        }
      }).call(this);
    
   }
 });
exports.TileGraph = TileGraph;