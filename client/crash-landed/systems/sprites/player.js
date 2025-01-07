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
  AnimatedSprite,
  SpriteAtlas
 } = require("@shared/systems/rendering/sprite-atlas.js");
const spriteImage=document.getElementById("player-sprite");
var PlayerSprite = AnimatedSprite.define("PlayerSprite", { 
  column:0,
  row:0,
  get sequenceIndex(  ){ 
    
      return this.column;
    
   },
  get currentFrame(  ){ 
    
      return this.row;
    
   },
  set sequenceIndex( x ){ 
    
      return this.column = x;
    
   },
  set currentFrame( y ){ 
    
      return this.column = y;
    
   },
  get atlasXMin(  ){ 
    
      return (this.sequenceIndex * this.system.frameDimensions[0]);
    
   },
  get atlasYMin(  ){ 
    
      return (this.currentFrame * this.system.frameDimensions[1]);
    
   },
  get atlasXMax(  ){ 
    
      return (this.atlasXMin + this.system.frameDimensions[0]);
    
   },
  get atlasYMax(  ){ 
    
      return (this.atlasYMin + this.system.frameDimensions[1]);
    
   },
  selectSequence( name ){ 
    
      this.sequenceIndex = this.system.sequenceMap[name];
      return (function() {
        if (isNaN(this.sequenceIndex)) {
          throw (new Error(("Invalid sequence name " + name)))
        }
      }).call(this);
    
   },
  step(  ){ 
    
      return this.currentFrame = ((this.currentFrame + 1) % this.system.sequenceLength);
    
   }
 });
var PlayerSprites = SpriteAtlas.define("PlayerSprites", { 
  id:0,
  interface:PlayerSprite,
  sequenceMap:{ 
    north:0,
    northEast:1,
    east:2,
    southEast:3,
    south:4,
    southWest:5,
    west:6,
    northWest:7
   },
  frameDimensions:[ 16, 24 ],
  sequences:8,
  sequenceLength:3,
  img:spriteImage
 });
exports.PlayerSprites = PlayerSprites;