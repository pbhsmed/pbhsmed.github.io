"https://docs.google.com/spreadsheets/d/e/2PACX-1vSgmkvX_Y8G7QfQdpus5jMl1NCy-rHaDGsu85dv39rpZjkBuvF6uvB0h9xOPu21v5-HV4_aAF0cLk2c/pub?gid=0&single=true&output=csv";

(async function() {

    var data_SIEST = new CSV();
    var data_ESCOLAS = new CSV();
    var input = new InputAutocomplete("input_autocomplete");

    data_ESCOLAS.request('https://docs.google.com/spreadsheets/d/e/2PACX-1vSgmkvX_Y8G7QfQdpus5jMl1NCy-rHaDGsu85dv39rpZjkBuvF6uvB0h9xOPu21v5-HV4_aAF0cLk2c/pub?gid=23857995&single=true&output=csv').then(function(){
        data_SIEST.request('https://docs.google.com/spreadsheets/d/e/2PACX-1vSgmkvX_Y8G7QfQdpus5jMl1NCy-rHaDGsu85dv39rpZjkBuvF6uvB0h9xOPu21v5-HV4_aAF0cLk2c/pub?gid=0&single=true&output=csv').then(function(){
            input.list = data_SIEST.getColumn("COD.", "SIEST", "ESCOLA").map(a =>{
                return {
                    value: a[1],
                    target: a.join(" - ")
                }
            });
        });

        input.onSelect = function(v){
            var siest = data_SIEST.search(v, 1, ["SIEST"])[0];
            var d = Object.assign(siest, data_ESCOLAS.search(siest["REG."] + " - " + v, 1)[0]);

            document.querySelector("body > .content .info").style.display = "";

            document.querySelector("body > .content .info").innerHTML = `<div class="title">${d["Nome"]}</div>
            <div class="content">
                <div label="Regional">${d["Regional"]}</div>
                <div label="SIEST">${d["COD."]}</div>
                <div label="Telefone">${d["Telefone"]}</div>
                <div label="E-mail">${d["E-mail"]}</div>
                <div label="Endereço">${d["Endereço"]}</div>
            </div>`;

            /*console.log(d);
            console.log(data_SIEST.search(v));
            console.log(data_ESCOLAS.search(v, 10, ["Nome"]));*/
        };
    });
})();