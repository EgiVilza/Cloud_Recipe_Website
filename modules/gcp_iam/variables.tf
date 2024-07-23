variable "project_id" {
  description = "The GCP Project ID"
  type = string
}

variable "roles" {
  description = "A map of IAM roles and the members to bind to each role"
  type = map(list(string))
}

variable "service_accounts" {
  description = "A map of service accounts to create and display names"
  type = map(string)
}

variable "bucket_name" {
  description = "Bucket Name"
  type = string
}

variable "storage_bucket_roles" {
  description = "Storage Bucket Roles"
  type = string
}

variable "storage_bucket_members" {
  description = "storage_bucket_members"
  type = string
}