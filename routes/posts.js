const express = require("express");
const Posts = require("../schemas/posts")
const router = express.Router();
const CryptoJS = require("crypto-js")

router.get("/", (req, res) => {
    res.send("this is root page");
});

//<----목록 조회 API---->
router.get("/posts", async (req,res) => {
    const posts = await Posts.find();
    res.json({
        posts: posts
    });
});

//<----상세조회API---->
router.get("/posts/:postsId", async (req, res) => {
    const { postsId } = req.params;

    const [detail] = await Posts.find({ postsId: Number(postsId) });

    res.json({
        detail, 
    });
});

//<----포스트추가API---->
router.post("/posts/add", async (req, res) => {
    const today = new Date();
    const date = today.toLocaleString();
    const { name, title, comment, pw } = req.body;
    var hash = CryptoJS.SHA256(date);
    const postsId = hash["words"][0];

    const createdPosts = await Posts.create({ postsId, name, title, comment, pw, date, });
    res.json({ posts: createdPosts });
});


router.put("/posts/revise", async (req, res) => {
    const { name, postsId, comment, title } = req.body;
    
    
    
    const createdPosts = await Posts.updateOne({ postsId: Number(postsId) }, { $set: { name,comment,title }});
    
    res.json({ posts:  createdPosts });
});

router.delete("/posts/:postsId", async (req, res) => {
    const { postsId } = req.params;

    const existsCarts = await Posts.find({ postsId: Number(postsId) });
    if (existsCarts.length) {
        await Posts.deleteOne({ postsId: Number(postsId) });
    }

    res.json({ success: true });
});

module.exports = router;