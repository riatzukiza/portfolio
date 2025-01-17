require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@shared/data-structures/fields/sparse.js":[function(require,module,exports){
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
  Vector
 } = require("@shared/vectors.js");
var { 
  Trie
 } = require("@shared/data-structures/trees/trie.js");
var { 
  Spawnable
 } = require("@shared/data-structures/spawnable.js");
var SparseVectorField = Spawnable.define("SparseVectorField", { 
  docString:"DataStructures.fields.Sparse",
  init( _data = Trie.spawn() ){ 
    
      this._data = _data;
      return this;
    
   },
  get data(  ){ 
    
      return this._data;
    
   },
  _equation( x,y,t,t_,v,v_ ){ 
    
      `
      DataStructures/Sields/Sparse/*equation.md

      # DataStructures.Sields.Sparse.*equation

      ## arguments

      x y t t* v v* 

      ## description

      An abstract method used to determine the value of a cell at a given time step.
      By default it throws an error`

      ;
      throw (new Error("No field equation defined"))
    
   },
  _context( x,y,t,t_,v,v_ ){ 
    
      return `
      DataStructures/Fields/Sparse/*context.md

      # DataStructures.Fields.Sparse.*context

      ## arguments

      x y t t* v v* 

      ## description

      If defined, configures variables specific to the given implementation.`

      ;
    
   },
  equation( x = this.x,y = this.y,t = this.t,data = this.data ){ 
    
      `
      DataStructures/Fields/Sparse/equation.md

      # DataStructures.Fields.Sparse.equation

      ## arguments

      x y tdata

      ## description

      Calculates the value of the vector field at the given location and time.
      Clears the previous time step
      if the value calcuated is a null vector, it clears it from the field.`

      ;
      const cell=data.insert([ x, y ]);
      const v_=(function() {
        if (cell.lastTick) {
          return cell.get([ cell.lastTick ]);
        } else {
          return null;
        }
      }).call(this);
      const v=cell.set([ t ], (function() {
        if (v_) {
          return Vector.spawn(v_.x, v_.y);
        } else {
          return Vector.spawn(0, 0);
        }
      }).call(this));
      this._context(x, y, t, cell.lastTick, v, v_);
      this._equation(x, y, t, cell.lastTick, v, v_);
      (function() {
        if (v_) {
          v_.despawn();
          return cell.delete([ cell.lastTick ]);
        }
      }).call(this);
      cell.lastTick = t;
      (function() {
        if ((v.x < 0 && v.y < 0)) {
          v.despawn();
          return cell.delete([ t ]);
        }
      }).call(this);
      return v;
    
   },
  get( x = this.x,y = this.y,t = this.t,data = this.data ){ 
    
      p = [ Math.round(x), Math.round(y), t ];
      return (function() {
        if (data.has(p)) {
          return data.get(p);
        } else {
          return this.equation(x, y, t, data);
        }
      }).call(this);
    
   }
 });
exports.SparseVectorField = SparseVectorField;
},{"@shared/data-structures/spawnable.js":"@shared/data-structures/spawnable.js","@shared/data-structures/trees/trie.js":"@shared/data-structures/trees/trie.js","@shared/vectors.js":"@shared/vectors.js"}]},{},[]);
