const TodaysWords = require('../models/TodaysWords');
const Vocabulary = require('../models/Vocabulary');

exports.getTodaysWords = (req, res) => {

}

exports.createTodaysWords = (req, res) => {
  console.log('[createTodaysWords]');
  TodaysWords.findOne({ ownerId: req.userId, isCompleted: false }).then(todaysWords => {
    if (!todaysWords) {
      Vocabulary.findOne({ ownerId: req.userId }).then(vocabulary => {
        let selectedWords = [];
        for (let i = 0; i <= 5; i++) {
          let rndIndex = Math.floor(Math.random() * vocabulary.words.length);
          selectedWords.push(vocabulary.words.splice(rndIndex, 1)[0]);
          console.log(rndIndex);
          console.log(selectedWords);
        }
        const newTodaysWords = new TodaysWords({
          ownerId: req.userId,
          words: selectedWords
        });
        newTodaysWords.save().then(() => {
          res.status(200).end();
        })
          .catch(err => res.status(404).json({ msg: 'Error occoured' }));
      });
    }
  })
}