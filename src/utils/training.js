"use strict";
const charmap = require("./charmap");

let makeOutputs = letter => {
    if (typeof letter !== "string") {
        throw ("Cannot make output array without string type letter");
    };

    let outputs = [];
    charmap.forEach(one => {
        if (one === letter) {
            outputs.push(1);
        } else {
            outputs.push(0);
        }
    });
    return outputs;
};

let makeTrainingSet = rawTrainingSet => {
    let trainingSet = [];

    rawTrainingSet.forEach(one => {
        trainingSet.push({
            input: one.pixels,
            output: makeOutputs(one.letter)
        });
    })

    return trainingSet;
}

module.exports = {
    makeTrainingSet: makeTrainingSet
}