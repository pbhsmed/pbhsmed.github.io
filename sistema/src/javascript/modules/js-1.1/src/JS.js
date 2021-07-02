/**@license
Copyright 2015 Ismael Souza Silva.

Licenciado sob a Licença Apache, Versão 2.0 (the "License");
você não pode usar este arquivo, exceto em conformidade com a Licença.
Você pode obter uma cópia da Licença em

  http://www.apache.org/licenses/LICENSE-2.0

A menos que exigido por lei aplicável ou acordado por escrito, software
distribuído sob a Licença é distribuído em uma base "COMO ESTÁ",
SEM GARANTIAS OU CONDIÇÕES DE QUALQUER TIPO, expressas ou implícitas.
Veja a Licença para o idioma específico que governa as permissões e
limitações sob a licença.
*/

'use strict';
(function(win, js){
  var version = "1.1";
  if("object" == typeof module && "object" == typeof module.exports){
    if(module.exports = win.document){
      module.exports = js(win, version, !0);
    }else{
      module.exports = function(a){
        if(!a.document)throw new Error("JS requires a window with a document!");
        return js(a, version);
      }
    }
  }else{
    js(win, version);
  }
}("undefined"!=typeof window ? window : this, function(win, version, noGlobal){
  var lib = {};
  lib.getProto = Object.getPrototypeOf;
  lib.arr = [];
  lib.slice = lib.arr.slice;
  lib.concat = lib.arr.concat;
  lib.push = lib.arr.push;
  lib.indexOf = lib.arr.indexOf;
  lib.regexp = {
    rsingleTag : (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i),
    tag : (/^(?:\s*(<[\w\W]+>)[^>]*)$/),
    id : (/^(#([\w-]+))$/),
    rquickExpr : (/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/),
    cssSelector : {
      singlePseudoElement : (/[:]{1,2}(?:first\-(letter|line)|before|after|selection|value|choices|repeat\-(item|index)|outside|alternate|(line\-)?marker|slot\([_a-z0-9\-\+\.\\]*\))/i),
      pseudoElements : (/([:]{1,2}(?:first\-(letter|line)|before|after|selection|value|choices|repeat\-(item|index)|outside|alternate|(line\-)?marker|slot\([_a-z0-9\-\+\.\\]*\)))/ig),
      pseudoClassesExceptNot : (/([:](?:(link|visited|active|hover|focus|lang|root|empty|target|enabled|disabled|checked|default|valid|invalid|required|optional)|((in|out\-of)\-range)|(read\-(only|write))|(first|last|only|nth)(\-last)?\-(child|of\-type))(?:\([_a-z0-9\-\+\.\\]*\))?)/ig),
      attrSelectors : (/(\[\s*[_a-z0-9-:\.\|\\]+\s*(?:[~\|\*\^\$]?=\s*[\"\'][^\"\']*[\"\'])?\s*\])/ig),
      idSelectors : (/(#[a-z]+[_a-z0-9-:\\]*)/ig),
      classSelectors : (/(\.[_a-z]+[_a-z0-9-:\\]*)/ig),
      importantRule : (/\!\s*important\s*$/i),
      selector : (/(#|\.|[a-zA-Z])([^{]*)/g)
    },
    colors : (/#(?:[a-f\d]{3}){1,2}\b|rgb\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){2}\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)|\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%(?:\s*,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%){2})\s*\)|hsl\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2}\)|(?:rgba\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){3}|(?:\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*,){3})|hsla\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2},)\s*0*(?:1|0(?:\.\d+)?)\s*\)/gi),
    hex : (/#?([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/gi),
    rgb : (/rgb\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){2}\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)|\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%(?:\s*,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%){2})\s*\)/gi),
    rgba : (/rgba\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){3}|(?:\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*,){3})\s*0*(?:1|0(?:\.\d+)?)\s*\)/gi),
    hsl : (/hsl\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2}\)/gi),
    hrla : (/hsla\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2},\s*0*(?:1|0(?:\.\d+)?)\s*\)\s*0*(?:1|0(?:\.\d+)?)\s*\)/gi),
    scriptTag : (/<.*?script.*\/?>/gi),
    htmlTags : (/(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/gi),
    urlSimilarSplit : (/([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/gi),
    ipAddress : (/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/gi),
    emailValidation : (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi),
    date_M_D_Y : (/^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/gi)
  };
  lib.nodeName = function(a, b){return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();};
  lib.isFunction = function isFunction(a){return typeof a === "function" && typeof a.nodeType !== "number";};
  lib.isWindow = function isWindow(a) {return a != null && a === a.window;};
  lib.rmsPrefix = /^-ms-/,
	lib.rdashAlpha = /-([a-z])/g;
  lib.fcamelCase = function(a, b){return b.toUpperCase();}
  lib.camelCase = function(a){return a.replace( lib.rmsPrefix, "ms-" ).replace( lib.rdashAlpha, lib.fcamelCase );}
  lib.class2type = {};
  lib.toString = lib.class2type.toString;
  lib.hasOwn = lib.class2type.hasOwnProperty;
  lib.fnToString = lib.hasOwn.toString;
  lib.ObjectFunctionString = lib.fnToString.call(Object);
  lib.toType = function(a){if(a == null){return a + "";} return typeof a === "object" || typeof a === "function" ? lib.class2type[lib.toString.call(a)] || "object" : typeof a;}
  lib.isArrayLike = function(a){
    var b = !!a && "length" in a && a.length, type = lib.toType(a);
    if(lib.isFunction(a) || lib.isWindow(a)){return false;}
    return type === "array" || b === 0 || typeof b === "number" && b > 0 && ( b - 1 ) in a;
  }
  lib.htmlEntities = function(a){return String(a).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');}
  lib.DOMEval = function(a, b, c){
    b = b || document; 
    var d = {type: true, src: true, noModule: true}, script = b.createElement("script"); 
    script.text = a; 
    if(c){for(var i in d){if(c[i]){script[i] = c[i];}}} 
    b.head.appendChild(script).parentNode.removeChild(script);
  }
  lib.hasClass = function(a, b){
    var c = (a.getAttribute('class') || '').split(/\s+/g); 
    for(var d in c){if(c[d] == b){return true;}} 
    return false;
  }
  lib.addClass = function(a, b){
    if(this.hasClass(a, b) == false){
      var c = (a.getAttribute('class') || '').split(/\s+/g); 
      c.push(b); a.setAttribute('class', c.join(' '));
    } 
    return false;
  }
  lib.removeClass = function(a, b){
    if(this.hasClass(a, b) == true){
      var c = (a.getAttribute('class') || '').split(/\s+/g), d = new Array(); 
      for(var e in c){if(c[e] != b){d.push(c[e]);}} 
      a.setAttribute('class', d.join(' '));
    } 
    return false;
  }
  lib.removeElement = function(a){
    a = typeof a == "string" ? document.getElementById(a) : typeof a == "object" && a.parentNode ? a : null;
    if(a == null){return;}
    a.parentNode.removeChild(a);
  }
  lib.randomId = function(i, t){
    i = typeof i == 'number' ? i : 5; t = typeof t == "string" ? t.toLocaleLowerCase() : '';
    var l = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', n='';
    l = (t == 's' ? l.slice(0, 52) : (t == 'su' ? l.slice(0, 26) : (t == 'sl' ? l.slice(26, 52) : (t == 'n' ? l.slice(52, 62) : l))));
    for(var j=0; j<i; j++){n += l[(Math.round(Math.random()*(l.length-1)))];}
    return n;
  }
  lib.getUrlLocation = function(a){
    a = typeof a == "string" ? a : win.location.href;
    if(a.search(/^(https?\:)\/\//) < 0){a = 'http://'+a;}
    var b = a.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/) || ['', '', '', '', '', '', '', ''], c = b != null && b.length > 5 && !b[5] ? [] : b[5].split('/'), d = {}, e;
    if(c[0] == ''){c.splice(0, 1);}
    c = c.join('\/');
    if(b[6] && b[6] != ''){
      b[6].replace("?", "").split("&").forEach(function(e){
        var f = e.split("=");
        if(f[0] && f[0] != ""){d[f[0]] = decodeURIComponent(f[1]) || '';}
      });
    }
    return {href: a || '', protocol: b[1] || '', host: b[2] || '', hostname: b[3] || '', port: b[4] || '', pathname: c || '', search: d, hash: b[7] || '', vars: d, match: b}
  }
  lib.isJson = function(a){
    if(Array.isArray(a)){return false;}
    a = typeof a !== "string" ? JSON.stringify(a) : a;
    try{a = JSON.parse(a);}catch(e){return false;}
    if (typeof a === "object" && a !== null){return true;}
    return false;
  }
  lib.joinJson = function(){
    if(arguments.length <= 1){return (arguments[0] || {})}
    var r = lib.isJson(arguments[0]) ? {} : [];
    for(var i=0; i<arguments.length; i++){
      if(lib.isJson(arguments[i]) !== lib.isJson(r)){continue;}
      for(var j in arguments[i]){
        if(Array.isArray(arguments[i][j])){
          r[j] = lib.joinJson((r[j] || []), arguments[i][j]);
        }else if(js.isJson(arguments[i][j])){
          r[j] = lib.joinJson((r[j] || {}), arguments[i][j]);
        }else{
          r[j] = arguments[i][j];
        }
      }
    }
    return r;
  }
  lib.jsonEguals = function(a, b){
    var c=true;
    if(Object.keys(a).length == Object.keys(b).length){
      for(d in a){
        if(lib.isJson(a[d]) == true || Array.isArray(a[d]) == true){
          if(lib.jsonEguals(a[d], b[d]) == false){c=false; break;}
        }else if(a[d] != b[d]){c=false; break;}
      }
    }else{c=false;}
    return c;
  }
  lib.timeFormat = function(a){
    if(parseInt((a/(1000*60*60))%24) > 0 && parseInt(a/(1000*60*60)) > 0){
      a = parseInt((a/(1000*60*60))%24)+(parseInt((a/(1000*60))%60) > 0 ? '.'+parseInt((a/(1000*60))%60) : '')+' hs';
    }else if(parseInt((a/(1000*60))%60) > 0){
      a = parseInt((a/(1000*60))%60)+(parseInt((a/1000)%60) > 0 ? '.'+parseInt((a/1000)%60) : '')+' min';
    }else if(parseInt((a/1000)%60) > 0){
      a = parseInt((a/1000)%60)+(parseInt((a%1000)/10) > 0 ? '.'+parseInt((a%1000)/10) : '')+' s';
    }else if(parseInt((a%1000)/100) > 0){
      a = parseInt((a%1000)/100)+' ms';
    }else{a = '0 ms';}
    return a;
  }
  lib.sizeFormat = function(a){
    if(a >= 1073741824){a = (a / 1073741824).toFixed(2) + " gb";}
    else if(a >= 1048576){a = (a / 1048576).toFixed(2) + " mb";}
    else if(a >= 1024){a = (a / 1024).toFixed(2) + " kb";}
    else if(a > 1){a = a + " bytes";}
    else if(a == 1){a = a + " byte";}
    else{a = "0 bytes";}
    return a;
  }
  lib.storage = function(a){
    a = typeof a != "string"? null : a;
    if(a == null){return;}
    return {
      "set": function(b){window.localStorage.setItem(a, b);}, 
      "get": function(){return window.localStorage.getItem(a);}, 
      "remove": function(){window.localStorage.removeItem(a);},
      "isValid": function(){return window.localStorage.hasOwnProperty(a);}
    };
  }
  lib.each = function(a, b){
    if(typeof a.splice == 'function'){
      for(var c = 0; c < a.length; c += 1){b(c, a[c]);}
    }else{
      for(var d in a){b(d, a[d]);}
    }
  }
  lib.grep = function(a, b){
    var c = []; 
    for(var d = 0; d < a.length; d += 1){var e = a[d]; if(b(e)){c.push(e);}} 
    return c;
  }
  lib.support = {};
  lib.support.createHTMLDocument = (function(){
    var body = document.implementation.createHTMLDocument("").body;
    body.innerHTML = "<form></form><form></form>";
    return body.childNodes.length === 2;
  })();
  lib.parser = (function(){return new window.DOMParser()}());
  lib.parseHTML = function(a, type){
    if(!a || typeof a !== "string"){return [];}
    type = ["HTML", "XML", "SVG"].includes(String(type).toLocaleUpperCase()) ? String(type).toLocaleUpperCase() : "HTML";
    var b, c = []; 
    var types = {
      "HTML": "text/html",
      "XML": "application/xml",
      "SVG": "image/svg+xml"
    }

    var isSVGRoot = a.search("<svg") >= 0;

    if(type === "SVG" && isSVGRoot !== true){
      a = "<svg xmlns=\'http://www.w3.org/2000/svg\'>" + a + "</svg>";
    }

    b = lib.parser.parseFromString(a, types[type]);

    if (!b || b.getElementsByTagName("parsererror").length){
      js.error( "Invalid XML: " + b.getElementsByTagName("parsererror")[0].outerText);
    }else if(type === "HTML" || type === "XML" || (type === "SVG" && isSVGRoot !== true)){
      b = (type === "HTML" ? b.body : type === "SVG" ? b.firstChild : b);
      while(b.firstChild){c.push(b.firstChild); b.removeChild(b.firstChild);}
    }else if(type === "SVG" && isSVGRoot){
      c.push(b.firstChild);
    }

    return c;
  }
  lib.parserXML = function(a){
    if(!a || typeof a !== "string"){return [];}
    var b, c = []; 
    b = lib.parser.parseFromString(a, "text/xml");
    if (!b || b.getElementsByTagName("parsererror").length){
      js.error( "Invalid XML: " + a);
    }else{
      while(b.firstChild){c.push(b.firstChild); b.removeChild(b.firstChild);}
    }
    return c;
  }
  lib.matches = function(a, b){
    if(a.nodeType != 1){return false;}
    else if(!b){return true;} 
    var c = b.split(/[,\s]+/g); 
    for(var d = 0; d < c.length; d += 1){
      var e = c[d]; 
      if(e.substring(0, 1) == '#'){
        throw 'not supported:' + e;
      }else if(e.substring(0, 1) == '.'){
        if(this.hasClass(a, e.substring(1))){return true;}
      }else{
        if(a.tagName.toUpperCase() == e.toUpperCase()){return true;}
      }
    } 
    return false;
  }
  lib.pxToNum = function(a){
    if(!a || typeof a != 'string' || a.length <= 2 || a.charAt(a.length - 2) != 'p' || a.charAt(a.length - 1) != 'x'){return 0;} 
    return +a.substring(0, a.length - 2);
  }

  lib.jsonToArray=function(a){
    var b = "[";
    for(var k in a){
      if(typeof a[k] == "object"){
        b += "[\""+k+"\", "+toArray(a[k])+"],";
      }else if(typeof a[k] == "string"){
        b += "[\""+k+"\", \""+a[k]+"\"],";
      }else if(typeof a[k] != "function"){
        b += "[\""+k+"\", "+a[k]+"],";
      }
    }
    b = b.replace(/\,$/, "");
    return b+"]";
  }

  lib.xmlhttp = function(){
    var xmlhttp;
    if(window.XMLHttpRequest){ xmlhttp = new XMLHttpRequest();}
    else if(window.ActiveXObject("Msxml2.XMLHTTP")){xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");}
    else if(window.ActiveXObject("Msxml3.XMLHTTP")){xmlhttp = new ActiveXObject("Msxml3.XMLHTTP");}
    else if(window.ActiveXObject("Microsoft.XMLHTTP")){xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");}
    return xmlhttp;
  }
  lib.getThisLine = function(){
    var line = ["Error"];
    try{throw new Error("");}
    catch(e){var line = e.stack.replace(/\s+\s+?/gi, "\n").split(/\n+/gi);}
    for(var i=1; i<line.length; i++){
      line[i] = line[i].replace(/at(\s+)/gi, "").replace(/\((.+)\)/gi, "$1").split(/\s/gi);
      line[i] = line[i][line[i].length-1];
    }
    return line[2];
  }
  lib.BezierEasing = function(x1, y1, x2, y2){
    if (!(0 <= x1 && x1 <= 1 && 0 <= x2 && x2 <= 1)){throw new Error('bezier x values must be in [0, 1] range');}
    var kSplineTableSize = 11, kSampleStepSize = 1.0 / (kSplineTableSize - 1.0),
        A = function(a, b){return 1.0 - 3.0 * b + 3.0 * a;},
        B = function(a, b){return 3.0 * b - 6.0 * a;},
        C = function(a){return 3.0 * a;},
        calcBezier = function(a, b, c){return ((A(b, c) * a + B(b, c)) * a + C(b)) * a;},
        getSlope = function(a, b, c){return 3.0 * A(b, c) * a * a + 2.0 * B(b, c) * a + C(b);},
        binarySubdivide = function(a, b, c, d, e){
          var f, g, i = 0;
          do{
            g = b + (c - b) / 2.0; f = calcBezier(g, d, e) - a;
            if(f > 0.0){c = g;}else{b = g;}
          }while(Math.abs(f) > 0.0000001 && ++i < 10);
          return g;
        },
        newtonRaphsonIterate = function(a, b, c, d){
          for(var i = 0; i < 4; ++i){
            var currentSlope = getSlope(b, c, d);
            if(currentSlope === 0.0){return b;}
            var currentX = calcBezier(b, c, d) - a;
            b -= currentX / currentSlope;
          }
          return b;
        };
    
    if(x1 === y1 && x2 === y2){return function(x){return x;};}
    var sampleValues = (typeof Float32Array === 'function') ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
    for(var i = 0; i < kSplineTableSize; ++i){sampleValues[i] = calcBezier(i * kSampleStepSize, x1, x2);}
    var getTForX = function(a){
      var b = 0.0, c = 1, d = kSplineTableSize - 1;
      for(; c !== d && sampleValues[c] <= a; ++c){b += kSampleStepSize;}
      --c;
      var e = (a - sampleValues[c]) / (sampleValues[c + 1] - sampleValues[c]), f = b + e * kSampleStepSize, g = getSlope(f, x1, x2);
      if(g >= 0.001){return newtonRaphsonIterate(a, f, x1, x2);}else if(g === 0.0){return f;}else{return binarySubdivide(a, b, b + kSampleStepSize, x1, x2);}
    }
    return {
      easing : function(x){
        if(x === 0){return 0;}
        if(x === 1){return 1;}
        return calcBezier(getTForX(x), y1, y2);
      }
    };
  }
  lib.BezierEasing.ease = lib.BezierEasing(0.25, 0.1, 0.25, 1.0);
  lib.BezierEasing.linear = lib.BezierEasing(0.00, 0.0, 1.00, 1.0);
  lib.BezierEasing.easeIn = lib.BezierEasing(0.42, 0.0, 1.00, 1.0);
  lib.BezierEasing.easeOut = lib.BezierEasing(0.00, 0.0, 0.58, 1.0);
  lib.BezierEasing.easeInOut = lib.BezierEasing(0.42, 0.0, 0.58, 1.0);

  lib.Keymap = function(a){
    this.map = {};
    if(lib.isJson(a)){for(b in a){this.bind(b, a[b]);}}
  }

  lib.Keymap.prototype.bind = function(a, b){if(typeof b != "function"){return;} this.map[lib.Keymap.normalize(a)] = b;}
  lib.Keymap.prototype.unbind = function(a){this.map[lib.Keymap.normalize(a)] = undefined;}
  lib.Keymap.prototype.install = function(a){
    var b = this, c = function(d){return b.dispatch(d, a)};
    if(a.on && typeof a.on == "function"){a.on("keydown", c, false);}
    else if(a.addEventListener){a.addEventListener("keydown", c, false)}
    else if(a.attachEvent){a.attachEvent("onkeydown", c)}
  }
  lib.Keymap.prototype.dispatch = function(a, b){
    var c = "", d = null;
    if(a.altKey){c += "alt_"}
    if(a.ctrlKey){c += "ctrl_"}
    if(a.metaKey){c += "meta_"}
    if(a.shiftKey){c += "shift_"}

    if(a.key){d = a.key;}
    else if(a.keyIdentifier && a.keyIdentifier.substring(0, 2) !== "U+"){d = a.keyIdentifier;}
    else{d = lib.Keymap.keyCode[a.keyCode].split(" || ")[0];}

    if(!d){return;}
    var e = c + d.toLowerCase(), f = this.map[e];
    if(typeof f == "function"){
      var g = f.call(b, a, e);
      if(g == false){
        if(a.stopPropagation){a.stopPropagation();}else{a.cancelBubble = true;}
        if(a.preventDefault){a.preventDefault();}else{a.returnValue = false;}
      }
      return g;
    }
  }
  lib.Keymap.normalize = function(a){
    if(typeof a != "string"){return;}
    a = a.toLowerCase();
    var b = a.split(/\s+|[\-+_]/), c = b.pop();
    c = lib.Keymap.aliases[c] || c;
    b.sort(); b.push(c);
    return b.join("_");
  }
  lib.Keymap.aliases = {'escape' : 'esc', 'delete' : 'del', 'return' : 'enter', 'crtl' : 'control', 'space' : 'spacebar', 'ins' : 'insert'}
  lib.Keymap.keyCode = {3 : 'Break', 8 : 'Backspace', 9 : 'Tab', 12 : 'Clear', 13 : 'Enter', 16 : 'Shift', 17 : 'Control', 18 : 'Alt', 19 : 'Pause', 20 : 'CapsLock', 27 : 'Esc', 32 : 'Spacebar', 33 : 'PageUp', 34 : 'PageDown', 35 : 'End', 36 : 'Home', 37 : 'Left', 38 : 'Up', 39 : 'Right', 40 : 'Down', 41 : 'Select', 42 : 'Print', 43 : 'Execute', 44 : 'PrintScreen', 45 : 'Insert', 46 : 'Delete', 48 : '0', 49 : '1', 50 : '2', 51 : '3', 52 : '4', 53 : '5', 54 : '6', 55 : '7', 56 : '8', 57 : '9', 58 : ':', 59 : ';', 60 : '<', 61 : '=', 63 : 'ß', 64 : '@', 65 : 'A', 66 : 'B', 67 : 'C', 68 : 'D', 69 : 'E', 70 : 'F', 71 : 'G', 72 : 'H', 73 : 'I', 74 : 'J', 75 : 'K', 76 : 'L', 77 : 'M', 78 : 'N', 79 : 'O', 80 : 'P', 81 : 'Q', 82 : 'R', 83 : 'S', 84 : 'T', 85 : 'U', 86 : 'V', 87 : 'W', 88 : 'X', 89 : 'Y', 90 : 'Z', 91 : 'Windows || Left⌘ || ChromebookSearch', 92 : 'RightWindo', 93 : 'WindowsMenu || Right⌘', 96 : '0', 97 : '1', 98 : '2', 99 : '3', 100 : '4', 101 : '5', 102 : '6', 103 : '7', 104 : '8', 105 : '9', 106 : 'Multiply', 107 : 'Add', 108 : 'Period', 109 : 'Subtract', 110 : 'DecimalPoint', 111 : 'Divide', 112 : 'F1', 113 : 'F2', 114 : 'F3', 115 : 'F4', 116 : 'F5', 117 : 'F6', 118 : 'F7', 119 : 'F8', 120 : 'F9', 121 : 'F10', 122 : 'F11', 123 : 'F12', 124 : 'F13', 125 : 'F14', 126 : 'F15', 127 : 'F16', 128 : 'F17', 129 : 'F18', 130 : 'F19', 131 : 'F20', 132 : 'F21', 133 : 'F22', 134 : 'F23', 135 : 'F24', 144 : 'NumLock', 145 : 'ScrollLock', 160 : '^', 161: '!', 163 : '#', 164: '$', 165: 'ù', 166 : 'PageBackward', 167 : 'Page Forward', 169 : 'ClosingParen', 170: '*', 171 : '~ || + || *', 173 : 'Minus', 174 : 'DecreaseVolumeLevel', 175 : 'IncreaseVolumeLevel', 176 : 'Next', 177 : 'Previous', 178 : 'Stop', 179 : 'Play || Pause', 180 : 'E-mail', 181 : 'Mute || Unmute', 182 : 'DecreaseVolumeLevel', 183 : 'IncreaseVolumeLevel', 186 : 'Semi-Colon', 187 : 'EqualSign', 188 : 'Comma', 189 : 'Dash', 190 : 'Period', 191 : 'ForwardSlash', 192 : 'GraveAccent', 193 : '?', 194 : 'Period', 219 : 'Open Bracket', 220 : 'BackSlash', 221 : 'CloseBracket', 222 : 'SingleQuote', 223 : '`', 224 : '⌘', 225 : 'Altgr', 226 : '</git>', 230 : 'GNOMECompose', 231 : 'ç', 233 : 'XF86Forward', 234 : 'XF86Back', 255 : 'ToggleTouchpad'};

  lib.isQuerySelector = function(selector){
    if(typeof selector != "string"){return false;}
    selector = selector.replace(/(\s+)?([\*\+\~\>])(?!\=)(\s+)?/gi, " ");
    selector = selector.split(/(\s+)?\,(\s+)?/gi);
    for(var i=0; i<selector.length; i++){
      var si = selector[i].replace(/(\s+)$/gi, "").split(/\s+/gi);
      for(var j=0; j<si.length; j++){
        var n = si[j], s = /^(([\*\+\~\>])|((((\w)|(\#)|(\.))([\w\-]+)?)+(((\[(?:[^\]\[]+|\[(?:[^\]\[]+|\[[^\]\[]*\])*\])*\])|([:]{1,2}([\-\w])+(\w|(\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)))))?)+))+$/gi;
        if(!s.test(n)){
          return false;
        }
      }
    }
    return true;
  }

  lib.querySelectorAll = function(selector){
    var _s = selector;
    if(!this.isQuerySelector(selector)){return [];}
    var a = [], b = document;
    selector = selector.split(/(\s+)?\,(\s+)?/gi);

    for(var i=0; i<selector.length; i++){
      var s = selector[i].replace(/(([\w|\#|\.]([\w\-]+)?)+|(\[(?:[^\]\[]+|\[(?:[^\]\[]+|\[[^\]\[]*\])*\])*\])|([:]{1,2}([\-\w])+(\w|(\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\))))|((\s+)?([\*\+\~\>])(\s+)?))/gi, "$1 ");
      s = s.replace(/(\s+)$/gi, "").split(/\s+/gi);
      b = document.querySelectorAll(s[0]);
      console.log(s);
      if(b.length <= 0){return [];}
      for(var j=1; j<s.length; j++){
        var n = s[j], ns = [];
        if(n == ">"){
          continue;
        }else if(n == "*"){
          for(var k=0; k<b.length; k++){
            b[k].childNodes.forEach(function(a){ns.push(a)});
          }
        }else if(n == "+" || n == "~"){
          break;
        }else if((/^([\w|\#|\.]([\w\-]+)?)+$/gi).test(n)){
          for(var k=0; k<b.length; k++){
            b[k].querySelectorAll(n).forEach(function(a){ns.push(a)});
          }
        }else if((/^(\[(?:[^\]\[]+|\[(?:[^\]\[]+|\[[^\]\[]*\])*\])*\])$/gi).test(n)){
          var m = n.replace(/[\[\]]/gi, "").match(/([\w\-]+)([\~\|\^\$\*])?(=)?(.+)?/i);
          m[4] = m[4] ? m[4].replace(/^[\"\']/gi, "").replace(/[\"\']$/gi, "") : m[4];
          for(var k=0; k<b.length; k++){
            if(!m[1] || !b[k].hasAttribute(m[1])){continue;}
            if(!m[2] && !m[3] && !m[4]){
              ns.push(b[k]);
            }else if(!m[2] && m[4] && (m[4] == b[k].getAttribute(m[1]))){
              ns.push(b[k]);
            }else if(m[4] && m[2] == "^" && (new RegExp("^"+m[4], "gi").test(b[k].getAttribute(m[1])))){
              ns.push(b[k]);
            }else if(m[4] && m[2] == "$" && (new RegExp(m[4]+"$", "gi").test(b[k].getAttribute(m[1])))){
              ns.push(b[k]);
            }else if(m[4] && (m[2] == "*" || m[2] == "~" || m[2] == "|") && (new RegExp(m[4], "gi").test(b[k].getAttribute(m[1])))){
              ns.push(b[k]);
            }
          }
        }else if((/^([:]{1,2}([\-\w])+(\w|(\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\))))$/gi).test(n)){
          var m = n.match(/([:]{1,2})([\-\w]+)(\w|(\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)))/i);
        }

        b = ns;
      }
      console.log(b);
    }

    b.item = function(a){return b[a];}
    return b;
  }

  lib.Base64 = {};
  lib.Base64.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  lib.Base64.encode = function(a, b){
    b = (typeof b == 'undefined') ? false : b;
    var o1, o2, o3, bits, h1, h2, h3, h4, e=[], pad = '', c, plain, coded, b64 = lib.Base64.code;
    plain = b ? a.encodeUTF8() : a;
    c = plain.length % 3;
    if(c > 0){while(c++ < 3){pad += '='; plain += '\0';}}
    for(c=0; c<plain.length; c+=3){
      o1 = plain.charCodeAt(c); o2 = plain.charCodeAt(c+1); o3 = plain.charCodeAt(c+2);
      bits = o1<<16 | o2<<8 | o3;
      h1 = bits>>18 & 0x3f; h2 = bits>>12 & 0x3f; h3 = bits>>6 & 0x3f; h4 = bits & 0x3f;
      e[c/3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    }
    coded = e.join('');
    coded = coded.slice(0, coded.length-pad.length) + pad;
    return coded;
  }
  lib.Base64.decode = function(a, b) {
    b = (typeof b == 'undefined') ? false : b;
    var o1, o2, o3, h1, h2, h3, h4, bits, d=[], plain, coded, b64 = lib.Base64.code;
    coded = b ? a.decodeUTF8() : a;
    for(var c=0; c<coded.length; c+=4){
      h1 = b64.indexOf(coded.charAt(c)); h2 = b64.indexOf(coded.charAt(c+1)); h3 = b64.indexOf(coded.charAt(c+2)); h4 = b64.indexOf(coded.charAt(c+3));
      bits = h1<<18 | h2<<12 | h3<<6 | h4;
      o1 = bits>>>16 & 0xff; o2 = bits>>>8 & 0xff; o3 = bits & 0xff;
      d[c/4] = String.fromCharCode(o1, o2, o3);
      if(h4 == 0x40){d[c/4] = String.fromCharCode(o1, o2);}
      if(h3 == 0x40){d[c/4] = String.fromCharCode(o1);}
    }
    plain = d.join('');
    return b ? plain.decodeUTF8() : plain; 
  }

  lib.Utf8 = {};
  lib.Utf8.encode = function(a){
    var b = a.replace(/[\u0080-\u07ff]/g, function(c){var cc = c.charCodeAt(0); return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f);});
    b = b.replace(/[\u0800-\uffff]/g, function(c){var cc = c.charCodeAt(0); return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); });
    return b;
  }
  lib.Utf8.decode = function(a){
    var b = a.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function(c){var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f); return String.fromCharCode(cc); });
    b = b.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function(c){var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;return String.fromCharCode(cc); });
    return b;
  }

  lib.Crypto = function(key, nBits){
    this.key = typeof key == "string" ? key : null;
    this.nBits = typeof nBits == "number" && (nBits==128 || nBits==192 || nBits==256) ? nBits : 256;
  }
  lib.Crypto.prototype.setKey = function(a){this.key = typeof a == "string" ? a : this.key;}
  lib.Crypto.prototype.setNBits = function(a){this.nBits = typeof a == "number" && (a==128 || a==192 || a==256) ? a : this.nBits;}
  lib.Crypto.cipher = function(a, w){
    var Nb = 4, Nr = w.length/Nb - 1, b = [[],[],[],[]];
    for(var i=0; i<4*Nb; i++){b[i%4][Math.floor(i/4)] = a[i];}
    b = lib.Crypto.addRoundKey(b, w, 0, Nb);
    for(var r=1; r<Nr; r++){
      b = lib.Crypto.subBytes(b, Nb); b = lib.Crypto.shiftRows(b, Nb); b = lib.Crypto.mixColumns(b, Nb); b = lib.Crypto.addRoundKey(b, w, r, Nb);
    }
    b = lib.Crypto.subBytes(b, Nb); b = lib.Crypto.shiftRows(b, Nb); b = lib.Crypto.addRoundKey(b, w, Nr, Nb);
    var c = new Array(4*Nb);
    for(var i=0; i<4*Nb; i++){c[i] = b[i%4][Math.floor(i/4)];}
    return c;
  }
  lib.Crypto.keyExpansion = function(key){
    var Nb = 4, Nk = key.length/4, Nr = Nk + 6, w = new Array(Nb*(Nr+1)), temp = new Array(4);
    for(var i=0; i<Nk; i++){var r = [key[4*i], key[4*i+1], key[4*i+2], key[4*i+3]]; w[i] = r;}
    for(var i=Nk; i<(Nb*(Nr+1)); i++){
      w[i] = new Array(4);
      for(var t=0; t<4; t++){temp[t] = w[i-1][t];}
      if(i % Nk == 0){
        temp = lib.Crypto.subWord(lib.Crypto.rotWord(temp));
        for(var t=0; t<4; t++){temp[t] ^= lib.Crypto.rCon[i/Nk][t];}
      }else if(Nk > 6 && i%Nk == 4){temp = lib.Crypto.subWord(temp);}
      for(var t=0; t<4; t++){w[i][t] = w[i-Nk][t] ^ temp[t];}
    }
    return w;
  }
  lib.Crypto.subBytes = function(s, Nb){for(var r=0; r<4; r++){for(var c=0; c<Nb; c++){s[r][c] = lib.Crypto.sBox[s[r][c]];}}return s;}
  lib.Crypto.shiftRows = function(s, Nb){
    var t = new Array(4);
    for(var r=1; r<4; r++){
      for(var c=0; c<4; c++){t[c] = s[r][(c+r)%Nb];}
      for(var c=0; c<4; c++){s[r][c] = t[c];}
    }
    return s;
  }
  lib.Crypto.mixColumns = function(s){
    for(var c=0; c<4; c++){
      var a = new Array(4), b = new Array(4);
      for(var i=0; i<4; i++){a[i] = s[i][c]; b[i] = s[i][c]&0x80 ? s[i][c]<<1 ^ 0x011b : s[i][c]<<1;}
      s[0][c] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3];
      s[1][c] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3];
      s[2][c] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3];
      s[3][c] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3];
    }
    return s;
  }
  lib.Crypto.addRoundKey = function(a, w, rnd, Nb){for(var r=0; r<4; r++){for(var c=0; c<Nb; c++){a[r][c] ^= w[rnd*4+c][r];}} return a;}
  lib.Crypto.subWord = function(w){for(var i=0; i<4; i++){w[i] = lib.Crypto.sBox[w[i]];} return w;}
  lib.Crypto.rotWord = function(w){var tmp = w[0]; for(var i=0; i<3; i++){w[i] = w[i+1];} w[3] = tmp; return w;}
  lib.Crypto.sBox = [0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76, 0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0, 0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15, 0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75, 0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84, 0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf, 0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8, 0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2, 0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73, 0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb, 0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79, 0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08, 0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a, 0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e, 0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf, 0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16];
  lib.Crypto.rCon = [[0x00, 0x00, 0x00, 0x00], [0x01, 0x00, 0x00, 0x00], [0x02, 0x00, 0x00, 0x00], [0x04, 0x00, 0x00, 0x00], [0x08, 0x00, 0x00, 0x00], [0x10, 0x00, 0x00, 0x00], [0x20, 0x00, 0x00, 0x00], [0x40, 0x00, 0x00, 0x00], [0x80, 0x00, 0x00, 0x00], [0x1b, 0x00, 0x00, 0x00], [0x36, 0x00, 0x00, 0x00]];

  lib.Crypto.prototype.encrypt = function(a){
    var bS = 16, psw = lib.Utf8.encode(this.key), nBytes = this.nBits/8, pwBytes = new Array(nBytes);
    a = lib.Utf8.encode(a);
    for(var i=0; i<nBytes; i++){pwBytes[i] = isNaN(psw.charCodeAt(i)) ? 0 : psw.charCodeAt(i);}
    var key = lib.Crypto.cipher(pwBytes, lib.Crypto.keyExpansion(pwBytes));
    key = key.concat(key.slice(0, nBytes-16));
    var cB = new Array(bS), nonce = (new Date()).getTime(), nMs = nonce%1000, nSec = Math.floor(nonce/1000), nRnd = Math.floor(Math.random()*0xffff);
    for(var i=0; i<2; i++){cB[i]   = (nMs  >>> i*8) & 0xff;}
    for(var i=0; i<2; i++){cB[i+2] = (nRnd >>> i*8) & 0xff;}
    for(var i=0; i<4; i++){cB[i+4] = (nSec >>> i*8) & 0xff;}
    var ctrTxt = '';
    for(var i=0; i<8; i++){ctrTxt += String.fromCharCode(cB[i]);}
    var kS = lib.Crypto.keyExpansion(key), bC = Math.ceil(a.length/bS), ct = new Array(bC);
    for(var b=0; b<bC; b++){
      for(var c=0; c<4; c++){cB[15-c] = (b >>> c*8) & 0xff;}
      for(var c=0; c<4; c++){cB[15-c-4] = (b/0x100000000 >>> c*8)}
      var cCntr = lib.Crypto.cipher(cB, kS), bL = b<bC-1 ? bS : (a.length-1)%bS+1, cChar = new Array(bL);
      for(var i=0; i<bL; i++){
        cChar[i] = cCntr[i] ^ a.charCodeAt(b*bS+i);
        cChar[i] = String.fromCharCode(cChar[i]);
      }
      ct[b] = cChar.join(''); 
    }
    return lib.Base64.encode(ctrTxt + ct.join(''));
  }

  lib.Crypto.prototype.decrypt = function(a){
    var bS = 16, psw = lib.Utf8.encode(this.key), nBytes = this.nBits/8, pwBytes = new Array(nBytes);
    a = lib.Base64.decode(a);
    for(var i=0; i<nBytes; i++){pwBytes[i] = isNaN(psw.charCodeAt(i)) ? 0 : psw.charCodeAt(i);}
    var key = lib.Crypto.cipher(pwBytes, lib.Crypto.keyExpansion(pwBytes));
    key = key.concat(key.slice(0, nBytes-16));
    var cB = new Array(8), ctrTxt = a.slice(0, 8);
    for(var i=0; i<8; i++){cB[i] = ctrTxt.charCodeAt(i);}
    var kS = lib.Crypto.keyExpansion(key), nB = Math.ceil((a.length-8) / bS), ct = new Array(nB);
    for(var b=0; b<nB; b++){ct[b] = a.slice(8+b*bS, 8+b*bS+bS);}
    a = ct;
    var plaintxt = new Array(a.length);
    for(var b=0; b<nB; b++){
      for(var c=0; c<4; c++){cB[15-c] = ((b) >>> c*8) & 0xff;}
      for(var c=0; c<4; c++){cB[15-c-4] = (((b+1)/0x100000000-1) >>> c*8) & 0xff;}
      var cCntr = lib.Crypto.cipher(cB, kS), pB = new Array(a[b].length);
      for(var i=0; i<a[b].length; i++){
        pB[i] = cCntr[i] ^ a[b].charCodeAt(i);
        pB[i] = String.fromCharCode(pB[i]);
      }
      plaintxt[b] = pB.join('');
    }
    return lib.Utf8.decode(plaintxt.join(''));
  }

  lib.Crypto.fromHex = function(a){var b; try{ b = decodeURIComponent(a.replace(/(..)/g,'%$1'));}catch(e){b = a;} return b;}
  lib.Crypto.toHex = function(a){var b; try{b = unescape(encodeURIComponent(a)).split('').map(function(c){return c.charCodeAt(0).toString(16)}).join('');} catch(e){b = a;} return b;}

  lib.querySelector = function(selector){
    return this.querySelectorAll(selector)[0] || null;
  }

  lib.CSSJSON = {};
  lib.CSSJSON.toJSON = function(cssCode){
    var commentX = /\/\*[\s\S]*?\*\//g, lineAttrX = /([^\:]+):([^\;]*);/, altX = /(\/\*[\s\S]*?\*\/)|([^\s\;\{\}][^\;\{\}]*(?=\{))|(\})|([^\;\{\}]+\;(?!\s*\*\/))/gmi, capComment = 1, capSelector = 2, capEnd = 3, capAttr = 4;
    var isEmpty = function(x){return typeof x == 'undefined' || x.length == 0 || x == null;};
    var toJson = function(cssString, args){
      var node = {children: {}, attributes: {}}, match = null, count = 0;
      if(typeof args == 'undefined'){
        var args = {ordered: false, comments: false, stripComments: false, split: false};
      }
      if(args.stripComments){
        args.comments = false;
        cssString = cssString.replace(commentX, '');
      }
      while((match = altX.exec(cssString)) != null){
        if(!isEmpty(match[capComment]) && args.comments){
          var add = match[capComment].trim();
          node[count++] = add;
        }else if(!isEmpty(match[capSelector])){
          var name = match[capSelector].trim();
          var newNode = toJson(cssString, args);
          if(args.ordered){
            var obj = {};
            obj['name'] = name; obj['value'] = newNode; obj['type'] = 'rule';
            node[count++] = obj;
          }else{
            var bits = args.split ? name.split(',') : [name];
            for(var i = 0; i < bits.length; i++){
              var sel = bits[i].trim();
              if(sel in node.children){
                for(var att in newNode.attributes){
                  node.children[sel].attributes[att] = newNode.attributes[att];
                }
              }else{
                node.children[sel] = newNode;
              }
            }
          }
        }else if(!isEmpty(match[capEnd])){
          return node;
        }else if(!isEmpty(match[capAttr])){
          var line = match[capAttr].trim(), attr = lineAttrX.exec(line);
          if(attr){
            var name = attr[1].trim(), value = attr[2].trim();
            if(args.ordered){
              var obj = {};
              obj['name'] = name; obj['value'] = value; obj['type'] = 'attr';
              node[count++] = obj;
            }else{
              if(name in node.attributes){
                var currVal = node.attributes[name];
                if(!(currVal instanceof Array)){
                    node.attributes[name] = [currVal];
                }
                node.attributes[name].push(value);
              }else{
                node.attributes[name] = value;
              }
            }
          }else{
            node[count++] = line;
          }
        }
      }
      return node;
    }
    var getSelector = function(selec){return selec.search(",") >= 0 ? [selec] : selec.replace(/(\s+)?([\:\,])(\s+)?/gi, "$2").replace(/(\s+)?([\>\*])(\s+)?/gi, " $2 ").trim().split(" ");}
    var getChildrens = function(json, key, value){
      var keys = getSelector(key), children = {};
      for(var k=keys.length-1; k>=0; k--){
        if(k>=keys.length-1){
          children[keys[k]] = value;
        }else{
          var temp = children; children = {}; children[keys[k]] = temp;
        }
      }
      json = js.joinJson(json, children);
      return json;
    }
    var json = {}, convert = toJson(cssCode).children;
    for(var i in convert){
      if(i.search("@") >= 0){
        json[i] = {};
        for(var j in convert[i].children){
          json[i] = getChildrens(json[i], j, convert[i].children[j].attributes);
        }
      }else{
        json = getChildrens(json, i, convert[i].attributes);
      }
    }
    return json;
  }
  lib.CSSJSON.toCSS = function(node){
    if(!js.isJson(node)){return ''}
    var isHaveBlocks = function(node){
      var isHave = false;
      for(var i in node){
        if(js.isJson(node[i]) && isHave === false){
          isHave = true;
          break;
        }
      }
      return isHave;
    }
    var getAllBlocks = function(node){
      var blocks = {};
      for(var i in node){
        if(js.isJson(node[i])){
          if(i.search("@") >= 0){
            blocks[i.trim()] = getAllBlocks(node[i]);
          }else{
            if(isHaveBlocks(node[i])){
              var b = getAllBlocks(node[i], i);
              for(var j in b){
                if(j === "___attributes___"){
                  blocks[i.trim()] = b[j];
                }else{
                  blocks[i.trim() + " " + j.trim()] = b[j];
                }
              }
            }else{
              blocks[i.trim()] = node[i];
            }
          }
        }else{
          if("___attributes___" in blocks === false){blocks["___attributes___"] = {};}
          blocks["___attributes___"][i.trim()] = node[i];
        }
      }
      return blocks;
    }
    var strAttr = function(attrs, depth){
      var code = "";
      for(var i in attrs){
        code += ('\t'.repeat(depth)) + i + ': ' + attrs[i] + ';\n';
      }
      return code;
    };
    var allBlocks = getAllBlocks(node), codeCss = "";
    for(var i in allBlocks){
      if(i.search("@") >= 0){
        codeCss += (i + ' {\n');
        for(var j in allBlocks[i]){
          codeCss += (('\t'.repeat(1)) + j + ' {\n' + strAttr(allBlocks[i][j], 2) + ('\t'.repeat(1)) + '}\n');
        }
        codeCss += ('}\n');
      }else{
        codeCss += (i + ' {\n' + strAttr(allBlocks[i], 1) + '}\n');
      }
    }
    return codeCss;
  }
  lib.CSSJSON.toHEAD = function(data, id, replace){
    var head = document.getElementsByTagName('head')[0], xnode = document.getElementById(id), _xnodeTest = (xnode !== null && xnode instanceof HTMLStyleElement);
    var isEmpty = function(x){return typeof x == 'undefined' || x == null;};
    var isValidStyleNode = function(node){return (node instanceof HTMLStyleElement) && node.sheet.cssRules.length > 0;}
    var timestamp = function(){return Date.now() || +new Date();};
    if(isEmpty(data) || !(head instanceof HTMLHeadElement)) return;
    if(_xnodeTest){
      if(replace === true || isEmpty(replace)){
        xnode.removeAttribute('id');
      }else return;
    }
    if(js.isJson(data)){data = lib.CSSJSON.toCSS(data);}
    var node = document.createElement('style');
    node.type = 'text/css';
    if(!isEmpty(id)){node.id = id;}else{node.id = 'cssjson_' + timestamp();}
    if(node.styleSheet){
      node.styleSheet.cssText = "\n"+data;
    }else{
      node.appendChild(document.createTextNode("\n"+data));
    }
    head.appendChild(node);
    if(isValidStyleNode(node)){
      if(_xnodeTest){
        xnode.parentNode.removeChild(xnode);
      }
    }else{
      node.parentNode.removeChild(node);
      if(_xnodeTest){
        xnode.setAttribute('id', id);
        node = xnode;
      }else return;
    }
    return node;
  };

  var js = function(selector, context){return new fn.init(selector, context);}
  
  var fn = js.prototype = {};
  fn.constructor = js;
  fn.toArray = function(){return lib.slice.call(this);}
  fn.get = function(a) {
    if(a == null){return lib.slice.call(this);}
		return a < 0 ? this[a + this.length] : this[a];
  }
  fn.pushStack = function(a){
		var b = js.merge(this.constructor(), a);
		b.prevObject = this;
		return b;
  }
  fn.each = function(a){return js.each(this, a);}
  fn.map = function(a){return this.pushStack(js.map(this, function(elem, i){return a.call(elem, i, elem);}));}
	fn.slice = function(){return this.pushStack(lib.slice.apply(this, arguments));}
	fn.first = function(){return this.eq(0);}
	fn.last = function(){return this.eq(-1);}
	fn.eq = function(i){
		var len = this.length, j = +i+(i < 0 ? len : 0);
		return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
	}
  fn.end = function(){return this.prevObject || this.constructor();}
	fn.push = lib.push;
	fn.sort = lib.arr.sort;
  fn.splice = lib.arr.splice;
  
  js.extend = fn.extend = function(){
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
    if(typeof target === "boolean"){
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if(typeof target !== "object" && !lib.isFunction(target)){target = {};}
    if(i === length){target = this; i--;}
    for( ; i < length; i++){
      if((options = arguments[i]) != null){for(name in options){
        src = target[name];
        copy = options[name];
        if(target === copy){continue;}
        if(deep && copy && (js.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))){
          if(copyIsArray){copyIsArray = false; clone = src && Array.isArray(src) ? src : [];
          }else{clone = src && js.isPlainObject(src) ? src : {};}
          target[ name ] = js.extend(deep, clone, copy);
        }else if(copy !== undefined){
          target[name] = copy;
        }
      }}
    }
    return target;
  }

  js.extend({
    isReady: true,
    error: function(a){throw new Error(a);},
    noop: function() {},
    isPlainObject: function(a){
      var b, c;
      if (!a || lib.toString.call(a) !== "[object Object]"){return false;}
      b = lib.getProto(a);
      if(!b){return true;}
      c = lib.hasOwn.call(b, "constructor") && b.constructor;
      return typeof c === "function" && lib.fnToString.call(c) === lib.ObjectFunctionString;
    },
    isEmptyObject: function(a){var b; for(b in a){return false;} return true;},
    globalEval: function(a){lib.DOMEval(a);},
    each: function(a, b){
      var c, i=0;
      if(lib.isArrayLike(a)){c = a.length; for( ; i < c; i++){if(b.call(a[i], i, a[i]) === false){break;}}}
      else{for(i in a){if(b.call(a[i], i, a[i]) === false){break;}}}
      return a;
    },
    trim: function(a){return a == null ? "" : (a + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");},
    makeArray: function(a, b){
      var c = b || [];
      if(a != null){
        if(lib.isArrayLike(Object(a))){js.merge(c, typeof a === "string" ? [a] : a);}
        else{lib.push.call(c, a);}
      }
      return c;
    },
    inArray: function(a, b, c){return b == null ? -1 : lib.indexOf.call(b, a, c);},
    merge: function(a, b){
      var c = +b.length, i = a.length;
      for(var j=0; j<c; j++){a[i++] = b[j];}
      a.length = i;
      return a;
    },
    grep: function(a, b, c){
      var d, e = [], g = a.length, h = !c;
      for(var i = 0; i < g; i++){
        d = !b(a[i], i);
        if(d !== h){e.push(a[i]);}
      }
      return e;
    },
    map: function(a, b, c){
      var d, e, ret = [];
      if(lib.isArrayLike(a)){
        d = a.length;
        for(var i=0; i < d; i++){
          e = b(a[ i ], i, c);
          if(e != null){ret.push(e);}
        }
      }else{
        for(var i in a){
          e = b(a[i], i, c);
          if(e != null){ret.push(e);}
        }
      }
      return concat.apply([], ret);
    },
    support : lib.support
  });

  if(typeof Symbol === "function"){fn[Symbol.iterator] = lib.arr[Symbol.iterator];}

  js.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, b){ lib.class2type["[object "+b+"]"] = b.toLowerCase(); });

  var jsRoot = {};
  jsRoot.isSVG = function(){
    return this instanceof SVGElement;
  }

  jsRoot.attr = function(a){
    if(arguments.length == 1){
      if(typeof a == 'string'){return this.getAttributeNS('', a);} 
      if(!lib.isJson(a)){return;}
      for(var b in a){this.setAttribute(b, a[b]);}
    }else if(arguments.length == 2 && typeof a == 'string' && typeof arguments[1] == 'string'){
      this.setAttributeNS('', a, arguments[1]);
    }
  }

  jsRoot.removeAttr = function(a){
    a = a.split(/(\s|\,)+/g);
    for(var i=0; i<a.length; i++){this.removeAttributeNS("", a[i]);}
  }

  jsRoot.prop = function(a){
    if(arguments.length == 1){
      if(typeof a == 'string'){return this[a];} 
      if(!lib.isJson(a)){return;}
      for(var b in a){this[b] = a[b];}
    }else if(arguments.length == 2 && typeof a == 'string'){
      this[a] = arguments[1];
    } 
  }

  jsRoot.css = function(a){
    if(arguments.length == 1){
      if(typeof a == 'string'){return this.style[a];}
      if(!lib.isJson(a)){return;} 
      for(var b in a){this.style[b] = a[b];}
    }else if(arguments.length == 2 && typeof a == 'string'){
      this.style[a] = typeof arguments[1] == "number" || typeof arguments[1] == "string" ? arguments[1] : "";
    } 
  }

  jsRoot.val = function(){
    if(arguments.length == 0){return this.value || '';}
    else if(arguments.length == 1){this.value = arguments[0];} 
  }

  jsRoot.on = function(a, b){
    if(typeof a != "string" || typeof b != "function"){return;}
    var c = a.split(/\s+/g); 
    for(var d=0; d<c.length; d++){this.addEventListener(c[d], b);} 
  }

  jsRoot.off = function(a, b){
    var c = a.split(/\s+/g); 
    for(var d=0; d<c.length; d++){this.removeEventListener(c[d], b);} 
  }

  jsRoot.triggerEvent = function(a){
    var b;
    if(document.createEvent){b = document.createEvent("HTMLEvents"); b.initEvent(a, false, true);}else{b = document.createEventObject(); b.eventType = a;}
    b.eventName  = a;
    if(document.createEvent){this.dispatchEvent(b);}else{this.fireEvent("on" + b.eventType, b);}
  };

  jsRoot.offset = function(){
    var a = {left:0, top:0}, b = null; 
    for(var c=this; c.parentNode!=null; c=c.parentNode){
      if(c.offsetParent != null){b = c; break;}
    } 
    if(b != null){
      for(var c=b; c.offsetParent!=null; c=c.offsetParent){
        a.left += c.offsetLeft; a.top += c.offsetTop;
      }
    } 
    for(var c=this; c.parentNode!=null && c!=document.body; c=c.parentNode){
      a.left -= c.scrollLeft; a.top -= c.scrollTop;
    } 
    return a;
  }

  jsRoot.append = function(a){
    a = js(a);
    if(a.isElementJS !== true){return}
    for(var b=0; b<a.length; b++){this.appendChild(a[b]);} 
    return a;
  }

  jsRoot.prepend = function(a){
    a = js(a);
    if(a.isElementJS !== true){return}
    for(var b=0; b<a.length; b++){
      if(this.firstChild){this.insertBefore(a[b], this.firstChild);}
      else{this.appendChild(a[b]);}
    } 
    return a;
  }

  jsRoot.insertBefore = function(a){
    var b = js(a); 
    if(b.isElementJS !== true){return}
    b.parentNode.insertBefore(this, b[0]); 
    return b;
  }

  jsRoot.insertAfter = function(a){
    var b = js(a); 
    if(b.isElementJS !== true){return}
    if(b[0].nextSibling){b[0].parentNode.insertBefore(this, b[0].nextSibling);}
    else{b[0].parentNode.appendChild(this);} 
    return b;
  }

  jsRoot.remove = function(){if(this.parentNode){this.parentNode.removeChild(this);}}

  jsRoot.detach = function(){if(this.parentNode){this.parentNode.removeChild(this);}}

  jsRoot.parent = function(){return js(this.parentNode);}

  jsRoot.closest = function(a){
    for(var b = this; b != null; b = b.parentNode){
      if(lib.matches(b, a)){return js(b);}
    }
    return js();
  }

  jsRoot.children = function(a){
    var b = [], c = this.childNodes; 
    for(var d = 0; d < c.length; d += 1){
      if(lib.matches(c.item(d), a)){b.push(c.item(d));}
    } 
    b.__proto__ = jsRoot;
    return b;
  }

  jsRoot.index = function(a){return Array.prototype.indexOf.call(js(this).parent().children(a), this);}

  jsRoot.find = function(a){
    var b = [], c = this.querySelectorAll(a); 
    for(var d = 0; d < c.length; d += 1){b.push(c.item(d));}
    b.__proto__ = jsRoot; 
    return b;
  }

  jsRoot.clone = function(){return js(this.cloneNode(true));}
  jsRoot.focus = function(){this.focus(); return this;}
  jsRoot.select = function(){this.select(); return this;}
  jsRoot.submit = function(){this.submit(); return this;}

  jsRoot.scrollLeft = function(){
    if(arguments.length == 0){return this.scrollLeft;} 
    this.scrollLeft = arguments[0]; 
    return this;
  }

  jsRoot.scrollTop = function(){
    if(arguments.length == 0){return this.scrollTop;} 
    this.scrollTop = arguments[0]; 
    return this;
  }

  jsRoot.html = function(){
    if(arguments.length == 0){return this.innerHTML;} 
    this.innerHTML = arguments[0]; 
    return this;
  }

  jsRoot.text = function(){
    if(typeof this.textContent != 'undefined'){
      if(arguments.length == 0){return this.textContent;} 
      this.textContent = arguments[0]; 
      return this;
    }else{
      if(arguments.length == 0){return this.innerText;} 
      this.innerText = arguments[0]; 
      return this;
    }
  }

  jsRoot.outerWidth = function(a){
    var b = this.offsetWidth; 
    if(a){
      var c = window.getComputedStyle(this, null); 
      return b + lib.pxToNum(c.marginLeft) + lib.pxToNum(c.marginRight);
    } 
    return b;
  }

  jsRoot.innerWidth = function(){
    var a = window.getComputedStyle(this, null); 
    return this.offsetWidth - lib.pxToNum(a.borderLeftWidth) - lib.pxToNum(a.borderRightWidth);
  }

  jsRoot.width = function(){
    if(this == window){return this.innerWidth;} 
    var a = window.getComputedStyle(this, null); 
    return this.offsetWidth - lib.pxToNum(a.borderLeftWidth) - lib.pxToNum(a.borderRightWidth) - lib.pxToNum(a.paddingLeft) - lib.pxToNum(a.paddingRight);
  }

  jsRoot.outerHeight = function(a){
    var b = this.offsetHeight; 
    if(a){
      var c = window.getComputedStyle(this, null); 
      return b + lib.pxToNum(c.marginTop) + lib.pxToNum(c.marginBottom);
    } 
    return b;
  }

  jsRoot.innerHeight = function(){
    var a = window.getComputedStyle(this, null); 
    return this.offsetHeight - lib.pxToNum(a.borderTopWidth) - lib.pxToNum(a.borderBottomWidth);
  }

  jsRoot.height = function(){
    if(this == window){return this.innerHeight;} 
    var a = window.getComputedStyle(this, null); 
    return this.offsetHeight - lib.pxToNum(a.borderTopWidth) - lib.pxToNum(a.borderBottomWidth) - lib.pxToNum(a.paddingTop) - lib.pxToNum(a.paddingBottom);
  }

  jsRoot.getSize = function(){
    var a = (this.width || this.innerWidth || this.clientWidth), b = (this.height || this.innerHeight || this.clientHeight); 
    return {width: a, height: b}
  }

  jsRoot.addClass = function(a){lib.addClass(this, a); return this;}
  jsRoot.removeClass = function(a){lib.removeClass(this, a); return this;}
  jsRoot.hasClass = function(a){return lib.hasClass(this, a);}

  jsRoot.getPath = function(){
    var a = String(this.tagName).toLocaleLowerCase();
    if(this.id){a += '#'+this.id;}
    else if(this.classList.length > 0){
      for(var b = 0; b<this.classList.length; b++){a += '.'+this.classList[b];}
    }
    return a;
  }

  jsRoot.getAllPath = function(){
    var a = [], b = this.parentNode;
    a.push(js(this).getPath());
    while(b){
      if(!b || String(b.tagName).toLocaleLowerCase() == 'html'){break;}
      var c = String(b.tagName).toLocaleLowerCase();
      if(b.id){c += '#'+b.id;}
      else if(b.classList && b.classList.length > 0){
        for(var d = 0; d<b.classList.length; d++){c += '.'+b.classList[d];}
      }
      a.unshift(c);
      b = b.parentNode;
    }
    return a.join(" > ");
  }

  jsRoot.show = function(){js(this).css("display", "");}
  jsRoot.hide = function(){js(this).css("display", "none");}
  jsRoot.toggle = function(){
    if(js(this).css("display") == "none"){
      js(this).css("display", "");
    }else{
      js(this).css("display", "none");
    }
  }
  
  lib.each(jsRoot, function(a, b){
    jsRoot[a] = function(){
      var c = null; 
      for(var d=0; d<this.length; d++){
        var e = this[d], g = b.apply(e, arguments); 
        if(e !== g){
          if(g != null && g.__proto__ == jsRoot){if(c == null){c = [];} c = c.concat(g);}
          else if(g != null){return g;}
        }
      } 
      if(c != null){c.__proto__ = jsRoot; return c;}
      return this;
    };
  });

  js.extend(jsRoot, {
    each : function(a){
      if(lib.isFunction(a)){
        for(var b = 0; b < this.length; b += 1){a.call(this[b], b);}
      }
      return this;
    },
    getDom : function(a){return typeof a == "number" && this.length > a ? this[a] : this.length > 0 ? this[0] : null;},
    getItem : function(a){return js(typeof a == "number" && this.length > a ? this[a] : null);},
    first : function(){return js(this.length > 0 ? this[0] : null);},
    last : function(){return js(this.length > 0 ? this[this.length - 1] : null);},
    isElementJS : true
  });

  fn.init = function(selector, type){
    var match, elem = [];
    if(!selector){return js;}
    if(typeof selector === "string"){
      if(selector.search(lib.regexp.tag) >= 0){match = [ null, selector, null ];}
      else{match = lib.regexp.rquickExpr.exec(selector);}
      if(match && (match[1] || match[2])){
        if(match[1]){
          elem = lib.parseHTML(match[1], type);
        }else{
          var a = document.getElementById(match[2]);
          elem = [a];
        }
      }else if(lib.isQuerySelector(selector)){
        var a = document.querySelectorAll(selector);
        elem = [];
        for(var b=0; b<a.length; b++){elem.push(a.item(b));}
      }
    }else if(selector.__proto__ && selector.__proto__ == jsRoot){
      elem = selector;
    }else if(selector.nodeType){
      elem = [selector];
    }else if(lib.isFunction(selector)){
      return selector(js);
    }else if(js.isArray(selector)){
      selector.forEach(function(el){
        elem = elem.concat(js(el));
      });
    }
    elem.__proto__ = jsRoot;
    return elem;
  }

  js.isArray = Array.isArray;
  js.parseJSON = JSON.parse;
  js.nodeName =  lib.nodeName;
  js.isFunction = lib.isFunction;
  js.isWindow = lib.isWindow;
  js.camelCase = lib.camelCase;
  js.type = lib.toType;
  js.randomId = lib.randomId;
  js.getUrlLocation = lib.getUrlLocation;
  js.isJson = lib.isJson;
  js.jsonEguals = lib.jsonEguals;
  js.timeFormat = lib.timeFormat;
  js.sizeFormat = lib.sizeFormat;
  js.storage = lib.storage;
  js.htmlEntities = lib.htmlEntities;
  js.parserHTML = lib.parseHTML;
  js.parserXML = lib.parserXML;
  js.jsonToArray = lib.jsonToArray;
  js.getThisLine = lib.getThisLine;
  js.BezierEasing = lib.BezierEasing;
  js.Keymap = lib.Keymap;
  js.isQuerySelector = lib.isQuerySelector;
  js.querySelectorAll = lib.querySelectorAll;
  js.querySelector = lib.querySelector;
  js.Base64 = lib.Base64;
  js.Utf8 = lib.Utf8;
  js.joinJson = lib.joinJson;
  js.CSSJSON = lib.CSSJSON;
  js.library = lib;

  js.lib = function(k, f){
    js[k] = f;
  }

  js.Crypto = lib.Crypto;

  js.now = Date.now;

  js.isNumeric = function(a){var type = js.type(a); return (type === "number" || type === "string") && !isNaN(a - parseFloat(a));};

  js.encodeFormData = function(a){
    if(!this.isJson(a)){return "";}
    var b = [];
    for(var k in a){
      if(!a.hasOwnProperty(k) || typeof a[k] == "function"){continue;}
      var c = a[k].toString();
      k = encodeURIComponent(k).replace("%20", "+");
      c = encodeURIComponent(c).replace("%20", "+");
      b.push(k+"="+c);
    }
    return b.join("&");
  }

  var AJAXsettings = function(a){
    var b = {
      type: a.hasOwnProperty("type") && typeof a.contentType == "string" && (a.type.toUpperCase() == "GET" || a.type.toUpperCase() == "POST")? a.type.toUpperCase() : "GET",
      url: a.hasOwnProperty("url") && typeof a.url == "string" ? a.url : "",
      success: a.hasOwnProperty("success") && typeof a.success == "function" ? a.success : function(){},
      error: a.hasOwnProperty("error") && typeof a.error == "function" ? a.error : function(){},
      data: a.hasOwnProperty("data") ? a.data : undefined,
      upload: {
        progress: a.hasOwnProperty("upload") && a.upload.hasOwnProperty("progress") && typeof a.upload.progress == "function" ? a.upload.progress : function(){},
        complete: a.hasOwnProperty("upload") && a.upload.hasOwnProperty("complete") && typeof a.upload.complete == "function" ? a.upload.complete : function(){},
        failed: a.hasOwnProperty("upload") && a.upload.hasOwnProperty("failed") && typeof a.upload.failed == "function" ? a.upload.failed : function(){},
        canceled: a.hasOwnProperty("upload") && a.upload.hasOwnProperty("canceled") && typeof a.upload.canceled == "function" ? a.upload.canceled : function(){}
      },
      cache: a.hasOwnProperty("cache") && typeof a.cache == "boolean" ? a.cache : false,
      processData: a.hasOwnProperty("processData") && typeof a.processData == "boolean" ? a.processData : false,
      async: a.hasOwnProperty("async") && typeof a.async == "boolean" ? a.async : true,
      user: a.hasOwnProperty("user") && typeof a.user == "string" ? a.user : "",
      psw: a.hasOwnProperty("psw") && typeof a.psw == "string" ? a.psw : "",
      responseType: a.hasOwnProperty("responseType") && typeof a.responseType == "string" ? a.responseType : "",
      contentType: a.hasOwnProperty("contentType") && typeof a.contentType == "string" ? a.contentType : undefined,
      postType: a.hasOwnProperty("postType") && typeof a.postType == "string" && a.postType == "json"? "json" : ""
    };
    return b;
  }

  js.ajax = function(a){
    if(!this.isJson(a)){throw new Error("XMLHttpRequest requires a settings!");}
    a = AJAXsettings(a);
    var r = lib.xmlhttp();
    a.url = a.url+(a.type.toUpperCase() == "GET" && (this.isJson(a.data) || typeof a.data == "string") ? "?"+(typeof a.data == "string" ? a.data : js.encodeFormData(a.data)) : "");
    r.open(a.type.toUpperCase(), a.url+(a.cache == false ? (((/\?/).test(a.url) ? "&" : "?") + (new Date()).getTime()) : ""), a.async, a.user, a.psw);
    r.responseType = a.responseType;
    if(typeof a.contentType == "string"){r.setRequestHeader('Content-Type', a.contentType);}
    r.setRequestHeader("Cache-Control", (a.cache == false ? "no-cache, no-store, must-revalidate" : "max-age=3600"));
    r.onreadystatechange = function(){
      if(r.readyState === 4 && r.status === 200){
        var t = r.getResponseHeader("Content-Type"), b = {type: "text", response: null, status: r.status};
        if(t.indexOf("xml") >= 0 && r.responseXML){
          b.type = "xml";
          b.response = r.responseXML;
        }else if(t == "application/json"){
          b.type = "json";
          b.response = JSON.parse(r.responseText);
        }else{
          b.type = "text";
          b.response = r.responseText;
        }
        a.success(b.response, b);
      }else{
        a.error(r.status, r.statusText, r.readyState);
      }
    };
    r.upload.addEventListener("progress", a.upload.progress, false);
    r.upload.addEventListener("load", a.upload.complete, false);
    r.upload.addEventListener("error", a.upload.failed, false);
    r.upload.addEventListener("abort", a.upload.canceled, false);
    if(a.type.toUpperCase() == "POST" && (this.isJson(a.data) || typeof a.data == "string")){
      if(a.postType == "json"){
        a.setRequestHeader("Content-Type", "application/json");
        r.send(JSON.stringify(a.data));
      }else{
        a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        r.send(typeof a.data == "string" ? a.data : js.encodeFormData(a.data));
      }
    }else{r.send(null);}
  }

  js.get = function(url, data, call){
    call = typeof data == "function" ? data : typeof call == "function" ? call : function(){};
    this.ajax({
      type: "GET",
      url: url, 
      data: typeof data != "function" ? data : undefined, 
      success: function(a, b){
        call(a, b.status);
      },
      error: function(a){
        call(undefined, a);
      }
    });
  }

  js.getJSON = function(url, data, call){
    call = typeof data == "function" ? data : typeof call == "function" ? call : function(){};
    this.get(url, typeof data != "function" ? data : undefined, function(a, b){
      call(a != undefined ? typeof a == "string" ? JSON.parse(a) : a : undefined, b);
    });
  }

  js.getScript = function(url, call){
    call = typeof call == "function" ? call : function(){};
    this.get(url, function(a, b){
      if(typeof a == "string"){
        var c = document.createElement("script");
        c.appendChild(document.createTextNode(a));
        document.body.appendChild(c);
      }
      call(a, b);
    });
  }

  js.post = function(url, data, call){
    call = typeof data == "function" ? data : typeof call == "function" ? call : function(){};
    this.ajax({
      type: "POST",
      url: url, 
      data: typeof data != "function" ? data : undefined, 
      success: function(a, b){
        call(a, b.status);
      },
      error: function(a){
        call(undefined, a);
      }
    });
  }

  js.postJSON = function(url, data, call){
    call = typeof data == "function" ? data : typeof call == "function" ? call : function(){};
    this.ajax({
      type: "POST",
      url: url, 
      data: typeof data != "function" ? data : {}, 
      success: function(a, b){
        call(a, b.status);
      },
      error: function(a){
        call(undefined, a);
      },
      postType: "json"
    });
  }

  var _js = window.js, __ = window._;

  js.noConflict = function(deep){
    if(window._ === js){window._ = __;}
    if(deep && window.js === js){window.js = _js;}
    return js;
  };

  if(!noGlobal){window.js = window._ = js; window.isJS = true;}
  return js;
}));