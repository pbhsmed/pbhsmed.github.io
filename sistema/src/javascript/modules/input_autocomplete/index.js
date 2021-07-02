(function() {
    var css = document.createElement('style');
    css.type = 'text/css';
    var styles = [".autocomplete * {","    box-sizing: border-box;","    font: 16px sans-serif;","    box-sizing: border-box;","}",".autocomplete {","    position: relative;","    display: inline-block;","    width: 100%;","}",".autocomplete>input {","    border: 1px solid rgba(0, 0, 0, .3);","    border-radius: 5px;","    background-color: #f1f1f1;","    padding: 10px;","    font-size: 16px;","    outline: none;","}",".autocomplete>input[type=text] {","    background-color: #f1f1f1;","    width: 100%;","}",".autocomplete>input[type=text]:focus-visible {","    border-color: #1e90ff;","}",".autocomplete>input[type=text].utocomplete-list-show{","    border-bottom-left-radius: 0px;","    border-bottom-right-radius: 0px;","}","div.autocomplete-input.autocomplete-items {","    position: absolute; background: #ffffff; ","    z-index: 999999;","    top: 100%;","    left: 0px;","    right: 0px;","    bottom: 0px;","    width: auto;","    height: auto;","    max-height: 300px;","    overflow-y: auto;","    border-bottom-left-radius: 5px;","    border-bottom-right-radius: 5px;","    border: 1px solid #d4d4d4;","    border-top: none;","    border-color: #1e90ff;","    behavior: auto;","}","div.autocomplete-input.autocomplete-items, div.autocomplete-input.autocomplete-items *{","    box-sizing: border-box;","    font-family: sans-serif;","    font-size: 14px;","}","div.autocomplete-input.autocomplete-items div {","    padding: 10px;","    cursor: pointer;","    background-color: #fff;","    border-bottom: 1px solid #d4d4d4;","}","div.autocomplete-input.autocomplete-items div:last-child{","    border-bottom: none;","}","div.autocomplete-input.autocomplete-items div:hover {","    background-color: #e9e9e9;","}","div.autocomplete-input.autocomplete-items .autocomplete-active {","    background-color: #bdbdbd !important;","    font-weight: bold;","}","div.autocomplete-input.autocomplete-items::-webkit-scrollbar {","    height: 16px;","    overflow: visible;","    width: 16px;","}","div.autocomplete-input.autocomplete-items::-webkit-scrollbar-button {","    height: 0;","    width: 0;","}","div.autocomplete-input.autocomplete-items::-webkit-scrollbar-corner {","    background-clip: padding-box;","    background: transparent;","    border: solid #fff;","    border-width: 3px 0 0 3px;","}","div.autocomplete-input.autocomplete-items::-webkit-scrollbar-thumb {","    background-color: rgba(0,0,0,.2);","    background-clip: padding-box;","    border: solid transparent;","    min-height: 28px;","    padding: 100px 0 0;","    border-radius: 10px;","}","div.autocomplete-input.autocomplete-items::-webkit-scrollbar-track {","    background-clip: padding-box;","    border: solid transparent;","    border-width: 0 0 0 5px;","}","div.autocomplete-input.autocomplete-items::-webkit-scrollbar-track-piece{","    background-clip: padding-box;","    background-color: #f5f5f5;","    border: solid #fff;","    border-width: 0 0 0 3px;","    border-radius: 0 10px 10px 0;","    border-left: solid 1px #d4d4d4;","}"];
    if(css.styleSheet){
        css.styleSheet.cssText = styles.join(" \n");
    }else{ 
        css.appendChild(document.createTextNode(styles.join(" \n")));
    }
    document.getElementsByTagName("head")[0].appendChild(css);

    var input = window.InputAutocomplete = function(id, max_result) {
        this.parentId = document.getElementById(id);

        this.content = document.createElement("div");
        this.content.setAttribute("class", "autocomplete");
        this.parentId.appendChild(this.content);

        this.input = document.createElement("input");
        this.input.setAttribute("type", "text");
        this.content.appendChild(this.input);

        this.list = [];

        this.id = Math.round(Math.random() * 10000);
        this.input._id = this.id;

        this.max_result = typeof max_result === "number" ? max_result : 10;
        this.exato = false;

        this.currentFocus = -1;

        this.onSelect = null;

        this.input.addEventListener("input", (e) => { this._eventInput(e); });
        this.input.addEventListener("mousedown", (e) => { this._eventInput(e); });
        this.input.addEventListener("keydown", (e) => { this._eventKeydown(e); });
		this.input.addEventListener('blur', (e) => { this._eventBlur(e); });
    };

    input.prototype._eventInput = function(e) {
        var a_div, b, i, val = this.input.value;
        this.closeAllLists();
        if (!val || val.length <= 3 || this.list.length <= 0) { return false; }
        this.currentFocus = -1;

        var pos = this.input.getBoundingClientRect();

		if(this.input.classList.contains('utocomplete-list-show') !== true){
			this.input.classList.add('utocomplete-list-show');
		}

		a_div = document.getElementById(this.id + "autocomplete-list");

		if(!a_div){
			a_div = document.createElement("DIV");
			a_div.setAttribute("id", this.id + "autocomplete-list");
			a_div.setAttribute("class", "autocomplete-input autocomplete-items");
		}

		a_div.setAttribute("style", "top: "+(pos.bottom)+"px; left: "+(pos.left)+"px; width: "+(pos.right-pos.left)+"px; max-width: "+(pos.right-pos.left)+"px;");
		a_div._id = this.id;

        document.body.appendChild(a_div);

        var list = [];
        var self = this;

        var similarits = StringSimilarity.findBestMatch(val, this.list.map(t => String(t.target)), this.exato);
        list = similarits.ratings.slice(0, this.max_result);

        if (list.length <= 0) { return false; }

        list = list.slice(0, this.max_result).map(t =>{
            t.value = self.list[t.index].value;
            return t;
        });

        list.forEach((s) => {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + s.value.substr(0, val.length) + "</strong>";
            b.innerHTML += s.value.substr(val.length);
            b.innerHTML = s.value;
            b.setAttribute("value", s.value);
            b.setAttribute("index", s.index);
            b.addEventListener("click", function(e) {
                var val = this.getAttribute("value");
                self.input.value = val;
                self.closeAllLists();
                if (typeof self.onSelect === "function") {
                    self.onSelect(val, Number(this.getAttribute("index")));
                }
            });
            a_div.appendChild(b);
        });
    }

    input.prototype._eventKeydown = function(e){
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            this.currentFocus++;
            this.addActive(x);
        } else if (e.keyCode == 38) {
            this.currentFocus--;
            this.addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (this.currentFocus > -1) {
                if (x) x[this.currentFocus].click();
            }
        }
    }

	input.prototype._eventBlur = function(e){
		this.input.classList.remove('utocomplete-list-show');
		setTimeout(function(){
			input.prototype.closeAllLists();
		}, 200);
	}

	function scrollToElm(container, elm){
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
		var start = container.scrollTop,
		change = pos.top - (container.offsetHeight - (elm.offsetHeight * 1.2));
		container.scrollTop = change < 0 ? 0 : change;
	}

    input.prototype.addActive = function(x) {
        if (!x) return false;
        this.removeActive(x);
        if (this.currentFocus >= x.length) this.currentFocus = 0;
        if (this.currentFocus < 0) this.currentFocus = (x.length - 1);
        x[this.currentFocus].classList.add("autocomplete-active");
		scrollToElm(x[this.currentFocus].parentNode, x[this.currentFocus]);
    }

    input.prototype.removeActive = function(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    input.prototype.closeAllLists = function(elmnt) {
        var x = document.querySelectorAll("div.autocomplete-input.autocomplete-items");
        var y = document.querySelectorAll(".autocomplete>input[type=text]");
        for(var i = 0; i < x.length; i++){
            if(!elmnt || (elmnt != x[i] && (elmnt && elmnt._id != x[i]._id))){
                x[i].parentNode.removeChild(x[i]);
            }
        }
		for(var i = 0; i < y.length; i++){
			y[i].classList.remove("autocomplete-active");
		}
    }

    document.addEventListener("click", function(e){
        input.prototype.closeAllLists(e.target);
    });
})();