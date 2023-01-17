const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  morgan = require('morgan');


const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

//mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });


mongoose.connect('mongodb+srv://cassiesav:Ko&groupie!@cassies-clusters.ytyoxqr.mongodb.net/myFlixDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('strictQuery', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

const { check, validationResult } = require('express-validator');

/*
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
      Description: 'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.',
      Director: {
        Name: 'Chris Columbus',
        Bio: 'Chris Joseph Columbus is an American filmmaker. ',
        birthYear: '1958',
        deathYear: ''
      },
      Genre: {
        Name: 'Adventure',
        Description: 'The adventure genre consists of stories where the protagonist goes on an epic journey, either personally or geographically'
      },
      ImageURL: 'harry-potter-ss.png'
    },
    {
      Title: 'The Lord of the Rings',
      Description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
      Director: {
        Name: 'Peter Jackson',
        Bio: 'Sir Peter Robert Jackson ONZ KNZM is a New Zealand film director, screenwriter and producer',
        birthYear: '1961',
        deathYear: ''
      },
      Genre: {
        Name: 'Fantasy',
        Description: 'Fantasy is a genre of speculative fiction involving magical elements, typically set in a fictional universe and sometimes inspired by mythology and folklore'
      },
      ImageURL: 'lort.png'
    },
    {
      Title: 'Twilight',
      Description: 'When Bella Swan moves to a small town in the Pacific Northwest, she falls in love with Edward Cullen, a mysterious classmate who reveals himself to be a vampire.',
      Director: {
        Name: 'Catherine Hardwicke',
        Bio: '',
        birthYear: '1955',
        deathYear: ''
      },
      Genre: {
        Name: 'Romance',
        Description: 'a type of genre fiction which places its primary focus on the relationship and romantic love between two people, and usually has an "emotionally satisfying and optimistic ending.'
      },
      ImageURL: 'twilight.png'
    },
    {
      Title: 'Fantastic Beasts and Where to Find Them',
      Description: 'The adventures of writer Newt Scamander in New York\'s secret community of witches and wizards seventy.',
      Director: {
        Name: 'David Yates',
        Bio: '',
        birthYear: '',
        deathYear: ''
      },
      Genre: {
        Name: 'Fantasy',
        Description: 'Fantasy is a genre of speculative fiction involving magical elements, typically set in a fictional universe and sometimes inspired by mythology and folklore'
      },
      ImageURL: 'fantastic-beasts-awtft.png'
    },
    {
      Title: 'Cars',
      Description: 'On the way to the biggest race of his life, a hotshot rookie race car gets stranded in a rundown town, and learns that winning isn\'t everything in life.',
      Director: {
        Name: 'John Lasseter',
        Bio: '',
        birthYear: '',
        deathYear: ''
      },
      Genre: {
        Name: 'Comedy',
        Description: 'Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.'
      },
      ImageURL: 'cars.png'
    },
    {
      Title: 'The Incredibles',
      Description: 'While trying to lead a quiet suburban life, a family of undercover superheroes are forced into action to save the world.',
      Director: {
        Name: 'Brad Bird',
        Bio: '',
        birthYear: '',
        deathYear: ''
      },
      Genre: {
        Name: 'Adventure',
        Description: 'The adventure genre consists of stories where the protagonist goes on an epic journey, either personally or geographically'
      },
      ImageURL: 'the-incredibles.png'
    },
    {
      Title: 'Toy Story',
      Description: 'A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy\'s bedroom.',
      Director: {
        Name: 'John Lasseter',
        Bio: '',
        birthYear: '',
        deathYear: ''
      },
      Genre: {
        Name: 'Adventure',
        Description: 'The adventure genre consists of stories where the protagonist goes on an epic journey, either personally or geographically'
      },
      ImageURL: 'toy-story.png'
    },
    {
      Title: 'Legally Blonde',
      Description: 'Legally Blonde finds Reese Witherspoon in one of her breakthrough roles as sorority queen Elle Woods who is dumped by her preppy boyfriend Matthew Davis.',
      Director: {
        Name: 'Robert Luketic',
        Bio: '',
        birthYear: '',
        deathYear: ''
      },
      Genre: {
        Name: 'Comedy',
        Description: 'Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.'
      },
      ImageURL: 'legally-blonde.png'
    },
    {
      Title: 'Mean Girls',
      Description: 'Cady Heron is a hit with The Plastics, the A-list girl clique at her new school, until she makes the mistake of falling for Aaron Samuels, the ex-boyfriend ',
      Director: {
        Name: 'Mark Waters',
        Bio: '',
        birthYear: '',
        deathYear: ''
      },
      Genre: {
        Name: 'Comedy',
        Description: 'Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.'
      },
      ImageURL: 'mean-girls.png'
    },
    {
      Title: 'Scream 2',
      Description: 'Two years after the first series of murders, as Sidney acclimates to college life, someone donning the Ghostface costume begins a new string of killings.',
      Director: {
        Name: 'Wes Craven',
        Bio: '',
        birthYear: '',
        deathYear: ''
      },
      Genre: {
        Name: 'Horror',
        Description: 'Horror is a genre of fiction which is intended to frighten, scare, or disgust'
      },
      ImageURL: 'scream2.png'
    }
  ];
*/

app.use(express.static("public"));


// default text response
app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send("Welcome to MyFlix!");
});


// CREATE (add a user)
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users',  passport.authenticate('jwt', { session: false }), 
  [
  check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {

// check the validation object for errors
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status.apply(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status.apply(500).send('Error: ' + error);
    });
  });


// UPDATE (a user's info, by username)
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.post('/users/:Username',  passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, 
    { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


// CREATE (add a movie to a user's list of favorites)
app.post('/users/:Username/movies/:MovieID',  passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


// DELETE (a movie from favorites list)
app.delete('/users/:Username/movies/:MovieID',  passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: { FavoriteMovies: req.params.MovieID }
  },
  { new: true},
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });   
});


// DELETE (a user by usernme)
app.delete('/users/:Username',  passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// READ (users, all)
app.get('/users',  passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// READ (user, by username)
app.get('/users/:Username',  passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

// READ (movies, all)
app.get('/movies',  passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// READ (movie, by movie title)
app.get('/movies/:Title',  passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// READ (specific genre and info)
app.get('/movies/genre/:Name',  passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.Name })
    .then((movies) => {
      res.json(movies.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// READ (specific director and info)
app.get('/movies/director/:Name',  passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name })
    .then((movies) => {
      res.json(movies.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// ERROR  
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
  
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});
