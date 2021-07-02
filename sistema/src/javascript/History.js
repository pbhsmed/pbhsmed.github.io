window.History = {};
(function(){
    const pages = {};
    let backHistory = [], backHistoryNow = 0;

    const toKeyNamePage = function(str){
        str = String(str).toLowerCase();
        let com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ",
            sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr", 
            novastr="";
            
        for(i=0; i<str.length; i++){
            troca=false;
            for(a=0; a<com_acento.length; a++){
                if(str.substr(i,1)==com_acento.substr(a,1)){
                    novastr+=sem_acento.substr(a,1);
                    troca=true;
                    break;
                }
            }
            if(troca==false){
                novastr+=str.substr(i,1);
            }
        }
        return novastr.replace(/[^a-z0-9]/gi, "_");
    }

    window.History.page = function(name, title, fun, isPushState){
        let key = toKeyNamePage(name);
        isPushState = typeof isPushState === "boolean" ? isPushState : true;

        pages[key] = {
            name: name,
            title: title,
            render: (typeof fun === "function" ? fun : function(){return;}),
            isPushState: isPushState
        };
    }

    window.History.getURLDate = function(name, state){
        let key = toKeyNamePage(name);
        state = Object.assign({}, state);

        if((key in pages) !== true){return;}

        let objJsonB64 = window.encodeURIComponent(window.btoa(JSON.stringify({
            name: pages[key].name,
            title: pages[key].title,
            page: key,
            state: state
        })));

        return objJsonB64;
    }

    window.History.isPage = function(name){
        var params = new URLSearchParams(window.location.search);

        p = typeof p === "string" ? p : params.has("p") ? params.get("p") : null;

        if(typeof p === "string"){
            var actual = JSON.parse(window.atob(window.decodeURIComponent(p)));
            return actual.name === name;
        }

        return false;
    }

    window.History.getTitle = function(){
        var params = new URLSearchParams(window.location.search);

        p = typeof p === "string" ? p : params.has("p") ? params.get("p") : null;

        if(typeof p === "string"){
            var actual = JSON.parse(window.atob(window.decodeURIComponent(p)));
            return actual.title;
        }

        return "";
    }

    window.History.goTo = function(name, state){
        let key = toKeyNamePage(name);
        state = Object.assign({}, state);

        if((key in pages) !== true){return;}

        pages[key].render.apply(null, [state]);

        let objJsonB64 = window.History.getURLDate(name, state);

        if(pages[key].isPushState === false){
            backHistory.push(objJsonB64);
            backHistoryNow += 1;
            return;
        }

        backHistory = [];
        backHistoryNow = 0;

        window.history.pushState({
            p: objJsonB64
        }, pages[key].title, "index.html?p="+objJsonB64);
    }

    window.History.initial = function(name, state){
        return new Promise(function(resolve, reject){
            let key = toKeyNamePage(name);
            state = Object.assign({}, state);
    
            let objJsonB64 = window.History.getURLDate(name, state);
    
            var params = new URLSearchParams(window.location.search);
    
            window.History.goTo(name, state);
            
            if(params.has("p") && params.get("p") !== objJsonB64){
                window.setTimeout(function(){
                    window.History.toURLPage(params.get("p"));
        
                    window.history.pushState({
                        p: params.get("p")
                    }, pages[key].title, "index.html?p="+params.get("p"));

                    resolve(JSON.parse(window.atob(window.decodeURIComponent(params.get("p")))));
                }, 1500);
            }else{
                resolve(JSON.parse(window.atob(window.decodeURIComponent(objJsonB64))));
            }
        });
    }

    window.History.back = function(length){
        length = typeof length === "number" && length > 0 ? length*(-1) : -1;

        let backHN = backHistoryNow + length;

        length = backHN < 0 ? backHN : (backHistoryNow + 1) - length;

        if(backHistory.length > 0 && backHN >= 0){
            window.History.toURLPage(backHistory[backHN]);
            backHistoryNow = backHN;
        }else{
            backHistoryNow = -1;
        }

        if(length >= 0){
            window.History.toURLPage();
            return;
        }

        window.history.go(length);
    }

    window.History.forward = function(length){
        length = typeof length === "number" && length > 0 ? length : 1;
        let backHN = backHistoryNow + length;

        if(backHistory.length > 0 && backHN >= 0){
            window.History.toURLPage(backHistory[backHN]);
            backHistoryNow = backHN;
        }else{
            window.history.go(length);
        }
    }

    window.History.hasURLPage = function(){
        var params = new URLSearchParams(window.location.search);
        return params.has("p");
    }

    window.History.toURLPage = function(p){
        var params = new URLSearchParams(window.location.search);

        p = typeof p === "string" ? p : params.has("p") ? params.get("p") : null;

        if(typeof p === "string"){
            var actual = JSON.parse(window.atob(window.decodeURIComponent(p)));
            if(actual.page in pages){
                backHistory = [];
                backHistoryNow = 0;
                pages[actual.page].render.apply(null, [actual.state]);
            }
        }
    }

    window.onpopstate = function(event){
        window.History.toURLPage();
    };

    /*window.addEventListener("load", function(){
        var params = new URLSearchParams(window.location.search);
        if(params.has("p")){
            var actual = JSON.parse(window.atob(window.decodeURIComponent(params.get("p"))));
            if(actual.page in pages){
                pageHistory.push(params.get("p"));
                window.History.goTo(actual.page, actual.state);
            }
            console.log(actual);
        }
    });*/
})();