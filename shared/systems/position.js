var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1692 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1754 */

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
 } = require("@shared/ecs.js");
var PositionInterface = Component.define("PositionInterface", { 
  _x:0,
  _y:0,
  z:0,
  get x(  ){ 
    
      return this._x;
    
   },
  get y(  ){ 
    
      return this._y;
    
   },
  set y( y ){ 
    
      if( !(this.moved) ){ 
        this.system.queue.push(this)
       };
      this._y = y;
      return this.moved = true;
    
   },
  set x( x ){ 
    
      if( !(this.moved) ){ 
        this.system.queue.push(this)
       };
      this._x = x;
      return this.moved = true;
    
   },
  _clear(  ){ 
    
      this.x = null;
      this.y = null;
      this.z = null;
      return this.moved = false;
    
   }
 });
exports.PositionInterface = PositionInterface;
var Position = System.define("Position", { 
  interface:PositionInterface,
  queue:[],
  shift( c,[ xshift, yshift ] ){ 
    
      c.x = (c._x + xshift);
      return c.y = (c._y + yshift);
    
   },
  move( entity,{ 
    x,
    y
   } ){ 
    
      var c = this.components.get(entity);
      c.x = x;
      return c.y = y;
    
   },
  _updateAll(  ){ 
    
      while( this.queue.length > 0 ){ 
        this._updateComponent(this.queue.pop())
       };
      return null;
    
   },
  wraps__QUERY:true,
  _updateComponent( c ){ 
    
      (function() {
        if (this.wraps__QUERY) {
          (function() {
            if (c._x < 0) {
              return c._x = (c._x + this.process.rendering.dimensions[0]);
            }
          }).call(this);
          (function() {
            if (c._y < 0) {
              return c._y = (c._y + this.process.rendering.dimensions[1]);
            }
          }).call(this);
          c._x = (c._x % this.process.rendering.dimensions[0]);
          return c._y = (c._y % this.process.rendering.dimensions[1]);
        }
      }).call(this);
      return c.moved = false;
    
   }
 });
exports.Position = Position;