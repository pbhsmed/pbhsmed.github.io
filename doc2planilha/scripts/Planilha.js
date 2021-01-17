window.Planilha = function(){
    this.SheetNames = [];
    this.Sheets = {};
    this.width = 0;
    this.height = 0;
    this.data = [];

    this.typeArchives = [["normal", "Normal"], ["quadro_escolar", "Quadro Escolar"]];
    this.typeArchive = ["normal", "Normal"];

    this.clear();
}

window.Planilha.prototype.onChange = function(){return;}

window.Planilha.prototype.clear = function(){
    this.SheetNames = [];
    this.Sheets = {};
    this.width = 0;
    this.height = 0;
    this.data = [];
    this.onChange();
}

window.Planilha.prototype.getHTMLSelect = function(){
    var select = document.createElement("select");
    select.setAttribute("name", "typeArchive");
    select.setAttribute("id", "typeArchive");

    this.typeArchives.forEach((value)=>{
        var option = document.createElement("option");
        select.setAttribute("value", value[0]);
        option.appendChild(document.createTextNode(value[1]));
        select.appendChild(option);
    });

    select.value = this.typeArchive[1];

    select.addEventListener('change', (e)=>{
        let value = ["normal", "Normal"];
        this.typeArchives.forEach((r)=>{
            if(r.includes(e.target.value)){
                value = r;
            }
        });
        this.typeArchive = value;
        this.onChange(this);
    }, false);

    return select;
}

window.Planilha.prototype.coordinateToLength = function(x, y, width, height){
    width = typeof width === "number" ? width : this.width;
    height = typeof height === "number" ? height : this.height;
    x = typeof x === "number" ? x : 0;
    i = typeof i === "number" ? i : 0;
    return (Math.round(x) + (Math.floor(y) * width));
}

window.Planilha.prototype.lengthToCoordinate = function(i, width, height){
    width = typeof width === "number" ? width : this.width;
    height = typeof height === "number" ? height : this.height;
    i = typeof i === "number" ? i : 0;
    var x = i  % width;
    var y = Math.floor(i / width);
    return {x: x, y: y};
}

window.Planilha.prototype.getPosBy = function(ref){
    var letterToColumn = function(letter){
        var column = 0, length = letter.length;
        for(var i = 0; i < length; i++){
            column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
        }
        return column;
    }
    var x = 0; var y = 0;
    var letter = String(ref).match(/([a-z]+)/gi);
    var number = String(ref).match(/([0-9]+)/gi);
    if(Array.isArray(letter) && letter.length > 0){
        x = letterToColumn(String(letter[0]).toUpperCase());
        x = x < 1 ? 0 : x - 1;
    }
    if(Array.isArray(number) && number.length > 0){
        y = Number(number[0]);
        y = y < 1 ? 0 : y - 1;
    }
    return {x: x, y: y};
}

window.Planilha.prototype.getRefBy = function(pos){
    var columnToLetter = function(column){
        var temp, letter = '';
        while(column > 0){
            temp = (column - 1) % 26;
            letter = String.fromCharCode(temp + 65) + letter;
            column = (column - temp - 1) / 26;
        }
        return letter;
    }
    var ref = "";
    ref = String(columnToLetter(pos.x + 1)).toUpperCase();
    ref = ref + (pos.y + 1);
    return ref;
}

window.Planilha.prototype.removeEmpty = function(arr){
    const emptyColumns = (arr[0] || []).map(function(c, i){
        return arr.some(a => a[i]);
    });
    const empted = arr.map(function(a){
        return a.filter(function(_, i){
            return emptyColumns[i];
        })
    });
    const emptyRows = empted.filter(function(a){
        return a.some(function(e){
            return ((typeof e === "string" && e.length > 0) || (typeof e === "number"));
        });
    });
    return emptyRows;
}

window.Planilha.prototype.formalSTR = function(str){
    return String(str || "").replace(/\n/gi, " ").replace(/(\s+)/gi, " ").replace(/^(\s+)/gi, "").replace(/(\s+)$/gi, "");
}

window.Planilha.prototype.sheetToArray = function(sheet){
    var arr = [[]];
    for(var k in sheet){
        if((/^([A-Z]+)([0-9]+)$/).test(k) === false){continue;}
        var pos = this.getPosBy(k);
        if(Array.isArray(arr[pos.y]) !== true){
            arr[pos.y] = [];
        }
        arr[pos.y][pos.x] = (sheet[k].v || sheet[k].w || "");
    }
    return this.removeEmpty(arr);
}

window.Planilha.prototype.arrayToSheet = function(arr){
    arr = this.removeEmpty(arr);

    var sheet = {
        "!ref": "A1:A1"
    };

    var startPos = {x: 0, y: 0};
    var endPos = {x: 0, y: 0};

    arr.forEach((row, y)=>{
        row.forEach((col, x)=>{
            var ref = this.getRefBy({x: x, y: y});
            sheet[ref] = {t: "s", v: col, w: col};
            endPos.x = endPos.x > x ? endPos.x : x;
        });
        endPos.y = endPos.y > y ? endPos.y : y;
    });

    sheet["!ref"] = this.getRefBy(startPos) + ":" + this.getRefBy(endPos);

    return sheet;
}

