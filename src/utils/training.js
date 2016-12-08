"use strict";
const charmap = require("./charmap"),
    synaptic = require("synaptic"),
    Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect,
    conf = require("../../conf");

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

let trainNetwork = (network, trainingSet) => {
    console.log("Creating network trainer..."
        + "\r\n");
    let trainer = new Trainer(network);

    let startTime = new Date();

    console.log("Started training...");
    trainer.train(trainingSet, {
        rate: (iterations, error) => {
            return conf.learningRate;
        },
        iterations: conf.iterations,
        error: .005,
        shuffle: true,
        log: conf.loggingStep,
        cost: Trainer.cost.CROSS_ENTROPY
    });
    console.log("Training finished in "
        + ((((new Date() - startTime) % 86400000) % 3600000) / 60000).toFixed(1)
        + " minutes!"
        + "\r\n");
}

module.exports = {
    makeTrainingSet: makeTrainingSet,
    trainNetwork: trainNetwork
}