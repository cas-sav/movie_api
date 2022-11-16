const express = require('express'),
  morgan = require('morgan');

const app = express();

let topMovies = [
    {
      title: 'Harry Potter and the Sorcerer\'s Stone',
      director: 'Chris Columbus'
    },
    {
      title: 'The Lord of the Rings',
      director: 'Peter Jackson'
    },
    {
      title: 'Twilight',
      director: 'Catherine Hardwicke'
    },
    {
      title: 'Fantastic Beasts',
      director: 'David Yates'
    },
    {
      title: 'Cars',
      director: 'John Lasseter'
    },
    {
      title: 'The Incredibles',
      director: 'Brad Bird'
    },
    {
      title: 'Toy Story ',
      director: 'John Lasseter'
    },
    {
      title: 'Legally Blonde',
      director: 'Robert Luketic'
    },
    {
      title: 'Mean Girls',
      director: 'Mark Waters'
    },
    {
      title: 'Scream 2',
      director: 'Wes Craven'
    }
  ];

app.use(express.static('public'));
app.use(morgan('common'));

// GET requests
app.get('/', (req, res) => {
    res.send('Movies are fun to watch!');
  });

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});


// ERROR  
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
  
app.listen(8090, () => {
    console.log('Your app is listening on port 8090.');
});