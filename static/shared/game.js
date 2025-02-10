Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1692 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1754 */

  return Object.keys(this).forEach(((k) => {
  	return f(this[k], k);
  }));
});
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
import { 
  EntitySystem
 } from "./ecs.js";
import { 
  EventEmitter
 } from "./kit/events/index.js";
import { 
  Ticker
 } from "./ticker.js";
import { 
  OrderedMap
 } from "./data-structures/maps/ordered.js";
import { 
  Interface
 } from "./kit/interface/index.js";
import { 
  Saveable
 } from "/shared/saveable.js";
import { 
  Rendering
 } from "/shared/systems/rendering/rendering.js";
var Game = Saveable.define("Game", { 
  init( config = this.config,systemTypes = [],gameSpeed = 1,units = [],entityGroups = [],entities = create(EntitySystem)(this),ticker = create(Ticker)((gameSpeed * 60)),systems = create(OrderedMap)() ){ 
    
      this.config = config;this.systemTypes = systemTypes;this.gameSpeed = gameSpeed;this.units = units;this.entityGroups = entityGroups;this.entities = entities;this.ticker = ticker;this.systems = systems;
      this.register();
      return this;
    
   },
  _nonSerializableKeys:[ "rendering" ],
  register( systems = this.systems,systemTypes = this.systemTypes,config = this.config ){ 
    
      this.rendering = Rendering.load({ 
        dimensions:[ (1 * config.dimensions[0]), (1 * config.dimensions[1]) ],
        blend:true
       });
      this.rendering.backgroundColor = { 
        r:0,
        g:0,
        b:0,
        a:255
       };
      var getSystemBySymbol = systems.get,
          setSystemBySymbol = systems.set;
      systems.getBySymbol = getSystemBySymbol;
      systems.get = (function systems$get$(proto, ent) {
        /* systems.get eval.sibilant:1:1742 */
      
        var sys = getSystemBySymbol.call(systems, proto.symbol);
        return (function() {
          if (ent) {
            return sys.get(ent);
          } else {
            return sys;
          }
        }).call(this);
      });
      systemTypes.each(((s) => {
      	return systems.push([ s.symbol, create(s)(this) ]);
      }));
      return this.systems.push([ this.rendering.symbol, this.rendering ]);
    
   },
  get ent(  ){ 
    
      return this.entities;
    
   },
  get game(  ){ 
    
      return this;
    
   },
  get process(  ){ 
    
      return this;
    
   },
  get events(  ){ 
    
      return Ticker.events;
    
   },
  add( s = this.s,systems = this.systems,game = this.game ){ 
    
      return systems.push([ s.symbol, create(s)(this) ]);
    
   },
  start( systems = this.systems,events = this.events,ticker = this.ticker,rendering = this.rendering ){ 
    
      this.stop();
      ticker.start();
      events.emit("start", this);
      return events.on("tick", ((t) => {
      	return systems.each((function() {
        /* eval.sibilant:1:2412 */
      
        return arguments[0].update();
      }));
      })).once("error", ((err) => {
      	console.log("error on", "tick", "of", "events", "given", "t()");
      return console.log(err);
      }));
    
   },
  stop( ticker = this.ticker,events = this.events ){ 
    
      ticker.stop();
      return events.removeAllListeners("tick");
    
   },
  clear( systems = this.systems,entities = this.entities,events = this.events,ticker = this.ticker ){ 
    
      ticker.stop();
      entities.clear();
      events.removeAllListeners();
      return systems.each((function() {
        /* eval.sibilant:1:2733 */
      
        return arguments[0].clear();
      }));
    
   }
 });
export { 
  Game
 };