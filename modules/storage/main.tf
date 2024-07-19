# # Creating App Bucket
# resource "google_storage_bucket" "recipe_app_bucket" {
#   name          = var.bucket_name
#   location      = "US"
#   force_destroy = true

#   website {
#     main_page_suffix = "build/index.html"
#     not_found_page   = "build/index.html"
#   }
# }

# # Creating App Bucket Object
# resource "google_storage_bucket_object" "recipe_app_bucket_object" {
#   for_each = fileset(path.module, "build/**")

#   name   = each.value
#   bucket = google_storage_bucket.recipe_app_bucket.name
#   source = "${path.module}/${each.value}"

#   depends_on = [google_storage_bucket.recipe_app_bucket]
# }

# # All Users access to Storage Bucket
# resource "google_storage_bucket_iam_member" "all_users" {
#   bucket = google_storage_bucket.recipe_app_bucket.name
#   role   = "roles/storage.objectViewer"
#   member = "allUsers"
# }

# # Creating Storage Admin Role
# resource "google_project_iam_binding" "gcr_service_account_binding" {
#   project = var.project_id
#   role    = "roles/storage.admin"

#   members = [
#     "serviceAccount:${google_service_account.gcr_service_account.email}"
#   ]
# }