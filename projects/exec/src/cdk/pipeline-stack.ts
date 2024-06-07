import * as cdk from "aws-cdk-lib";
import * as codePipeline from "aws-cdk-lib/aws-codepipeline";
import * as codePipelineActions from "aws-cdk-lib/aws-codepipeline-actions";
import * as codeBuild from "aws-cdk-lib/aws-codebuild";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { DefinitionPipeline } from "./definition-pipeline";
import { IdOfSource } from "./id-of-source";
import { DefinitionEnvironment } from "./definition-environment";

export class PipelineStack extends cdk.Stack {
    public constructor(scope: Construct, id: string, props: cdk.StackProps, idOfSource: IdOfSource, config: DefinitionPipeline, 
            environment: DefinitionEnvironment, environmentLabel: string) {
        super(scope, id, props);

        const stack = this;

        const artifactByStageId = new Map<string, codePipeline.Artifact>();
        const idOfSourceStage = "Source";
        
        const artifactSource = new codePipeline.Artifact(`DE-Pipeline-${idOfSource.repo}-${environmentLabel}-Source`);
        artifactByStageId.set(idOfSourceStage, artifactSource);

        const buildRole = new iam.Role(stack, `Iam/DE-Pipeline-${idOfSource.repo}-${environmentLabel}-Build-Role`, {
            roleName: `de-pipeline-${idOfSource.repo}-${environmentLabel}-build-role`,
            assumedBy: new iam.ServicePrincipal("codebuild.amazonaws.com")
        });
        buildRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"));

        const environmentVariables: Record<string, codeBuild.BuildEnvironmentVariable> = {};
        const environmentVariablesInStage = environment.environmentVariables ?? {};
        for (const name in environmentVariablesInStage) {
            environmentVariables[name] = {
                type: codeBuild.BuildEnvironmentVariableType.PLAINTEXT,
                value: environmentVariablesInStage[name]
            };
        }

        environmentVariables["ENV"] = {
            type: codeBuild.BuildEnvironmentVariableType.PLAINTEXT,
            value: environmentLabel
        };
        environmentVariables["GITHUB_OAUTH_TOKEN"] = {
            type: codeBuild.BuildEnvironmentVariableType.PLAINTEXT,
            value: cdk.SecretValue.secretsManager("GitHub-OAuth-Token").unsafeUnwrap().toString()
        };

        const environmentSecretsInStage = environment.environmentSecrets ?? [];
        for (const name in environmentSecretsInStage) {
            environmentVariables[name] = {
                type: codeBuild.BuildEnvironmentVariableType.PLAINTEXT,
                value: cdk.SecretValue.secretsManager(environmentSecretsInStage[name]).unsafeUnwrap().toString()
            };
        }

        const pipeline = new codePipeline.Pipeline(stack, `DE-Pipeline-${idOfSource.repo}-${environmentLabel}`,
        {
            pipelineName: `de-pipeline-${idOfSource.repo}-${environmentLabel}`,
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
            if (stage.restrictEnvironments && !stage.restrictEnvironments.includes(environmentLabel)) {
                continue;
            }

            const idOfInputStage = stage.idOfInputStage ?? idOfSourceStage;
            const input = artifactByStageId.get(idOfInputStage);
            if (input === undefined) {
                throw new Error(`The out of stage ${idOfInputStage} is not available`);
            }           

            const phases: Record<string, object> = {};
            for (const step of stage.steps) {
                phases[step.action] = {
                    commands: step.commands
                }
            }

            const artifact = new codePipeline.Artifact(`DE-Pipeline-${idOfSource.repo}-${environmentLabel}-${stage.id}`);
            artifactByStageId.set(stage.id, artifact);

            pipeline.addStage({
                stageName: stage.id,
                actions: [
                    new codePipelineActions.CodeBuildAction({
                        actionName: stage.id,
                        input,
                        project: new codeBuild.Project(stack, `DE-Build-Project-${idOfSource.repo}-${environmentLabel}-${stage.id}`, {
                            role: buildRole,
                            projectName: `de-build-project-${idOfSource.repo}-${environmentLabel}-${stage.id}`,
                            environment: {
                                buildImage: codeBuild.LinuxBuildImage.STANDARD_7_0,
                                computeType: codeBuild.ComputeType.SMALL,
                                environmentVariables
                            },
                            buildSpec: codeBuild.BuildSpec.fromObject({
                                "version": "0.2",
                                phases,
                                "artifacts": {
                                    "files": stage.outputFiles ?? []
                                }
                            }),
                        }),
                        outputs: [
                            artifact
                        ]
                    })
                ]
            });
        }

        new cdk.CfnOutput(stack, 'PipelineName', {
            value: pipeline.pipelineName,
        });
        
        new cdk.CfnOutput(stack, 'PipelineArn', {
            value: pipeline.pipelineArn,
        });
    }
}
