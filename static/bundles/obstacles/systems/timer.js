require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/systems/timer.js":[function(require,module,exports){
var { 
  Component,
  System
 } = require("@shared/ecs.js"),
    { 
  BinarySearchTree
 } = require("@shared/data-structures/trees/binary-search-tree.js"),
    config = require("@obstacles/config.js");
var TimeLimit = Component.define("TimeLimit", { 
  docString:`
  Obstacles/systems/Time-limit.md

  # Obstacles.systems.Time-limit

  ## arguments

  Inherits shared.ecs.Component arguments

  ## description

  Sets somthing to happen at a given time.
  Requires a 
  \`duration\`
  and
  \`callback\``

  ,
  register(  ){ 
    
      this.createdAt = Date.now();
      this.triggered = false;
      return this.system.tree.set(this.triggerTime, this);
    
   },
  get duration(  ){ 
    
      throw (new Error("no duration was given to time limit component"))
    
   },
  get callback(  ){ 
    
      throw (new Error("No callback was given to time limit component"))
    
   },
  get triggerTime(  ){ 
    
      return (this.createdAt + this.duration);
    
   },
  get elapsed(  ){ 
    
      return (Date.now() - this.createdAt);
    
   },
  get remainingTime(  ){ 
    
      return (this.duration - this.elapsed);
    
   },
  get expired(  ){ 
    
      return this.elapsed > this.duration;
    
   },
  reset(  ){ 
    
      this.system.tree.remove(this.triggerTime, this);
      this.createdAt = Date.now();
      this.triggered = false;
      return this.system.tree.set(this.triggerTime, this);
    
   },
  _clear(  ){ 
    
      this.createdAt = 0;
      this.triggered = false;
      return this.system.tree.remove(this.triggerTime, this);
    
   }
 });
exports.TimeLimit = TimeLimit;
var Timer = System.define("Timer", { 
  docString:`
  Obstacles/systems/Timer.md

  # Obstacles.systems.Timer

  ## arguments

  Inherits from shared.ecs.ComponentSystem

  ## description

  Allows timed events to occur for entities with time limit components`

  ,
  register(  ){ 
    
      return this.tree = BinarySearchTree.spawn();
    
   },
  _updateAll(  ){ 
    
      const branch=this.tree.search(Date.now());
      const list=branch.values;
      return list.each(((c) => {
      	
        return this._updateComponent(c);
      
      }));
    
   },
  _updateComponent( c ){ 
    
      return (function() {
        if ((c.expired && !(c.triggered))) {
          c.triggered = true;
          return c.callback(c.entity, c);
        }
      }).call(this);
    
   }
 });
exports.Timer = Timer;
},{"@obstacles/config.js":"@obstacles/config.js","@shared/data-structures/trees/binary-search-tree.js":"@shared/data-structures/trees/binary-search-tree.js","@shared/ecs.js":"@shared/ecs.js"}]},{},[]);
