# URL Shortener Microservice

URL Shortener is a simple web application built with Express.js that allows you to shorten long URLs into shorter, more manageable links. Users can submit a URL, and the application will generate a unique short URL that redirects to the original long URL when accessed.

# Usage

- Enter a long URL in the input field and click "Shorten" to generate a short URL.

- Access statistics for each short URL by appending it to the base URL, e.g., http://localhost:3000/<short_url>.

# API Endpoints

- POST /api/shorturl: Shorten a URL by sending a POST request with a JSON body containing the URL field.
- GET /api/shorturl/:short_url: Redirect to the original URL associated with the provided short URL.
  Configuration

# Deployment

This API is currently deployed and can be accessed via the following link:

https://fcc-timestamp-microservice-7kbw.onrender.com/

# Contact

For questions or feedback, email me at abdo27073@gmail.com.

# Author

Abdelrahman Mohammed
