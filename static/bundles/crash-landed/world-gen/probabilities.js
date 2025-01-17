require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@crash-landed/world-gen/probabilities.js":[function(require,module,exports){
Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1123 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1185 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var { 
  Spawnable
 } = require("@shared/data-structures/spawnable.js"),
    { 
  TerrainModule
 } = require("@crash-landed/world-gen/terrain-module.js"),
    { 
  PossibleState
 } = require("@crash-landed/world-gen/possible-state.js"),
    { 
  baseWeights
 } = require("@crash-landed/world-gen/base-weights.js"),
    { 
  summate
 } = require("@shared/math/math.js");
var ProbabilityDistrobution = Spawnable.define("ProbabilityDistrobution", { 
  get grass(  ){ 
    
      throw (new TypeError((this.name + " expects a definition of " + "grass")))
    
   },
  get stone(  ){ 
    
      throw (new TypeError((this.name + " expects a definition of " + "stone")))
    
   },
  get floweryGrass(  ){ 
    
      throw (new TypeError((this.name + " expects a definition of " + "floweryGrass")))
    
   },
  sampleInverse(  ){ 
    
      var r = Math.random();
      var s = 0;
      var i = 0;
      for (var typeName of [ "grass", "stone", "floweryGrass" ])
      {
      s += (1 - this[typeName]);
      if( s > r ){ 
        return typeName;
       }
      }
      ;
      throw (new Error("You screwed up your math, these probabilities don't add up to 1."))
    
   },
  sample(  ){ 
    
      var r = Math.random();
      var s = 0;
      var i = 0;
      for (var typeName of [ "grass", "stone", "floweryGrass" ])
      {
      s += this[typeName];
      if( s > r ){ 
        return typeName;
       }
      }
      ;
      throw (new Error("You screwed up your math, these probabilities don't add up to 1."))
    
   },
  clear(  ){ 
    
      this.grass = 0;
      this.stone = 0;
      return this.floweryGrass = 0;
    
   }
 });
exports.ProbabilityDistrobution = ProbabilityDistrobution;
var SuperPositionDistrobution = ProbabilityDistrobution.define("SuperPositionDistrobution", { 
  init( superPosition = this.superPosition ){ 
    
      this.superPosition = superPosition;
      return this;
    
   },
  get grass(  ){ 
    
      return this.superPosition.getLikelyhoodOfState("grass");
    
   },
  get stone(  ){ 
    
      return this.superPosition.getLikelyhoodOfState("stone");
    
   },
  get floweryGrass(  ){ 
    
      return this.superPosition.getLikelyhoodOfState("floweryGrass");
    
   },
  clear(  ){ 
    
      return this.superPosition = null;
    
   }
 });
