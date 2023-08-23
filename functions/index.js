const functions = require("firebase-functions");
require("./dbConnect/db");
//Blog model import
const blogModel = require("./mongoDbModel/blogModel");

exports.blog = functions.https.onRequest(async (req, res) => {
  try {
    const id = req.query.id;
    const { title, content, author } = req.body;
    const AuthorOnQuery = req.query.author;
    const page = req.query.page || 1;
    const ITEM_PER_PAGE = req.query.iteams || 4;
    const skip = (page - 1) * ITEM_PER_PAGE;
    switch (req.method) {
      //GET *****************************
      case "GET":
        // getBlogs(req, res);
        // add pagination
        let data;
        // find data by id or author name
        if (id) {
          data = await blogModel.find({ _id: id });
        } else if (AuthorOnQuery) {
          //find by auther name
          data = await blogModel
            .find({ author: AuthorOnQuery })
            .limit(ITEM_PER_PAGE)
            .skip(skip);

          if (data.length == 0) {
            return res.status(404).json({
              msg: "no author data found",
            });
          }
        } else {
          // find all
          data = await blogModel.find().limit(ITEM_PER_PAGE).skip(skip);
        }

        res.json({ status: 1, pageNo: page || 1, total: data.length, data });
        break;
      case "PUT":
        //*************************************PUT***************************************************
        // await updateAblog(req, res, id, content);
        if (!id) {
          return res.status(404).json({ status: 0, msg: "type the id" });
        }
        // const { content } = req.body;
        if (!content) {
          return res.status(400).json({
            status: 0,
            msg: "req body is empty ",
          });
        }
        let dataUpdate = await blogModel.updateOne(
          { _id: id },
          {
            $set: {
              content: content,
            },
          }
        );

        if (dataUpdate.matchedCount === 0) {
          return res.status(404).json({
            status: 0,
            msg: "no data on this id",
          });
        }
        res.status(204).json({ status: 1 });
        break;
      //**************************************DELETE *******************************************************
      case "DELETE":
        // await deleteAblog(req, res, id);

        if (!id) {
          return res.status(404).json({ status: 0, msg: "type the id" });
        }
        let dataDelete = await blogModel.deleteOne({ _id: id });
        if (dataDelete.deletedCount === 0) {
          return res
            .status(404)
            .json({ status: 0, msg: "no data found for delete" });
        }
        res.status(204).json({ status: 1 });
        break;
      case "POST":
        //********************************************Post ********************************************************
        // await createBlog(req, res, title,content, author);

        if (!title || !content || !author) {
          return res.status(400).json({
            status: 0,
            msg: " give all: title,content, author ",
          });
        }
        const blogPresent = await blogModel.findOne({ title });
        if (blogPresent) {
          return res.status(409).json({
            status: 0,
            msg: "title exist.",
          });
        }
        const currentDate = new Date();
        // create a blog
        await blogModel.create({
          title: title,
          content: content,
          author: author,
          publicationDate: `${currentDate.getDate()}-${
            currentDate.getMonth() + 1
          }-${currentDate.getFullYear()}`,
        });
        res.json({ status: 1 });
        break;
      default:
        res.status(405).send("Method Not Allowed");
    }
  } catch (error) {
    // handel database error
    //try  more testcase for error handel**
    if (error.name === "CastError") {
      return res.status(404).json({ msg: "indalid Id", error });
    }
    res.status(500).json({ error: error.message });
  }
});
