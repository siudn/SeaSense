console.log("hello");

const endpointDisplayName = "MarineClassificationUS";
const project = "hacknjit-seasense";
const location = "us-central1";

// Imports the Google Cloud Endpoint Service Client library
const { EndpointServiceClient } = require("@google-cloud/aiplatform");

// Specifies the location of the api endpoint
const clientOptions = {
  apiEndpoint: "us-central1-aiplatform.googleapis.com",
};

// Instantiates a client
const endpointServiceClient = new EndpointServiceClient(clientOptions);

async function createEndpoint() {
  // Configure the parent resource
  const parent = `projects/${project}/locations/${location}`;
  const endpoint = {
    displayName: endpointDisplayName,
  };
  const request = {
    parent,
    endpoint,
  };

  // Get and print out a list of all the endpoints for this resource
  const [response] = await endpointServiceClient.createEndpoint(request);
  console.log(`Long running operation : ${response.name}`);

  // Wait for operation to complete
  await response.promise();
  const result = response.result;

  console.log("Create endpoint response");
  console.log(`\tName : ${result.name}`);
  console.log(`\tDisplay name : ${result.displayName}`);
  console.log(`\tDescription : ${result.description}`);
  console.log(`\tLabels : ${JSON.stringify(result.labels)}`);
  console.log(`\tCreate time : ${JSON.stringify(result.createTime)}`);
  console.log(`\tUpdate time : ${JSON.stringify(result.updateTime)}`);
}
createEndpoint();
