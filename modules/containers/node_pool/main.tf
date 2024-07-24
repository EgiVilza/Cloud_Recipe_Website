resource "google_container_node_pool" "primary_nodes" {
  cluster  = var.cluster_name
  location = var.location

  node_count = var.node_count

  node_config {
    preemptible  = false
    machine_type = var.machine_type

    disk_type    = var.disk_type
    disk_size_gb = var.disk_size_gb

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }

  management {
    auto_upgrade = true
    auto_repair  = true
  }
}