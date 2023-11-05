import * as tf from '@tensorflow/tfjs';

async function loadModel() {
  const model = await tf.loadLayersModel('/models/resnet50-.../model.json'); // Make sure the path is correct
  console.log("Model loaded successfully");
  return model;
}

export { loadModel };
