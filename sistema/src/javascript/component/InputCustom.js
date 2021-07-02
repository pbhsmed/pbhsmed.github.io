(function(){
    var css = document.createElement('style');
    css.type = 'text/css';
    var styles = [
        ".InputCustom-container {", 
        "   position: relative;", 
        "   margin-top: 18px;", 
        "   margin-bottom: 5px;", 
        "   padding: 0;",
        "   outline: none;",
        "}", 
        ".InputCustom-container *{", 
        "   transition: all 0.2s ease-out;", 
        "   font-family: sans-serif;",
        "   outline: none;",
        "}", 
        ".InputCustom-container .input-area{", 
        "   outline: none;", 
        "   border: 2px solid #dadce0;", 
        "   padding: 17px 13px 10px 13px;", 
        "   font-size: 18px;", 
        "   border-radius: 5px;", 
        "   width: 100%;", 
        "   box-sizing: border-box;", 
        "   resize: none;", 
        "   color: #000000 !important;", 
        "   cursor: text;", 
        "}", 
        ".InputCustom-container.InputCustom-list:not(.InputCustom-disabled) .input-area{", 
        "   cursor: pointer !important;", 
        "}",
        ".InputCustom-container.InputCustom-list:not(.InputCustom-focus) .input-area{", 
        "   border-radius: 5px !important;", 
        "}",
        ".InputCustom-container.InputCustom-list .input-area{", 
        "   display: flex;", 
        "   align-items: center;", 
        "}",
        ".InputCustom-container.InputCustom-list .input-area .span{",  
        "   flex: 1;", 
        "}", 
        ".InputCustom-container.InputCustom-list:not(.InputCustom-disabled) .input-area .icon{", 
        "   color: #757575 !important;",
        "}",
        ".InputCustom-container.InputCustom-list .input-area .icon{", 
        "   color: #bdbdbd;",
        "}", 
        ".InputCustom-container.InputCustom-list .input-area .icon > svg{", 
        "   min-width: 25px;", 
        "   min-height: 25px;", 
        "   max-width: 25px;", 
        "   max-height: 25px;", 
        "}", 
        ".InputCustom-container.InputCustom-list:not(.InputCustom-focus) .input-area .icon > svg{", 
        "   transform: rotate(0deg) !important;", 
        "}",
        ".InputCustom-container .input-area:focus,", 
        ".InputCustom-container.InputCustom-list.InputCustom-focus .input-area{", 
        "   border: 2px solid #2196F3;", 
        "}", 
        ".InputCustom-container .label{", 
        "   color: #8d8d8d;", 
        "   position: absolute;", 
        "   top: 17px;", 
        "   left: 13px;", 
        "   background: transparent;", 
        "   border-radius: 20px;", 
        "   cursor: text;", 
        "   user-select: none;", 
        "}", 
        ".InputCustom-container .input-area:focus + .label,", 
        ".InputCustom-container .input-area:valid + .label,", 
        ".InputCustom-container .input-area:disabled + .label,", 
        ".InputCustom-container.InputCustom-list .label{", 
        "   top: 1px;", 
        "   transform: translateY(-50%);", 
        "   padding: 2px 8px;", 
        "   font-size: 12px;", 
        "   font-weight: bold;", 
        "   cursor: auto;", 
        "}", 
        ".InputCustom-container .input-area:valid + .label,", 
        ".InputCustom-container .input-area:disabled + .label,", 
        ".InputCustom-container.InputCustom-list .label{", 
        "   color: #212121;", 
        "   background: #dadce0;", 
        "}", 
        ".InputCustom-container .input-area:focus + .label,", 
        ".InputCustom-container.InputCustom-list.InputCustom-focus .label{", 
        "   color: #ffffff;", 
        "   background: #2196F3;", 
        "}",
        ".InputCustom-container-list{", 
        "   position: absolute;", 
        "   z-index: 999999;", 
        "   top: 100%;", 
        "   left: 0px;", 
        "   right: 0px;", 
        "   width: auto;", 
        "   height: auto;", 
        "   min-height: 40px;", 
        "   max-height: 300px;", 
        "   overflow-y: auto;", 
        "   border-bottom-left-radius: 5px;", 
        "   border-bottom-right-radius: 5px;", 
        "   border: 2px solid;", 
        "   border-top: none;", 
        "   border-color: #2196F3;", 
        "   behavior: auto;", 
        "   background: #fff;", 
        "}",
        ".InputCustom-container-list, .InputCustom-container-list *{", 
        "   box-sizing: border-box;", 
        "   font-family: sans-serif;", 
        "   font-size: 14px;",
        "}",
        ".InputCustom-container-list div {", 
        "   padding: 10px;", 
        "   cursor: pointer;", 
        "   background-color: #fff;", 
        "   border-bottom: 1px solid #d4d4d4;", 
        "}", 
        "", 
        ".InputCustom-container-list div:last-child{", 
        "   border-bottom: none;", 
        "}", 
        "", 
        ".InputCustom-container-list div:hover {", 
        "   background-color: #e9e9e9;", 
        "}", 
        "", 
        ".InputCustom-container-list .item-active {", 
        "   background-color: #dedede !important;", 
        "   font-weight: bold;", 
        "}", 
        "", 
        ".InputCustom-container-list::-webkit-scrollbar {", 
        "   height: 16px;", 
        "   overflow: visible;", 
        "   width: 16px;", 
        "}", 
        "", 
        ".InputCustom-container-list::-webkit-scrollbar-button {", 
        "   height: 0;", 
        "   width: 0;", 
        "}", 
        "", 
        ".InputCustom-container-list::-webkit-scrollbar-corner {", 
        "   background-clip: padding-box;", 
        "   background: transparent;", 
        "   border: solid #fff;", 
        "   border-width: 3px 0 0 3px;", 
        "}", 
        "", 
        ".InputCustom-container-list::-webkit-scrollbar-thumb {", 
        "   background-color: rgba(0,0,0,.2);", 
        "   background-clip: padding-box;", 
        "   border: solid transparent;", 
        "   min-height: 28px;", 
        "   padding: 100px 0 0;", 
        "   border-radius: 10px;", 
        "}", 
        "", 
        ".InputCustom-container-list::-webkit-scrollbar-track {", 
        "   background-clip: padding-box;", 
        "   border: solid transparent;", 
        "   border-width: 0 0 0 5px;", 
        "}", 
        "", 
        ".InputCustom-container-list::-webkit-scrollbar-track-piece{", 
        "   background-clip: padding-box;", 
        "   background-color: #f5f5f5;", 
        "   border: solid #fff;", 
        "   border-width: 0 0 0 3px;", 
        "   border-radius: 0 10px 10px 0;", 
        "   border-left: solid 1px #d4d4d4;", 
        "}"
    ];
    if(css.styleSheet){
        css.styleSheet.cssText = styles.join(" \n");
    }else{
        css.appendChild(document.createTextNode(styles.join(" \n")));
    }
    document.getElementsByTagName("head")[0].appendChild(css);
})();

