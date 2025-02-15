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
  Interface
 } = require("@kit-js/interface");
var { 
  Component,
  System
 } = require("@shared/ecs.js"),
    { 
  Vector
 } = require("@shared/vectors.js"),
    { 
  Position
 } = require("@shared/systems/position.js");
var VelocityInterface = Component.define("VelocityInterface", { 
  get xd(  ){ 
    
      return this.vector.x;
    
   },
  get yd(  ){ 
    
      return this.vector.y;
    
   },
  set xd( x ){ 
    
      return this.vector.x = x;
    
   },
  set yd( y ){ 
    
      return this.vector.y = y;
    
   },
  register(  ){ 
    
      return (function() {
        if (!(this.vector)) {
          return this.vector = Vector.spawn(0, 0);
        }
      }).call(this);
    
   },
  get pos(  ){ 
    
      return this.entity.positionInterface;
    
   },
  _clear(  ){ 
    
      this.xd = null;
      this.yd = null;
      this.priorX = null;
      return this.priorY = null;
    
   },
  accelerate( [ v1, v2 ] ){ 
    
      this.xd += v1;
      this.yd += v2;
      return this;
    
   }
 });
exports.VelocityInterface = VelocityInterface;
var Velocity = System.define("Velocity", { 
  interface:VelocityInterface,
  _updateComponent( m ){ 
    
      var p = m.pos,
          { 
        xd,
        yd
       } = m;
      m.moved = false;
      return (function() {
        if (!((xd === 0 && yd === 0))) {
          m.priorX = p.x;
          m.priorY = p.y;
          m.moved = true;
          this.game.events.emit("move", m);
          p.x = (p.x + (xd * (this.game.ticker.elapsed / 1000)));
          return p.y = (p.y + (yd * (this.game.ticker.elapsed / 1000)));
        }
      }).call(this);
    
   }
 });
exports.Velocity = Velocity;