var { 
  Interface
 } = require("@kit-js/interface");
var { 
  DynamicPool
 } = require("@shared/pooling/dynamic-pool.js");
const pools=(new Map());
var PooledDataStructure = Interface.define("PooledDataStructure", { 
  init(  ){ 
    
      
      throw (new Error("Abstract interface missing init function")());
      return this;
    
   },
  clear(  ){ 
    
      throw (new Error("Abstract interface missing clear function")())
    
   },
  get dataPool(  ){ 
    
      const symbol=this.symbol;
      console.log("finding pool");
      return (function() {
        if (pools.has(symbol)) {
          return pools.get(symbol);
        } else {
          var r = (function() {
            /* inc/misc.sibilant:1:673 */
          
            console.log("pool cache miss");
            return create(DynamicPool)(this);
          }).call(this);
          pools.set(symbol, r);
          return r;
        }
      }).call(this);
    
   },
  spawn( ...args ){ 
    
      console.log("spawning", this, this.dataPool);
      return this.dataPool.aquire().init(...args);
    
   },
  despawn(  ){ 
    
      return this.dataPool.release(this);
    
   }
 });
exports.PooledDataStructure = PooledDataStructure;