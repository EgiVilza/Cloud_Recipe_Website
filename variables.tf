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

variable "bucket_name" {
  description = "Bucket Name"
  type = string
}

variable "zone" {
  description = "Zone"
  default = "us-central1-a"
  type    = string
}

variable "location_id" {
  description = "Location ID"
  default = "us-central"
  type    = string
}