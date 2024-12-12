require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/config.js":[function(require,module,exports){
const dim=[ (0.8 * window.innerWidth), (window.innerHeight - 3) ];
const size=4;
module.exports.size = size;
module.exports.uiPollingRate = 60;
module.exports.angleZoom = 18;
module.exports.noiseZ = 10;
module.exports.fieldForce = 0.5;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 0.01;
module.exports.maxLength = 30;
module.exports.trailResultDuration = 15000;
module.exports.growthRate = 0.001;
module.exports.startingPlants = 60;
module.exports.plantMassLimit = 30;
module.exports.antLimit = 1000;
module.exports.maxInDecay = 100;
module.exports.trailLimit = 30000;
module.exports.antLife = 60000;
module.exports.minTrail = 10;
module.exports.decayOnCollision = true;
module.exports.optionsAmplitude = 10;
module.exports.limitDecay = true;
module.exports.antInfluence = 10;
module.exports.friction = 0.5;
module.exports.collisionStatic = 5;
module.exports.spawnStatic = 10;
module.exports.spawnRate = 10;
module.exports.homeLocation = [ 300, 200 ];
module.exports.targetLocation = [ 700, 900 ];
module.exports.rocks = 50;
module.exports.rockMinSize = 16;
module.exports.rockMaxSize = 64;
module.exports.rockMassScalingFactor = 0.05;
module.exports.rockMinMassFactor = 1;
module.exports.rockMaxMassFactor = 100;
module.exports.stationaryResistanceCoefficiant = 2;
module.exports.trackTrail = true;
module.exports.varyNoiseWithTime = true;
module.exports.rewardWinners = true;
module.exports.winYield = 10;
module.exports.lossFactor = 10;
module.exports.punishLoosers = true;
module.exports.stepWiseUpdate = true;
module.exports.gameSpeed = 1;
},{}]},{},[]);
