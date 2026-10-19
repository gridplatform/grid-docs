---
title: AWS
---

# AWS

Provider id: `aws`. Per-service catalog: **type** (category) and **subtype** (`metadata.kind` / `resources[].type`).

| Status | Meaning | Count |
|--------|---------|-------|
| `supported` | Available to generate / plan / apply | 224 |
| `planned` | Not released yet — listed for layout and vocabulary | 0 |

## Catalog

| Type | Subtype | Status | Label |
|------|---------|--------|-------|
| Network | `alb` | `supported` | ALB |
| Network | `apigateway-v2` | `supported` | API Gateway v2 |
| Network | `client-vpn` | `supported` | Client Vpn |
| Network | `cloudwan` | `supported` | Cloudwan |
| Network | `direct-connect` | `supported` | Direct Connect |
| Network | `eip` | `supported` | Eip |
| Network | `firewall-manager` | `supported` | Firewall Manager |
| Network | `identity-center` | `supported` | Identity Center |
| Network | `litellm-gateway` | `supported` | Litellm Gateway (self-hosted / unmanaged) |
| Network | `llm-inference-endpoint` | `supported` | Llm Inference Endpoint (self-hosted / unmanaged) |
| Network | `nat-gateway` | `supported` | Nat Gateway |
| Network | `network-firewall` | `supported` | Network Firewall |
| Network | `network-manager` | `supported` | Network Manager |
| Network | `nlb` | `supported` | Nlb |
| Network | `route53` | `supported` | Route 53 DNS (zone + records, public/private) |
| Network | `route53-dnssec` | `supported` | Route 53 DNSSEC |
| Network | `route53-health-check` | `supported` | Route 53 health check |
| Network | `route53-resolver` | `supported` | Route53 Resolver |
| Network | `security-group` | `supported` | Security group |
| Network | `storage-gateway` | `supported` | Storage Gateway |
| Network | `subnet` | `supported` | Subnet (folded into VPC) |
| Network | `transit-gateway` | `supported` | Transit Gateway |
| Network | `verified-access` | `supported` | Verified Access |
| Network | `vpc` | `supported` | VPC (+ subnets) |
| Network | `vpc-endpoint` | `supported` | Vpc Endpoint |
| Network | `vpc-lattice` | `supported` | Vpc Lattice |
| Network | `vpn-gateway` | `supported` | Vpn Gateway |
| Compute | `autoscaling` | `supported` | Autoscaling |
| Compute | `batch` | `supported` | Batch |
| Compute | `ec2-instance` | `supported` | EC2 instance |
| Compute | `gpu-instance` | `supported` | Gpu Instance (self-hosted / unmanaged) |
| Compute | `lightsail` | `supported` | Lightsail |
| Kubernetes cluster | `eks` | `supported` | EKS |
| Kubernetes cluster | `eks-node-group` | `supported` | Eks Node Group |
| Kubernetes cluster | `gpu-node-group` | `supported` | Gpu Node Group |
| Kubernetes cluster | `karpenter` | `supported` | Karpenter (self-hosted / unmanaged) |
| Database | `aurora` | `supported` | Aurora |
| Database | `aurora-serverless` | `supported` | Aurora Serverless |
| Database | `documentdb` | `supported` | Documentdb |
| Database | `dynamodb-accelerator` | `supported` | Dynamodb Accelerator |
| Database | `dynamodb-table` | `supported` | DynamoDB |
| Database | `elasticache` | `supported` | ElastiCache |
| Database | `keyspaces` | `supported` | Keyspaces |
| Database | `memorydb` | `supported` | Memorydb |
| Database | `neptune` | `supported` | Neptune |
| Database | `opensearch` | `supported` | Opensearch |
| Database | `rds` | `supported` | RDS |
| Database | `rds-proxy` | `supported` | Rds Proxy |
| Storage | `backup` | `supported` | Backup |
| Storage | `ebs-volume` | `supported` | Ebs Volume |
| Storage | `efs` | `supported` | Efs |
| Storage | `fsx` | `supported` | Fsx |
| Storage | `glacier` | `supported` | Glacier |
| Storage | `s3-access-point` | `supported` | S3 Access Point |
| Storage | `s3-bucket` | `supported` | S3 bucket |
| AI / ML | `bedrock-agent` | `supported` | Bedrock Agent |
| AI / ML | `bedrock-agentcore` | `supported` | Bedrock AgentCore (API/platform) |
| AI / ML | `bedrock-guardrail` | `supported` | Bedrock Guardrail |
| AI / ML | `bedrock-knowledge-base` | `supported` | Bedrock Knowledge Base (RAG) |
| AI / ML | `bedrock-prompt` | `supported` | Bedrock Prompt |
| AI / ML | `comprehend` | `supported` | Amazon Comprehend (API) |
| AI / ML | `forecast` | `supported` | Amazon Forecast (API) |
| AI / ML | `huggingface-tgi` | `supported` | Huggingface Tgi (self-hosted / unmanaged) |
| AI / ML | `kendra` | `supported` | Amazon Kendra index |
| AI / ML | `kserve` | `supported` | Kserve (self-hosted / unmanaged) |
| AI / ML | `kuberay` | `supported` | Kuberay (self-hosted / unmanaged) |
| AI / ML | `lex` | `supported` | Amazon Lex V2 bot |
| AI / ML | `lookout-equipment` | `supported` | Amazon Lookout for Equipment (API) |
| AI / ML | `lookout-metrics` | `supported` | Amazon Lookout for Metrics (API) |
| AI / ML | `lookout-vision` | `supported` | Amazon Lookout for Vision (API) |
| AI / ML | `mlflow` | `supported` | Mlflow (self-hosted / unmanaged) |
| AI / ML | `nova` | `supported` | Amazon Nova foundation models (API via Bedrock) |
| AI / ML | `nvidia-nim` | `supported` | Nvidia Nim (self-hosted / unmanaged) |
| AI / ML | `ollama` | `supported` | Ollama (self-hosted / unmanaged) |
| AI / ML | `personalize` | `supported` | Amazon Personalize (API/jobs) |
| AI / ML | `polly` | `supported` | Amazon Polly (API) |
| AI / ML | `q-business` | `supported` | Amazon Q Business (API) |
| AI / ML | `rekognition` | `supported` | Amazon Rekognition (API) |
| AI / ML | `sagemaker` | `supported` | SageMaker notebook / model / endpoint |
| AI / ML | `sagemaker-domain` | `supported` | SageMaker Studio Domain |
| AI / ML | `sagemaker-feature-store` | `supported` | Sagemaker Feature Store |
| AI / ML | `tensorrt-llm` | `supported` | Tensorrt Llm (self-hosted / unmanaged) |
| AI / ML | `textract` | `supported` | Amazon Textract (API) |
| AI / ML | `transcribe` | `supported` | Amazon Transcribe (API) |
| AI / ML | `translate` | `supported` | Amazon Translate (API) |
| AI / ML | `vllm` | `supported` | Vllm (self-hosted / unmanaged) |
| Identity | `athena-workgroup` | `supported` | Athena Workgroup |
| Identity | `cloudwatch-log-group` | `supported` | CloudWatch log group |
| Identity | `cognito` | `supported` | Cognito |
| Identity | `directory-service` | `supported` | Directory Service |
| Identity | `iam` | `supported` | IAM |
| Identity | `iam-role` | `supported` | IAM role |
| Identity | `organizations` | `supported` | Organizations |
| Identity | `ram` | `supported` | Ram |
| Security | `access-analyzer` | `supported` | Access Analyzer |
| Security | `acm` | `supported` | ACM |
| Security | `acm-pca` | `supported` | Acm Pca |
| Security | `detective` | `supported` | Detective |
| Security | `guardduty` | `supported` | Guardduty |
| Security | `inspector` | `supported` | Inspector |
| Security | `kms` | `supported` | KMS |
| Security | `macie` | `supported` | Macie |
| Security | `private-ca` | `supported` | Private Ca |
| Security | `secrets-manager` | `supported` | Secrets Manager |
| Security | `security-hub` | `supported` | Security Hub |
| Security | `shield` | `supported` | Shield |
| Security | `wafv2` | `supported` | Wafv2 |
| Messaging | `eventbridge` | `supported` | EventBridge |
| Messaging | `eventbridge-scheduler` | `supported` | Eventbridge Scheduler |
| Messaging | `kinesis` | `supported` | Kinesis |
| Messaging | `kinesis-firehose` | `supported` | Kinesis Firehose |
| Messaging | `mq` | `supported` | Mq |
| Messaging | `msk` | `supported` | MSK |
| Messaging | `msk-connect` | `supported` | Msk Connect |
| Messaging | `sns` | `supported` | SNS |
| Messaging | `sqs` | `supported` | SQS |
| Serverless | `appsync` | `supported` | Appsync |
| Serverless | `lambda` | `supported` | Lambda |
| Serverless | `pipes` | `supported` | Pipes |
| Serverless | `step-functions` | `supported` | Step Functions |
| Containers | `apprunner` | `supported` | Apprunner |
| Containers | `ecr` | `supported` | ECR |
| Containers | `ecr-public` | `supported` | Ecr Public |
| Containers | `ecs` | `supported` | ECS |
| Containers | `elastic-beanstalk` | `supported` | Elastic Beanstalk |
| Containers | `fargate` | `supported` | Fargate |
| Edge | `cloudfront` | `supported` | Cloudfront |
| Edge | `global-accelerator` | `supported` | Global Accelerator |
| Analytics | `athena` | `supported` | Athena |
| Analytics | `datazone` | `supported` | Datazone |
| Analytics | `emr` | `supported` | EMR |
| Analytics | `emr-serverless` | `supported` | Emr Serverless |
| Analytics | `glue` | `supported` | Glue |
| Analytics | `glue-crawler` | `supported` | Glue Crawler |
| Analytics | `iot-analytics` | `supported` | Iot Analytics |
| Analytics | `lakeformation` | `supported` | Lakeformation |
| Analytics | `quicksight` | `supported` | Quicksight |
| Analytics | `redshift` | `supported` | Redshift |
| Analytics | `redshift-serverless` | `supported` | Redshift Serverless |
| CI / CD | `amplify` | `supported` | Amplify |
| CI / CD | `codebuild` | `supported` | Codebuild |
| CI / CD | `codecommit` | `supported` | Codecommit |
| CI / CD | `codedeploy` | `supported` | Codedeploy |
| CI / CD | `codepipeline` | `supported` | Codepipeline |
| Observability | `cloudwatch` | `supported` | CloudWatch |
| Observability | `managed-grafana` | `supported` | Managed Grafana |
| Observability | `managed-prometheus` | `supported` | Managed Prometheus |
| Observability | `xray` | `supported` | Xray |
| Other | `ami` | `supported` | Ami |
| Other | `appconfig` | `supported` | Appconfig |
| Other | `appflow` | `supported` | Appflow |
| Other | `application-migration` | `supported` | Application Migration |
| Other | `appmesh` | `supported` | Appmesh |
| Other | `appstream` | `supported` | Appstream |
| Other | `artifact` | `supported` | Artifact |
| Other | `audit-manager` | `supported` | Audit Manager |
| Other | `bentoml` | `supported` | Bentoml (self-hosted / unmanaged) |
| Other | `braket` | `supported` | Braket |
| Other | `budgets` | `supported` | Budgets |
| Other | `chatbot` | `supported` | Chatbot |
| Other | `chroma` | `supported` | Chroma (self-hosted / unmanaged) |
| Other | `clean-rooms` | `supported` | Clean Rooms |
| Other | `cloudformation` | `supported` | Cloudformation |
| Other | `cloudtrail` | `supported` | Cloudtrail |
| Other | `codeartifact` | `supported` | Codeartifact |
| Other | `codestar-connections` | `supported` | Codestar Connections |
| Other | `connect` | `supported` | Connect |
| Other | `control-tower` | `supported` | Control Tower |
| Other | `datasync` | `supported` | Datasync |
| Other | `deepspeed` | `supported` | Deepspeed (self-hosted / unmanaged) |
| Other | `dms` | `supported` | Dms |
| Other | `elemental-mediapackage` | `supported` | Elemental Mediapackage |
| Other | `elemental-mediastore` | `supported` | Elemental Mediastore |
| Other | `fault-injection-simulator` | `supported` | Fault Injection Simulator |
| Other | `finspace` | `supported` | Finspace |
| Other | `fraud-detector` | `supported` | Amazon Fraud Detector (API) |
| Other | `gamelift` | `supported` | Gamelift |
| Other | `greengrass` | `supported` | Greengrass |
| Other | `ground-station` | `supported` | Ground Station |
| Other | `healthlake` | `supported` | Healthlake |
| Other | `imagebuilder` | `supported` | Imagebuilder |
| Other | `iot-core` | `supported` | Iot Core |
| Other | `ivs` | `supported` | Ivs |
| Other | `location-service` | `supported` | Location Service |
| Other | `mainframe-modernization` | `supported` | Mainframe Modernization |
| Other | `managed-blockchain` | `supported` | Managed Blockchain |
| Other | `media-convert` | `supported` | Media Convert |
| Other | `medialive` | `supported` | Medialive |
| Other | `milvus` | `supported` | Milvus (self-hosted / unmanaged) |
| Other | `mwaa` | `supported` | Mwaa |
| Other | `nvidia-gpu-operator` | `supported` | Nvidia Gpu Operator (self-hosted / unmanaged) |
| Other | `open-webui` | `supported` | Open Webui (self-hosted / unmanaged) |
| Other | `opensearch-serverless` | `supported` | Opensearch Serverless |
| Other | `outposts` | `supported` | Outposts |
| Other | `parallelcluster` | `supported` | Parallelcluster |
| Other | `payment-cryptography` | `supported` | Payment Cryptography |
| Other | `pgvector` | `supported` | Pgvector (self-hosted / unmanaged) |
| Other | `pinpoint` | `supported` | Pinpoint |
| Other | `proton` | `supported` | Proton |
| Other | `qdrant` | `supported` | Qdrant (self-hosted / unmanaged) |
| Other | `qldb` | `supported` | Qldb |
| Other | `ray-cluster` | `supported` | Ray Cluster (self-hosted / unmanaged) |
| Other | `refactor-spaces` | `supported` | Refactor Spaces |
| Other | `registry` | `supported` | Registry |
| Other | `resilience-hub` | `supported` | Resilience Hub |
| Other | `schemas` | `supported` | Schemas |
| Other | `security-lake` | `supported` | Security Lake |
| Other | `service-discovery` | `supported` | Service Discovery |
| Other | `servicecatalog` | `supported` | Servicecatalog |
| Other | `ses` | `supported` | Ses |
| Other | `sglang` | `supported` | Sglang (self-hosted / unmanaged) |
| Other | `snowball` | `supported` | Snowball |
| Other | `ssm-parameter` | `supported` | SSM Parameter |
| Other | `timestream` | `supported` | Timestream |
| Other | `transfer-family` | `supported` | Transfer Family |
| Other | `transfer-server` | `supported` | Transfer Server |
| Other | `triton-inference-server` | `supported` | Triton Inference Server (self-hosted / unmanaged) |
| Other | `trusted-advisor` | `supported` | Trusted Advisor |
| Other | `verified-permissions` | `supported` | Verified Permissions |
| Other | `weaviate` | `supported` | Weaviate (self-hosted / unmanaged) |
| Other | `well-architected` | `supported` | Well Architected |
| Other | `workspaces` | `supported` | Workspaces |
| Other | `workspaces-web` | `supported` | Workspaces Web |

## Related

- [Unit JSON](../Concepts/Unit_JSON.md)
- [Install overview](../Install/Overview.md)

