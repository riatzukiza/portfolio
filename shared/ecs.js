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
  System
 } = require("@shared/ecs/component-system.js"),
    { 
  Component
 } = require("@shared/ecs/component.js"),
    { 
  Entity
 } = require("@shared/ecs/entity.js"),
    { 
  EntityGroup
 } = require("@shared/ecs/entity-group.js"),
    { 
  EntitySystem
 } = require("@shared/ecs/entity-system.js");
exports.System = System;
exports.Component = Component;
exports.Entity = Entity;
exports.EntityGroup = EntityGroup;
exports.EntitySystem = EntitySystem;