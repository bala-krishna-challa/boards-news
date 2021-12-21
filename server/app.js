const express = require('express');
const fs = require('fs');
const cors = require('cors');

const boardsData = JSON.parse(fs.readFileSync(`boards.json`, 'utf-8'));

const {boards, news} = boardsData;

function* getUniqueId() {
    for(let id = 1;; id++){
        yield id;
    }
}

const uniqueIdIterator = getUniqueId();

const checkBoardID = (req, res, next) => {
    if (!boards.map(b => b.id).includes(+req.params.boardId)) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid board id.'
      });
    }

    next();
};

const checkBoardAndNewsID = (req, res, next) => {
    if (!boards.map(b => b.id).includes(+req.params.boardId) || !news.map(b => b.id).includes(+req.params.newsId)) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid board or news id.'
      });
    }

    next();
};

const checkBody = (req, res, next) => {
    if (!req.body.title || !req.body.author) {
      return res.status(400).json({
        status: 'fail',
        message: 'Missing news title or author.'
      });
    }

    next();
};
  
const getAllBoards = (req, res) => {
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: boards.length,
      data: boards
    });
};

const getBoardNews = (req, res) => {
    console.log(req.params);
    const boardId = +req.params.boardId;
  
    const boardNews = news.filter(item => item.boardId === boardId);
  
    res.status(200).json({
      status: 'success',
      data: boardNews
    });
};
  
const getNews = (req, res) => {
    console.log(req.params);
    const boardId = +req.params.boardId;
    const newsId = +req.params.newsId;
  
    const resNews = news.find(item => item.id === newsId && item.boardId === boardId);
  
    res.status(200).json({
      status: 'success',
      data: resNews
    });
};
  
const createNews = (req, res) => {  
    const newId = uniqueIdIterator.next().value;
    const newNews = Object.assign({ id: newId }, req.body);
  
    news.push(newNews);
  
    res.status(201).json({
        status: 'success',
        data: newNews
    });
};
  
const updateNews = (req, res) => {
    const newsId = +req.params.newsId;
    const updatedNews = Object.assign({ id: newsId }, req.body);
    const newsIndex = news.findIndex(item => item.id === newsId);

    news.splice(newsIndex, 1, updatedNews);

    res.status(200).json({
      status: 'success',
      data: updatedNews
    });
  };
  
const deleteNews = (req, res) => {
    const newsId = +req.params.newsId;
    const newsIndex = news.findIndex(item => item.id === newsId);

    news.splice(newsIndex, 1);

    res.status(204).json({
      status: 'success',
      data: null
    });
  };

const app = express();
app.use(cors());
app.use(express.json());

app.route('/api/boards')
    .get(getAllBoards);

app.route('/api/boards/:boardId/news')
    .get(checkBoardID, getBoardNews)
    .post(checkBoardID, checkBody, createNews);

app.route('/api/boards/:boardId/news/:newsId')
    .get(checkBoardAndNewsID, getNews)
    .put(checkBoardAndNewsID, checkBody, updateNews)
    .delete(checkBoardAndNewsID, deleteNews);

const port = 8080;

app.listen(port, () => {
        console.log(`App running on port ${port}...`);
    });
