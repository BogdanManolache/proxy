import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specified HTTP methods
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow specified headers
  next();
});

app.get('/proxy', async (req, res) => {
  try {
    const response = await fetch('https://whereisvor-server.up.railway.app/api/v1/water-sources');
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/proxy', async (req, res) => {
  try {
    const response = await fetch(
      `https://whereisvor-server.up.railway.app/api/v1/water-sources/${req.body.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(req.body),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error making PUT request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