window.__lengthInputCustom = 0;
window.__focusInputCustom = null;
window.__focusInputCustom_out = null;

document.addEventListener("mousedown", function(e){
    if(!window.__focusInputCustom){window.__focusInputCustom_out = null; return;}
    var inputCustom = js(window.__focusInputCustom);

    var contains = (window.__focusInputCustom_out && window.__focusInputCustom_out.contains(e.target)) === true;
    window.__focusInputCustom_out = window.__focusInputCustom;

    if(contains){return;}

    var container_list = js("body > div.InputCustom-container-list");
    var contains_list = (container_list.length > 0 && container_list.getDom().contains(e.target)) === true;

    if(contains_list && inputCustom.attr("input") === container_list.attr("for")){
        return;
    }
    
    container_list.remove();
    inputCustom.removeClass("InputCustom-focus");
    window.__focusInputCustom = null;
});

window.addEventListener("blur", function(e){
    window.__focusInputCustom = null;
    js(".InputCustom-container.InputCustom-list.InputCustom-focus").removeClass("InputCustom-focus");
    js("body > div.InputCustom-container-list").remove();
});

class InputCustom{
    constructor(root, confg){
        root = js(root);
        if(root.getDom() === null){
            console.error("É necessário inserir um DOM raiz para inserir a tabela!");
            return;
        }

        let {label, value, disabled, list, mask, maskAmount, multiline, rows, onChange} = confg;

        this.id = "InputCustom-id-"+(Math.round(Math.random()*10000))+"-"+(Math.round(Math.random()*10000));

        this.isInputList = Array.isArray(list) && list.reduce(function(accumulator, currentValue){return (typeof currentValue === "string") ? accumulator + 1 : accumulator;}, 0) >= list.length;

        this.inputList = this.isInputList ? list : null;

        this.multiline = multiline = typeof multiline === "boolean" ? multiline : false;
        this.rows = rows = typeof rows === "number" ? rows : 0;

        this.inputDisabled = disabled === true;

        var attr_disabled = this.inputDisabled ? ` disabled` : ``;

        var input_code = ``;

        if(this.isInputList !== true){
            input_code = multiline !== true ? `<input id="${this.id}" type="text" class="input-area" required${attr_disabled} autocomplete="off"/>` : `<textarea id="${this.id}" class="input-area" required=""${(rows > 0 ? ` rows="${rows}"`:``)}${attr_disabled} autocomplete="off"></textarea>`;
        }else{
            var v = this.inputList.includes(value) ? value : this.inputList[0];
            input_code = `<div id="${this.id}" class="input-area"><div class="span">${v}</div><div class="icon"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg></div></div>`;
        }

        label = typeof label === "string" ? `<label for="${this.id}" class="label">${label}</label>` : ``;

        this.container = js(`<div class="InputCustom-container${(this.isInputList && this.inputDisabled ? " InputCustom-list InputCustom-disabled" : this.isInputList ? " InputCustom-list" : "")+(typeof value === "string" && value.length <= 0 ? " InputCustom-empty" : "")}" tabindex="${window.__lengthInputCustom}" input="${this.id}">
            ${input_code}
            ${label}
        </div>`);

        this.maskList = {
            "cnpj" : [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
            "telefone" : ['(', /\d/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
            "email" : [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+/, /(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*/, /@/, /(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+/, /[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/]
        };

        this.mask = multiline !== true ? (typeof mask === "string" && String(mask).toLocaleLowerCase() in this.maskList ? this.maskList[String(mask).toLocaleLowerCase()] : InputCustom.validMask(mask) ? mask : null) : null;
        this.maskAmount = typeof  maskAmount === "boolean" ? maskAmount : true;

        this.onChange = typeof onChange === "function" ? onChange : function(){return;};

        var self = this;

        root.append(this.container);
        this.container.on("click", function(e){
            js(".InputCustom-container.InputCustom-list.InputCustom-focus").removeClass("InputCustom-focus");
            if(self.inputDisabled){return;}
            self.container.addClass("InputCustom-focus");
            self.showList();
            window.__focusInputCustom = self.container.getDom();
            e.preventDefault();
        });

        if(this.isInputList !== true){
            if(multiline === true){
                var textarea = this.container.find("textarea.input-area");
                textarea.val((typeof value === "string" ? value : textarea.val()) || "");
            }else{
                var input = this.container.find("input.input-area");
                input.on("input", function(){
                    self.__atualizarTexto(this);
                });
                input.val(InputCustom.convertMask(InputCustom.invertMask(((typeof value === "string" ? value : input.val()) || ""), this.mask), this.mask));
            }

            this.container.find("label.label").on("click", function(){
                self.container.find(".input-area").focus();
            });
        }else{
            this.container.on("keydown", (e)=>{this.__listEventKeydown(e);});
        }

        window.__lengthInputCustom += 1;
    }

    disabled(disabled){
        this.inputDisabled = disabled === true;
        var input = this.multiline ? this.container.find("textarea.input-area") : this.container.find("input.input-area");
        if(disabled){
            input.attr("disabled", "true");
            this.container.addClass("InputCustom-disabled");
            if(this.value().length <= 0){
                this.container.addClass("InputCustom-empty");
            }
        }else{
            input.removeAttr("disabled");
            this.container.removeClass("InputCustom-disabled");
            this.container.removeClass("InputCustom-empty");
        }
    }

    static validMask(mask){
    	if((mask && Array.isArray(mask)) !== true){return false;}
        var l = mask.reduce(function(accumulator, currentValue){
            if(typeof currentValue === "string" || currentValue instanceof RegExp){
                return accumulator + 1;
            }
            return accumulator;
        }, 0);
        return l === mask.length;
    }

    static convertMask(value, mask){
    	if(InputCustom.validMask(mask) !== true){return value;}
    	let temp = String(value), result = "";

    	mask.forEach((m, i)=>{
    		if(typeof m === "string" && temp.length >= 1){
    			result += m;
    		}else if(m instanceof RegExp){
    			let str = temp.match(m);
    			if(!str || str.length < 1){
    				return;
    			}
    			str = str[0];
    			if(temp.search(str) === 0){
    				temp = temp.substring(str.length, temp.length);
    				result += str;
    			}
    		}
    	});

    	return result;
    }

    static invertMask(value, mask){
    	if(InputCustom.validMask(mask) !== true){return value;}
    	let temp = String(value), result = "";

    	mask.forEach((m)=>{
    		if(m instanceof RegExp){
    			let str = temp.match(m);
    			if(!str || str.length < 1){
    				return;
    			}
    			str = str[0];
    			if(temp.search(str) >= 0){
    				temp = temp.substring(temp.search(str) + str.length, temp.length);
    				result += str;
    			}
    		}
    	});

    	return result;
    }

    isShowList(){
        var container_list = js("body > div.InputCustom-container-list");
        if(container_list.length > 0 && this.container.attr("input") === container_list.attr("for")){
            return true;
        }
        return false;
    }

    static scrollToElm(container, elm){
		var getRelativePos = function(elm){
			var pPos = elm.parentNode.getBoundingClientRect(),
			cPos = elm.getBoundingClientRect(),
			pos = {};

			pos.top    = cPos.top    - pPos.top + elm.parentNode.scrollTop,
			pos.right  = cPos.right  - pPos.right,
			pos.bottom = cPos.bottom - pPos.bottom,
			pos.left   = cPos.left   - pPos.left;

			return pos;
		}
		var pos = getRelativePos(elm);
		var change = pos.top - (container.offsetHeight - (elm.offsetHeight * 1.6));
		container.scrollTop = change < 0 ? 0 : change;
	}

    __listEventKeydown = function(e){
        var x = js("body > div.InputCustom-container-list");
        var itens = x.find("div");

        x.find("div.item-active").removeClass("item-active");

        if(e.keyCode == 40){
            this.listCurrentFocus++;
            e.preventDefault();
        }else if(e.keyCode == 38){
            this.listCurrentFocus--;
            e.preventDefault();
        }else if(e.keyCode == 13){
            e.preventDefault();
            if (this.listCurrentFocus > -1) {
                if(itens && itens.length > 0){
                    itens.getDom(this.listCurrentFocus).click();
                    return;
                };
            }
        }
        
        if (this.listCurrentFocus >= itens.length) this.listCurrentFocus = 0;
        if (this.listCurrentFocus < 0) this.listCurrentFocus = (itens.length - 1);
        js(itens.getDom(this.listCurrentFocus)).addClass("item-active");
        
		InputCustom.scrollToElm(itens.getDom(this.listCurrentFocus).parentNode, itens.getDom(this.listCurrentFocus));
    }

    showList(){
        var isHasShow = this.isShowList();
        this.hiddenList();

        if(this.inputDisabled || this.isInputList !== true || isHasShow){
            return;
        }

        var list_container = js(`<div class="InputCustom-container-list" for="${this.id}"></div>`);

        var pos = this.container.getDom().getBoundingClientRect();

        list_container.css({
            top: Math.round(pos.y + pos.height)+"px",
            left: Math.round(pos.x)+"px",
            width: Math.round(pos.width)+"px",
            "max-height": Math.round(window.innerHeight - (pos.y + pos.height) - 15)+"px"
        });

        this.container.find(".input-area").css({
            "border-bottom-right-radius": "0px",
            "border-bottom-left-radius": "0px"
        });

        this.container.find(".input-area .icon > svg").css({
            "transform": "rotate(180deg)"
        });

        js(document.body).append(list_container);

        var self = this;

        this.inputList.forEach((label, i)=>{
            var item = js(`<div key="${i}">${String(label)}</div>`);
            item.on("click", function(){
                var k = Number(this.getAttribute("key"));
                var val = self.inputList[k];
                self.value(val);
                self.onChange(val, k);
                self.hiddenList();
            });
            list_container.append(item);
        });

        list_container.on("keydown", (e)=>{this.__listEventKeydown(e);});
    }

    hiddenList(){
        this.container.find(".input-area").css({
            "border-bottom-right-radius": "5px",
            "border-bottom-left-radius": "5px"
        });

        this.container.find(".input-area .icon > svg").css({
            "transform": "rotate(0deg)"
        });

        js("body > div.InputCustom-container-list").remove();

        this.listCurrentFocus = -1;
    }

    value(value){
        var input;
        if(this.multiline === true){
            input = this.container.find("textarea.input-area");
            if(typeof value === "string"){
                input.val(value);
            }
        }else if(this.isInputList){
            input = this.container.find("div.input-area > .span");
            if(typeof value === "string" && this.inputList.includes(value)){
                input.html(value);
            }
        }else{
            input = this.container.find("input.input-area");
            if(typeof value === "string"){
                input.val(InputCustom.convertMask(InputCustom.invertMask(value, this.mask), this.mask));
            }
        }
        var result = this.isInputList ? input.html() : input.val();
        this.onChange(result);
        return String(result);
    }

    __atualizarTexto(input){
        let value = InputCustom.convertMask(InputCustom.invertMask(input.value, this.mask), this.mask),
			start = input.selectionStart;

		start = start > value.length || (start >= input.value.length) ? value.length : start;

        input.value = value;

        if(this.onChange && typeof this.onChange === "function"){
        	let result = typeof this.maskAmount === "boolean" && this.maskAmount === true ? value : InputCustom.invertMask(value, this.mask);
    		this.onChange(result);
    	}

        input.selectionStart = start;
        input.selectionEnd = start;
        input.focus();
    }
}