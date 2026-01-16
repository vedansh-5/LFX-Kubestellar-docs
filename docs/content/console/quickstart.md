---
title: "Quick Start"
linkTitle: "Quick Start"
weight: 1
description: >
  Get KubeStellar Klaude Console running in minutes
---

# Quick Start

This guide will help you get kkc running locally for development or evaluation.

## Prerequisites

- Go 1.23+
- Node.js 20+
- Docker (for containerized deployment)
- kubectl configured with at least one cluster
- GitHub OAuth App credentials

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/kubestellar/console.git
cd console
```

### 2. Create a GitHub OAuth App

Go to [GitHub Developer Settings](https://github.com/settings/developers) → OAuth Apps → New OAuth App

- **Application name**: `KubeStellar Klaude Console (dev)`
- **Homepage URL**: `http://localhost:5174`
- **Authorization callback URL**: `http://localhost:8080/auth/github/callback`

### 3. Set Environment Variables

```bash
export GITHUB_CLIENT_ID=your_client_id
export GITHUB_CLIENT_SECRET=your_client_secret
```

### 4. Run the Development Server

```bash
./dev.sh
```

This starts both the backend (port 8080) and frontend (port 5174).

### 5. Access the Console

Open http://localhost:5174 and sign in with GitHub.

## Kubernetes Deployment

### Using Helm

```bash
# Create namespace
kubectl create namespace kkc

# Create secrets
kubectl create secret generic kkc-secrets \
  --namespace kkc \
  --from-literal=github-client-id=$GITHUB_CLIENT_ID \
  --from-literal=github-client-secret=$GITHUB_CLIENT_SECRET

# Install chart
helm install kkc ./deploy/helm/kubestellar-console \
  --namespace kkc \
  --set github.existingSecret=kkc-secrets
```

### OpenShift

```bash
helm install kkc ./deploy/helm/kubestellar-console \
  --namespace kkc \
  --set github.existingSecret=kkc-secrets \
  --set route.enabled=true \
  --set route.host=kkc.apps.your-cluster.com
```

## Next Steps

- [Configuration](configuration.md) - Customize AI mode, token limits, and more
- [Architecture](architecture.md) - Understand how kkc works
- [Card Types](cards.md) - Explore available dashboard cards
