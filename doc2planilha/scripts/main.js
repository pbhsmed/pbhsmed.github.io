var pending = false;
var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";

var drop = document.getElementById('drop');
var typeArchive = document.getElementById('typeArchive');
var spinner = new Spinner().spin(drop);
spinner.stop();

var memoryFiles = [];

function doit(type, fn, dl) {
    var elt = document.getElementById('data-table');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "Sheet JS" });
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, fn || ('Planilha.' + (type || 'xlsx')));
}

function fixdata(data) {
    var o = "", l = 0, w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}

function columnToLetter(column){
    var temp, letter = '';
    while(column > 0){
        temp = (column - 1) % 26;
        letter = String.fromCharCode(temp + 65) + letter;
        column = (column - temp - 1) / 26;
    }
    return letter;
}

function letterToColumn(letter){
    var column = 0, length = letter.length;
    for(var i = 0; i < length; i++){
        column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
    }
    return column;
}

function getPosBy(ref){
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var x = 0;
    var y = 0;

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

function getRefBy(pos){
    var ref = "";

    ref = String(columnToLetter(pos.x + 1)).toUpperCase();
    ref = ref + (pos.y + 1);

    return ref;
}

function formalSTR(str){
    return String(str || "").replace(/\n/gi, " ").replace(/(\s+)/gi, " ").replace(/^(\s+)/gi, "").replace(/(\s+)$/gi, "");
}

function process_table(wb){
    var tabela = {
        Props: {},
        SheetNames: ["Tabela1"],
        Sheets: {
            Tabela1: {
                "!ref": "A1:A1"
            }
        },
        Workbook: {
            Names: []
        }
    };

    var sheetName = tabela.SheetNames[0];

    if(typeArchive.value === "quadro_escolar"){
        var cols = ["ESCOLA"];
        memoryFiles.forEach(function(wb){
            var sheet = wb.Sheets[wb.SheetNames[0]];
            var _ref = sheet["!ref"].split(":");
            var _start = getPosBy(_ref[0]);
            var _end = getPosBy(_ref[1]);

            for(var i=1; i<=_end.x; i++){
                var key = getRefBy({x: i, y: 0});
                if((key in sheet) !== true){continue;}
                var value = JSON.parse(JSON.stringify(sheet[key]));
                var label = formalSTR(value.v || value.w || "").toUpperCase();
                if(label.length > 0 && cols.includes(label) !== true){
                    cols.push(label);
                }
            }
        });

        cols.forEach(function(col, i){
            var key = getRefBy({x: i, y: 0});
            tabela.Sheets[sheetName][key] = {t: "s", v: col, w: col};
            tabela.Sheets[sheetName]["!ref"] = "A1:" + getRefBy({x: (cols.length - 1), y: 0});
        });
        
        memoryFiles.forEach(function(wb){
            var sheet = wb.Sheets[wb.SheetNames[0]];
            var ref = tabela.Sheets[sheetName]["!ref"].split(":");
            var start = getPosBy(ref[0]);
            var end = getPosBy(ref[1]);
        
            var _ref = sheet["!ref"].split(":");
            var _start = getPosBy(_ref[0]);
            var _end = getPosBy(_ref[1]);
            var _cols = [];

            var nomeEscola = String(sheet[getRefBy({x: 0, y: 0})].v || "").split(/\n/gi);
            nomeEscola.forEach(function(str){
                if(str.toUpperCase().search("ESCOLA") >= 0){
                    nomeEscola = str;
                }
            });

            for(var i=0; i<=_end.x; i++){
                var key = getRefBy({x: i, y: 0});
                if((key in sheet) !== true){continue;}
                var value = JSON.parse(JSON.stringify(sheet[key]));
                _cols[i] = formalSTR(value.v || value.w || "").toUpperCase();
            }

            for(var k in sheet){
                if(k === "!ref"){continue;}
                var pos = getPosBy(k);
                var value = JSON.parse(JSON.stringify(sheet[k]));

                if(pos.x === 0 && pos.y > 0){
                    value.v = formalSTR(nomeEscola);
                    value.w = formalSTR(nomeEscola);
                    pos.y += end.y;
                    tabela.Sheets[sheetName][getRefBy(pos)] = value;
                }else if(pos.y > 0){
                    value.v = formalSTR(value.v);
                    value.w = formalSTR(value.w);
                    pos.x = cols.indexOf(_cols[pos.x]);
                    pos.y += end.y;
                    if(pos.x > 0){
                        tabela.Sheets[sheetName][getRefBy(pos)] = value;
                    }
                }
            }
        
            end.x = end.x > _end.x ? end.x : _end.x;
            end.y = end.y + _end.y;
        
            tabela.Sheets[sheetName]["!ref"] = getRefBy(start) + ":" + getRefBy(end);
        });
    }else{
        memoryFiles.forEach(function(wb){
            var sheet = wb.Sheets[wb.SheetNames[0]];
            var ref = tabela.Sheets[sheetName]["!ref"].split(":");
            var start = getPosBy(ref[0]);
            var end = getPosBy(ref[1]);

            console.log(start, end);
        
            var _ref = sheet["!ref"].split(":");
            var _start = getPosBy(_ref[0]);
            var _end = getPosBy(_ref[1]);
        
            for(var k in sheet){
                if(k === "!ref"){continue;}
                var pos = getPosBy(k);
                var value = JSON.parse(JSON.stringify(sheet[k]));
                if(end.y > 1){
                    pos.y += 1;
                    pos.y += end.y;
                }
        
                value.v = formalSTR(value.v);
                value.w = formalSTR(value.w);
        
                tabela.Sheets[sheetName][getRefBy(pos)] = value;
            }

            for(var k in tabela.Sheets[sheetName]){
                if(k === "!ref"){continue;}
                var pos = getPosBy(k);
                end.x = end.x > pos.x ? end.x : pos.x;
                end.y = end.y > pos.y ? end.y : pos.y;
            }
        
            tabela.Sheets[sheetName]["!ref"] = getRefBy(start) + ":" + getRefBy(end);
        });
    }

    return tabela.Sheets[sheetName];
}

function typeArchiveChange(){
    var tabela = process_table();
    var o = XLSX.utils.sheet_to_html(process_table(), { editable: false }).replace("<table", '<table id="data-table" border="1"');
    document.getElementById('data-table').outerHTML = o;
    console.log(tabela);
}

function process_wb(wb){
    memoryFiles.push(wb);
    typeArchiveChange();
    pending = false;
}

function xw(data, cb) {
    pending = true;
    spinner.stop();
    spinner = new Spinner().spin(drop);
    var worker = new Worker('./scripts/modify.js');
    worker.onmessage = function (e) {
        switch (e.data.t) {
            case 'ready': break;
            case 'e': pending = false; console.error(e.data.d); break;
            case 'xlsx': cb(JSON.parse(e.data.d)); break;
        }
    };
    var arr = rABS ? data : btoa(fixdata(data));
    worker.postMessage({ d: arr, b: rABS });
}

function readFile(files, index){
    index = typeof index === "number" ? index : 0;
    if(index >= files.length){spinner.stop(); return;}
    var f = files[index];
    var reader = new FileReader();
    reader.onload = function (e) {
        if (typeof console !== 'undefined') console.log("onload", new Date());
        var data = e.target.result;
        function doitnow() {
            try {
                xw(data, process_wb);
            } catch (e) {
                console.log(e);
                alertify.alert('Algo deu errado durante o processamento, tente novamente!', function () { });
                pending = false;
            }
            readFile(files, index+1);
        }
        if (e.target.result.length > 1e6) alertify.confirm("Este arquivo tem "+ e.target.result.length +" bytes e pode demorar alguns instantes. Seu navegador pode travar durante este processo. Vamos jogar?", function (k) { if (k) doitnow(); });
        else doitnow();
    };
    if (rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);
}

function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    if (pending) return alertify.alert('Aguarde até que o arquivo atual seja processado.', function () { });
    var files = e.dataTransfer.files;
    memoryFiles = [];
    typeArchiveChange();
    readFile(files);
}

function handleDragover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

if(document.body.addEventListener) {
    document.body.addEventListener('dragenter', handleDragover, false);
    document.body.addEventListener('dragover', handleDragover, false);
    document.body.addEventListener('drop', handleDrop, false);
}

if(typeArchive.addEventListener){
    typeArchive.addEventListener('change', typeArchiveChange, false);
}