require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@shared/data-structures/array.js":[function(require,module,exports){
Array.transform = (function Array$transform$(f, a, r = a) {
  /* Array.transform eval.sibilant:1:330 */

  return (function(r) {
    /* eval.sibilant:1:412 */
  
    a.each(((e, i) => {
    	
      return r[i] = f(e, i);
    
    }));
    return r;
  }).call(this, r);
});
Array.prototype.bind = Array.bind = (function Array$bind$(a, f) {
  /* Array.bind eval.sibilant:1:463 */

  return a.reduce(((r, e, i) => {
  	
    f(e, i).each(((x) => {
    	
      return r.push(x);
    
    }));
    return r;
  
  }), []);
});
Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each eval.sibilant:1:624 */

  this.forEach(f);
  return this;
});
Array.prototype.bind = (function Array$prototype$bind$(f) {
  /* Array.prototype.bind eval.sibilant:1:688 */

  return (function(r) {
    /* eval.sibilant:1:412 */
  
    this.each(((a) => {
    	
      return r.push(f(a));
    
    }));
    return r;
  }).call(this, []);
});
Map.prototype.each = (function Map$prototype$each$(f) {
  /* Map.prototype.each eval.sibilant:1:779 */

  this.forEach(f);
  return this;
});
},{}]},{},[]);
