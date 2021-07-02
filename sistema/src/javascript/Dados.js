class Dados{
    constructor(sheet){
        this.sheet = sheet;

        this.data = {};

        this.regionais = {};
        this.escolas = {};
        this.solicitacoes = {};

        this.sheetsKeys = {
            "SOLICITAÇÕES": {
                range: "A:I",
                keys: ["regional", "codigo", "tipo_escola", "id_item", "nome_item", "quantitativo", "data_solicitacao", "atendido", "data_entrega", "descricao"]
            },
            "ESCOLAS": {
                range: "A:M",
                keys: ["regional", "nome_regional", "tipo_escola", "nome_escola", "inep", "codigo_creche", "siest", "email", "telefone", "endereco", "bairro", "cep", "referencia"]
            },
            "ESTOQUE": {
                range: "A:D",
                keys: ["id_item", "nome_item", "quantitativo", "reserva"]
            },
            "PRODUTOS": {
                range: "A:C",
                keys: ["id_item", "nome_item", "data_registro"]
            }
        };
    }

    regex_date = /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/gi;

    clear_regionais(){
        this.regionais = {
            B: {nome: "BARREIRO", color: "#e53935", emef: 0, emei: 0, creche: 0, solicitacoes: 0},
            CS: {nome: "CENTRO SUL", color: "#9c27b0", emef: 0, emei: 0, creche: 0, solicitacoes: 0},
            L: {nome: "LESTE", color: "#4caf50", emef: 0, emei: 0, creche: 0, solicitacoes: 0},
            NE: {nome: "NORDESTE", color: "#E91E63", emef: 0, emei: 0, creche: 0, solicitacoes: 0},
            NO: {nome: "NOROESTE", color: "#2196F3", emef: 0, emei: 0, creche: 0, solicitacoes: 0},
            N: {nome: "NORTE", color: "#cddc39", emef: 0, emei: 0, creche: 0, solicitacoes: 0},
            O: {nome: "OESTE", color: "#009688", emef: 0, emei: 0, creche: 0, solicitacoes: 0},
            P: {nome: "PAMPULHA", color: "#5c6bc0", emef: 0, emei: 0, creche: 0, solicitacoes: 0},
            VN: {nome: "VENDA NOVA", color: "#ef6c00", emef: 0, emei: 0, creche: 0, solicitacoes: 0}
        };
    }

    clear(){
        this.clear_regionais();
        this.escolas = {};
        this.solicitacoes = {};
    }

    update(){
        const self = this;
        return new Promise(async (resolve, reject)=>{
            this.getDataBase().then(async ()=>{
                return this.update_escolas();
            }).then(async ()=>{
                return this.update_solicitacoes();
            }).then(async ()=>{
                resolve(self);
            }).catch(reject);
        });
    }

    getDataBase(){
        const self = this;
        this.data = {};

        return new Promise(async (resolve, reject)=>{
            for(let sheet in self.sheetsKeys){
                let d = await self.sheet.get(self.sheetsKeys[sheet].range, sheet).catch(reject),
                    lista = [];
                if(Array.isArray(d) !== true){continue;}

                d.forEach(function(row, i){
                    if(Array.isArray(row) !== true || i<=0){return;}
                    let valor = {};
                    row.forEach(function(v, i){
                        valor[self.sheetsKeys[sheet].keys[i]] = v;
                    });
                    valor.range = sheet+"!"+d.ranges[i];
                    lista.push(valor);
                });

                self.data[sheet] = lista;
            }

            resolve(self.data);
        });
    }

    rangeToA1notation = function(range){
        var a1notation = typeof range === "string" ? range.split("!") : null;
        if(a1notation === null || a1notation.length !== 2){return;}
        return GSheets.a1notation2gridrange(a1notation[1], a1notation[0]);
    }

    getEmptyDice(sheetId){
        var d = {};
        if(sheetId in this.sheetsKeys){
            this.sheetsKeys[sheetId].keys.forEach(function(k, i){
                d[k] = "";
            });
        }
        return d;
    }

    getByRange(range){
        var a1notation = this.rangeToA1notation(range);
        if(a1notation){
            var d = this.data[a1notation.sheetId].filter(d => d.range === range);
            if(d.length > 0){
                return d[0];
            }
            return this.getEmptyDice(a1notation.sheetId);
        }
        return {};
    }

    update_escolas(){
        const self = this;
        return new Promise(async (resolve, reject)=>{
            if(!(this.sheet && this.sheet.get)){return reject();}

            this.clear_regionais();

            let escolas = this.data["ESCOLAS"];

            if(Array.isArray(escolas)){
                escolas.forEach(function(row, i){
                    if(Array.isArray(self.escolas[row["regional"]]) !== true){self.escolas[row["regional"]] = [];}
    
                    self.escolas[row["regional"]].push({
                        codigo: (row["tipo_escola"] || "EMEF"),
                        escola: (row["nome_escola"] || ""),
                        isCreche: (row["tipo_escola"] === "CRECHE"),
                        inep: (row["inep"] || ""),
                        codigoCreche: (row["codigo_creche"] || ""),
                        range: (row["range"] || ""),
                        key: self.escolas[row["regional"]].length,
                        index: i,
                        siest: (row["siest"] || ""),
                        endereco: (row["endereco"] || ""),
                        bairro: (row["bairro"] || ""),
                        telefone: (row["telefone"] || ""),
                        cep: (row["cep"] || ""),
                        referencia: (row["referencia"] || "")
                    });
    
                    self.regionais[row["regional"]][String(row["tipo_escola"]).toLocaleLowerCase()] += 1;
                });

                resolve(self);
                return;
            }

            reject();
        });
    }

    saveDice(d, range){
        return new Promise((resolve, reject)=>{
            if(range in this.sheetsKeys){
                var d2 = this.getEmptyDice(range);
                var dice = Object.assign(JSON.parse(JSON.stringify(d2)), d);
                var m = [];
                this.sheetsKeys[range].keys.forEach(function(k, i){
                    m[i] = k in dice ? dice[k] : "";
                });
                this.sheet.append([m], range).then((e)=>{
                    this.update().then(()=>{
                        resolve(e);
                    }).catch(reject);
                }).catch(reject);
                return;
            }

            var a1notation = this.rangeToA1notation(range);
            var d2 = this.getByRange(range);
            if(a1notation && a1notation.sheetId in this.sheetsKeys){
                var dice = Object.assign(JSON.parse(JSON.stringify(d2)), d);
                var m = [];
                this.sheetsKeys[a1notation.sheetId].keys.forEach(function(k, i){
                    m[i] = k in dice ? dice[k] : "";
                });
                this.sheet.set([m], GSheets.gridrange2a1notation(a1notation), a1notation.sheetId).then((e)=>{
                    this.update().then(()=>{
                        resolve(e);
                    }).catch(reject);
                }).catch(reject);
            }else{
                reject({
                    result: {
                        error: {
                            code: 0,
                            message: "Sheet name not found!",
                            status: "ERROR_API"
                        }
                    }
                });
            }
        });
    }

    removeDice = function(range){
        return new Promise((resolve, reject)=>{
            var a1notation = this.rangeToA1notation(range);
            if(a1notation && a1notation.sheetId in this.sheetsKeys){
                this.sheet.remove(GSheets.gridrange2a1notation(a1notation), a1notation.sheetId).then((e)=>{
                    this.update().then(()=>{
                        resolve(e);
                    }).catch(reject);
                }).catch(reject);
            }else{
                reject({
                    result: {
                        error: {
                            code: 0,
                            message: "Sheet name not found!",
                            status: "ERROR_API"
                        }
                    }
                });
            }
        });
    }

    formatToDate = function(str){
        if(this.regex_date.test(str)){
            let parts = str.split('/');
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }
        return null;
    }

    update_solicitacoes(){
        const self = this;
        return new Promise(async (resolve, reject)=>{
            if(!(this.sheet && this.sheet.get)){return reject();}

            let response = this.data["SOLICITAÇÕES"];

            Object.entries(this.regionais).forEach(function(k){
                self.regionais[k[0]].solicitacoes = 0;
                self.solicitacoes[k[0]] = {};
            });

            if(Array.isArray(response)){
                response.forEach(function(row, i){
                    row["codigo"] = String(row["codigo"]).replace(/\s/gi, "");

                    let isCreche = (row["codigo"] === "" || (/([a-z]+)\-([0-9]+)/gi).test(row[1])),
                        index_escola = -1,
                        nome_escola = "";

                    self.escolas[row["regional"]].filter(function(value){
                        return value.codigo === row["tipo_escola"];
                    }).forEach(function(value){
                        if(value.inep === row["codigo"] || value.codigoCreche === row["codigo"]){
                            index_escola = value.key;
                            isCreche = value.isCreche;
                            nome_escola = value.escola;
                            return true;
                        }
                    });

                    let key = row["codigo"] === "" ? row["tipo_escola"] + "_" + (String(nome_escola).replace(/\s/gi, "_").toLocaleLowerCase()) : row["codigo"];

                    if(!(self.solicitacoes[row["regional"]][key])){
                        self.solicitacoes[row["regional"]][key] = {
                            regional: row["regional"],
                            inep: (isCreche ? "" : row["codigo"]),
                            codigoCreche: (isCreche ? row["codigo"] : ""),
                            isCreche: isCreche,
                            codigo: (row["tipo_escola"] || "EMEF"),
                            escola: (nome_escola || ""),
                            lista: [],
                            solicitacoesEmAberto: 0,
                            solicitacoesEncerrada: 0,
                            index_escola: index_escola,
                            key: key
                        };
                    }

                    let d = {
                        codigo: row["id_item"],
                        nome: row["nome_item"],
                        quantitativo: (Number(row["quantitativo"]) || 0),
                        atendido: (Number(row["atendido"]) || 0),
                        data_solicitacao: self.formatToDate(row["data_solicitacao"]),
                        data_entrega: self.formatToDate(row["data_entrega"]),
                        descricao: (row["descricao"] || ""),
                        encerrada: false,
                        range: (row["range"] || "")
                    };

                    d.encerrada = (d.data_entrega instanceof Date);

                    if(d.encerrada){
                        self.solicitacoes[row["regional"]][key].solicitacoesEncerrada += 1;
                    }else{
                        self.solicitacoes[row["regional"]][key].solicitacoesEmAberto += 1;
                    }

                    self.solicitacoes[row["regional"]][key].lista.push(d);
                    self.regionais[row["regional"]].solicitacoes += 1;
                });

                resolve();
                return;
            }

            reject();
        });
    }
}