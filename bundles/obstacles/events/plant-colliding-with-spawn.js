require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/events/plant-colliding-with-spawn.js":[function(require,module,exports){
var { 
  Velocity
 } = require("@shared/systems/velocity.js");
var { 
  Position
 } = require("@shared/systems/position.js");
var { 
  game
 } = require("@obstacles/game.js"),
    config = require("@obstacles/config.js"),
    { 
  plants,
  ants,
  rocks
 } = require("@obstacles/entities.js");
game.events.on("plantCollidingWithSpawn", ((home, plant) => {
	
  const v=game.systems.get(Velocity, plant.entity);
  const pos=plant.pos;
  var xd = ((Math.random() * config.collisionStatic) * (function() {
    if (Math.random() < 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this));
  var yd = ((Math.random() * config.collisionStatic) * (function() {
    if (Math.random() < 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this));
  pos.x = (pos.x + xd);
  pos.y = (pos.y + yd);
  return v.accelerate([ xd, yd ]);

})).once("error", ((err) => {
	
  console.log("error on", "plantCollidingWithSpawn", "of", "game.events", "given", "home(plant)");
  return console.log(err);

}));
},{"@obstacles/config.js":"@obstacles/config.js","@obstacles/entities.js":"@obstacles/entities.js","@obstacles/game.js":"@obstacles/game.js","@shared/systems/position.js":"@shared/systems/position.js","@shared/systems/velocity.js":"@shared/systems/velocity.js"}]},{},[]);
