var { 
  Interface
 } = require("@kit-js/interface");
var R = require("ramda");
var { 
  OrderedMap
 } = require("@shared/data-structures/maps/ordered.js"),
    { 
  DynamicPool
 } = require("@shared/pooling/dynamic-pool.js"),
    { 
  Group
 } = require("@shared/data-structures/group.js");
var spawnComponent = (function spawnComponent$(entity, systems) {
  /* spawn-component eval.sibilant:13:0 */

  return (function() {
    /* eval.sibilant:13:39 */
  
    return systems.get(arguments[0]).spawn(entity);
  });
});
var componentList = (function componentList$(entity) {
  /* component-list eval.sibilant:15:0 */

  return R.map(spawnComponent(entity));
});
var remove = (function remove$(entity) {
  /* remove eval.sibilant:17:0 */

  return (function() {
    /* eval.sibilant:17:21 */
  
    return arguments[0].system.clear(entity);
  });
});
var clear = (function() {
  /* eval.sibilant:19:11 */

  return arguments[0].clear();
});
var EntityGroup = Interface.define("EntityGroup", { 
  init( name = this.name,aspects = this.aspects,system = this.system,group = create(Group)() ){ 
    
      this.name = name;this.aspects = aspects;this.system = system;this.group = group;
      return this;
    
   },
  get size(  ){ 
    
      return this.group.size;
    
   },
  spawn( aspects = this.aspects,system = this.system,group = this.group ){ 
    
      return (function(e) {
        /* node_modules/kit/inc/scope.sibilant:12:9 */
      
        e.group = this;
        group.add(e);
        return e;
      })(system.spawn(aspects));
    
   },
  clear( group = this.group ){ 
    
      group.each(((entity) => {
      	
        return entity.despawn();
      
      }));
      return group.clear();
    
   },
  has( entity = this.entity,group = this.group ){ 
    
      return group.has(entity);
    
   },
  despawn( entity = this.entity,group = this.group ){ 
    
      group.remove(entity);
      return entity.clear();
    
   }
 });
exports.EntityGroup = EntityGroup;