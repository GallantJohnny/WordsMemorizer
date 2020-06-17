const apiRouter = require('express').Router();
const cors = require('cors');

const userController = require('./controllers/userController');
const vocabularyController = require('./controllers/vocabularyController');
const todaysWordsController = require('./controllers/todaysWordsController');

apiRouter.use(cors());

// Vocabulary
apiRouter.get('/userWords', userController.authToken, vocabularyController.getUserWords);
apiRouter.post('/addWord', userController.authToken, vocabularyController.addWord);
apiRouter.post('/modifyWord/:wordId', userController.authToken, vocabularyController.modifyWord);
apiRouter.delete('/deleteWord/:wordId', userController.authToken, vocabularyController.deleteWord);

// Todays words
apiRouter.get('/todaysWords', userController.authToken, todaysWordsController.getTodaysWords);

// User authentication
apiRouter.post('/login', userController.login);
apiRouter.post('/register', userController.register, vocabularyController.createNewVocabulary);
apiRouter.post('/authToken', userController.authToken);

module.exports = apiRouter;