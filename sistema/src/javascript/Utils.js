(function(){
    const Utils = window.Utils = {};

    Utils.DistanceStr = function(str1, str2){
        if(str1.length == 0){return str2.length;}
        if(str2.length == 0){return str1.length;}

        var verif = new Array(str1.length + 1).fill(new Array(str2.length + 1).fill(0));

        var i = 0, j = 0;
        for(i = 0; i < str1.length; i++){
            verif[i] = new Array(str2.length + 1).fill(0);
            for(j = 0; j < str2.length; j++){
                verif[i][j] = j;
            }
        }

        for(i = 1; i <= str1.length; i++){
            for(j = 1; j <= str2.length; j++){
                var custo = (str2[j - 1] == str1[i - 1]) ? 0 : 1;
                verif[i][j] = Math.min(Math.min(verif[i - 1][j] + 1, verif[i][j - 1] + 1), verif[i - 1][j - 1] + custo);
            }
        }

        return verif[str1.length][str2.length];
    }
    
})();