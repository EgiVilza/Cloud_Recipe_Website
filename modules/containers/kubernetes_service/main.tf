resource "kubernetes_service" "app" {
  metadata {
    name      = "recipe-website-service"
    namespace = "default"
  }

  spec {
    selector = {
      app = "recipe-website"
    }

    port {
      port        = 80
      target_port = 80
    }

    type = "LoadBalancer"
  }
}