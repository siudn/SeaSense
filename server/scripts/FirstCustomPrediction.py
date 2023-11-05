from imageai.Classification.Custom import CustomImageClassification
import os

execution_path = os.getcwd()

prediction = CustomImageClassification()
prediction.setModelTypeAsResNet50()
prediction.setModelPath(os.path.join(execution_path, "./models/resnet50-.-test_acc_0.70909_epoch-88.pt"))
prediction.setJsonPath(os.path.join(execution_path, "./models/._model_classes.json"))
prediction.loadModel()

predictions, probabilities = prediction.classifyImage(os.path.join(execution_path, "colossalsquid8.jpg"), result_count=4)

for eachPrediction, eachProbability in zip(predictions, probabilities):
    print(eachPrediction + " : " + str(eachProbability))