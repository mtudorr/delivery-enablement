const fs = require("fs");
const path = require("path");

const cdkOutputsContent = fs.readFileSync(path.join("/delivery-enablement", "cdk.output.json"), { encoding: "utf8" });
if (cdkOutputsContent === undefined || cdkOutputsContent.length === 0) {
    console.error("cdk outputs not available");
    process.exit(-1);
}

const cdkOutputs = JSON.parse(cdkOutputsContent);
if (cdkOutputs === undefined) {
    console.error("Could not parse cdk outputs");
    process.exit(-2);
}

const namesOfStacks = Object.keys(cdkOutputs);
if (namesOfStacks.length !== 1) {
    console.error(`Expected a single stack, found ${namesOfStacks}`);
    process.exit(-3);
}

const outputsOfStack = cdkOutputs[namesOfStacks[0]];
const variables = [
    `DE_AWS_PIPELINE_ARN="${outputsOfStack.PipelineArn}"`,
    `DE_AWS_PIPELINE_NAME="${outputsOfStack.PipelineName}"`,
];

fs.writeFileSync(path.join("/delivery-enablement", "cdk.output.env.sh"), variables.map(v => `export ${v}`).join(" && "));
