require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@shared/data-structures/list.js":[function(require,module,exports){
var { 
  Spawnable
 } = require("@shared/data-structures/spawnable.js");
const emptyNodes=[];
var Node = Spawnable.define("Node", { 
  init( list = this.list,next = this.next,prev = this.prev,item = this.item ){ 
    
      this.list = list;this.next = next;this.prev = prev;this.item = item;
      return this;
    
   },
  clear(  ){ 
    
      this.list = null;
      this.next = null;
      return this.prev = null;
    
   },
  get isHead(  ){ 
    
      return this === this.list.head;
    
   },
  get isTail(  ){ 
    
      return this === this.list.tail;
    
   },
  bind( list,next,prev ){ 
    
      this.init(list, next, prev);
      return this;
    
   },
  set( item ){ 
    
      this.item = item;
      return this;
    
   }
 });
var List = Spawnable.define("List", { 
  init(  ){ 
    
      
      this.length = 0;
      return this;
    
   },
  get count(  ){ 
    
      return this.length;
    
   },
  get size(  ){ 
    
      return this.length;
    
   },
  get empty__QUERY(  ){ 
    
      return this.length === 0;
    
   },
  from( arrayLike = this.arrayLike,f = ((a) => {
  	
    return a;
  
  }) ){ 
    
      const list=create(this)();
      arrayLike.each(((e, i) => {
      	
        return list.push(f(e));
      
      }));
      return list;
    
   },
  clear(  ){ 
    
      return (function() {
        var while$454 = undefined;
        while (this.length > 0) {
          while$454 = (function() {
            return this.pop();
          }).call(this);
        };
        return while$454;
      }).call(this);
    
   },
  of( ...items ){ 
    
      return this.from(items);
    
   },
  push( item ){ 
    
      return this.pushNode(Node.spawn(this, null, null, item)).item;
    
   },
  unshift( item ){ 
    
      return this.unshiftNode(Node.spawn(this, null, null, item)).item;
    
   },
  pop(  ){ 
    
      return this.popNode().item;
    
   },
  shift(  ){ 
    
      return this.shiftNode().item;
    
   },
  insert( item,predicate ){ 
    
   },
  remove( item ){ 
    
      var node = this.head;
      var r = false;
      (function() {
        var while$455 = undefined;
        while ((node && !(r))) {
          while$455 = (function() {
            return (function() {
              if (node.item !== item) {
                return node = node.next;
              } else {
                node = this.removeNode(node);
                return r = node.item;
              }
            }).call(this);
          }).call(this);
        };
        return while$455;
      }).call(this);
      return item;
    
   },
  node( item ){ 
    
      return Node.spawn(this, null, null, item);
    
   },
  pushNode( node ){ 
    
      (function() {
        if (!(this.empty__QUERY)) {
          return this.tail = this.tail.next = node.bind(this, null, this.tail);
        } else {
          return this.head = this.tail = node.bind(this, null, null);
        }
      }).call(this);
      ((this.length)++);
      return node;
    
   },
  unshiftNode( node ){ 
    
      (function() {
        if (!(this.empty__QUERY)) {
          return this.head = this.head.prev = node.bind(this, this.head, null);
        } else {
          return this.head = this.tail = node.bind(this, null, null);
        }
      }).call(this);
      ((this.length)++);
      return node;
    
   },
  popNode(  ){ 
    
      return (this.empty__QUERY) ? null : this.removeNode(this.tail);
    
   },
  shiftNode(  ){ 
    
      return (this.empty__QUERY) ? null : this.removeNode(this.head);
    
   },
  insertNode( n,predicate ){ 
    
   },
  removeNode( node ){ 
    
      if( !(node.list === this) ){ 
        throw (new Error("node cannot be removed from a list it is not a part of"))
       };
      (function() {
        if (node === this.head) {
          return this.head = node.next;
        }
      }).call(this);
      (function() {
        if (node === this.tail) {
          return this.tail = node.prev;
        }
      }).call(this);
      (function() {
        if (node.next) {
          return node.next.prev = node.prev;
        }
      }).call(this);
      (function() {
        if (node.prev) {
          return node.prev.next = node.next;
        }
      }).call(this);
      ((this.length)--);
      (function() {
        if (node) {
          return node.despawn();
        }
      }).call(this);
      return node;
    
   },
  spliceNode( prev,node,next ){ 
    
   },
  sort( predicat,e ){ 
    
   },
  each( f ){ 
    
      var node = this.head;
      (function() {
        var while$456 = undefined;
        while (node) {
          while$456 = (function() {
            f(node.item, node);
            return node = node.next;
          }).call(this);
        };
        return while$456;
      }).call(this);
      return this;
    
   },
  map( f ){ 
    
      var result = create(List)();
      var node = this.head;
      return (function() {
        var while$457 = undefined;
        while (node) {
          while$457 = (function() {
            return result.push(f(node, node.next, node.prev));
          }).call(this);
        };
        return while$457;
      }).call(this);
    
   },
  toArray(  ){ 
    
   },
  reduce( f,r ){ 
    
      this.each(((e, i, l) => {
      	
        return r = f(r, e, i, l);
      
      }));
      return r;
    
   },
  findNode( f = this.f,node = this.head ){ 
    
      return (function() {
        if (f(node)) {
          return node;
        } else if (!(node === this.tail)) {
          return List.find(f, node.next);
        } else {
          return false;
        }
      }).call(this);
    
   },
  find( f = this.f,node = this.head ){ 
    
      var r = List.findNode(f, node);
      return (function() {
        if (r) {
          return r.value;
        } else {
          return false;
        }
      }).call(this);
    
   },
  rotate(  ){ 
    
      this.push(this.shift());
      return this;
    
   },
  rotateUntil( predicate = this.predicate ){ 
    
      var r = false;
      var t = 0;
      (function() {
        var while$458 = undefined;
        while ((!(r) && t < this.size)) {
          while$458 = (function() {
            return (function() {
              if (predicate(this.head.item)) {
                return r = this.head.item;
              } else {
                this.rotate();
                return ((t)++);
              }
            }).call(this);
          }).call(this);
        };
        return while$458;
      }).call(this);
      return r;
    
   }
 });
exports.List = List;
},{"@shared/data-structures/spawnable.js":"@shared/data-structures/spawnable.js"}]},{},[]);
