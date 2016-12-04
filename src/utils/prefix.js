
window.neural = function (arr) { 
    var output = window.neuralRaw(arr);
    var result = [];

    charmap.forEach(function (one, i) {
        result.push({letter: one, chance: output[i]});
    });
    return result;
}

window.neuralRaw = 