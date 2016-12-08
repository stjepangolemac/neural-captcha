
window.neural = function (arr) { 
    var output = window.neuralRaw(arr);
    var result = [];

    charmap.forEach(function (one, i) {
        result.push({letter: one, chance: output[i]});
    });
    
    return result;
}

window.neuralSorted = function (arr) { 
    var output = window.neuralRaw(arr);
    var result = [];

    charmap.forEach(function (one, i) {
        result.push({letter: one, chance: output[i]});
    });

    result = result.sort(function compare(a, b) {
        if (a.chance < b.chance) {
            return 1;
        }
        if (a.chance > b.chance) {
            return -1;
        }
        return 0;
    });

    return result;
}

window.neuralRaw = 