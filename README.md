# Air Quality Project

Welcome to the Air Quality Project! This project provides a set of RESTful APIs to interact with air quality data. For this project we are using `NestJS` framework. Below, you'll find the necessary steps to get started and details about available endpoints.

## Getting Started

### Setting Up the Environment

**Database Initialization:** To initiate the project, we need to set up the databases. Utilizing Docker Compose, you can initialize the databases by running:

```docker compose up -d```

This command builds and starts the required database containers.

**Environment Variables:** Next, set up the environment variables. Refer to the `.env.example` file. For `API_KEY`, you'll need to register on [IQAir](https://www.iqair.com/fr/dashboard/api) to obtain your API KEY.

### Running the Project

**Testing:** Execute E2E test with:

```npm run test:e2e```

**Development Server:** To initiate the project in a local development environment, use:

```npm run start```

## API Documentation

### Air Quality APIs

**Get Air Quality:** Retrieves the current air quality data based on the specified longitude and latitude.

- Endpoint: `GET /air-quality`
- Query Parameters:
  - `lon`: Longitude of the location
  - `lat`: Latitude of the location
- Returns the current air quality data including pollutant levels.


**Get Paris Worst Air Quality time:** Fetches the worst air quality record for Paris, populated by a scheduled cron job.

- Endpoint: `GET /air-quality/paris-worst`
- Returns the worst air quality record for Paris.


To see the API docs, check the swagger [here](http://localhost:3000/api#/).



Feel free to explore and utilize these APIs for your air quality data needs! If you have any questions or concerns, don't hesitate to reach out.