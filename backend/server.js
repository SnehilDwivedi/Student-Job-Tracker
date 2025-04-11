const app = require('./app');

const PORT = process.env.PORT || 5000;



app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
