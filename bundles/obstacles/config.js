(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"obstacles/config.js":[function(require,module,exports){
const dim=[ (1 * window.innerWidth), (1 * window.innerHeight) ];
const size=1;
module.exports.size = size;
module.exports.angleZoom = 15;
module.exports.noiseZ = 30;
module.exports.fieldForce = 85.6;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 12.1;
module.exports.maxLength = 99;
module.exports.growthRate = 0.01;
module.exports.startingPlants = 100;
module.exports.maxVelocity = 10;
module.exports.plantMassLimit = 100;
module.exports.antLimit = 1000;
module.exports.maxInDecay = 20;
module.exports.maxTrail = 999;
module.exports.minTrail = 10;
module.exports.decayOnCollision = false;
module.exports.optionsAmplitude = 10;
module.exports.limitDecay = false;
module.exports.antInfluence = 50;
module.exports.friction = 10;
module.exports.collisionStatic = 1;
module.exports.spawnStatic = 1;
module.exports.spawnRate = 1;
module.exports.homeLocation = [ 300, 200 ];
module.exports.targetLocation = [ 700, 900 ];
module.exports.rocks = 1000;
module.exports.stationaryResistanceCoefficiant = 0.1;
module.exports.trackTrail = true;
module.exports.varyNoiseWithTime = true;
module.exports.rewardWinners = true;
module.exports.winYield = 10;
module.exports.lossFactor = 10;
module.exports.punishLoosers = false;
module.exports.stepWiseUpdate = false;
module.exports.gameSpeed = 1;
},{}]},{},["obstacles/config.js"]);
