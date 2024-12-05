require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/config.js":[function(require,module,exports){
const dim=[ (0.9 * window.innerWidth), (0.9 * window.innerHeight) ];
const size=4;
module.exports.size = size;
module.exports.angleZoom = 15;
module.exports.noiseZ = 30;
module.exports.fieldForce = 30;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 0.3;
module.exports.maxLength = 90;
module.exports.growthRate = 0.001;
module.exports.startingPlants = 5;
module.exports.plantMassLimit = 30;
module.exports.antLimit = 500;
module.exports.maxInDecay = 100;
module.exports.maxTrail = 1000;
module.exports.minTrail = 10;
module.exports.decayOnCollision = true;
module.exports.optionsAmplitude = 10;
module.exports.limitDecay = true;
module.exports.antInfluence = 50;
module.exports.friction = 2;
module.exports.collisionStatic = 5;
module.exports.spawnStatic = 5;
module.exports.spawnRate = 10;
module.exports.homeLocation = [ 300, 200 ];
module.exports.targetLocation = [ 700, 900 ];
module.exports.rocks = 100;
module.exports.rockMinSize = 20;
module.exports.rockMaxSize = 40;
module.exports.rockMassScalingFactor = 8;
module.exports.rockMinMassFactor = 2;
module.exports.rockMaxMassFactor = 8;
module.exports.stationaryResistanceCoefficiant = 0.1;
module.exports.trackTrail = true;
module.exports.varyNoiseWithTime = true;
module.exports.rewardWinners = true;
module.exports.winYield = 10;
module.exports.lossFactor = 10;
module.exports.punishLoosers = true;
module.exports.stepWiseUpdate = true;
module.exports.gameSpeed = 1;
},{}]},{},[]);
