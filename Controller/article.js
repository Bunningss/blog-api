const Model = require("../Models/index");

exports.create = async (req, res) => {
  try {
    const { Title, Image, Category, Article } = req.body;
    const article = new Model.Article({
      Title,
      Image,
      Category,
      Article,
      Author: req.user.id,
    });
    await article.save();
    await Model.User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { Articles: article._id },
      },
      { new: true }
    );
    res.status(200).json("Article Saved.");
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    const articles = await Model.Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.getOne = async (req, res) => {
  try {
    const article = await Model.Article.findById(req.params.id);
    res.status(200).json(article);
  } catch (err) {
    res.status(400).json("Server Error.");
  }
};

exports.update = async (req, res) => {
  try {
    const updatedArticle = await Model.Article.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
