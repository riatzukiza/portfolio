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
  Component,
  System
 } = require("@shared/ecs.js"),
    { 
  Physics
 } = require("@shared/systems/physics/index.js"),
    { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  Gl
 } = require("@shared/gl.js"),
    { 
  Vector
 } = require("@shared/vectors.js");
var { 
  Andy
 } = require("@shared/gl.js");
var { 
  Renderable
 } = require("@shared/systems/rendering/renderable.js");
var setPoint = (function setPoint$(x, y, z, vert) {
  /* set-point eval.sibilant:21:0 */

  vert.point.x = x;
  vert.point.y = y;
  return vert.point.z = z;
});
var SpriteAtlasRenderable = Renderable.define("SpriteAtlasRenderable", { 
  init( layer = this.layer ){ 
    
      this.layer = layer;
      return this;
    
   },
  structure:(new Andy.Gl.Type.Composite({ 
    point:Andy.Type.Vector3,
    size:Andy.Type.float,
    alpha:Andy.Type.float,
    spriteStartUV:Andy.Type.Vector2,
    spriteEndUV:Andy.Type.Vector2
   })),
  clear(  ){ 
    
      setPoint(0, 0, 0, this);
      return this.point.scale = 0;
    
   },
  despawn(  ){ 
    
      return this.layer.despawn(this);
    
   }
 });
exports.SpriteAtlasRenderable = SpriteAtlasRenderable;
var uniforms = Interface.define("uniforms", { 
  init( game = this.game ){ 
    
      this.game = game;
      return this;
    
   },
  get res(  ){ 
    
      return (() => {
      	
        return Gl.uniform("Vector2", "Resolution", this.game.config.dimensions);
      
      });
    
   },
  get zoom(  ){ 
    
      return (() => {
      	
        return Gl.uniform("Vector3", "Zoom", [ 1, 1, this.game.rendering.zoomLevel ]);
      
      });
    
   },
  get offset(  ){ 
    
      return (() => {
      	
        return Gl.uniform("Vector3", "Offset", [ this.game.rendering.xOffset, this.game.rendering.yOffset, 0 ]);
      
      });
    
   },
  get scale(  ){ 
    
      return (() => {
      	
        return Gl.uniform("Float", "Scale", this.game.rendering.zoomLevel);
      
      });
    
   },
  id:0,
  get spriteTexture(  ){ 
    
      return Gl.uniform("Integer", "SpriteTexture", ((this.id)++));
    
   }
 });
var shaders = Interface.define("shaders", { 
  vert:`#version 300 es
  in vec3 a_point;
  in float a_size;
  in vec2 a_spriteStartUV;
  in vec2 a_spriteEndUV;

  in float a_alpha;

  out highp vec2 vSpriteStartUV;
  out highp vec2 vSpriteEndUV;
  out highp float vAlpha;

  uniform vec2  u_Resolution;
  uniform  float u_Scale;
  uniform vec3 u_Zoom;
  uniform vec3 u_Offset;

  vec4 clipspace_coordinate (vec3 xyz, float scale, vec2 res)
  {
    return (vec4((((xyz + u_Offset) * u_Zoom * scale)
                  / vec3(res,1.0) * 1.98 - 0.99), 1.0)
            * vec4( 1.0,-1.0,1.0,1.0 ));

  }
  void main (void)
  {

    float zAxis = a_point[2];
    vec3 p = vec3(a_point);
    p.z = 1.0;

    gl_Position  = clipspace_coordinate( p, u_Scale, u_Resolution );
    gl_PointSize = (a_size + zAxis) * u_Scale;
    vSpriteStartUV = a_spriteStartUV;
    vSpriteEndUV = a_spriteEndUV;
    vAlpha = a_alpha;

      //size * z
      // so that the closer the vertex is (the larger z is), the larger the vertex will be relative to its physical size

  }
  `,
  frag:`#version 300 es
  // I'm passing these in as uniforms but you can pass them in as varyings
  // from buffers if that fits your needs better

  // in vec2 animatedUV;      // animation value
  precision highp float;
  in vec2 vSpriteStartUV;   // corner uv coord for sprite in atlas
  precision highp float;
  in vec2 vSpriteEndUV;     // opposite corner uv coord for sprite in atlas
  precision highp float;
  in float vAlpha;

  uniform sampler2D u_SpriteTexture;  // texture we are drawing

  out vec4 FragColor;
  void main() {
    // this would normally come from a varying but lazy so using point sprite
    vec2 texcoord = gl_PointCoord.xy;  // this * 3 could already be
    // in your texcoords

    vec2 spriteRange = (vSpriteEndUV - vSpriteStartUV);
    vec2 uv = vSpriteStartUV + texcoord * spriteRange;

    vec4 color = texture(u_SpriteTexture, uv);
    FragColor = color;

    FragColor.rgb *= FragColor.a;
    FragColor.a *= vAlpha;

  }
  `
 });