exports.SuperPositionDistrobution = SuperPositionDistrobution;
var BaseDistrobution = ProbabilityDistrobution.define("BaseDistrobution", { 
  get totalWeight(  ){ 
    
      return (function() {
        if (this._totalWeight) {
          return this._totalWeight;
        } else {
          return this._totalWeight = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return summate(this.weights);
          }).call(this);
        }
      }).call(this);
    
   },
  get weights(  ){ 
    
      return (function() {
        if (this._weights) {
          return this._weights;
        } else {
          return this._weights = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return this.states.map(((state) => {
            	
              return (state.weight * baseWeights[state.collapsedState]);
            
            }));
          }).call(this);
        }
      }).call(this);
    
   },
  get states(  ){ 
    
      return (function() {
        if (this._states) {
          return this._states;
        } else {
          return this._states = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return TerrainModule.modules.map(((chunkType) => {
            	
              return PossibleState.spawn(this, chunkType);
            
            }));
          }).call(this);
        }
      }).call(this);
    
   },
  get grass(  ){ 
    
      return (function() {
        if (this._grass) {
          return this._grass;
        } else {
          return this._grass = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return (this.states.reduce(((weight, state) => {
            	
              return (function() {
                if (state.collapsedState === "grass") {
                  return (weight + (state.weight * baseWeights[state.collapsedState]));
                } else {
                  return weight;
                }
              }).call(this);
            
            }), 0) / this.totalWeight);
          }).call(this);
        }
      }).call(this);
    
   },
  get stone(  ){ 
    
      return (function() {
        if (this._stone) {
          return this._stone;
        } else {
          return this._stone = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return (this.states.reduce(((weight, state) => {
            	
              return (function() {
                if (state.collapsedState === "stone") {
                  return (weight + (state.weight * baseWeights[state.collapsedState]));
                } else {
                  return weight;
                }
              }).call(this);
            
            }), 0) / this.totalWeight);
          }).call(this);
        }
      }).call(this);
    
   },
  get floweryGrass(  ){ 
    
      return (function() {
        if (this._floweryGrass) {
          return this._floweryGrass;
        } else {
          return this._floweryGrass = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return (this.states.reduce(((weight, state) => {
            	
              return (function() {
                if (state.collapsedState === "floweryGrass") {
                  return (weight + (state.weight * baseWeights[state.collapsedState]));
                } else {
                  return weight;
                }
              }).call(this);
            
            }), 0) / this.totalWeight);
          }).call(this);
        }
      }).call(this);
    
   },
  clear(  ){ 
    
      (function() {
        if (this._totalWeight) {
          (function() {
            if (this._totalWeight.spawn) {
              return this._totalWeight.despawn();
            } else if ((this._totalWeight[0] && this._totalWeight[0].spawn)) {
              return this._totalWeight.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._totalWeight = null;
        }
      }).call(this);
      (function() {
        if (this._weights) {
          (function() {
            if (this._weights.spawn) {
              return this._weights.despawn();
            } else if ((this._weights[0] && this._weights[0].spawn)) {
              return this._weights.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._weights = null;
        }
      }).call(this);
      (function() {
        if (this._states) {
          (function() {
            if (this._states.spawn) {
              return this._states.despawn();
            } else if ((this._states[0] && this._states[0].spawn)) {
              return this._states.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._states = null;
        }
      }).call(this);
      (function() {
        if (this._grass) {
          (function() {
            if (this._grass.spawn) {
              return this._grass.despawn();
            } else if ((this._grass[0] && this._grass[0].spawn)) {
              return this._grass.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._grass = null;
        }
      }).call(this);
      (function() {
        if (this._stone) {
          (function() {
            if (this._stone.spawn) {
              return this._stone.despawn();
            } else if ((this._stone[0] && this._stone[0].spawn)) {
              return this._stone.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._stone = null;
        }
      }).call(this);
      return (function() {
        if (this._floweryGrass) {
          (function() {
            if (this._floweryGrass.spawn) {
              return this._floweryGrass.despawn();
            } else if ((this._floweryGrass[0] && this._floweryGrass[0].spawn)) {
              return this._floweryGrass.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._floweryGrass = null;
        }
      }).call(this);
    
   }
 });
exports.BaseDistrobution = BaseDistrobution;
var CurrentDistrobution = ProbabilityDistrobution.define("CurrentDistrobution", { 
  grassInstances:0,
  stoneInstances:0,
  floweryGrassInstances:0,
  get totalInstances(  ){ 
    
      return (this.grassInstances + this.stoneInstances + this.floweryGrassInstances);
    
   },
  get grass(  ){ 
    
      return (this.grassInstances / this.totalInstances);
    
   },
  get stone(  ){ 
    
      return (this.stoneInstances / this.totalInstances);
    
   },
  get floweryGrass(  ){ 
    
      return (this.floweryGrassInstances / this.totalInstances);
    
   }
 });
exports.CurrentDistrobution = CurrentDistrobution;
var ExpectedLikelyhoodGivenCurrentState = ProbabilityDistrobution.define("ExpectedLikelyhoodGivenCurrentState", { 
  base:BaseDistrobution,
  current:CurrentDistrobution,
  get B(  ){ 
    
      return [ this.base.grass, this.base.stone, this.base.floweryGrass ];
    
   },
  get C(  ){ 
    
      return [ (this.current.grass || this.base.grass), (this.current.stone || this.base.stone), (this.current.floweryGrass || this.base.floweryGrass) ];
    
   },
  get E(  ){ 
    
      return this.B.map(((Bn, i) => {
      	
        return (Bn / this.C[i]);
      
      }));
    
   },
  get corrected(  ){ 
    
      return this.E.map(((En, i) => {
      	
        return (En * this.B[i]);
      
      }));
    
   },
  get totalCorrected(  ){ 
    
      return summate(this.corrected);
    
   },
  get grassCorrection(  ){ 
    
      return this.corrected[0];
    
   },
  get stoneCorrection(  ){ 
    
      return this.corrected[1];
    
   },
  get floweryGrassCorrection(  ){ 
    
      return this.corrected[2];
    
   },
  get grass(  ){ 
    
      return (this.grassCorrection / this.totalCorrected);
    
   },
  get stone(  ){ 
    
      return (this.stoneCorrection / this.totalCorrected);
    
   },
  get floweryGrass(  ){ 
    
      return (this.floweryGrassCorrection / this.totalCorrected);
    
   }
 });
exports.ExpectedLikelyhoodGivenCurrentState = ExpectedLikelyhoodGivenCurrentState;
},{"@crash-landed/world-gen/base-weights.js":"@crash-landed/world-gen/base-weights.js","@crash-landed/world-gen/possible-state.js":"@crash-landed/world-gen/possible-state.js","@crash-landed/world-gen/terrain-module.js":"@crash-landed/world-gen/terrain-module.js","@shared/data-structures/spawnable.js":"@shared/data-structures/spawnable.js","@shared/math/math.js":"@shared/math/math.js"}]},{},[]);
