import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config(); 
const client = new Client({
  connectionString: process.env.DATABASE_URL, 
});

client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch((error) => {
    console.error('Error connecting to PostgreSQL:', error.message);
  });

export default client;
