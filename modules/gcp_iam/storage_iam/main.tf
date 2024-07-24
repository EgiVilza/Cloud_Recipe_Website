# Storage Bucket IAM Members
resource "google_storage_bucket_iam_member" "storage_bucket_members" {
  bucket = var.bucket_name
  role   = var.storage_bucket_roles
  member = var.storage_bucket_members
}

