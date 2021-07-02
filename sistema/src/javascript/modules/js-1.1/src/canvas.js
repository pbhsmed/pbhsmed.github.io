js.lib('canvas', (function(fn){
  var prototype = fn.prototype = {};

  prototype.canvas = js('<canvas></canvas>');
  prototype.context = prototype.canvas.getDom().getContext('2d');

  prototype.size = function(w, h){
    var s = {};

    if(typeof w == "number" || typeof h == "number"){
      var c = this.canvas.getDom();
      c.width = typeof w == "number" ? w : c.width;
      c.height = typeof h == "number" ? h : c.height;
    }

    s.width = this.canvas.width();
    s.height = this.canvas.height();
    return s;
  }

  prototype.CoordinateToLength = function(a, b){
    var w = this.size().width;
    return (Math.round(a) + (Math.floor(b) * w)) * 4;
  }

  prototype.LengthToCoordinate = function(a){
    var b = 0, c = 0, w = this.size().width;
    c = Math.floor(Math.floor(a / w) / 4);
    b = Math.floor(a / 4) - Math.floor(c * w);
    return [b, c];
  }

  prototype.clear = function(a, b, c, d){
    var s = this.size();
    a = typeof a != 'number' ? 0 : a < 0 ? 0 : a > s.width ? s.width : a;
    b = typeof b != 'number' ? 0 : b < 0 ? 0 : b > s.height ? s.height : b;
    c = typeof c != 'number' ? s.width : c < 0 ? 0 : c > s.width ? s.width : c;
    d = typeof d != 'number' ? s.height : d < 0 ? 0 : d > s.height ? s.height : d;
    this.context.clearRect(a, b, c, d);
    return this;
  }

  prototype.drawImg = function(){
    var a = arguments.length > 0 && arguments[0] instanceof Image ? arguments[0] : new Image(), 
        b = Array.isArray(arguments[1]) ? arguments[1].length >= 2 ? arguments[1] : [arguments[1][0], arguments[1][0]] : [0, 0], 
        c = Array.isArray(arguments[2]) ? arguments[2].length >= 2 ? arguments[2] : [arguments[2][0], arguments[2][0]] : null;

    b = [typeof b[0] == 'number' ? b[0] : 0, typeof b[1] == 'number' ? b[1] : 0];
    c = c != null && (typeof c[0] == 'number' || typeof c[1] == 'number') ? c : null;

    if(arguments.length > 0 && typeof arguments[0] == 'string'){
      var self = this, d = {};
      d.onload = function(){return;}
      d.onerror = function(){return;}
      a.crossOrigin = "";
      a.crossOrigin = "Anonymous";
      a.onload = function(){
        c = c != null ? c : [this.width, this.height];
        c[0] = typeof c[0] == 'number' ? c[0] : typeof c[1] == 'number' ? (this.width*c[1])/this.height : this.width;
        c[1] = typeof c[1] == 'number' ? c[1] : typeof c[0] == 'number' ? (this.height*c[0])/this.width : this.height;
        self.context.drawImage(this, b[0], b[1], c[0], c[1]);
        d.onload(self, this);
      }
      a.onerror = function(){d.onerror(self, this);}
      a.src = arguments[0];
      if(a.complete || a.complete === undefined){
        a.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        a.src = arguments[0];
      }
      return d;
    }else if(a instanceof Image){
      c = c != null ? c : [a.width, a.height];
      return this.context.drawImage(a, b[0], b[1], c[0], c[1]);
    }
    return this;
  }

  return function(){
    var k = [];
    for(var i=0; i<arguments.length; i++){k.push(arguments[i]);}
    return new (Function.prototype.bind.apply(fn, [null].concat(k)))();
  }
}(function(id, _conf){
  var conf = {
    width: 300, height: 250
  }

  for(var k in _conf){
    conf[k] = _conf[k];
  }

  if(typeof id == "string"){
    var c = js('canvas#'+id);
    if(c.length > 0){
      this.canvas = c;
      this.context = this.canvas.getDom().getContext('2d');
    }
  }

  this.size(conf.width, conf.height);

  return this;
})));