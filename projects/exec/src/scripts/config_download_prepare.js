const fs = require("fs");
const path = require("path");

const gitHubResponseContent = fs.readFileSync(path.join("/delivery-enablement", "config.out"), { encoding: "utf8" });
if (gitHubResponseContent === undefined || gitHubResponseContent.length === 0) {
    console.error("Response not available");
    process.exit(-1);
}

const gitHubResponse = JSON.parse(gitHubResponseContent);
if (gitHubResponse === undefined) {
    console.error("Response not JSON");
    process.exit(-2);
}

if (gitHubResponse.encoding !== "base64") {
    console.error("Encoding not base64");
    process.exit(-3);
}

const buffer = Buffer.from(gitHubResponse.content, "base64");
fs.writeFileSync(path.join("delivery-enablement", "de.config.json"), buffer);

process.exit(0);