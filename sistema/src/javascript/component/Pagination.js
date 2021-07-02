class Pagination{
    constructor(pages, now){
        this.pages = typeof pages === "number" ? pages : 0;
        this.page_now = typeof now === "number" ? now : 0;
        this.id = "pagination_"+Math.round(Math.random()*10000);
        this.getContainer();
        this.onChange = function(){return;};
    }

    normalizeNumber(n){
        n = typeof n === "number" ? n : Number(n);
        return n <= 9 ? "0"+n : String(n);
    }

    getContainer(){
        let end = this.page_now+2 > this.pages ? this.pages : this.page_now+2;
        let start = end-3 < 1 ? 1 : end-3;

        let code = `<nav>
            <ul class="pagination" style="justify-content: flex-end; padding: 0px 15px;">
                <li class="page-item${(this.page_now > 1 ? "" : " disabled")}">
                    <span class="page-link" index="${(this.page_now-1 < 1 ? 0 : this.page_now-1)}">&laquo;</span>
                </li>`;

        if(start > 1){
            code += `<li class="page-item"><span class="page-link" index="1">...</span></li>`;
        }

        for(var i=start; i<=end; i++){
            code += `<li class="page-item${(i === this.page_now ? " active" : "")}"><span class="page-link" index="${i}">${this.normalizeNumber(i)}</span></li>`;
        }

        if(end < this.pages){
            code += `<li class="page-item"><span class="page-link" index="${this.pages}">...</span></li>`;
        }

        code += `<li class="page-item${(this.page_now <= this.pages ? "" : " disabled")}">
                    <span class="page-link" index="${(this.page_now+1 > this.pages ? this.pages : this.page_now+1)}">&raquo;</span>
                </li>
            </ul>
        </nav>`;

        this.container = js(code);
    }

    __appendEvent(component){
        let self = this;
        component.find("span.page-link").each(function(el){
            this.addEventListener("click", function(e){
                var page = Number(e.target.getAttribute("index"));
                if(self.page_now !== page && page > 0){
                    self.onChange(page);
                }
            }, false);
        });
    }

    insertInto(root){
        root = js(root);
        if(root.getDom() === null){
            console.error("É necessário inserir um DOM raiz para inserir a tabela!");
            return;
        }
        var component = this.container.clone();
        root.append(component);
        this.__appendEvent(component);
    }
}