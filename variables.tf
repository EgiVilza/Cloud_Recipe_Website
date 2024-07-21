variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "credentials_file" {
  description = "credentials files location"
  type        = string
}

variable "region" {
  description = "Region to create resources"
  default     = "us-central1"
  type        = string
}

# variable "bucket_name" {
#   description = "Bucket Name"
#   type = string
# }

variable "zone" {
  description = "Zone"
  default     = "us-central1-a"
  type        = string
}

variable "location_id" {
  description = "Location ID"
  default     = "us-central"
  type        = string
}

variable "apis" {
  description = "List of APIs to enable"
  type        = list(string)
  default = [
    "compute.googleapis.com",
    "appengine.googleapis.com",
    "container.googleapis.com",
    "appengine.googleapis.com",
    "containerregistry.googleapis.com",
    "artifactregistry.googleapis.com",
  ]
}

variable "service_accounts" {
  description = "Map of service accounts"
  type = map(string)
  default = {
    "gcr-service-account" = "GCR Service Account",
    "gcr-service-accounts" = "GCR Service Account2",
  }
}

variable "roles" {
  description = "List of roles and their members"
  type        = map(list(string))
  default = {}
}
