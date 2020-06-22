const TodaysWords = require('../models/TodaysWords');
const Vocabulary = require('../models/Vocabulary');

exports.createTodaysWords = (req, res) => {
  console.log('[createTodaysWords]');
  TodaysWords.findOne({ ownerId: req.userId, isCompleted: false }).then(todaysWords => {
    if (!todaysWords) {
      console.log('[no todaysWords collection found, creating new one]');
      Vocabulary.findOne({ ownerId: req.userId }).then(vocabulary => {
        let selectedWords = [];
        for (let i = 0; i < 5; i++) {
          let rndIndex = Math.floor(Math.random() * vocabulary.words.length);
          selectedWords.push(vocabulary.words.splice(rndIndex, 1)[0]);
          selectedWords[i].isCorrect = false;
          selectedWords[i].isAnswered = false;
        }
        const newTodaysWords = new TodaysWords({
          ownerId: req.userId,
          words: selectedWords
        });
        newTodaysWords.save().then(todaysWords => {
          res.status(200).json({
            todaysWords: todaysWords.words,
            id: todaysWords._id,
            createdDate: todaysWords.createdDate
          });
        })
          .catch(err => res.status(400).json({ msg: 'Error occoured' }));
      });
    } else {
      console.log('[found todaysWords collection, no need to create new one]')
      res.status(200).json({
        todaysWords: todaysWords.words,
        id: todaysWords._id,
        createdDate: todaysWords.createdDate
      });
    }
  })
}

exports.updateTodaysWords = (req, res) => {
  console.log('Delete then create new todaysWords');
  console.log(req.body);
  TodaysWords.deleteOne({ ownerId: req.userId }).then(() => {
    const { todaysWords, isCompleted, score, createdDate, answeredDate, _id } = req.body;
    const updatedTodaysWords = new TodaysWords({
      ownerId: req.userId,
      words: todaysWords,
      isCompleted: isCompleted,
      score: score,
      createdDate: createdDate,
      answeredDate: answeredDate,
      _id: _id
    });
    console.log(updatedTodaysWords);
  });
}