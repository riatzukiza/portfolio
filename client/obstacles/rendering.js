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
  Rendering
 } = require("@shared/systems/rendering/rendering.js"),
    config = require("@obstacles/config.js");
const rendering=Rendering.load({ 
  dimensions:[ (1 * config.dimensions[0]), (1 * config.dimensions[1]) ],
  blend:true
 });
rendering.backgroundColor = { 
  r:0,
  g:0,
  b:0,
  a:255
 };
exports.rendering = rendering;