variable "cluster_name" {
  description = "Cluster name"
  type        = string
}

variable "location" {
  description = "Region for cluster"
  type        = string
}

variable "machine_type" {
  description = "Machine Type"
  type        = string
}

variable "node_count" {
  description = "Number of nodes"
  type        = number
}

variable "disk_type" {
  description = "Disk Type"
  type        = string
}

variable "disk_size_gb" {
  description = "Disk Size by gb"
  default     = 50
  type        = number
}