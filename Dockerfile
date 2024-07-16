# Use an official Node.js runtime as a parent image
FROM httpd:2.4-alpine

# Set the working directory in the container
# WORKDIR /build

# Copy the package.json and package-lock.json
# COPY . /build/

# Install dependencies
# RUN npm install

# Copy the rest of the application code
COPY /build/ /usr/local/apache2/htdocs/

# Expose the port the app runs on
EXPOSE 80

# Define the command to run the app
# CMD ["node", "app.js"]
