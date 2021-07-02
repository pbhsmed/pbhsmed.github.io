class ComponentTable{
    constructor(root){
        root = js(root);
        if(root.getDom() === null){
            console.error("É necessário inserir um DOM raiz para inserir a tabela!");
            return;
        }

        this.table_root = document.createElement("div");
        root.getDom().appendChild(this.table_root);

        js(this.table_root).addClass("table-root");

        this.columns = [];

        this.table_head = document.createElement("div");
        this.table_body = document.createElement("div");
        this.table_footer = document.createElement("div");

        this.table_root.appendChild(this.table_head);
        this.table_root.appendChild(this.table_body);
        this.table_root.appendChild(this.table_footer);

        js(this.table_head).addClass("table-head").css("display", "none");

        js(this.table_body).addClass("table-body").css("display", "");

        js(this.table_footer).addClass("table-footer").css("display", "none");

        let table;

        table = document.createElement("table");
        js(table).addClass("table").addClass("table-striped").addClass("table-bordered");
        this.table_head.appendChild(table);

        table.appendChild(document.createElement("thead"));

        table = document.createElement("table");
        js(table).addClass("table").addClass("table-striped").addClass("table-bordered");
        this.table_body.appendChild(table);

        this.emptyTable = document.createElement("div");
        js(this.emptyTable).addClass("emptyTable");

        this.emptyTable.innerHTML = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg><p>A tabela se encontra vazia no momento!</p>`;

        this.table_body.appendChild(this.emptyTable);

        table.appendChild(document.createElement("tbody"));

        table = document.createElement("table");
        js(table).addClass("table").addClass("table-striped").addClass("table-bordered");
        this.table_footer.appendChild(table);

        table.appendChild(document.createElement("tfoot"));

        let self = this;

        this._watchCollsSize();

        let resizeTimeout;

        window.addEventListener("resize", function(){
            window.clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(function(){
                self._watchCollsSize();
            }, 200);
        });

        this.table_body.onscroll = function(e){
            self.table_head.scroll(self.table_body.scrollLeft, 0);
            self.table_footer.scroll(self.table_body.scrollLeft, 0);
        }
    }

    cellConfig = function(cell){
        cell = js.isJson(cell) !== true ? {value: cell} : js.isJson(cell) && typeof cell === "string" ? JSON.parse(cell) : cell;
        
        return Object.assign({
            value: "",
            field: "",
            width: "auto",
            align: "",
            background: "",
            color: "",
            font: {}
        }, cell);
    }

    setHead(...colls){
        let tr = document.createElement("tr");
        js(this.table_head).find("thead").html("");
        js(this.table_head).find("thead").getDom().appendChild(tr);

        this.columns = colls.map(this.cellConfig);

        this.columns.forEach(function(v){
            let th = document.createElement("th");
            th.appendChild(document.createTextNode(v.value));
            tr.appendChild(th);
            let css = {
                textAlign: v.align,
                backgroundColor: v.background,
                color: v.color
            }

            Object.entries(v.font).forEach(function(f){
                let prop = String(f[0])[0].toUpperCase() + String(f[0]).toLocaleLowerCase().slice(1);
                css["font"+prop] = f[1];
            });

            js(th).css(css);
        });

        if(js(this.table_head).css("display") === "none"){
            js(this.table_head).css("display", "");
        }

        this._watchCollsSize();
    }

    clearRows(){
        js(this.table_body).find("tbody").html("");
        js(this.emptyTable).css("display", "");

        this._watchCollsSize();
    }

    removeRow(...rows){
        let self = this;
        rows.map(function(index){
            let row_body = js(self.table_body).find("table > tbody > tr");
            if(typeof index !== "number" || index < 0 || index >= row_body.length){return null;}
            return js(row_body.getDom(index));
        }).forEach(function(e){
            if(!e){return;}
            e.remove();
        });

        if(js(self.table_body).find("table > tbody > tr").length <= 0){
            js(this.emptyTable).css("display", "");
        }else{
            js(this.emptyTable).css("display", "none");
        }

        this._watchCollsSize();
    }

    appendRow(...colls){
        let self = this,
            tr = document.createElement("tr");

        js(this.table_body).find("tbody").getDom().appendChild(tr);

        let key = (js(this.table_body).find("tbody > tr").length - 1);

        colls.map(this.cellConfig).forEach(function(v, i){
            let td = document.createElement("td");
            td.appendChild(document.createTextNode(v.value));
            tr.appendChild(td);
            let css = {
                textAlign: (["left", "center", "right"].includes(v.align) ? v.align : self.columns[i].align),
                backgroundColor: v.background,
                color: v.color
            };

            Object.entries(v.font).forEach(function(f){
                let prop = String(f[0])[0].toUpperCase() + String(f[0]).toLocaleLowerCase().slice(1);
                css["font"+prop] = f[1];
            });

            js(td).css(css);
        });

        if(js(this.table_body).css("display") === "none"){
            js(this.table_body).css("display", "");
        }

        if(js(self.table_body).find("table > tbody > tr").length <= 0){
            js(this.emptyTable).css("display", "");
        }else{
            js(this.emptyTable).css("display", "none");
        }

        this._watchCollsSize();

        return {
            onClick: function(call){
                if(typeof call === "function"){
                    js(tr).addClass("is_hover");
                    js(tr).on("click", function(e){
                        call(e, key, colls);
                    });
                }
            }
        }
    }

    setFooter(...colls){
        let self = this,
            tr = document.createElement("tr");

        js(this.table_footer).find("tfoot").html("");
        js(this.table_footer).find("tfoot").getDom().appendChild(tr);

        colls.map(this.cellConfig).forEach(function(v, i){
            let td = document.createElement("td");
            td.appendChild(document.createTextNode(v.value));
            tr.appendChild(td);
            let css = {
                textAlign: (["left", "center", "right"].includes(v.align) ? v.align : self.columns[i].align),
                backgroundColor: v.background,
                color: v.color
            }

            Object.entries(v.font).forEach(function(f){
                let prop = String(f[0])[0].toUpperCase() + String(f[0]).toLocaleLowerCase().slice(1);
                css["font"+prop] = f[1];
            });

            js(td).css(css);
        });

        if(js(this.table_footer).css("display") === "none"){
            js(this.table_footer).css("display", "");
        }

        this._watchCollsSize();
    }

    _setCollsSize(collsSize){
        collsSize = Array.isArray(collsSize) ? collsSize : [];

        let row_head = js(this.table_head).find("table > thead > tr"),
            row_body = js(this.table_body).find("table > tbody > tr"),
            row_foot = js(this.table_footer).find("table > tfoot > tr");

        //if(row_head.getDom() === null || row_body.getDom() === null){return};

        let setSize = function(e){
            if(js(e).getDom() === null){return;}
            js(e).each(function(i){
                js(this).children().each(function(j){
                    let width = (collsSize[j] || "auto");
                    js(this).css({
                        "min-width": width,
                        "max-width": width,
                        "width": width
                    });
                });
            });
        }

        setSize(row_head);
        setSize(row_body);
        setSize(row_foot);
    }

    _watchCollsSize(){
        const self = this;

        let row_head = js(this.table_head).find("table > thead > tr"),
            row_body = js(this.table_body).find("table > tbody > tr"),
            row_foot = js(this.table_footer).find("table > tfoot > tr");
        
        let collsSize = [];

        //if(row_head.getDom() === null || row_body.getDom() === null){return;}

        this._setCollsSize();

        let getSize = function(e){
            if(js(e).getDom() === null){return;}

            js(e).each(function(i){
                js(this).children().each(function(j){
                    let offset = this.getBoundingClientRect();
                    let width = Math.max(offset.width, this.clientWidth, this.offsetWidth);
                    collsSize[j] = typeof collsSize[j] !== "number" ? width : Math.max(collsSize[j], width);
                });
            });
        }

        getSize(row_body);
        getSize(row_head);
        getSize(row_foot);

        let fixWidth = [];

        collsSize = collsSize.map(function(v, i){
            if(typeof self.columns[i].width === "number"){
                fixWidth.push(i);
                return self.columns[i].width;
            }
            return v;
        });

        let width = collsSize.reduce((a, b) => a + b, 0),
            clientWidth = this.table_body.clientWidth;

        if(width < clientWidth){
            let offsetWidth = 0;

            collsSize.forEach(function(v, i){
                if(fixWidth.includes(i)){
                    offsetWidth += (((clientWidth * v) / width) - v);
                }
            });

            collsSize = collsSize.map(function(v, i){
                return (fixWidth.includes(i)) ? v : ((clientWidth * v) / width) + (offsetWidth / (collsSize.length - fixWidth.length));
            });

        }

        this._setCollsSize(collsSize.map(function(v){v = Number(v)-1; return ((v < 0 ? 0 : v)+"px")}));

        let scrollbarWidth = this.table_body.offsetWidth - this.table_body.clientWidth;
        
        if(scrollbarWidth <= 0){return;}

        let lastSize = (collsSize[collsSize.length-1]+scrollbarWidth)+"px";

        row_head.first().children().last().css({
            "min-width": lastSize,
            "max-width": lastSize,
            "width": lastSize
        });

        if(row_foot.getDom() !== null){
            row_foot.first().children().last().css({
                "min-width": lastSize,
                "max-width": lastSize,
                "width": lastSize
            });
        }
    }

    fixTableCellWidth(table1, table2, table3){
        // container means `thead` or `tbody`
        const sourceContainers = Array.from(table2.children);
        const sourceTrs = sourceContainers.map(container => Array.from(container.children));
        // move second table rows to first table
        sourceTrs.forEach(trs => {
            trs.forEach(tr => {
                table1.lastElementChild.appendChild(tr);
            });
        });
        // fix table cell width
        Array.from(table1.children).forEach(container => {
            Array.from(container.children).forEach(tr => {
                Array.from(tr.children).forEach(td => {
                    const rect = td.getClientRects()[0];
                    td.style.width = `${rect.width}px`;
                });
            });
        });
        // move back the second table rows
        sourceTrs.forEach((trs, index) => {
            const container = sourceContainers[index];
            trs.forEach(tr => {
                container.appendChild(tr);
            });
        });
    }
}