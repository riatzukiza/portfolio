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
var Interface = { 
  _symbols:{  },
  _types:{  },
  init( name = this.name,_obj = this._obj,_types = {  },_symbols = {  } ){ 
    
      this.name = name;this._obj = _obj;this._types = _types;this._symbols = _symbols;
      return this;
    
   },
  _filterSerializable( key,value ){ 
    
      return !(this._nonSerializableKeys.includes(key));
    
   },
  _nonSerializableKeys:[],
  serialize(  ){ 
    
      return Object.entries(Object.getOwnPropertyDescriptors(this)).filter((([ key, describer ]) => {
      	return (describer.hasOwnProperty("value") && typeof describer.value !== "function" && this._filterSerializable(key, describer.value));
      })).reduce(((typeName, this.name) => {
      	result([ key, describer ]);
      (function() {
        if (describer.value.serialize) {
          return result[key] = describer.value.serialize();
        } else {
          return result[key] = describer.value;
        }
      }).call(this);
      return result;
      }));
    
   },
  define( name = this.name,_obj = this._obj,_types = this._types,_symbols = this._symbols,_shares = (_obj.borrows || _obj.shares || []),_ext = (_obj.extend || this),_build = _obj.build ){ 
    
      return (function() {
        if (name in _symbols) {
          return mixin(_obj, _types[_symbols[name]]);
        } else {
          return Interface._construct(name, _obj, _ext, _shares, _symbols, _types, _build);
        }
      }).call(this);
    
   },
  _construct( name = this.name,_obj = this._obj,_ext = this._ext,_shares = this._shares,_symbols = this._symbols,_types = this._types,_build = this._build ){ 
    
      return (function(proto) {
        /* inc/scope.sibilant:12:9 */
      
        proto.construct = (function proto$construct$() {
          /* proto.construct eval.sibilant:44:32 */
        
          return Object.create(proto).init(...arguments);
        });
        Interface.init.call(proto);
        _symbols[name] = proto.symbol;
        _types[proto.symbol] = proto;
        (function() {
          if (proto.build) {
            return proto.build();
          }
        }).call(this);
        proto;
        return proto;
      })(extend(_ext, mixin([ { 
        name,
        symbol:Symbol(name),
        define:Interface.define,
        proto:_ext,
        _construct:Interface._construct
       }, ..._shares ], _obj)));
    
   }
 };
export { 
  Interface
 };