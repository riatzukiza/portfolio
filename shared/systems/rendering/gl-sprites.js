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
  /* set-point eval.sibilant:22:0 */

  vert.point.x = x;
  vert.point.y = y;
  return vert.point.z = z;
});
console.log("types", Andy.Type);
var SpriteRenderable = Renderable.define("SpriteRenderable", { 
  init( layer = this.layer ){ 
    
      this.layer = layer;
      return this;
    
   },
  structure:(new Andy.Gl.Type.Composite({ 
    point:Andy.Type.Vector3,
    size:Andy.Type.float,
    rotation:Andy.Type.float
   })),
  clear(  ){ 
    
      setPoint(0, 0, 0, this);
      return this.point.scale = 0;
    
   },
  despawn(  ){ 
    
      return this.layer.despawn(this);
    
   }
 });
exports.SpriteRenderable = SpriteRenderable;
var uniforms = Interface.define("uniforms", { 
  init( game = this.game ){ 
    
      this.game = game;
      return this;
    
   },
  get res(  ){ 
    
      return Gl.uniform("Vector2", "Resolution", this.game.config.dimensions);
    
   },
  scale:Gl.uniform("Float", "Scale", 1),
  id:0,
  get spriteTexture(  ){ 
    
      return Gl.uniform("Integer", "SpriteTexture", ((this.id)++));
    
   }
 });
var shaders = Interface.define("shaders", { 
  vert:`#version 300 es
  in vec3 a_point;
  in float a_size;
  in float a_rotation;

  out highp float vRotation;

  uniform vec2  u_Resolution;
  uniform  float u_Scale;

  vec4 clipspace_coordinate (vec3 xyz, float scale, vec2 res)
  {
    return (vec4(((xyz * vec3(1.0,1.0,1.0) * scale)
                  / vec3(res,1.0) * 1.98 - 0.99), 1.0)
            * vec4( 1.0,-1.0,1.0,1.0 ));

  }
  void main (void)
  {

    float zAxis = a_point[2];
    vec3 p = vec3(a_point);
    p.z = 1.0;

    gl_Position  = clipspace_coordinate( p, u_Scale, u_Resolution );
    gl_PointSize = a_size + zAxis;
    vRotation = a_rotation;

    //size * z
    // so that the closer the vertex is (the larger z is), the larger the vertex will be relative to its physical size

  }
  `,
  frag:`#version 300 es

  precision highp float;
  in float vRotation;
  uniform sampler2D u_SpriteTexture;  // texture we are drawing

  precision mediump float;

  out vec4 FragColor;

  void main() {

    float mid = 0.5;
    vec2 rotated = vec2(cos(vRotation) * (gl_PointCoord.x - mid) + sin(vRotation) * (gl_PointCoord.y - mid) + mid,
                        cos(vRotation) * (gl_PointCoord.y - mid) - sin(vRotation) * (gl_PointCoord.x - mid) + mid);

    vec4 rotatedTexture=texture(u_SpriteTexture, rotated);

    FragColor =  rotatedTexture;
    FragColor.rgb *= FragColor.a;
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
  /* sprite-layer eval.sibilant:91:0 */

  uniforms.init(game);
  var id = uniforms.id;
  const layer=game.rendering.spawn(limit, SpriteRenderable, [ uniforms.res, uniforms.scale, uniforms.spriteTexture ], [ shaders.vert, shaders.frag ]);
  layer.texture = create(Texture)(textureData, game.rendering.context, id);
  return layer;
});
var Sprite = Component.define("Sprite", { 
  get pos(  ){ 
    
      return this.entity.positionInterface;
    
   },
  get scale(  ){ 
    
      return this.entity.physicalProperties.scale;
    
   },
  get point(  ){ 
    
      return this.sprite.point;
    
   },
  get rotation(  ){ 
    
      return this.sprite.rotation;
    
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
exports.Sprite = Sprite;
var Sprites = System.define("Sprites", { 
  maxSprites:100000,
  register(  ){ 
    
      return this.sprites = spriteLayer(this.maxSprites, this.img, this.game);
    
   },
  interface:Sprite,
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
    
      var rotationVector = Vector.spawn(dot.entity.velocityInterface.xd, dot.entity.velocityInterface.yd);
      rotationVector.setLength(1);
      const angle=rotationVector.getAngle();
      dot.sprite.rotation = angle;
      dot.sprite.point.x = dot.pos.x;
      dot.sprite.point.y = dot.pos.y;
      dot.sprite.point.z = dot.pos.z;
      dot.sprite.size = (1.1 * dot.scale);
      return rotationVector.despawn();
    
   }
 });
exports.Sprites = Sprites;