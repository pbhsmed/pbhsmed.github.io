(function() {
    var csv = window.CSV = function() {
        this.data = [];
        this.props = [];
    };

    csv.prototype.CSVtoArray = function(text) {
        var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
        var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
        if (!re_valid.test(text)) return null;

        var a = [];
        text.replace(re_value, function(m0, m1, m2, m3) {
            if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined) a.push(m3);
            return '';
        });
        if (/,\s*$/.test(text)) a.push('');
        return a;
    };

    csv.prototype.parse = async function(text) {
        if (typeof text != "string") { return null };
        var response = text.split(/\r?\n|\r/).map(this.CSVtoArray),
            json = [];
        this.data = [];
        response.forEach((a, i) => {
            if (i > 0 && Array.isArray(a)) {
                var b = {};
                a.forEach((c, j) => {
                    b[response[0][j]] = c;
                });
                this.data.push(b);
            }else{
                this.props = response[0];
            }
        });
        return this.data;
    }

    csv.prototype.request = function(url) {
        return new Promise(async(resolve, reject) => {
            let response = await fetch(url).catch(reject);
            if (!response) { return; }
            let text = await response.text();
            this.parse(text);
            resolve(this);
        });
    }

    csv.prototype.search = function(str, max_length, columns, exato) {
        if (typeof str !== "string") { console.error("É necessário informar uma STRIMG de referencia de pesquisa"); return null; }
        max_length = typeof max_length === "number" ? max_length : 10;
        var result = [],
            list = [], self = this;

        columns = Array.isArray(columns) && columns.find(function(s){return typeof s === 'string'}) ? columns : typeof columns === "string" ? [columns] : this.props;

        this.data.forEach(function(a, i){
            var rating = 0, length = 0;
            columns.forEach(function(k){
                if(self.props.includes(k) !== true){return;}
                rating += window.StringSimilarity.compareTwoStrings(str, a[k], exato);
                length += 1;
            });
            rating = rating/length;
            result.push({rating: rating, index: i});
        });

        result.sort((a, b) => { return (b.rating - a.rating); });

        return result.slice(0, max_length).map(function(a){return self.data[a.index]});

        var similarits = window.StringSimilarity.findBestMatch(str, this.data.map(JSON.stringify), exato);
        list = similarits.ratings.slice(0, max_length).map(t =>{
            return this.data[t.index];
        });
        
        return list;
    }

    csv.prototype.getColumn = function() {
        var list = [];
        var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
        this.data.forEach((a) => {
            var row = [];
            args.forEach(function(key){
                if(typeof key !== "string") return;
                if(Object.keys(a).includes(key)) {
                    row.push(a[key]);
                }
            });
            list.push(row);
        });
        return list;
    }
})();