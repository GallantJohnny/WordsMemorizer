const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.authToken = function (req, res, next) {
  console.log('-----------    Authenticating Token   -----------');
  console.log(req.headers['x-auth-token']);
  const token = req.headers['x-auth-token'];
  jwt.verify(token, 'process.env.JWT_SECRET', function (err, decoded) {
    if (err) return res.status(401).json({ msg: 'Authentication error' });
    console.log(decoded);
    req.userId = decoded.userId;
    next();
  });
}

exports.register = function (req, res, next) {
  console.log('-----------    Registering   -----------');
  console.log(req.body);
  const { name, email, password } = req.body;
  const errors = [];

  if (!name) errors.push('Please provide a name!');
  if (!email) errors.push('Please provide an email!');
  if (!password) errors.push('Enter a password!');

  if (errors.length) return res.status(400).json({ msg: errors });

  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: ['Email already exists!'] });
    bcrypt.hash(password, 10).then(hash => {
      const newUser = new User({
        name,
        email,
        password: hash
      });
      newUser.save().then((user) => {
        console.log(user);
        let token = jwt.sign({ userId: user._id }, 'process.env.JWT_SECRET', { expiresIn: '12h' });
        req.user = {
          userId: user._id,
          name: newUser.name,
          email: newUser.email,
          token: token
        };
        next();
      }).catch(err => {
        console.log(err);
        res.status(400).json({ msg: ['An Error occoured'] });
      });
    });
  });
}

exports.login = function (req, res) {
  console.log('-----------    Logingin    -----------');
  const { email, password } = req.body;
  const errors = [];

  if (!email) errors.push('Please provide an email!');
  if (!password) errors.push('Enter a password!');

  if (errors.length) return res.status(400).json({ msg: errors });

  User.findOne({ email }).then(user => {
    bcrypt.compare(password, user.password)
      .then((isCorrect) => {
        if (isCorrect) {
          let token = jwt.sign({ userId: user._id }, 'process.env.JWT_SECRET', { expiresIn: '12h' });
          res.status(200).json({
            msg: 'Logged in succesfully!',
            userId: user._id,
            name: user.name,
            email: user.email,
            token: token
          })
        } else {
          res.status(401).json({ msg: 'Incorrect password or email' })
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'An error occurred' });
      });
  }).catch(() => res.status(401).json({ msg: 'Incorrect password or email' }));
}

exports.setIsTodaysWordsAnswered = function (req, res) {
  console.log('-----------    setIsTodaysWordsAnswered    -----------');
  User.updateOne({ _id: req.userId }, { isTodaysWordsAnswered: req.isTodaysWordsAnswered }).catch(err => {
    console.log(err);
    res.status(400).end();
  });
}