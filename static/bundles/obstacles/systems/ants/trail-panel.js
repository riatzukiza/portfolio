require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/systems/ants/trail-panel.js":[function(require,module,exports){
var { 
  PropertyView,
  ViewPanel
 } = require("@obstacles/systems/property-view.js"),
    { 
  TrailDots
 } = require("@obstacles/systems/trail-dots.js");
var { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } = require("@shared/dom.js");
var TrailsPropertyView = PropertyView.define("TrailsPropertyView", { 
  
 });
var TrailsPanel = ViewPanel.define("TrailsPanel", { 
  get settingsView(  ){ 
    
      return createDocumentNode("div", {  }, [ createDocumentNode("button", { 'onclick': (() => {
      	
        return this.game.systems.getBySymbol(TrailDots.symbol).toggleVisibility();
      
      }) }, [ (function() {
        if (TrailDots.visible__QUERY) {
          return "toggle visibility off";
        } else {
          return "toggle visiblity on";
        }
      }).call(this) ]) ]);
    
   },
  pageSize:20,
  page:0,
  cursor:0,
  title:"Trails"
 });
exports.TrailsPropertyView = TrailsPropertyView;
exports.TrailsPanel = TrailsPanel;
},{"@obstacles/systems/property-view.js":"@obstacles/systems/property-view.js","@obstacles/systems/trail-dots.js":"@obstacles/systems/trail-dots.js","@shared/dom.js":"@shared/dom.js"}]},{},[]);
