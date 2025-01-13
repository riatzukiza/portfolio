require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@crash-landed/systems/containers.js":[function(require,module,exports){
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
  System,
  Component
 } = require("@shared/ecs.js"),
    { 
  List
 } = require("@shared/data-structures/list.js");
var Container = Component.define("Container", { 
  itemLimit:1,
  objects:null,
  add( entity ){ 
    
      return (function() {
        if ((object.itemInterface && this.itemLimit > this.objects.length)) {
          return this.objects.push(entity);
        } else {
          return false;
        }
      }).call(this);
    
   },
  hasType( type ){ 
    
      return (this.objects.head && this.objects.head.item.type === type);
    
   },
  has( entity ){ 
    
      return this.objects.head.item === entity;
    
   },
  remove( entity ){ 
    
      return this.objects.remove(entity);
    
   },
  clear(  ){ 
    
      this.objects.head.item.despawn();
      return this.objects.despawn();
    
   },
  register(  ){ 
    
      return this.objects = List.spawn();
    
   }
 });
var Containers = System.define("Containers", { 
  interface:Container,
  _updateAll(  ){ 
    
   },
  _updateComponent(  ){ 
    
   }
 });
},{"@shared/data-structures/list.js":"@shared/data-structures/list.js","@shared/ecs.js":"@shared/ecs.js"}]},{},[]);
