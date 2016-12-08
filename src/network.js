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

process.on('SIGTERM', function() {
    console.log("Caught interrupt signal, finishing training...");

    process.env.USER_STOPPED = true;
});

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

let network;

console.log("Searching for saved neural network..."
    + "\r\n");
let loadedNetwork = exporter.loadNetwork();

if (loadedNetwork !== null) {
    console.log("Found saved neural network...");
    network = loadedNetwork;

    console.log(JSON.stringify(network.metadata, null, " "));
    console.log("\r\n");

    training.trainNetwork(network, trainingSet);
} else {
    console.log("No saved neural network...");
    console.log("Creating neural network...");
    network = new Architect.Perceptron(256, charmap.length, charmap.length);

    training.trainNetwork(network, trainingSet);
}

console.log("Bundling neural network...");
exporter.bundleNetwork(network);

console.log("Saving neural network...");
exporter.saveNetwork(network);

console.log("Finished, exiting...");
process.exit();