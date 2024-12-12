require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/systems/ants/ant-trails.js":[function(require,module,exports){
var { 
  Component,
  System
 } = require("@shared/ecs.js"),
    { 
  Timer,
  TimeLimit
 } = require("@obstacles/systems/timer.js"),
    config = require("@obstacles/config.js");
var AntTrail = Component.define("AntTrail", { 
  _clear(  ){ 
    
      return this.segments.each(((s) => {
      	
        s.despawn();
        return this.segments.delete(s);
      
      }));
    
   },
  register(  ){ 
    
      return (function() {
        if (!(this.segments)) {
          return this.segments = (new Set());
        }
      }).call(this);
    
   }
 });
exports.AntTrail = AntTrail;
var AntTrails = System.define("AntTrails", { 
  interface:AntTrail,
  get spawnAntTrailSegment(  ){ 
    
      return require("@obstacles/entities/trail-segments.js").spawnAntTrailSegment;
    
   },
  _updateComponent( c ){ 
    
      return (function() {
        if ((c.system.process.ticker.ticks % 10) === 0) {
          return c.segments.add(this.spawnAntTrailSegment(c.entity));
        }
      }).call(this);
    
   }
 });
exports.AntTrails = AntTrails;
},{"@obstacles/config.js":"@obstacles/config.js","@obstacles/entities/trail-segments.js":"@obstacles/entities/trail-segments.js","@obstacles/systems/timer.js":"@obstacles/systems/timer.js","@shared/ecs.js":"@shared/ecs.js"}]},{},[]);
