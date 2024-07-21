variable "project_id" {
  description = "The GCP Project ID"
  type = string
}

variable "roles" {
  description = "A map of roles and the members to bind to each role"
  type = map(list(string))
}

variable "service_accounts" {
  description = "A map of service accounts to create and display names"
  type = map(string)
}
