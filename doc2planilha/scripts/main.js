var pending = false;
var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";

var drop = document.getElementById('drop');
var typeArchive = document.getElementById('typeArchive');
var spinner = new Spinner().spin(drop);
spinner.stop();

var planilhaMain = new Planilha();

typeArchive.parentNode.replaceChild(planilhaMain.getHTMLSelect(), typeArchive);

function typeArchiveChange(){
    document.getElementById('data-table').outerHTML = planilhaMain.toHTML();
}

planilhaMain.onChange = function(p){
    typeArchiveChange();
}

function doit(type, fn, dl) {
    var elt = document.getElementById('data-table');
    var sheet = planilhaMain.toSheet();

    var wb = XLSX.utils.table_to_book(elt, { sheet: "Tabela - 01" });
    wb.Sheets[wb.SheetNames[0]]["!cols"] = sheet["!cols"];
    
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

function StringToHTML(a){
    if(!a || typeof a !== "string"){return [];}
    var b, c = []; 
    b = new window.DOMParser().parseFromString(a, "text/html").body;
    if (!b || b.getElementsByTagName("parsererror").length){
        console.error( "Invalid XML: " + a);
    }else{
        while(b.firstChild){c.push(b.firstChild); b.removeChild(b.firstChild);}
    }
    return c;
}

async function xw(data, file, sucess, error) {
    pending = true;
    var v, fileName = file.name;

    if((/(\.docx)/).test(fileName)){
        try {
            var result = await mammoth.convertToHtml({arrayBuffer: data}).catch(console.log);
            var elements = StringToHTML(result.value);
            var planilha = new Planilha();
            var textContent = "";
            elements.forEach(function(el, i){
                if(String(el.tagName).toLowerCase() === "table"){
                    var sheet = {
                        FileName: (fileName+"_"+i),
                        Props: {},
                        SheetNames: ["Tabela1"],
                        Sheets: {Tabela1: (XLSX.utils.table_to_sheet(el))},
                        Workbook: {Names: Array(0)}
                    };
                    planilha.push(sheet);
                }else{
                    let t = el.querySelectorAll("table");
                    if(t && t.length > 0){
                        t.forEach(function(el, j){
                            var sheet = {
                                FileName: (fileName+"_"+i),
                                Props: {},
                                SheetNames: ["Tabela1"],
                                Sheets: {Tabela1: (XLSX.utils.table_to_sheet(el))},
                                Workbook: {Names: Array(0)}
                            };
                            planilha.push(sheet);
                        });
                    }else{
                        textContent += el.textContent + "\n";
                    }
                }
            });

            for(var k in planilha.Sheets){
                var value = planilha.Sheets[k]["A1"];
                planilha.Sheets[k]["A1"].v = textContent + value.v;
                planilha.Sheets[k]["A1"].w = textContent + value.w;
            }
            planilha.updateMatriz();

            sucess({
                Props: {},
                SheetNames: ["Tabela1"],
                Sheets: {Tabela1: (planilha.getDataSheet())},
                Workbook: {Names: Array(0)}
            });
        }catch(e){
            error({t:"e",d:e.stack||e});
            return;
        }
    }else{
        try {
            v = XLSX.read(data, {type: 'binary'});
        }catch(e){
            error({t:"e",d:e.stack||e});
            return;
        }
    }
    if(v){
        sucess(v);
    }else{
        error({t:"e",d:"Not Found!"});
    }
}

function readFile(files, index){
    index = typeof index === "number" ? index : 0;
    if(index >= files.length){spinner.stop(); pending = false; typeArchiveChange(); return;}
    var f = files[index];
    var reader = new FileReader();
    reader.onload = function(e){
        if(planilhaMain.SheetNames.includes(f.name)){
            return;
        }
        var data = e.target.result;
        function doitnow(){
            try {
                xw(data, f, function(wb){
                    wb.FileName = f.name;
                    planilhaMain.push(wb);
                    console.log(wb);
                    if((index+1) >= files.length){
                        spinner.stop();
                        pending = false;
                        typeArchiveChange();
                    }else{
                        readFile(files, index+1);
                    }
                }, function(e){
                    if((index+1) >= files.length){
                        spinner.stop();
                        pending = false;
                    }else{
                        readFile(files, index+1);
                    }
                });
            } catch (e) {
                spinner.stop();
                console.log(e);
                alertify.alert('Algo deu errado durante o processamento, tente novamente!', function () { });
                pending = false;
            }
        }

        if(e.target.result.length > 1e6){
            alertify.confirm("Este arquivo tem "+ e.target.result.length +" bytes e pode demorar alguns instantes. Seu navegador pode travar durante este processo. Vamos jogar?", function(k){
                if(k){
                    doitnow();
                }
            });
        }else{
            doitnow();
        }
    };

    if(rABS){
        reader.readAsBinaryString(f);
    }else{
        reader.readAsArrayBuffer(f);
    }
}

function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    if (pending) return alertify.alert('Aguarde até que o arquivo atual seja processado.', function () { });
    var files = e.dataTransfer.files;
    spinner.stop();
    spinner = new Spinner().spin(drop);
    planilhaMain.clear();
    document.getElementById('data-table').innerHTML = "";
    readFile(files, 0);
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