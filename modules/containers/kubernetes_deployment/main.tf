resource "kubernetes_deployment" "app" {
  metadata {
    name = "recipe-website-deployment"
    namespace = "default"
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "app"
      }
    }

    template {
      metadata {
        labels = {
          app = "app"
        }
      }
      
      spec {
        container {
          image = "gcr.io/${var.project_id}/recipe-website"
          name = "app"

          port {
            container_port = 8080
          }
        }
      }
    }
  }

}
