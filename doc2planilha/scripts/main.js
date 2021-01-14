var pending = false;
var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";

var drop = document.getElementById('drop');
var spinner = new Spinner().spin(drop);
spinner.stop();

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

function process_table(wb){
    var sheet = wb.Sheets[wb.SheetNames[0]];
    var sheetName = tabela.SheetNames[0];
    var ref = tabela.Sheets[sheetName]["!ref"].split(":");
    var start = getPosBy(ref[0]);
    var end = getPosBy(ref[1]);

    var _ref = sheet["!ref"].split(":");
    var _start = getPosBy(_ref[0]);
    var _end = getPosBy(_ref[1]);

    for(var k in sheet){
        if(k === "!ref"){continue;}
        var pos = getPosBy(k);
        pos.y += end.y;

        sheet[k].v = String(sheet[k].v || "").replace(/\n/gi, " ").replace(/(\s+)/gi, " ").replace(/^(\s+)/gi, "").replace(/(\s+)$/gi, "");
        sheet[k].w = String(sheet[k].w || "").replace(/\n/gi, " ").replace(/(\s+)/gi, " ").replace(/^(\s+)/gi, "").replace(/(\s+)$/gi, "");

        tabela.Sheets[sheetName][getRefBy(pos)] = sheet[k];
    }

    end.x = end.x > _end.x ? end.x : _end.x;
    end.y = end.y + _end.y;

    console.log(sheet);

    tabela.Sheets[sheetName]["!ref"] = getRefBy(start) + ":" + getRefBy(end);

    return tabela.Sheets[sheetName];
}

function process_wb(wb) {
    var o = XLSX.utils.sheet_to_html(process_table(wb), { editable: false }).replace("<table", '<table id="data-table" border="1"');
    document.getElementById('data-table').outerHTML = o;
    pending = false;
    console.log(tabela.Sheets[tabela.SheetNames[0]]);
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
    tabela = {
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
    readFile(files);
}

function handleDragover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}


if (drop.addEventListener) {
    drop.addEventListener('dragenter', handleDragover, false);
    drop.addEventListener('dragover', handleDragover, false);
    drop.addEventListener('drop', handleDrop, false);
}