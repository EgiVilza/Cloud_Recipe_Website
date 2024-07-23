variable "bucket_name" {
  description = "Bucket Name"
  type = string
}

variable "location" {
  description = "Location"
  default = "US"
  type = string
}

variable "main_page_suffix" {
  description = "Main Page Suffix"
  default = "build/index.html"
  type = string
}

variable "not_found_page" {
  description = "Not Found Page"
  default = "build/index.html"
  type = string
}

variable "file_path" {
  description = "Build File Path"
  type = string
}