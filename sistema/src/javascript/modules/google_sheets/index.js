class GSheets{
    constructor({approval_prompt="force", apiKey="", clientId="", discoveryDocs=[], scope=""}){
        this.config = {approval_prompt, apiKey, clientId, discoveryDocs, scope};
        this.isSigned = false;

        this.onError = function(){return;}
        this.onSigned = function(){return;}
    }

    init(){
        const self = this;

        if(!window.gapi){
            window.setTimeout(function(){
                self.init();
            }, 2000);
            return;
        }

        window.gapi.load('client:auth2', function(){
            window.gapi.client.init(self.config).then(function(){
                window.gapi.auth2.getAuthInstance().isSignedIn.listen(function(isSignedIn){
                    self._updateSigninStatus(isSignedIn);
                });

                self._updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
            }, function(error){
                self.onError(JSON.stringify(error, null, 2));
            });
        });
    }

    _updateSigninStatus(isSignedIn){
        this.isSigned = isSignedIn === true;
        this.onSigned(this.isSigned);
    }

    signIn(){
        const self = this;
        window.gapi.auth2.getAuthInstance().signIn().then(function(){}, function(e){
            self._updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }

    signOut(){
        const self = this;
        window.gapi.auth2.getAuthInstance().signOut().then(function(){
            self._updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }

    bySheet(sid=""){
        const sheet = {sid};

        sheet.sheetsName = function(){
            return new Promise((resolve, reject)=>{
                window.gapi.client.sheets.spreadsheets.get({
                    spreadsheetId: sheet.sid
                }).then(function(response) {
                    resolve(response.result.sheets.map((sheet)=>{return sheet.properties.title}))
                }, function(e){
                    reject(e);
                });
            });
        }

        sheet.getSheetId = function(sheetName){
            return new Promise((resolve, reject)=>{
                window.gapi.client.sheets.spreadsheets.get({
                    spreadsheetId: sheet.sid
                }).then(function(response) {
                    let sheetId = null;

                    response.result.sheets.forEach((sheet)=>{
                        if(sheet.properties.title === sheetName){
                            sheetId = sheet.properties.sheetId;
                            return true;
                        }
                    });

                    if(sheetId !== null){
                        resolve(sheetId);
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
                }, function(e){
                    reject(e);
                });
            });
        }

        sheet.get = function(range, sheetName){
            return new Promise(async (resolve, reject)=>{
                let sheetsName = await sheet.sheetsName().catch(reject);

                if(Array.isArray(sheetsName) !== true || sheetsName.length <= 0 || typeof sheetName !== "string" || sheetsName.includes(sheetName) !== true){
                    reject({
                        result: {
                            error: {
                                code: 0,
                                message: "Sheet name not found!",
                                status: "ERROR_API"
                            }
                        }
                    });
                    return;
                }
                
                window.gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: sheet.sid,
                    range: sheetName+"!"+range,
                }).then(function (response){
                    var result = response.result;
                    if(result.values.length > 0){
                        result.values.ranges = result.values.map(function(v, i){
                            let gridRange = GSheets.a1notation2gridrange(result.range, "");
                            gridRange.startRowIndex += i;
                            gridRange.endRowIndex = gridRange.startRowIndex + 1;
                            return GSheets.gridrange2a1notation(gridRange);
                        });
                        resolve(result.values);
                    }else{
                        resolve([[]]);
                    }
                }, reject);
            });
        }

        sheet.set = function(values, range, sheetName){
            return new Promise(async (resolve, reject)=>{
                let sheetsName = await sheet.sheetsName();
                if(typeof sheetName !== "string" || sheetsName.includes(sheetName) !== true){
                    reject({
                        result: {
                            error: {
                                code: 0,
                                message: "Sheet name not found!",
                                status: "ERROR_API"
                            }
                        }
                    });
                    return;
                }

                window.gapi.client.sheets.spreadsheets.values.update({
                    "spreadsheetId": sheet.sid,
                    "range": sheetName+"!"+range,
                    "valueInputOption": 'RAW',
                }, {
                    "values": values,
                }).then(resolve, reject);
            });
        }

        sheet.append = function(values, sheetName){
            return new Promise(async (resolve, reject)=>{
                let sheetsName = await sheet.sheetsName();
                if(typeof sheetName !== "string" || sheetsName.includes(sheetName) !== true){
                    reject({
                        result: {
                            error: {
                                code: 0,
                                message: "Sheet name not found!",
                                status: "ERROR_API"
                            }
                        }
                    });
                    return;
                }

                window.gapi.client.sheets.spreadsheets.values.append({
                    "spreadsheetId": sheet.sid,
                    "range": sheetName+"!A:A",
                    valueInputOption: 'USER_ENTERED',
                    insertDataOption: 'INSERT_ROWS',
                    resource: {
                        "majorDimension": "ROWS",
                        "values": values
                    }
                }).then(resolve, reject);
            });
        }

        sheet.remove = function(range, sheetName){
            return new Promise(async (resolve, reject)=>{
                let sheetsName = await sheet.sheetsName().catch(reject);

                if(Array.isArray(sheetsName) !== true || sheetsName.length <= 0 || typeof sheetName !== "string" || sheetsName.includes(sheetName) !== true){
                    reject({
                        result: {
                            error: {
                                code: 0,
                                message: "Sheet name not found!",
                                status: "ERROR_API"
                            }
                        }
                    });
                    return;
                }

                let sheetId = await sheet.getSheetId(sheetName).catch(reject);

                if(typeof sheetId !== "number"){
                    return;
                }

                let gridRange = GSheets.a1notation2gridrange(range, sheetId);

                window.gapi.client.sheets.spreadsheets.batchUpdate({
                    spreadsheetId: sheet.sid,
                    resource: {
                        "requests":[{
                            "deleteRange": {
                                "range": gridRange,
                                "shiftDimension": "ROWS"
                            }
                        }]
                    }
                }).then(resolve, reject);

                /*window.gapi.client.sheets.spreadsheets.values.clear({
                    spreadsheetId: sheet.sid,
                    range: sheetName+"!"+range,
                }).then(resolve, reject);*/
            });
        }

        return sheet;
    }

    static gridrange2a1notation(gridrange){
        gridrange = Object.assign({
            sheetId: "",
            startRowIndex: 0,
            endRowIndex: 1000,
            startColumnIndex: 0,
            endColumnIndex: 26,
        }, gridrange);

        let getRefBy = function(pos){
            var columnToLetter = function(column){
                if(column <= 0){return "A"};
                var temp, letter = '';
                while(column > 0){
                    temp = (column - 1) % 26;
                    letter = String.fromCharCode(temp + 65) + letter;
                    column = (column - temp - 1) / 26;
                }
                return letter;
            }
            var ref = String(columnToLetter(pos.x)).toUpperCase();
            return ref + pos.y;
        }

        return getRefBy({x: gridrange.startColumnIndex + 1, y: gridrange.startRowIndex + 1}) + ":" + getRefBy({x: gridrange.endColumnIndex, y: gridrange.endRowIndex});
    }

    static a1notation2gridrange(a1notation, sheetid){
        let to10 = function(str, base){
            let lvl = str.length - 1;
            let val = (base || 0) + Math.pow(26, lvl) * (str[0].toUpperCase().charCodeAt() - 64 - (lvl ? 0 : 1));
            return (str.length > 1) ? to10((str.substr(1, str.length - 1)), val) : val;
        }

        let getRang = function(co1, co2){
            if((/(\D+)(\d+)/gi).test(co1) && (/(\D+)(\d+)/gi).test(co2)){
                co1 = co1.match(/(\D+)(\d+)/);
                co1 = [co1[1], co1[2]];
                co2 = co2.match(/(\D+)(\d+)/);
                co2 = [co2[1], co2[2]];
            }else if((/(\d+)/gi).test(co1) && (/(\d+)/gi).test(co2)){
                var n = co1.match(/(\d+)/)[1];
                co1 = ["A", n];
                co2 = ["ZZZ", n];
            }

            return [co1, co2];
        }

        a1notation = String(a1notation);

        let data, co1, co2;

        if(a1notation.search("!") > 0){
            data = a1notation.match(/(^.+)!(.+):(.+$)/);
            let r = getRang(data[2], data[3]);
            co1 = r[0];
            co2 = r[1];
        }else if(a1notation.search(":") > 0){
            data = a1notation.match(/(.+):(.+$)/);
            let r = getRang(data[1], data[2]);
            co1 = r[0];
            co2 = r[1];
        }else{
            let r = getRang(a1notation, a1notation);
            co1 = r[0];
            co2 = r[1];
        }

        let gridRange = {
            sheetId: sheetid,
            startRowIndex: co1 ? parseInt(co1[1], 10)-1 : null,
            endRowIndex: co2 ? parseInt(co2[1], 10) : null,
            startColumnIndex: co1 ? to10(co1[0]) : "A",
            endColumnIndex: co2 ? to10(co2[0], 1) : 0,
        };

        if(gridRange.startRowIndex == null) delete gridRange.startRowIndex;
        if(gridRange.endRowIndex == null) delete gridRange.endRowIndex;

        return gridRange;
    }
}