window.Planilha.prototype.updateSize = function(){
    var width = 0, height = 0, newData = [];
    this.SheetNames.forEach(name => {
        var arr = this.sheetToArray(this.Sheets[name]);
        width = width > arr[0].length ? width : arr[0].length;
        height += arr.length;
    });

    if(this.data.length <= 0){
        newData = new Array(height * width).fill("");
    }else{
        this.data.forEach((v, i)=>{
            var pos = this.lengthToCoordinate(i, this.width, this.height);
            var c = this.coordinateToLength(pos.x, pos.y, width, height);
            newData[c] = (v || "");
        });
    }

    this.width = width;
    this.height = height;
    this.data = newData;
}

window.Planilha.prototype.updateMatriz = function(){
    this.updateSize();
    var arr = [];
    this.SheetNames.forEach(name => {
        arr = arr.concat(this.sheetToArray(this.Sheets[name]));
    });
    arr.forEach((row, y)=>{
        row.forEach((col, x)=>{
            var i = this.coordinateToLength(x, y);
            this.data[i] = col;
        });
    });
}

window.Planilha.prototype.push = function(wb){
    if(this.SheetNames.includes(wb.FileName)){
        this.updateMatriz();
        return;
    }
    this.SheetNames.push(wb.FileName);
    this.Sheets[wb.FileName] = JSON.parse(JSON.stringify(wb.Sheets[wb.SheetNames[0]]));
    this.updateMatriz();
}

window.Planilha.prototype.getDataSheet = function(){
    var sheet = {
        "!ref": "A1:A1"
    };

    var startPos = {x: 0, y: 0};
    var endPos = {x: 0, y: 0};

    this.data.forEach((v, i)=>{
        var pos = this.lengthToCoordinate(i);
        var k = this.getRefBy(pos);
        sheet[k] = {t: "s", v: v, w: v};
        endPos.x = endPos.x > pos.x ? endPos.x : pos.x;
        endPos.y = endPos.y > pos.y ? endPos.y : pos.y;
    });

    sheet["!ref"] = this.getRefBy(startPos) + ":" + this.getRefBy(endPos);
    return sheet;
}

window.Planilha.prototype.getDataSheet_quadro_escolar = function(){
    var sheet = {
        "!ref": "A1:A1"
    };

    var startPos = {x: 0, y: 0};
    var endPos = {x: 0, y: 0};

    var cols = ["ESCOLA"];

    this.SheetNames.forEach(name => {
        var arr = this.sheetToArray(this.Sheets[name]);
        arr[0].forEach((l, i)=>{
            label = this.formalSTR(l);
            if(i > 0 && label.length > 0 && cols.includes(label) !== true){
                cols.push(label);
            }
        });
    });

    cols.forEach((col, i)=>{
        var key = this.getRefBy({x: i, y: 0});
        sheet[key] = {t: "s", v: col, w: col};

        endPos.x = endPos.x > i ? endPos.x : i;
    });

    var rowLenght = 0;

    this.SheetNames.forEach(name => {
        var arr = this.sheetToArray(this.Sheets[name]);
        var _cols = [];

        var nomeEscola = String(arr[0][0] || "").split(/\n/gi);
        nomeEscola.forEach(function(str){
            if(str.toUpperCase().search("ESCOLA") >= 0){
                nomeEscola = str;
            }
        });

        arr[0].forEach((label, i)=>{
            _cols[i] = label;
        });

        arr.forEach((row, y)=>{
            if(y <= 0){return false;}
            row.forEach((col, x)=>{
                var pos = JSON.parse(JSON.stringify({x: x, y: y}));
                var value = {t: "s", v: this.formalSTR(col), w: this.formalSTR(col)};

                if(x === 0){
                    value.v = this.formalSTR(nomeEscola);
                    value.w = this.formalSTR(nomeEscola);
                }else{
                    pos.x = cols.indexOf(this.formalSTR(_cols[x]));
                }

                if(pos.x >= 0){
                    pos.y += rowLenght;
                    endPos.y = endPos.y > pos.y ? endPos.y : pos.y;
                    sheet[this.getRefBy(pos)] = value;
                }
            });
        });

        rowLenght += (arr.length - 1);
    });

    sheet["!ref"] = this.getRefBy(startPos) + ":" + this.getRefBy(endPos);
    return sheet;
}

window.Planilha.prototype.toHTML = function(){
    var sheet = {
        "!ref": "A1:A1"
    };

    if(this.typeArchive[0] === "quadro_escolar"){
        sheet = this.getDataSheet_quadro_escolar();
    }else{
        sheet = this.getDataSheet();
    }
    
    return XLSX.utils.sheet_to_html(sheet, { editable: false }).replace("<table", '<table id="data-table" border="1"');
}