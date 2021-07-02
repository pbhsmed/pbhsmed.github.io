(function(win){
    var getListaHTML_arguments = [];

    var validInput = function(str){
        return (typeof str === "string" && str !== "" && String(str).replace(/\s/gi, "").length > 0);
    }

    var showInfo = function(range, edit, data, warning){
        edit = typeof edit === "boolean" ? edit : false;
        var d = win.__dados.getEmptyDice("ESCOLAS"), novo = true;

        if(data){
            d = JSON.parse(JSON.stringify(data));
        }else if(range && typeof range === "string"){
            d = JSON.parse(JSON.stringify(win.__dados.getByRange(range)));
            novo = false;
        }

        var regionais = win.__dados.regionais;
        console.log(d);

        var div = js(`<div class="container"></div>`);

        var alert_warning = js(`<div class="alert-warning" style="display: none;">Erro:</div>`);

        var showError = function(str){
            if(typeof str !== "string"){
                alert_warning.html("");
                alert_warning.css("display", "none");
                return;
            }
            alert_warning.html(str);
            alert_warning.css("display", "");
            Dialog.toScrollTop();
        }

        div.append(alert_warning);

        if(typeof warning === "string" && warning.length > 0){
            showError(warning);
        }

        var row = js(`<div class="row"><div class="col"></div></div>`);
        div.append(row);
        new InputCustom(row.find("div.col").getItem(0), {label: "Nome", value: d.nome_escola, disabled: (edit !== true), onChange: function(val){
            d.nome_escola = val;
        }});

        row = js(`<div class="row"><div class="col-12 col-md-6"></div><div class="col-12 col-md-6"></div></div>`);
        div.append(row);
        new InputCustom(row.find("div.col-12").getItem(0), {label: "INEP/MEC", value: d.inep, disabled: (edit !== true), mask: [/[0-9]{1,8}/], onChange: function(val){
            d.inep = val;
        }});

        new InputCustom(row.find("div.col-12").getItem(1), {label: "SIEST", value: d.siest, disabled: (edit !== true), mask: [/[0-9]{1,2}/, '.', /[0-9]{1,2}/, '.', /[0-9]{1,2}/, '.', /[0-9]{1,2}/, '.', /[0-9]{1,2}/, '.', /[0-9]{1,3}/], onChange: function(val){
            d.siest = val;
        }});

        row = js(`<div class="row"><div class="col-12 col-md-6"></div><div class="col-12 col-md-6"></div></div>`);
        div.append(row);
        var isCreche = (d["tipo_escola"] === "CRECHE" || d["codigo_creche"] !== "" || (/([a-z]+)\-([0-9]+)/gi).test(d["codigo_creche"]));

        var inputCreche = null;
        
        if((["EMEF", "EMEI", "CRECHE"]).includes(d.tipo_escola) !== true){
            d.tipo_escola = "EMEF";
        }

        new InputCustom(row.find("div.col-12").getItem(0), {label: "Tipo", value: d.tipo_escola, list: ["EMEF", "EMEI", "CRECHE"], disabled: (edit !== true), onChange: function(val, i){
            d.tipo_escola = val;
            if(i === 2){
                inputCreche.disabled(false);
            }else{
                inputCreche.value("");
                inputCreche.disabled(true);
            }
        }});

        inputCreche = new InputCustom(row.find("div.col-12").getItem(1), {label: "Cod. Creche", value: d.codigo_creche, disabled: (edit !== true || isCreche !== true), onChange: function(val){
            d.codigo_creche = val;
        }});

        row = js(`<div class="row"><div class="col"></div></div>`);
        div.append(row);
        new InputCustom(row.find("div.col").getItem(0), {label: "E-mail", value: d.email, disabled: (edit !== true), onChange: function(val){
            d.email = val;
        }});

        row = js(`<div class="row"><div class="col"></div></div>`);
        div.append(row);
        new InputCustom(row.find("div.col").getItem(0), {label: "Telefone", value: d.telefone, disabled: (edit !== true), onChange: function(val){
            d.telefone = val;
        }});

        row = js(`<div class="row"><div class="col-12 col-md-6"></div><div class="col-12 col-md-6"></div></div>`);
        div.append(row);
        new InputCustom(row.find("div.col-12").getItem(0), {label: "Endereço", value: d.endereco, disabled: (edit !== true), onChange: function(val){
            d.endereco = val;
        }});
        
        new InputCustom(row.find("div.col-12").getItem(1), {label: "Bairro", value: d.bairro, disabled: (edit !== true), onChange: function(val){
            d.bairro = val;
        }});

        row = js(`<div class="row"><div class="col-12 col-md-6"></div><div class="col-12 col-md-6"></div></div>`);
        div.append(row);

        if(Object.keys(regionais).includes(d.regional) !== true){
            d.regional = Object.keys(regionais)[0];
            d.nome_regional = regionais[d.regional].nome;
        }

        new InputCustom(row.find("div.col-12").getItem(0), {label: "Regional", value: d.nome_regional, disabled: (edit !== true), list: Object.keys(regionais).map(r => regionais[r].nome), onChange: function(val){
            d.nome_regional = val;
            for(var k in regionais){
                if(regionais[k].nome === val){
                    d.regional = k;
                    break;
                }
            }
        }});

        new InputCustom(row.find("div.col-12").getItem(1), {label: "CEP", value: d.cep, disabled: (edit !== true), mask: [/[0-9]{1,5}/, '-', /[0-9]{1,3}/], onChange: function(val){
            d.cep = val;
        }});

        row = js(`<div class="row"><div class="col"></div></div>`);
        div.append(row);
        new InputCustom(row.find("div.col").getItem(0), {label: "Referência", value: d.referencia, disabled: (edit !== true), multiline: true, rows: 4, onChange: function(val){
            d.referencia = val;
        }});

        var btns = [];
        btns.push(Dialog.btn_cancel(function(e){
            if(novo !== true && edit === true){
                showInfo(range, false);
                e.preventDefault();
            }
        }, novo !== true && edit === true));

        if(edit !== true){
            btns.push(Dialog.btn("Editar", function(){
                showInfo(range, true);
            }));

            btns.push(Dialog.btn("Excluir", function(){
                Dialog.confirm("Tem certeza de queira excluir essa informação?\nDepois de excluído, não terá como recuperar!", "Sim", "Não").then(function(){
                    Dialog.splash();
                    win.__dados.removeDice(range).then(function(){
                        updateListaHTML();
                        Dialog.close();
                    }).catch(function(e){
                        console.log(e);
                        showInfo(range, edit, data, "Erro ao excluir as informações, tente novamente mais tarde!");
                    });
                }).catch(function(){
                    showInfo(range, edit, data);
                });
            }));
        }else{
            btns.push(Dialog.btn("Salvar", function(){
                showError();
                if(validInput(d.nome_escola) !== true){
                    showError("É necessário que preencha o campo <b>Nome</b>!");
                    return;
                }
                if(d.tipo_escola === "CRECHE" && validInput(d.codigo_creche) !== true){
                    showError("É necessário que informe o <b>Código da Creche</b>!");
                    return;
                }

                Dialog.splash();
                
                win.__dados.saveDice(d, novo ? "ESCOLAS" : range).then(function(){
                    updateListaHTML();
                    Dialog.close();
                }).catch(function(e){
                    console.log(e);
                    showInfo(range, edit, data, "Erro ao salvar as informações, tente novamente mais tarde!");
                });
            }));
        }

        Dialog.show(novo ? "INFORMAÇÃO ESCOLAR" : d.nome_escola, div, btns, null, "large");
    }

    var updateListaHTML = function(){
        getListaHTML.apply(null, getListaHTML_arguments);
    }

    var getListaHTML = function(container, regional, page, length, search, lista){
        getListaHTML_arguments = [container, regional, page, length, search, lista];
        container.html("");
        page = typeof page === "number" ? page : 0;
        var start = page*length,
            end = (page+1)*length;

        search = typeof search === "string" ? search : "";
        search = search.length < 3 ? null : search;

        lista = Array.isArray(lista) ? lista : win.__dados.data["ESCOLAS"].filter(function(value){
            return (!(regional in win.__dados.regionais) || String(value["nome_regional"]).toLocaleLowerCase() === String(win.__dados.regionais[regional].nome).toLocaleLowerCase())
        });

        if(typeof search === "string"){
            lista.sort(function(a, b){
                var a1 = (a["codigo_creche"] || "")+" - "+(a["nome_escola"] || "");
                var b1 = (b["codigo_creche"] || "")+" - "+(b["nome_escola"] || "");
                return (StringSimilarity.compareTwoStrings(search, b1) - StringSimilarity.compareTwoStrings(search, a1));
            });
        }

        end = end >=lista.length ? lista.length : end;

        var pagination = new Pagination(Math.round(lista.length / length), page+1);
        pagination.onChange = function(page){
            getListaHTML(container, regional, page-1, length, search, lista);
            js("body > #MainApp > .content > .content-main").scrollTop(0);
        }

        pagination.insertInto(container);

        for(var i=start; i<end; i++){
            var d = lista[i];
            var dom = js(`<div>
                <div class="title" range="${d["range"] || ""}">${d["nome_escola"] || " "}</div>
                <div class="content">
                    <div label="Regional">${d["nome_regional"] || " "}</div>
                    <div label="INEP/MEC">${d["inep"] || " "}</div>
                    ${(d["codigo_creche"] ? `<div label="Código Creche">${d["codigo_creche"] || " "}</div>` : "")}
                    <div label="SIEST">${d["siest"] || " "}</div>
                    <div label="E-mail">${d["email"] || " "}</div>
                    <div label="Telefone">${d["telefone"] || " "}</div>
                </div>
            </div>`);

            container.append(dom);

            dom.find("div > div.title").on("click", function(e){
                showInfo(this.getAttribute("range"));
            });
        }

        pagination.insertInto(container);
    }

    win.PageEscolas = function(state){
        win.AppHome.seTtile("Escolas e Instituições");
        Dialog.close();
        let dom = js("body > #MainApp > .content > .content-main");
        dom.html("");

        let container = js(`<div class="Escolas-container"></div>`);
        dom.append(container);

        let input_container = js(`<div class="Escolas-input">
            <div class="input-container">
                <input id="Escolas-input" type="text" autocomplete="off"/>
                <svg viewBox="0 0 24 24"><path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
            </div>
            <div class="btn-new">
                <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
            </div>
        </div>`);
        container.append(input_container);

        //showInfo(null, true);

        input_container.find("div.btn-new").on("click", function(){
            showInfo(null, true);
        });

        let btnsRegionais, btns = [];

        btnsRegionais = js(`<div class="btnsRegionais"></div>`);
        container.append(btnsRegionais);

        btns[0] = js(`<div class="btn"><div class="marker"></div><div class="label">TODOS</div></div>`);

        btnsRegionais.append(btns[0]);

        if(!state || !state.select || state.select === "todos" || state.select === ""){
            btns[0].addClass("select");
        }

        btns[0].on("click", function(){
            win.History.goTo("escolas", {
                select: "todos"
            });
        });

        Object.entries(win.__dados.regionais).forEach(function(v, i){
            btns[i+1] = js(`<div class="btn regional_${v[0]}"><div class="marker"></div><div class="label">${v[1].nome}</div></div>`);

            btns[i+1].css({
                "background-color": win.color(v[1].color).lighten(80).string,
                "border-color": win.color(v[1].color).lighten(40).string,
                "color": win.color(v[1].color).darken(60).string
            });

            btns[i+1].find(".marker").css({
                "background-color": win.color(v[1].color).lighten(40).string,
                "border-color": win.color(v[1].color).lighten(40).string,
            });

            if(state.select === v[0]){
                btns[i+1].addClass("select");
            }

            btnsRegionais.append(btns[i+1]);

            btns[i+1].on("click", function(){
                win.History.goTo("escolas", {
                    select: v[0]
                });
            });
        });

        let lista_container = js(`<div class="Escolas-lista"></div>`);
        container.append(lista_container);

        getListaHTML(lista_container, state.select, 0, 15, "");

        var temp;

        input_container.find("#Escolas-input").on("input", function(e){
            window.clearTimeout(temp);
            temp = window.setTimeout(function(){
                getListaHTML(lista_container, state.select, 0, 15, e.target.value);
            }, 500);
        });
    }
})(window);