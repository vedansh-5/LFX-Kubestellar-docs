---
title: "Installation"
linkTitle: "Installation"
weight: 2
description: >
  Detailed deployment options for kkc
---

# Installation

This guide covers all deployment options for KubeStellar Klaude Console.

## Prerequisites

- Kubernetes cluster (1.24+)
- Helm 3.x
- kubectl configured with cluster access
- GitHub OAuth App credentials

## Helm Installation

### 1. Add Secrets

Create a secret with your OAuth credentials:

```bash
kubectl create namespace kkc

kubectl create secret generic kkc-secrets \
  --namespace kkc \
  --from-literal=github-client-id=YOUR_CLIENT_ID \
  --from-literal=github-client-secret=YOUR_CLIENT_SECRET
```

Optionally add Claude API key for AI features:

```bash
kubectl create secret generic kkc-secrets \
  --namespace kkc \
  --from-literal=github-client-id=YOUR_CLIENT_ID \
  --from-literal=github-client-secret=YOUR_CLIENT_SECRET \
  --from-literal=claude-api-key=YOUR_CLAUDE_API_KEY
```

### 2. Install Chart

**From GitHub Container Registry:**

```bash
helm install kkc oci://ghcr.io/kubestellar/charts/console \
  --namespace kkc \
  --set github.existingSecret=kkc-secrets
```

**From source:**

```bash
git clone https://github.com/kubestellar/console.git
cd console

helm install kkc ./deploy/helm/kubestellar-console \
  --namespace kkc \
  --set github.existingSecret=kkc-secrets
```

### 3. Access the Console

**Port forward (development):**

```bash
kubectl port-forward -n kkc svc/kkc 8080:8080
```

Open http://localhost:8080

**Ingress (production):**

```bash
helm upgrade kkc ./deploy/helm/kubestellar-console \
  --namespace kkc \
  --set github.existingSecret=kkc-secrets \
  --set ingress.enabled=true \
  --set ingress.hosts[0].host=kkc.your-domain.com
```

## OpenShift Installation

OpenShift uses Routes instead of Ingress:

```bash
helm install kkc ./deploy/helm/kubestellar-console \
  --namespace kkc \
  --set github.existingSecret=kkc-secrets \
  --set route.enabled=true \
  --set route.host=kkc.apps.your-cluster.com
```

The console will be available at `https://kkc.apps.your-cluster.com`

## Docker Installation

For single-node or development deployments:

```bash
docker run -d \
  --name kkc \
  -p 8080:8080 \
  -e GITHUB_CLIENT_ID=your_client_id \
  -e GITHUB_CLIENT_SECRET=your_client_secret \
  -v ~/.kube:/root/.kube:ro \
  -v kkc-data:/app/data \
  ghcr.io/kubestellar/console:latest
```

## Multi-Cluster Access

kkc reads clusters from your kubeconfig. To access multiple clusters:

1. **Merge kubeconfigs:**
   ```bash
   KUBECONFIG=~/.kube/config:~/.kube/cluster2.yaml kubectl config view --flatten > ~/.kube/merged
   mv ~/.kube/merged ~/.kube/config
   ```

2. **Mount merged config in container/pod**

3. **Verify access:**
   ```bash
   kubectl config get-contexts
   ```

## Upgrading

```bash
helm upgrade kkc oci://ghcr.io/kubestellar/charts/console \
  --namespace kkc \
  --reuse-values
```

## Uninstalling

```bash
helm uninstall kkc --namespace kkc
kubectl delete namespace kkc
```
