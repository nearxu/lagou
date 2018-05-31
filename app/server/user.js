const express = require("express");

const Router = express.Router();
const model = require("./model");
const User = model.getModel("user");

Router.all("/", function(req, res) {
  res.send("hello 9093 node");
});

Router.get("/info", function(req, res) {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  }
  User.findOne({ _id: userid }, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: "后端出错了" });
    }
    if (doc) {
      return res.json({ code: 0, data: doc });
    }
  });
  // 用户有没有cookie
});

Router.post("/register", function(req, res) {
  const { user, pwd, type } = req.body;
  User.findOne({ user }, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: "用户名已经注册了！" });
    }
    const userModel = new User({ user, pwd, type });
    userModel.save(function(err, doc) {
      if (err) {
        return res.json({ code: 1, msg: "注册失败！" });
      }
      const { user, type, _id } = doc;
      res.cookie("userid", _id);
      return res.json({ code: 0, data: { user, type, _id } });
    });
  });
});

Router.post("/login", function(req, res) {
  const { user, pwd } = req.body;
  User.findOne({ user }, function(err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: "登录失败，该用户名不存在" });
    }
    res.cookie("userid", doc._id);
    res.json({ code: 0, data: doc });
  });
});

Router.get("/list", function(req, res) {
  User.find({}, (err, doc) => {
    return res.json(doc);
  });
});
Router.post("/update", function(req, res) {
  const userid = req.cookies.userid;
  if (!userid) {
    return res.json.dumps({ code: 1 });
  }
  const body = req.body;
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign(
      {},
      {
        user: doc.user,
        type: doc.type
      },
      body
    );
    return res.json({ code: 0, data });
  });
});

module.exports = Router;
