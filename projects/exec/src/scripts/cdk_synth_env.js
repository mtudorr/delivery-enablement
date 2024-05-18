const fs = require("fs");
const path = require("path");

const cdkSynthContent = fs.readFileSync(path.join("/delivery-enablement", "cdk.synth.json"), { encoding: "utf8" });

const pipelineArn = "";
process.env["DE_AWS_PIPELINE_NAME"] = pipelineArn;
