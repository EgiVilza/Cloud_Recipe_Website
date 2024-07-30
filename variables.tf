# Project Variables
variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "credentials_file" {
  description = "credentials files location"
  type        = string
}

# Location Variables
variable "location" {
  description = "Location"
  default     = "US"
  type        = string
}

variable "region" {
  description = "Region to create resources"
  default     = "us-central1"
  type        = string
}

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

# IAM Variables
variable "service_accounts" {
  description = "Map of service accounts"
  type        = map(string)
  default = {
    "gcr-service-account" = "GCR Service Account",
  }
}

variable "roles" {
  description = "List of IAM roles and their members"
  type        = map(list(string))
  default     = {}
}

# Storage Variables
variable "bucket_name" {
  description = "Bucket Name"
  default     = "recipe_website_storage_bucket"
  type        = string
}
