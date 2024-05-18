aws codepipeline start-pipeline-execution --name $DE_AWS_PIPELINE_NAME
if [[ $? -ne 0 ]]; then
    echo "Failed to start pipeline execution"
    exit -1
fi