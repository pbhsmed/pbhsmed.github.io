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
(function(win, Render){
    if(!win.isJS)throw new Error("It is necessary to include the JS (version - 1.1 ~ higher) library for the Render to work!");
    var version = "1.1";
    if("object" == typeof module && "object" == typeof module.exports){
        if(module.exports = win.document){
        module.exports = Render(win, version, !0);
        }else{
        module.exports = function(a){
            if(!a.document)throw new Error("Render requires a window with a document!");
            return Render(a, version);
        }
        }
    }else{
        Render(win, version);
    }
}("undefined"!=typeof window ? window : this, function(win, version, noGlobal){
    var Render = function(selector){return new fn.init(selector);}
    var fn = Render.prototype = {};

    fn.init = function(){
        
    }

    var isCreateElementValid = function(_type){return typeof _type === "string" && (_type == _type.toUpperCase() || _type == _type.toLowerCase()) && document.createElement(_type).toString() != "[object HTMLUnknownElement]";}

    Render.__componentes = {};

    var Componente = function(componente){
        var timestamp = function(){return Date.now() || +new Date();};
        var idStyle = 'cssjson_style_componente_' + timestamp();

        this.style = new Proxy({}, {
            set: function(obj, prop, value) {
                obj[prop] = value;
                js.CSSJSON.toHEAD(obj, idStyle);
                return true;
            }
        });

        this.props = new Proxy({
            history: Render.history(),
            css: (style)=>{
                var styleString = js.CSSJSON.toCSS(this.style);
                if(typeof style === "string"){
                    styleString += style;
                }else{
                    styleString += js.CSSJSON.toCSS(style);
                }

                style = js.CSSJSON.toJSON(styleString);

                for(let k in style){
                    this.style[k] = style[k];
                }
            }
        }, {
            set: function(obj, prop, value) {
                if(["history", "css"].includes(prop)){
                    return false;
                }else{
                    obj[prop] = value;
                    return true;
                }
            }
        });

        this.onSetState = function(){return;};

        this.state = new Proxy({}, {
            set: (obj, prop, value)=>{
                this.onSetState(value, obj[prop]);
                obj[prop] = value;
                return true;
            }
        });
        this.children = [];
        this.componente = componente;
        return this;
    }

    Componente.prototype.render = function(){
        return Render.renderComponente(this.componente(this.state, this.props, this.children));
    }

    Render.componente = function(name, componente){
        if(isCreateElementValid(name)){return;}
        Render.__componentes[name] = new Componente(componente);
        return Render.__componentes[name];
    }

    Render.history = function(){
        var state = win.history.state && js.isJson(win.history.state) ? win.history.state : {};
        var path = ("toPath" in state && typeof state.toPath === "string" ? win.history.state.toPath : "index");
        return {
            path: path,
            state: Object.assign(("state" in state && typeof state.state === "string" ? win.history.state.state : {}), js.getUrlLocation().vars),
            push: function(path2, state){
                win.history.pushState({toPath: (typeof path2 === "string" ? path2 : path), state: (state || {})}, "", window.location.href);
            },
            replace: function(state){
                win.history.replaceState({toPath: path, state: (state || {})}, "", window.location.href);
            },
            back: win.history.back,
            forward: win.history.forward,
            go: function(path){
                if(typeof path === "string"){
                    this.push(path, {});
                }else{
                    win.history.go(path);
                }
            }
        }
    }

    Render.to = function(selector){
        this.root = js(selector);
        this.pages = {"index" : function(){return;}};
        var self = this, observePath = function(path){
            if(Render.history().path !== path){
                path = Render.history().path;
                self.render();
            }
            window.requestAnimationFrame(function(){
                observePath(path);
            });
        }
        observePath(Render.history().path);
        this.render();
    }

    Render.renderComponente = function(componentes){
        componentes = js.isJson(componentes) ? [componentes] : componentes;
        if(js.isArray(componentes) !== true){
            return [];
        }

        var result = [];

        componentes.forEach((componente)=>{
            var _type = typeof componente.type === "string" ? componente.type : null;

            if(!_type){return;}

            var props = js.isJson(componente.props) ? componente.props : {};
            var children = js.isJson(componente.children) ? [componente.children] : js.isArray(componente.children) ? componente.children : typeof componente.children === "string" ? componente.children : [];

            if(_type in Render.__componentes){
                for(let k in props){
                    Render.__componentes[_type].props[k] = props[k];
                }
                Render.__componentes[_type].children = children;
                result.push(Render.__componentes[_type].render());
                return;
            }

            var element = js("<"+_type+"></"+_type+">");
            element.attr(props);
            if(typeof componente.children === "string"){
                element.html(componente.children);
            }else{
                element.append(Render.renderComponente(children));
            }

            result.push(element);
        });

        return result;
    }

    var rRoot = Render.to.prototype = {};
    /*rRoot.getProps = function(){
        var props = {}, self = this;
        props.state = Object.assign({}, Render.history().state);
        props.setState = function(st, callback){
            this.state = js.joinJson(this.state, st);
            if(typeof callback === "function"){callback(this.state);}
        }
        props.history = Render.history();
        props.css = function(style){
            self.css(style, true);
        }
        return props;
    }*/
    rRoot.css = function(style, isPage){
        js.CSSJSON.toHEAD(style, isPage ? "PageStyle" : null);
    }
    rRoot.render = function(){
        var path = Render.history().path;
        var page = "__Page("+path+")__" in Render.__componentes ? "__Page("+path+")__" : "__Page(index)__";

        this.root.html("");

        if(page in Render.__componentes){
            var r = Render.__componentes[page].render();
            this.root.append(r);
        }
    }
    rRoot.page = function(path, render){
        Render.componente("__Page("+path+")__", render);
        if(Render.history().path === path){
            this.render();
        }
    }

    var _render = window.Render;

    Render.noConflict = function(deep){
        if(deep && window.Render === Render){window.Render = _render;}
        return Render;
    };

    if(!noGlobal){window.Render = window._ = Render; window.isRender = true;}
    return Render;
}));