import * as cdk from "aws-cdk-lib";
import * as codePipeline from "aws-cdk-lib/aws-codepipeline";
import * as codePipelineActions from "aws-cdk-lib/aws-codepipeline-actions";
import * as codeBuild from "aws-cdk-lib/aws-codebuild";
import { Construct } from "constructs";
import { DefinitionPipeline } from "./definition-pipeline";
import { IdOfSource } from "./id-of-source";

export class PipelineStack extends cdk.Stack {
    public constructor(scope: Construct, id: string, props: cdk.StackProps, idOfSource: IdOfSource, config: DefinitionPipeline) {
        super(scope, id, props);

        const artifactByStageId = new Map<string, codePipeline.Artifact>();
        const idOfSourceStage = "Source";
        
        const artifactSource = new codePipeline.Artifact(`DE-Pipeline-${idOfSource}-Source`);
        artifactByStageId.set(idOfSourceStage, artifactSource);

        const pipeline = new codePipeline.Pipeline(this, `DE-Pipeline-${idOfSource}`,
        {
            pipelineName: `de-pipeline-${idOfSource}`,
        });
        pipeline.addStage({
            stageName: "Source",
            actions: [
                new codePipelineActions.GitHubSourceAction({
                    actionName: "Clone",
                    owner: "mtudorr",
                    oauthToken: cdk.SecretValue.secretsManager("GitHub-OAuth-Token"),
                    repo: idOfSource.repo,
                    branch: idOfSource.branch,
                    output: artifactSource,
                    trigger: codePipelineActions.GitHubTrigger.NONE
                })
            ]
        });

        for (const stage of config.stages) {
            const idOfInputStage = stage.idOfInputStage ?? idOfSourceStage;
            const input = artifactByStageId.get(idOfInputStage);
            if (input === undefined) {
                throw new Error(`The out of stage ${idOfInputStage} is not available`);
            }

            const environmentVariables: Record<string, codeBuild.BuildEnvironmentVariable> = {};
            const environmentVariablesInStage = stage.environmentVariables ?? {};
            for (const name in environmentVariablesInStage) {
                environmentVariables[name] = {
                    type: codeBuild.BuildEnvironmentVariableType.PLAINTEXT,
                    value: environmentVariablesInStage[name]
                };
            }

            environmentVariables["GitHub-OAuth-Token"] = {
                type: codeBuild.BuildEnvironmentVariableType.SECRETS_MANAGER,
                value: "GitHub-OAuth-Token"
            };

            const environmentSecretsInStage = stage.environmentSecrets ?? {};
            for (const name in environmentSecretsInStage) {
                environmentVariables[name] = {
                    type: codeBuild.BuildEnvironmentVariableType.SECRETS_MANAGER,
                    value: environmentSecretsInStage[name]
                };
            }

            const phases: Record<string, object> = {};
            for (const step of stage.steps) {
                phases[step.action] = {
                    commands: step.commands
                }
            }

            const artifact = new codePipeline.Artifact(`DE-Pipeline-${idOfSource}-${stage.id}`);
            artifactByStageId.set(idOfSourceStage, artifact);

            pipeline.addStage({
                stageName: stage.id,
                actions: [
                    new codePipelineActions.CodeBuildAction({
                        actionName: stage.id,
                        input,
                        project: new codeBuild.Project(this, `DE-Build-Project-${idOfSource}-${stage.id}`, {
                            projectName: `de-build-project-${idOfSource}-${stage.id}`,
                            environment: {
                                buildImage: codeBuild.LinuxBuildImage.STANDARD_7_0,
                                computeType: codeBuild.ComputeType.SMALL,
                                environmentVariables
                            },
                            buildSpec: codeBuild.BuildSpec.fromObject({
                                "version": "0.2",
                                phases
                            }),
                        }),
                        outputs: [
                            artifact
                        ]
                    })
                ]
            })
        }
    }
}
