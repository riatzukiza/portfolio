require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/systems/ants/trail-segments.js":[function(require,module,exports){
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
  TimeLimit,
  Timer
 } = require("@obstacles/systems/timer.js"),
    { 
  RedBlackTree
 } = require("@shared/data-structures/trees/red-black-tree.js"),
    { 
  rgba
 } = require("@obstacles/colors.js"),
    config = require("@obstacles/config.js");
var { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } = require("@shared/dom.js");
var displayDecimal = (function displayDecimal$(d = this.d, n = 6) {
  /* display-decimal node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return (Math.round((Math.pow(10, n) * d)) / Math.pow(10, n));
});
var TrailSegment = TimeLimit.define("TrailSegment", { 
  docString:`
  obstacles/systems/ant-trails/Trail-vector.md

  # obstacles.systems.ant-trails.Trail-vector

  ## arguments

  inherits from shared.ecs.Component

  ## description

  A time limited vector component that modifies the signal field when the ant has either succeeded or failed
  If the time limit expires, it disapears.`

  ,
  duration:config.trailLimit,
  updateView__QUERY:true,
  get views(  ){ 

      return (function() {
        if (this._views) {
          return this._views;
        } else {
          return this._views = (new Map());
        }
      }).call(this);

   },
  get view(  ){ 
  
    return (() => {
    	
      return (function() {
        if (this.views.has("view")) {
          return this.views.get("view");
        } else {
          var r = (function() {
            /* eval.sibilant:11:23 */
          
            return createDocumentNode("div", { 'className': "panel" }, [ "trail segment", createDocumentNode("div", {  }, [ "pos:", (() => {
            	
              return displayDecimal(this.x, 2);
            
            }), ",", (() => {
            	
              return displayDecimal(this.y, 2);
            
            }) ]), createDocumentNode("div", {  }, [ "remaining", (() => {
            	
              return this.remainingTime;
            
            }) ]), createDocumentNode("div", {  }, [ "duration", (() => {
            	
              return ("" + this.duration);
            
            }) ]), createDocumentNode("div", {  }, [ "triggered?", (() => {
            	
              return ("" + this.triggered);
            
            }) ]), createDocumentNode("div", {  }, [ "started at", (() => {
            	
              return this.createdAt;
            
            }) ]) ]);
          }).call(this);
          this.views.set("view", r);
          return r;
        }
      }).call(this);
    
    });
  
 },
  get segGroup(  ){ 
    
      return require("@obstacles/entities/trail-segments.js").trailSegments;
    
   },
  callback( entity,c ){ 
    
      entity.ant.antTrail.segments.delete(entity);
      return entity.group.despawn(entity);
    
   },
  apply(  ){ 
    
      `
      obstacles/systems/ant-trails/Trail-segment/apply.md

      # obstacles.systems.ant-trails.Trail-segment.apply

      ## arguments

      ## description

      Apply the trail segment forward`

      ;
      this.entity.trailDot.color = rgba(20, 200, 20, 255);
      return (function() {
        if (config.rewardWinners) {
          const weight=(this.entity.ant.antLife.looseCount / (this.entity.ant.antLife.winCount + 1));
          this.pheremones.addTo({ 
            x:(this.x * weight * config.antInfluence),
            y:(this.y * weight * config.antInfluence)
           });
          return this.reset((this.remainingTime + config.trailResultDuration));
        }
      }).call(this);
    
   },
  applyInverse(  ){ 
    
      `
      obstacles/systems/ant-trails/Trail-segment/apply.md

      # obstacles.systems.ant-trails.Trail-segment.apply

      ## arguments

      ## description

      Apply the trail segment backward`

      ;
      this.entity.trailDot.color = rgba(255, 20, 20, 255);
      return (function() {
        if (config.punishLoosers) {
          const weight=(this.entity.ant.antLife.looseCount / (this.entity.ant.antLife.winCount + 1));
          this.pheremones.subFrom({ 
            x:(this.x * weight * config.antInfluence),
            y:(this.y * weight * config.antInfluence)
           });
          return this.reset((this.remainingTime + config.trailResultDuration));
        }
      }).call(this);
    
   }
 });
exports.TrailSegment = TrailSegment;
var DecayingTrails = Timer.define("DecayingTrails", { 
  get defaultDuration(  ){ 
    
      return config.trailLimit;
    
   },
  interface:TrailSegment
 });
exports.DecayingTrails = DecayingTrails;
},{"@obstacles/colors.js":"@obstacles/colors.js","@obstacles/config.js":"@obstacles/config.js","@obstacles/entities/trail-segments.js":"@obstacles/entities/trail-segments.js","@obstacles/systems/timer.js":"@obstacles/systems/timer.js","@shared/data-structures/trees/red-black-tree.js":"@shared/data-structures/trees/red-black-tree.js","@shared/dom.js":"@shared/dom.js"}]},{},[]);
