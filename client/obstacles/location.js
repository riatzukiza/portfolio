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
var config = require("@obstacles/config.js");
var randomLocation = (function randomLocation$() {
  /* random-location eval.sibilant:2:0 */

  return [ (function() {
    /* eval.sibilant:1:577 */
  
    var rand = ((Math.random() * (config.dimensions[0] - 0)) + 0);
    return (config.dimensions[0] - (rand / 2));
  }).call(this), (function() {
    /* eval.sibilant:1:577 */
  
    var rand = ((Math.random() * (config.dimensions[1] - 0)) + 0);
    return (config.dimensions[1] - (rand / 2));
  }).call(this) ];
});
exports.randomLocation = randomLocation;