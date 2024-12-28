import client from './db.js'; 

async function createSchema() {
  const schema = `
    CREATE TABLE IF NOT EXISTS routes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        name VARCHAR(255),
        geometry GEOMETRY(LINESTRING, 4326),
        distance FLOAT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    await client.query(schema);
    console.log('Table "routes" created successfully.');
  } catch (error) {
    console.error('Error creating table:', error.message);
  } finally {
    client.end(); // Close the database connection
  }
}

createSchema();
