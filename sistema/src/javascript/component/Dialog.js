window.__dialogDom = js(`<div class="modal fade" id="ModalDialog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content"></div>
    </div>
</div>`);
window.__dialogDom_timeout = null;
document.body.appendChild(window.__dialogDom.getDom());

window.__dialogDom_Modal = new bootstrap.Modal(window.__dialogDom.getDom());

class Dialog{
    static show(title, body, btns, onClose, size){
        return new Promise(function(resolve, reject){
            clearTimeout(window.__dialogDom_timeout);
            window.__dialogDom.html(``);

            window.__dialogDom.append(`<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"></h5>
                        <button type="button" class="btn-close"></button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer"></div>
                </div>
            </div>`);

            let modal_window = window.__dialogDom.find(".modal-dialog"),
                modal_title = modal_window.find(".modal-content > .modal-header > .modal-title"),
                modal_body = modal_window.find(".modal-content > .modal-body"),
                modal_footer = modal_window.find(".modal-content > .modal-footer"),
                modal_btn_close = modal_window.find(".modal-content > .modal-header > button.btn-close");
            
            modal_btn_close.on("click", function(){
                Dialog.close();
                if(typeof onClose === "function"){
                    onClose();
                }
            });
    
            modal_title.text(String(title || ""));
            modal_body.html("");
            modal_footer.html("");
    
            modal_body.append(body);
            modal_footer.append(btns);

            size = String(size).toLocaleLowerCase();
            let sizes = {
                "big": "modal-xl",
                "large": "modal-lg",
                "small": "modal-sm"
            }

            Object.entries(sizes).forEach(function(v){
                modal_window.removeClass(v[1]);
            });

            if(Object.keys(sizes).includes(size)){
                modal_window.addClass(sizes[size]);
            }
    
            Dialog.modalShow();

            let timeInterval;
            timeInterval = window.setInterval(function(){
                let rect = js(body).getDom().getBoundingClientRect();
                if(rect.x === 0 && rect.y === 0 && rect.width == 0 && rect.height == 0){return;}
                resolve(modal_body);
                window.clearInterval(timeInterval);
            }, 100);
        });
    }

    static btn(label, fn, class_, attr){
        label = typeof label === "string" ? String(label).trim() : ``;
        class_ = typeof class_ === "string" ? " "+(String(class_).trim()) : ``;
        let btn = js(`<button type="button" class="btn${class_}">${label}</button>`);
        btn.attr(attr);
        if(typeof fn === "function"){
            btn.on("click", fn);
        }
        return btn;
    }

    static btn_ok(fn, label){
        label = typeof label === "string" && label.length > 0 ? label : "Ok";
        return this.btn(label, fn, "btn-primary");
    }

    static btn_cancel(fn, preventDefault, label){
        label = typeof label === "string" && label.length > 0 ? label : "Cancelar";
        preventDefault = typeof preventDefault === "boolean" ? preventDefault : false;
        return this.btn(label, fn, "btn-secondary", preventDefault ? {} : {"data-bs-dismiss": "modal"});
    }

    static confirm(mensagem, btn1, btn2){
        btn1 = typeof btn1 === "string" && btn1.length > 0 ? btn1 : "Ok";
        btn2 = typeof btn2 === "string" && btn2.length > 0 ? btn2 : "Cancelar";

        mensagem = typeof mensagem === "string" && mensagem.length > 0 ? mensagem : "";
        mensagem = mensagem.replace(/\n/gi, "</br>");

        return new Promise(function(resolve, reject){
            Dialog.close();
            setTimeout(function(){
                Dialog.show("", js(`<p>${mensagem}</p>`), [Dialog.btn_ok(function(){
                    resolve();
                }, btn1), Dialog.btn_cancel(function(){
                    Dialog.close();
                    setTimeout(function(){
                        reject();
                    }, 500);
                }, true, btn2)]);
            }, 500);
        });
    }

    static modalShow(){
        clearTimeout(window.__dialogDom_timeout);
        window.__dialogDom_Modal.show(window.__dialogDom_Modal);
    }

    static close(){
        window.__dialogDom_Modal.hide();
        window.__dialogDom_timeout = setTimeout(function(){
            window.__dialogDom.html(``);
        }, 1500);
    }

    static toScrollTop(){
        window.__dialogDom.find(".modal-dialog").find(".modal-content > .modal-body").scrollTop(0);
    }

    static toScrollBottom(){
        var body = window.__dialogDom.find(".modal-dialog").find(".modal-content > .modal-body");
        body.scrollTop(body.getDom().scrollHeight);
    }

    static splash(){
        clearTimeout(window.__dialogDom_timeout);
        window.__dialogDom.html(``);

        window.__dialogDom.append(`<div class="modal-dialog modal-dialog-centered justify-content-center modal-sm">
            <div class="modal-content" style="background-color: transparent; border: 0px;">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-light" style="width: 3rem; height: 3rem;" role="status"></div>
                </div>
            </div>
        </div>`);

        Dialog.modalShow();
    }
}