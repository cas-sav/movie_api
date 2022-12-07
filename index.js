const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: 'Pheobe',
    favoriteMovies: ['Cars']
  },
  {
    id: 2,
    name: 'Rachel',
    favoriteMovies: ['Sixteen Candles']
  },
  {
    id: 3,
    name: 'Joey',
    favoriteMovies: []
  }
];

let topMovies = [
    {
      Title: 'Harry Potter and the Sorcerer\'s Stone',
      Description: '',
      Director: {
        Name: 'Chris Columbus',
        Bio: '',
        birthYear: '1958',
        deathYear: ''
      },
      Genre: {
        Type: 'Adventure',
        Description: ''
      },
      ImageURL: ''
    },
    {
      Title: 'The Lord of the Rings',
      Description: '',
      Director: {
        Name: 'Peter Jackson',
        Bio: '',
        birthYear: '',
        deathYear: ''
      },
      Genre: {
        Type: '',
        Description: ''
      },
      ImageURL: ''
    },
    {
      Title: 'Twilight',
      Description: '',
      Director: {
        Name: 'Catherine Hardwicke',
        Bio: '',
        birthYear: '',
        deathYear: ''
      },
      Genre: {
        Type: '',
        Description: ''
      },
      ImageURL: ''
    },
    {
      Title: 'Fantastic Beasts',
      Description: '',
      Director: {
        Name: 'David Yates',
        Bio: '',
        birthYear: '',
        deathYear: ''
      },
      Genre: {
        Type: '',
        Description: ''
      },
      ImageURL: ''
    },
    {
      Title: 'Cars',
      Description: '',
      Director: {
        Name: 'John Lasseter',
        Bio: '',
        birthYear: '',
        deathYear: ''
      },
      Genre: {
        Type: '',
        Description: ''
      },
      ImageURL: ''
    },
    {
      Title: 'The Incredibles',
      Description: '',
      Director: {
        Name: 'Brad Bird',
        Bio: '',
        birthYear: '',
        deathYear: ''
      },
      Genre: {
        Type: '',
        Description: ''
      },
      ImageURL: ''
    },
    {
      Title: 'Toy Story',
      Description: '',
      Director: {
        Name: 'John Lasseter',
        Bio: '',
        birthYear: '',
        deathYear: ''
      },
      Genre: {
        Type: '',
        Description: ''
      },
      ImageURL: ''
    },
    {
      Title: 'Legally Blonde',
      Description: '',
      Director: {
        Name: 'Robert Luketic',
        Bio: '',
        birthYear: '',
        deathYear: ''
      },
      Genre: {
        Type: '',
        Description: ''
      },
      ImageURL: ''
    },
    {
      Title: 'Mean Girls',
      Description: '',
      Director: {
        Name: 'Mark Waters',
        Bio: '',
        birthYear: '',
        deathYear: ''
      },
      Genre: {
        Type: '',
        Description: ''
      },
      ImageURL: ''
    },
    {
      Title: 'Scream 2',
      Description: '',
      Director: {
        Name: 'Wes Craven',
        Bio: '',
        birthYear: '',
        deathYear: ''
      },
      Genre: {
        Type: '',
        Description: ''
      },
      ImageURL: ''
    }
  ];

// CREATE
app.put('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('users need names')
  }
})


// UPDATE
app.post('/users/:id', (req, res) => {
  const {id} = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('no such user')
  }

})


// CREATE
app.post('/users/:id/:movieTitle', (req, res) => {
  const {id, movieTitle} = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send('no such user')
  }

})


// DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
  const {id, movieTitle} = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send('no such user')
  }

})


// DELETE
app.delete('/users/:id', (req, res) => {
  const {id} = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    users = users.filter( user => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send('no such user')
  }

})


// READ
app.get('/movies', (req, res) => {
  res.status(200).json(topMovies);
})


// READ
app.get('/movies/:title', (req, res) => {
  const {title} = req.params;
  const movie = topMovies.find( movie => movie.Title === title);

  if(movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie')
  }

})


// READ
app.get('/movies/genre/:genreType', (req, res) => {
  const {genreType} = req.params;
  const genre = topMovies.find( movie => movie.Genre.Type === genreType).Genre;

  if(genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre')
  }

})


// READ
app.get('/movies/directors/:directorName', (req, res) => {
  const {directorName} = req.params;
  const director = topMovies.find( movie => movie.Director.Name === directorName).Director;

  if(director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such director')
  }

})


// ERROR  
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
  
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});