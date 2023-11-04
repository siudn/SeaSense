// import google cloud model service
const {ModelServiceClient}  = require('@google-cloud/aiplatform');

// Specify Api endpoint
const clientOptions = {
    apiEndpoint: 'us-central-aiplatform.googleapi.com',
};

// Create a new instance of the client
const modelServiceClient = new ModelServiceClient(clientOptions);

// Export Model Function
async function exportModel() {
    // configure the name resources
    const name = `projects/${project}/locations/${location}/models/${modelId}`;
    
    // configure the outputConfig resources
    const outputConfig = {
        exportFormatId: exportFormat,
        gcsDestination: {
            outputUriPrefix: gcsDestinationOutputUriPrefix,
        },
    };
    const request = {
        name,
        outputConfig,
    };

    // Exporting model request
    const [response] = await modelServiceClient.exportModel(request);
    console.log('Long running operation: ${response.name}');

    // wait for operation to complete
    await response.promise();
    const result = response.result;
}

exportModel()