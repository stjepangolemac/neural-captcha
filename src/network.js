const fs = require("fs"),
    synaptic = require('synaptic'),
    Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect,
    conf = require("../conf"),
    charmap = require("./utils/charmap"),
    training = require("./utils/training"),
    exporter = require("./utils/exporter");

console.log("ITERATIONS: "
    + conf.iterations
    + "\r\n"
    + "LEARNING_RATE: "
    + conf.learningRate
    + "\r\n");

console.log("Reading knowledge database...");
let trainingSetRaw = JSON.parse(
    fs.readFileSync(conf.paths.database, "utf8"));
console.log("Knowledge database ready!"
    + "\r\n");

console.log("Creating training dataset...");
let trainingSet = training.makeTrainingSet(trainingSetRaw);
console.log("Training dataset ready!"
    + "\r\n");

console.log("Creating neural network...");
let network = new Architect.Perceptron(256, charmap.length, charmap.length);

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

console.log("Exporting neural network...");
exporter.exportNetwork(network.standalone());

console.log("Finished, exiting...");
process.exit();