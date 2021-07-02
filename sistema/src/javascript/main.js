(function(win){
    //win.History.page("home", "Início - Gestão de Logística - GSUPS", win.AppHome.toMapPage);
    //win.History.page("show_licitacoes", "Licitações - Gestão de Logística - GSUPS", win.AppHome.toMapPage);
})(window);


(function(win){
    win.sheets = null;
    let DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
    let SCOPES = 'https://www.googleapis.com/auth/spreadsheets';
    let access_warning = null;

    win.__dados = new Dados();

    let init = function(){
        //win.AppHome.sheet = win.sheets.bySheet("1Fr5hW4loXRBuq-2luayTiE4q948qJvLl47lN4-iKMLE");

        win.__dados.sheet = win.sheets.bySheet("1Fr5hW4loXRBuq-2luayTiE4q948qJvLl47lN4-iKMLE");

        win.__dados.update().then((response)=>{
            console.log(response.regionais);

            win.AppHome.show();

            win.History.initial("home", {}).then(function(){
                win.splash(false);
            });

            /*if(win.History.hasURLPage()){
                win.History.toURLPage();
                win.History.goTo("home", {});
                win.History.back();
            }else{
                win.History.goTo("home", {});
            }*/
        }).catch((response)=>{
            console.log(response);
            if(response && response.result && response.result.error && response.result.error.message){
                if(response.result.error.status === "PERMISSION_DENIED"){
                    access_warning = "Você não tem permissão necessária para realizar o acesso, solicite a permissão ou tente novamente mais tarde!";
                }
            }else{
                access_warning = "Algo deu errado ao tentar acessar a base, tente novamente mais tarde!";
            }
            win.sheets.signOut();
        });
    }

    win.splash = function(show){
        let dom = js("#Splash");
        show = typeof show === "boolean" ? show : dom.getDom() === null;

        if(show){
            dom = js(`<div id="Splash">
                <div class="ring"></div>
                <span>Carregando...</span>
            </div>`);
            js("body").append(dom);
        }else if(dom.getDom() !== null){
            dom.remove();
        }
    }

    win.access = function(warning, isLogin){
        win.remove_access();
        warning = (typeof warning === "string" && warning.length > 0 ? `<p class="alert-warning">${warning}</p>` : ``);
        isLogin = typeof isLogin === "boolean" ? isLogin : true;

        isLogin = isLogin ? `
            <button type="button" class="btn btn-outline-light">Acessar</button>
            <br/>
            <p>Para acessar é preciso ter permissão de edição da planilha <a href="https://docs.google.com/spreadsheets/d/1Fr5hW4loXRBuq-2luayTiE4q948qJvLl47lN4-iKMLE/edit?usp=sharing" target="_blank">"Gestão de Logística - GSUPS - Sistema"</a></p>
        ` : ``;

        let dom = js(`<div id="Access">
            <div class="content">
                ${isLogin}
                ${warning}
            </div>
        </div>`);
        js("body").append(dom);

        dom.find(".content > button").on("click", function(e){
            e.preventDefault();
            access_warning = null;
            win.sheets.signIn();
            win.splash(true);
            win.remove_access();
        });

        win.splash(false);
    }

    win.remove_access =  function(){
        let dom = js("#Access");
        if(dom.getDom() !== null){
            dom.remove();
        }
    }

    fetch("./src/javascript/modules/google_sheets/credentials.json").then(async function(a){
        let r = await a.json(),
            CLIENT_ID = r.web.client_id,
            API_KEY = r.web.api_key;

        win.sheets = new GSheets({
            approval_prompt: 'force',
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        });

        win.sheets.onError = function(error){
            win.access("Erro na tentativa de acesso! Informe sobre o erro ao responsável e tente novamente mais tarde.", false);
            console.log(error);
        }

        win.sheets.onSigned = function(isSignedIn){
            if(isSignedIn){
                win.remove_access();
                win.splash(true);
                init();
            }else{
                win.access(access_warning);
            }
        }

        win.sheets.init();
        console.log(win.sheets);
    });
})(window);