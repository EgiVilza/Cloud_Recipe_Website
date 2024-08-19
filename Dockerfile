# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /recipe_website_app

# Copy the rest of the application code
COPY /build/ .

# Install dependencies
RUN npm install

# Define the command to run the app
CMD ["npm", "start"]

# Expose the port the app runs on
EXPOSE 80
