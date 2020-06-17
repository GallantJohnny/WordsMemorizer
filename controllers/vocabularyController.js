const Vocabulary = require('../models/Vocabulary');
const User = require('../models/User');

const uuid = require('uuid').v1;

exports.createNewVocabulary = function (req, res) {
  const { name, email, token, userId } = req.user;
  const userVocab = new Vocabulary({ ownerId: userId });
  userVocab.save().then(() => {
    res.status(200).json({ name, email, token });
  }).catch(err => {
    console.log(err)
    res.status(400).json({ msg: ['Failed to create vocablurary'] });
  });
}

exports.addWord = function (req, res) {
  const newWord = {
    _id: uuid(),
    ...req.body.newWord
  }

  console.log(newWord);

  Vocabulary.updateOne(
    { ownerId: req.userId },
    { $addToSet: { words: newWord } },
    (err, result) => {
      console.log(result);
      if (err) return res.status(400).json({ msg: 'Failed to add word!' });
      if (!result.nModified) {
        res.status(400).json({ msg: 'This word already exists!' });
      } else {
        res.status(200).json({ msg: 'Word saved succesfully' });
      }
    }
  );
}

exports.deleteWord = function (req, res) {
  console.log(req.params.wordId);
  Vocabulary.updateOne(
    { ownerId: req.userId },
    { $pull: { words: { _id: req.params.wordId } } },
    (err, result) => {
      if (err) console.log(err);
      console.log(result.nModified);
      if (result.nModified) res.status(204).end();
    }
  )
}

exports.getUserWords = function (req, res) {
  Vocabulary.findOne({ ownerId: req.userId }).then(userVocab => {
    res.status(200).json(userVocab.words);
  }).catch(err => res.status(400).json({ msg: 'No user vocabulary found...' }));
}

exports.modifyWord = function (req, res) {
  console.log(req.userId);
  console.log(req.params.wordId);
  console.log(req.body.wordEng);
  console.log(req.body.wordsNative);
  Vocabulary.updateOne(
    {
      ownerId: req.userId,
      words: { $elemMatch: { _id: req.params.wordId } }
    },
    {
      $set: {
        "words.$.wordEng": req.body.wordEng,
        "words.$.wordsNative": req.body.wordsNative
      }
    }
  ).then(() => {
    res.status(200).json({ msg: "modified" });
  }).catch(err => console.log(err));
} 