var Texture = Interface.define("Texture", { 
  init( img = this.img,context = this.context,id = this.id,texture = gl.createTexture() ){ 
    
      this.img = img;this.context = context;this.id = id;this.texture = texture;
      const gl=context.gl;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      return this;
    
   },
  get gl(  ){ 
    
      return this.context.gl;
    
   },
  enable( img = this.img,texture = this.texture,gl = this.gl ){ 
    
      gl.activeTexture((gl.TEXTURE0 + this.id));
      return gl.bindTexture(gl.TEXTURE_2D, texture);
    
   }
 });
var spriteLayer = (function spriteLayer$(limit, textureData, game) {
  /* sprite-layer eval.sibilant:93:0 */

  uniforms.init(game);
  var id = uniforms.id;
  const layer=game.rendering.spawn(limit, SpriteAtlasRenderable, [ uniforms.res, uniforms.scale, uniforms.zoom, uniforms.offset, uniforms.spriteTexture ], [ shaders.vert, shaders.frag ]);
  layer.texture = create(Texture)(textureData, game.rendering.context, id);
  return layer;
});
var AnimatedSprite = Component.define("AnimatedSprite", { 
  get pos(  ){ 
    
      return this.entity.positionInterface;
    
   },
  get scale(  ){ 
    
      return this.entity.physicalProperties.scale;
    
   },
  get point(  ){ 
    
      return this.sprite.point;
    
   },
  get column(  ){ 
    
      throw (new Error("no current frame defined"))
    
   },
  get row(  ){ 
    
      throw (new Error("No sequence index defined"))
    
   },
  alpha:1,
  get atlasXMin(  ){ 
    
      return (this.column * this.system.frameDimensions[0]);
    
   },
  get atlasYMin(  ){ 
    
      return (this.row * this.system.frameDimensions[1]);
    
   },
  get atlasXMax(  ){ 
    
      return (this.atlasXMin + this.system.frameDimensions[0]);
    
   },
  get atlasYMax(  ){ 
    
      return (this.atlasYMin + this.system.frameDimensions[1]);
    
   },
  register(  ){ 
    
      return (function() {
        if (!(this.sprite)) {
          return this.sprite = this.system.sprites.spawn();
        }
      }).call(this);
    
   },
  _clear(  ){ 
    
      this.point.x = 0;
      this.point.y = 0;
      this.point.z = 0;
      return this.sprite.size = 0;
    
   }
 });
exports.AnimatedSprite = AnimatedSprite;
var SpriteAtlas = System.define("SpriteAtlas", { 
  maxSprites:100000,
  register(  ){ 
    
      return this.sprites = spriteLayer(this.maxSprites, this.img, this.game);
    
   },
  interface:AnimatedSprite,
  spawn( entity ){ 
    
      var c = System.spawn.call(this, entity);
      return c;
    
   },
  get texture(  ){ 
    
      return this.sprites.texture;
    
   },
  _prepare(  ){ 
    
      return this.texture.enable();
    
   },
  _updateComponent( dot ){ 
    
      dot.sprite.alpha = dot.alpha;
      dot.sprite.point.x = dot.pos.x;
      dot.sprite.point.y = dot.pos.y;
      dot.sprite.point.z = dot.pos.z;
      dot.sprite.spriteStartUV.x = (dot.atlasXMin / this.img.width);
      dot.sprite.spriteStartUV.y = (dot.atlasYMin / this.img.height);
      dot.sprite.spriteEndUV.x = (dot.atlasXMax / this.img.width);
      dot.sprite.spriteEndUV.y = (dot.atlasYMax / this.img.height);
      return dot.sprite.size = (1 * dot.scale);
    
   }
 });
exports.SpriteAtlas = SpriteAtlas;