(function(){
    window.StringSimilarity = {};

    function convertToSlug(text) {
        const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
        const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
        const p = new RegExp(a.split('').join('|'), 'g')
        return text.toString().toLowerCase().trim().replace(p, c => b.charAt(a.indexOf(c))).replace(/&/g, '-and-').replace(/[\s\W-]+/g, '-');
    }

    window.StringSimilarity.compareTwoStrings = function(first, second, exato) {
        exato = typeof exato === "boolean" ? exato : false;
        if(exato !== true){
            first = convertToSlug(String(first)).toLocaleLowerCase();
            second = convertToSlug(String(second)).toLocaleLowerCase();
        }
        first = String(first).replace(/\s+/g, '');
        second = String(second).replace(/\s+/g, '');

        if (first === second || second.indexOf(first) >= 0) return 1;
        if (first.length < 2 || second.length < 2) return 0;

        let firstBigrams = new Map();
        for (let i = 0; i < first.length - 1; i++) {
            const bigram = first.substring(i, i + 2);
            const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;
            firstBigrams.set(bigram, count);
        };

        let intersectionSize = 0;
        for (let i = 0; i < second.length - 1; i++) {
            const bigram = second.substring(i, i + 2);
            const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;
            if (count > 0) {
                firstBigrams.set(bigram, count - 1);
                intersectionSize++;
            }
        }

        return (2.0 * intersectionSize) / (first.length + second.length - 2);
    }

    window.StringSimilarity.findBestMatch = function(mainString, targetStrings, exato) {
        var areArgsValid = function(mainString, targetStrings) {
            if (typeof mainString !== 'string') return false;
            if (!Array.isArray(targetStrings)) return false;
            if (!targetStrings.length) return false;
            if (targetStrings.find( function (s) { return typeof s !== 'string'})) return false;
            return true;
        }

        if (!areArgsValid(mainString, targetStrings)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');

        exato = typeof exato === "boolean" ? exato : false;
        
        const ratings = [];
        let bestMatchIndex = 0;

        for (let i = 0; i < targetStrings.length; i++) {
            const currentTargetString = targetStrings[i];
            const currentRating = window.StringSimilarity.compareTwoStrings(mainString, currentTargetString, exato);
            ratings.push({target: currentTargetString, rating: currentRating, index: i});
            if (currentRating > ratings[bestMatchIndex].rating) {
                bestMatchIndex = i;
            }
        }
        
        ratings.sort((a, b) => { return (b.rating - a.rating); });
        const bestMatch = ratings[bestMatchIndex];
        return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
    }

    /*

    function VerificarSimilaridade(str1, str2) {
        if (str1.length == 0) { return str2.length; }
        if (str2.length == 0) { return str1.length; }

        var verif = new Array(str1.length + 1).fill(new Array(str2.length + 1).fill(0));
        var i = 0,
            j = 0;
        for (i = 0; i < str1.length; i++) {
            verif[i] = new Array(str2.length + 1).fill(0);
            for (j = 0; j < str2.length; j++) {
                verif[i][j] = j;
            }
        }
        for (i = 1; i <= str1.length; i++) {
            for (j = 1; j <= str2.length; j++) {
                var custo = (str2[j - 1] == str1[i - 1]) ? 0 : 1;
                verif[i][j] = Math.min(Math.min(verif[i - 1][j] + 1, verif[i][j - 1] + 1), verif[i - 1][j - 1] + custo);
            }
        }
        return verif[str1.length][str2.length];
    }

    function convertToSlug(text) {
        const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
        const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
        const p = new RegExp(a.split('').join('|'), 'g')
        return text.toString().toLowerCase().trim().replace(p, c => b.charAt(a.indexOf(c))).replace(/&/g, '-and-').replace(/[\s\W-]+/g, '-');
    }*/
})();