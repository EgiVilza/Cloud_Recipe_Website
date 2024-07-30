resource "kubernetes_service" "app" {
  metadata {
    name = "app-service"
    namespace = "default"
  }

  spec {
    selector = {
      app = "app"
    }

    port {
      port = 80
      target_port = 8080
    }

    type = "LoadBalancer"
  }
}