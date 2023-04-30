const { mongoose } = require("mongoose");
const Model = require("../Models/index");

exports.create = async (req, res) => {
  try {
    const { Title, Image, Tags, Article } = req.body;
    const article = new Model.Article({
      Title,
      Image,
      Tags,
      Article,
      Author: req.user.id,
      AuthorName: req.user.Name,
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
    // Validation Erro Handling
    if (err.name === "ValidationError") {
      // const message = Object.values(err.errors).map((v) => v.message);
      // console.log(message);
      res.status(400).json("Please fill in all the fields properly.");
    } else {
      res.status(400).json(err.message);
    }
  }
};

exports.delete = async (req, res) => {
  try {
    await Model.Article.findByIdAndDelete(req.params.articleId);
    res.status(200).json("Deleted Successfully");
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.getAll = async (req, res) => {
  let lim = req.query.limit;
  let featured = req.query.featured;
  let articles;
  try {
    articles = await Model.Article.find().sort({ createdAt: -1 }).limit(lim);
    res.status(200).json(articles);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.getUserArticles = async (req, res) => {
  try {
    const userArticles = await Model.Article.find({
      Author: new mongoose.Types.ObjectId(req.query.userId),
    });
    res.status(200).json(userArticles);
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
