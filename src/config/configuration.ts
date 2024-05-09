export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  apiKey: process.env.API_KEY,
  database: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 27017,
  },
});
