const app = require('./app');

const PORT = process.env.PORT || 5000;



app.get('/', (req, res) => {
  res.send('Welcome to the Job Tracker API');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
