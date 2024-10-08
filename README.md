# homelab

Homelab configuration for ArgoCD

## Starting from scratch

1. Install a new k8s cluster

### Secrets

1. Install external secrets operators

```bash
helm repo add external-secrets https://charts.external-secrets.io
helm install external-secrets external-secrets/external-secrets -n external-secrets --create-namespace
```

1. Get client id and secret from [azure portal](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Credentials/appId/389714a7-8390-4c26-b45d-0060b4031e69/isMSAApp~/false)
1. Create `azurekv` namespace with `kubectl create namespace azurekv`
1. Create k8s secrets `kubectl create secret generic azure-homelab-cred --from-literal=client-id=[CLIENT_ID_HERE] --from-literal=client-secret=[CLIENT_SECRET_HERE] -n azurekv`
1. Deploy azurekv app `kubectl apply -k azurekv`
1. Force refresh secrets from KV `kubectl annotate es azurekv-external-secret force-sync=$(date +%s) --overwrite`

### Load balancer

1. Enable metallb `microk8s enable 192.168.10.200-192.168.10.255`

### Argo CD

1. Create `argocd` namespace with `kubectl create namespace argocd`
1. Deploy ArgoCD manually with `kubectl apply -k argo-cd`
1. Change the argocd-server service type to LoadBalancer: `kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'`
1. `argocd admin initial-password -n argocd` to get the password
1. `argocd login <ARGOCD_SERVER>` "<ARGOCD_SERVER>" should be 127.0.0.1:[PORT_FROM_THE_LB]
1. Create root-app

```bash
kubectl config set-context --current --namespace=argocd
argocd app create root-app --repo https://github.com/mbernard/homelab.git --path root-app --dest-server https://kubernetes.default.svc --dest-namespace root-app
```

1. Sync root-app: `argocd app sync root-app`
1. Sync cloudflared: `argocd app sync cloudflared`
1. Wait a few min for https://argocd.miguelbernard.com/ to be available

### Validate

1. Switch back Argocd to ClusterIP to avoid being stuck indefinitely in "Progressing" `kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "ClusterIP"}}'`
1. Valide Apps or healthy in this order
1. root-app
1. ArgoCD
1. External-secrets
1. AzureKV
1. Longhorn (check the UI and restore backups if needed)
1. Grafana-monitoring
1. Use the UI to sync other apps

# Utils

