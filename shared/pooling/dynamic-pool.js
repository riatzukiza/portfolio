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
  Interface
 } = require("@kit-js/interface");
var { 
  ObjectPool
 } = require("@shared/pooling/object-pool.js"),
    { 
  List
 } = require("@shared/data-structures/list.js");
var sumOf = (function sumOf$(list, p) {
  /* sum-of eval.sibilant:1:538 */

  return list.reduce(((total, e) => {
  	
    return (total + e[p]);
  
  }), 0);
});
var DynamicPool = Interface.define("DynamicPool", { 
  bucketSize:256,
  init( interface = this.interface,bucketSize = this.bucketSize,buckets = List.of(create(ObjectPool)(this.bucketSize, interface)) ){ 
    
      this.interface = interface;this.bucketSize = bucketSize;this.buckets = buckets;
      return this;
    
   },
  get current(  ){ 
    
      return this.buckets.head.item;
    
   },
  get size(  ){ 
    
      return (this.bucketSize * this.buckets.length);
    
   },
  get used(  ){ 
    
      return sumOf(this.buckets, "used");
    
   },
  grow( buckets = this.buckets,bucketSize = this.bucketSize,self = this ){ 
    
      `
      Pools/Dynamic/grow.md

      # Pools.Dynamic.grow

      ## arguments

      buckets bucket-size (self this)

      ## description

      add a new pool bucket, increasing the number of pre constructed objects in the pool.`

      ;
      return (function(newPool) {
        /* eval.sibilant:1:489 */
      
        buckets.unshift(newPool);
        return newPool;
      }).call(this, create(ObjectPool)(bucketSize, this.interface));
    
   },
  adjust( buckets = this.buckets ){ 
    
      `
      Pools/Dynamic/adjust.md

      # Pools.Dynamic.adjust

      ## arguments

      buckets

      ## description

      reorder the buckets of the object pool so a bucket with available members is the next to be chosen.
      If no existing bucket has free members, the pool is grown and a new bucket is created.`

      ;
      var p = buckets.rotateUntil((function() {
        /* eval.sibilant:2:127 */
      
        return arguments[0].free > 0;
      }));
      return (p) ? p : this.grow();
    
   },
  aquire( buckets = this.buckets ){ 
    
      `
      Pools/Dynamic/aquire.md

      # Pools.Dynamic.aquire

      ## arguments

      buckets

      ## description

      returns an object from the pool for use.

      \`\`\`javascript
      var tacoPool = Pools.Dynamic.construct(Taco);
      var taco = tacoPool.aquire("chiken");
      taco.init(val1, val2)

      \`\`\`
      `

      ;
      return (function(object) {
        /* eval.sibilant:1:489 */
      
        object.bucket = this.current;
        (function() {
          if (!(object.bucket)) {
            throw (new Error("no bucket"))
          }
        }).call(this);
        return object;
      }).call(this, (function() {
        if (this.current.free > 0) {
          return this.current.aquire();
        } else {
          return this.adjust().aquire();
        }
      }).call(this));
    
   },
  release( object = this.object,buckets = this.buckets ){ 
    
      `
      Pools/Dynamic/release.md

      # Pools.Dynamic.release

      ## arguments

      object buckets

      ## description

      clears the object given to it of all data (deinitializes it), and frees it up for future use.`

      ;
      return object.bucket.release(object);
    
   },
  clear( buckets = this.buckets ){ 
    
      `
      Pools/Dynamic/clear.md

      # Pools.Dynamic.clear

      ## arguments

      buckets

      ## description

      clears all objects currently in the pool of data and releases them.`

      ;
      var self = this;
      return self.each((function() {
        /* eval.sibilant:2:1807 */
      
        return self.despawn(arguments[0]);
      }));
    
   },
  each( f = this.f,buckets = this.buckets ){ 
    
      `
      Pools/Dynamic/each.md

      # Pools.Dynamic.each

      ## arguments

      + callback
      + buckets

      ## description

      execute the given callback for each in use object in the pool.`

      ;
      var self = this;
      return buckets.each((function() {
        /* eval.sibilant:2:2093 */
      
        return arguments[0]._inUse.each(f);
      }));
    
   },
  spawn( ...args ){ 
    
      `
      Pools/Dynamic/spawn.md

      # Pools.Dynamic.spawn

      ## arguments

      [...init-args]

      ## description

      aquire an object from the systems pool, and initialize it.`

      ;
      return (function(r) {
        /* eval.sibilant:1:489 */
      
        r.init(...args);
        return r;
      }).call(this, this.aquire());
    
   },
  despawn( obj ){ 
    
      `
      Pools/Dynamic/despawn.md

      # Pools.Dynamic.despawn

      ## arguments

      obj,foobar

      ## description

      remove an object from the system, and release it back into the pool.`

      ;
      obj.clear();
      return this.release(obj);
    
   },
  register( interface ){ 
    
      `
      Pools/Dynamic/register.md

      # Pools.Dynamic.register

      ## arguments

      interface

      ## description

      Associate an interface with a system,and add the system to the collection of all active systems.`

      ;
      return interface.pool = this;
    
   }
 });
exports.DynamicPool = DynamicPool;