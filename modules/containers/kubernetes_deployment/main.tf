resource "kubernetes_deployment" "app" {
  metadata {
    name      = "recipe-website-deployment"
    namespace = "default"
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "recipe-website"
      }
    }

    template {
      metadata {
        labels = {
          app = "recipe-website"
        }
      }

      spec {
        container {
          image = "gcr.io/${var.project_id}/recipe-website"
          name  = "recipe-website"

          port {
            container_port = 80
          }
        }
      }
    }
  }

}
