# homelab
Homelab configuration for ArgoCD

# Starting from scratch

1. Install a new k8s cluster
2. Deploy ArgoCD manually with `kubectl apply -k argo-cd`
3. Create an app manually in the ArgoCD UI or CLI `root-app`, point to `root-app` and synchronize
4. Apps should now all deploy in the cluster
