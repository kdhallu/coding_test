const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// PostgreSQL connection configuration
const client = new Client({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'exnation',
  port: 54325,
});

// Function to insert data into the database
async function insertData(metric) {
  const query = `
    INSERT INTO meterdata (measurement, timestamp, tags, key, value)
    VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
  `;

  const values = [
    metric.measurement,
    metric.timestamp,
    metric.tags,
    metric.key,
    metric.value,
  ];

  try {
    const res = await client.query(query, values);
    console.log('Inserted:', res.rows[0]);
  } catch (err) {
    console.error('Error inserting data:', err.stack);
  }
}

// Function to read and process a single JSON file
async function processJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);

    for (const meterdata of jsonData) {
      // Extract dynamic key (e.g., "0100021D00FF")
      const dynamicKey = Object.keys(meterdata).find((key) => key.startsWith('010'));
      const value = meterdata[dynamicKey];

      // Add the dynamic key and value to the metric object
      meterdata.key = dynamicKey;
      meterdata.value = value;

      await insertData(meterdata);
    }
  } catch (err) {
    console.error(`Error reading or parsing JSON file (${filePath}):`, err.stack);
  }
}

// Main function to connect to the DB and process all files
async function main() {
  await client.connect();
  console.log('Connected to PostgreSQL');

  // Define the paths to the two JSON files
  const file1 = path.join(__dirname, 'migrations/export/1db7649e-9342-4e04-97c7-f0ebb88ed1f8.json');
  const file2 = path.join(__dirname, 'migrations/export/95ce3367-cbce-4a4d-bbe3-da082831d7bd.json');

  // Process both JSON files
  await processJsonFile(file1);
  await processJsonFile(file2);

  await client.end();
  console.log('Disconnected from PostgreSQL');
}

// Run the main function
main();
