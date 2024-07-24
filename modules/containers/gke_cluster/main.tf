resource "google_container_cluster" "primary" {
  name     = var.cluster_name
  location = var.location

  initial_node_count = var.node_count

  node_config {
    machine_type = var.machine_type
  }

  deletion_protection = false
}