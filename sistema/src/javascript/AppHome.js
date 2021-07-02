(function(win){
    win.AppHome = {};

    win.AppHome.show = function(){
        win.splash(false);
        let dom = js(`<div id="MainApp">
            <div class="PanelSystem-vertical-wrap">
                <div class="PanelSystem-backdrop"></div>
                <div class="PanelSystem-vertical-bar">
                    <div class="PanelSystem-logo">SISTEMA DE GESTÃO</div>
                    <div class="PanelSystem-menu"></div>
                    <div class="PanelSystem-account">
                        <svg class="profilePicture-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M19,3H5C3.89,3 3,3.89 3,5V9H5V5H19V19H5V15H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10.08,15.58L11.5,17L16.5,12L11.5,7L10.08,8.41L12.67,11H3V13H12.67L10.08,15.58Z" /></svg>
                        <div class="PanelSystem-label">SAIR</div>
                    </div>
                </div>
            </div>
            <div class="app_bar" style="display: none;">
                <div class="title_bar">SISTEMA DE GESTÃO</div>
                <div class="btn_bar">
                    <div class="btn-group" role="group">
                        <div class="btn-group" role="group">
                            <button id="btnGroupCONSULTAR" type="button" class="btn btn-outline-light btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">CONSULTAR</button>
                            <ul class="dropdown-menu" aria-labelledby="btnGroupCONSULTAR">
                                <li><a class="dropdown-item" href="#">Estoque</a></li>
                                <li><a class="dropdown-item" href="#">Solicitações</a></li>
                                <li><a class="dropdown-item" href="#">Entregas</a></li>
                            </ul>
                        </div>
                        <div class="btn-group" role="group">
                            <button id="btnGroupREGISTRAR" type="button" class="btn btn-outline-light btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">REGISTRAR</button>
                            <ul class="dropdown-menu" aria-labelledby="btnGroupREGISTRAR">
                                <li><a class="dropdown-item" href="#">Itens em Estoque</a></li>
                                <li><a class="dropdown-item" href="#">Solicitação</a></li>
                                <li><a class="dropdown-item" href="#">Entrega</a></li>
                            </ul>
                        </div>
                        <button type="button" id="BTN_SAIR" class="btn btn-outline-light btn-sm">SAIR</button>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="PanelSystem-container-bar-top">
                    <div class="PanelSystem-container-MenuIcon">
                        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
                    </div>
                    <div class="PanelSystem-container-title">Início</div>
                </div>
                <div class="content-main">
                
                </div>
            </div>
        </div>`);

        js("body").append(dom);

        var wrapMenu = function(e){
            var menu = dom.find("#MainApp > .PanelSystem-vertical-wrap")
            if(menu.hasClass("active")){
                menu.removeClass("active")
            }else{
                menu.addClass("active");
            }
        }

        dom.find("#MainApp > .content > .PanelSystem-container-bar-top > .PanelSystem-container-MenuIcon").on("click", wrapMenu);
        dom.find("#MainApp > .PanelSystem-vertical-wrap > .PanelSystem-backdrop").on("click", wrapMenu);

        dom.find("#MainApp > .PanelSystem-vertical-wrap > .PanelSystem-vertical-bar > .PanelSystem-account").on("click", function(e){
            e.preventDefault();
            win.splash(true);
            win.AppHome.hidden();
            win.sheets.signOut();
        });
    
        win.History.page("home", "Início", win.AppHome.toMapPage);
        win.History.page("dialog_solicitacoes_from_table_home", "Solicitações", win.AppHome.showDialogSoicitacoesFromTableHome);
        win.History.page("dialog_solicitacao_detalhada", "Solicitações", win.AppHome.showDialogSoicitacaoDetalhada, false);
    
        win.History.page("escolas", "Escolas", win.PageEscolas);

        var menu_actions = [{
            label: "Início",
            icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>`,
            action: function(){win.History.goTo("home");},
            isActive: function(){return win.History.isPage("home");}
        },{
            label: "Solicitações",
            icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" /></svg>`,
            action: function(){},
            isActive: function(){return false;}
        },{
            label: "Entregas",
            icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5M19.5,9.5L21.46,12H17V9.5M6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5M20,8H17V4H3C1.89,4 1,4.89 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8Z" /></svg>`,
            action: function(){},
            isActive: function(){return false;}
        },{
            label: "Escolas",
            icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M11 9C11 10.66 9.66 12 8 12C6.34 12 5 10.66 5 9C5 7.34 6.34 6 8 6C9.66 6 11 7.34 11 9M14 20H2V18C2 15.79 4.69 14 8 14C11.31 14 14 15.79 14 18M22 12V14H13V12M22 8V10H13V8M22 4V6H13V4Z" /></svg>`,
            action: function(){win.History.goTo("escolas");},
            isActive: function(){return win.History.isPage("escolas");}
        }];

        var mainMenuActions = dom.find("#MainApp > .PanelSystem-vertical-wrap > .PanelSystem-vertical-bar > .PanelSystem-menu");

        var appendMenu = function(menu, sapace){
            sapace = typeof sapace === "number" ? sapace : 0;
            menu.forEach(function(m, i){
                var btn = js(`<div class="PanelSystem-menu-iten">
                    <div class="PanelSystem-icon">${m.icon}</div>
                    <div class="PanelSystem-label">${m.label}</div>
                </div>`);
                mainMenuActions.append(btn);

                for(var i=0; i<sapace; i++){
                    btn.prepend(`<div class="PanelSystem-space"></div>`);
                }

                if(typeof m.isActive === "function" && m.isActive() === true){
                    mainMenuActions.find(".PanelSystem-menu-iten-active").removeClass("PanelSystem-menu-iten-active");
                    btn.addClass("PanelSystem-menu-iten-active");
                }

                if(Array.isArray(m.action)){
                    btn.addClass("PanelSystem-menu-iten-head");
                    appendMenu(m.action, sapace+1);
                }else if(typeof m.action === "function"){
                    btn.on("click", function(e){
                        mainMenuActions.find(".PanelSystem-menu-iten-active").removeClass("PanelSystem-menu-iten-active");
                        btn.addClass("PanelSystem-menu-iten-active");
                        m.action();
                        wrapMenu();
                    });
                }
            });
        }

        appendMenu(menu_actions);
    }

    win.AppHome.seTtile = function(title){
        title = typeof title === "string" ? title : win.History.getTitle();
        js("#MainApp > .content > .PanelSystem-container-bar-top .PanelSystem-container-title").html(title);
    }

    win.AppHome.hidden = function(){
        js("body > #MainApp").remove();
        win.__dados.clear();
    }

    win.AppHome.toMapPage = function(state){
        win.AppHome.seTtile("Início");
        Dialog.close();

        let dom = js("body > #MainApp > .content > .content-main");

        let contentSolicitacoes, btnsRegionais,
            regionaisArray = Object.keys(win.__dados.regionais),
            btns = [];

        if(dom.find(".mapRegionais").length <= 0){
            dom.html("");
            let contentMap = js(`<div class="mapRegionais"></div>`);
            contentMap.append(win.MapRegionais.getSVG());
            dom.append(contentMap);

            contentSolicitacoes = js(`<div class="tableSolicitacoes"></div>`);
            dom.append(contentSolicitacoes);
        }else{
            contentSolicitacoes = dom.find(".tableSolicitacoes");
            contentSolicitacoes.html("");
        }
    
        btnsRegionais = js(`<div class="btnsRegionais"></div>`);
        contentSolicitacoes.append(btnsRegionais);

        let table = new ComponentTable(contentSolicitacoes);

        table.setHead(
            {field: "id", value: "#", align: "center", width: 50}, 
            {field: "regional", value: "REGIONAL", align: "center"}, 
            {field: "nomeEscola", value: "ESCOLA", align: "center"}, 
            {field: "solicitacoes", value: "SOLICITAÇÕES", align: "center"}
        );

        let updateTable = function(regionais){
            regionais = Array.isArray(regionais) ? regionais : regionaisArray;

            let total = 0;

            table.clearRows();

            regionais.forEach(function(k){
                let indexRow = 0;

                Object.entries(win.__dados.solicitacoes[k]).forEach(function(v){
                    indexRow += 1;
                    total += v[1].solicitacoesEmAberto;

                    table.appendRow(indexRow,
                        {value: win.__dados.regionais[k].nome, align: "left"}, 
                        {value: v[1].escola, align: "left"}, 
                        {value: v[1].solicitacoesEmAberto}
                    ).onClick(function(e, i){
                        window.History.goTo("dialog_solicitacoes_from_table_home", {regional: v[1].regional, index: i, key: v[0]});
                        //console.log(v[1]);
                    });
                });
            });
    
            table.setFooter("", "", {value: "Total", align: "right", width: 100}, total);
        }

        win.MapRegionais.onClick = function(e, key){
            win.History.goTo("home", {
                select: key
            });
        }

        btns[0] = js(`<div class="btn select"><div class="marker"></div><div class="label">TODOS</div></div>`);

        btnsRegionais.append(btns[0]);

        btns[0].on("click", function(){
            win.History.goTo("home", {
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

            btnsRegionais.append(btns[i+1]);

            btns[i+1].on("click", function(){
                win.History.goTo("home", {
                    select: v[0]
                });
            });
        });

        let arraySelect = ["todos"].concat(regionaisArray);

        if(state && state.select && arraySelect.includes(state.select)){
            if(regionaisArray.includes(state.select)){
                win.MapRegionais.selectRegional(state.select);
                updateTable([state.select]);
                btns[arraySelect.indexOf(state.select)].addClass("select");
            }else{
                win.MapRegionais.selectRegional();
                updateTable(regionaisArray);
                btns[0].addClass("select");
            }
        }else{
            updateTable(regionaisArray);
            btns[0].addClass("select");
        }
    }

    win.AppHome.showDialogSoicitacoesFromTableHome = function(state){
        let d = win.__dados.solicitacoes[state.regional][state.key];
        //console.log(d);
        let content = js(`<div></div>`);

        content.append(`<div class="row mb-3 align-items-center">
            <p class="col-sm-2 h6 text-muted">Nome:</p>
            <p class="col-sm-10 h6">${d.escola}</p>
        </div>`);
        
        content.append(`<div class="row mb-3 align-items-center">
            <p class="col-sm-2 h6 text-muted">Regional:</p>
            <p class="col-sm-10 h6">${win.__dados.regionais[d.regional].nome}</p>
        </div>`);

        content.append(`<div class="row mb-3">
            <div class="col-sm-6">
                <div class="row align-items-center">
                    <p class="col-sm-4 h6 text-muted">Código:</p>
                    <p class="col-sm-8 h6">${d.codigo}</p>
                </div>
            </div>
            <div class="col-sm-6" style="${(d.isCreche ? "display: none;" : "")}">
                <div class="row align-items-center">
                    <p class="col-sm-4 h6 text-muted">INEP:</p>
                    <p class="col-sm-8 h6">${d.inep}</p>
                </div>
            </div>
        </div>`);

        let contentSolicitacoes = js(`<div class="tableSolicitacoes"></div>`);
        content.append(contentSolicitacoes);

        Dialog.show(d.escola, content, [Dialog.btn_cancel(win.History.back)], win.History.back, "large").then(function(){
            let table = new ComponentTable(contentSolicitacoes);

            table.setHead(
                {field: "id", value: "#", align: "center", width: 50}, 
                {field: "codigo", value: "COD.", align: "center"}, 
                {field: "nome", value: "ITEM", align: "center"}, 
                {field: "quantitativo", value: "QUANT.", align: "center"}, 
                {field: "data_solicitacao", value: "DATA DE SOLICITAÇÃO", align: "center"}
            );

            let indexRow = 1;

            d.lista.forEach(function(v, i){
                if(v.encerrada){return;}

                table.appendRow(indexRow,
                    {value: v.codigo}, 
                    {value: v.nome, align: "left"}, 
                    {value: v.quantitativo}, 
                    {value: (new Date(v.data_solicitacao).toLocaleDateString())}
                ).onClick(function(e, i){
                    window.History.goTo("dialog_solicitacao_detalhada", {solicitacao: v, index: i});
                });

                indexRow += 1;
            });
        });
    }

    win.AppHome.showDialogSoicitacaoDetalhada = function(state){
        let d = state.solicitacao;
        console.log(d);

        let content = js(`<div></div>`);

        content.append(`<div class="row mb-3">
            <div class="col-sm-6">
                <div class="row align-items-center">
                    <p class="col-sm-4 h6 text-muted">Código:</p>
                    <p class="col-sm-8 h6">${d.codigo}</p>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="row align-items-center">
                    <p class="col-sm-4 h6 text-muted">Item:</p>
                    <p class="col-sm-8 h6">${d.nome}</p>
                </div>
            </div>
        </div>`);

        content.append(`<div class="row mb-3">
            <div class="col-sm-6">
                <div class="row align-items-center">
                    <p class="col-sm-4 h6 text-muted">Data de solicitação:</p>
                    <p class="col-sm-8 h6">${(new Date(d.data_solicitacao).toLocaleDateString())}</p>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="row align-items-center">
                    <p class="col-sm-4 h6 text-muted">Data de atendimento:</p>
                    <p class="col-sm-8 h6">${(d.encerrada ? (new Date(d.data_entrega).toLocaleDateString()) : "--/--/----")}</p>
                </div>
            </div>
        </div>`);

        content.append(`<div class="row mb-3">
            <div class="col-sm-6">
                <div class="row align-items-center">
                    <p class="col-sm-8 h6 text-muted">Quantidade solicitado:</p>
                    <p class="col-sm-4 h6">${d.quantitativo}</p>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="row align-items-center">
                    <p class="col-sm-8 h6 text-muted">Quantidade atendido:</p>
                    <p class="col-sm-4 h6">${(d.encerrada ? d.atendido : "--")}</p>
                </div>
            </div>
        </div>`);

        let btn_encerrar = js(`<button type="button" class="btn btn-outline-secondary">Atender</button>`);

        Dialog.show("Solicitação: "+d.nome, content, [btn_encerrar, Dialog.btn_ok(win.History.back)], win.History.back, "large").then(function(){

        });
    }

})(window);