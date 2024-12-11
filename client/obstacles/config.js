const dim=[ (0.8 * window.innerWidth), (window.innerHeight - 3) ];
const size=2;
module.exports.size = size;
module.exports.uiPollingRate = 60;
module.exports.angleZoom = 18;
module.exports.noiseZ = 30;
module.exports.fieldForce = 50;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 1;
module.exports.maxLength = 30;
module.exports.trailResultDuration = 5000;
module.exports.growthRate = 0.001;
module.exports.startingPlants = 60;
module.exports.plantMassLimit = 30;
module.exports.antLimit = 1000;
module.exports.maxInDecay = 100;
module.exports.trailLimit = 10000;
module.exports.antLife = 200000;
module.exports.minTrail = 10;
module.exports.decayOnCollision = false;
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
module.exports.rockMassScalingFactor = 0.0005;
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