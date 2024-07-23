# Creating App Bucket
resource "google_storage_bucket" "recipe_app_bucket" {
  name = var.bucket_name
  location = var.location
  force_destroy = true
  
  website {
    main_page_suffix = var.main_page_suffix
    not_found_page = var.not_found_page
  }
}

# Creating App Bucket Object
resource "google_storage_bucket_object" "recipe_app_bucket_object" {
  for_each = fileset(var.file_path, "build/**")

  name = each.value
  bucket = google_storage_bucket.recipe_app_bucket.name
  source = "${var.file_path}/${each.value}"

  depends_on = [ google_storage_bucket.recipe_app_bucket ]
}

