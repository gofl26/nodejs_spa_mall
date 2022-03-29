const express = require("express");
const Posts = require("../schemas/posts");
const User = require("../schemas/user");
const Comments = require("../schemas/comments");
const Likes = require("../schemas/like");
const router = express.Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth-middleware");

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
router.get("/post/:postsId", async (req, res) => {
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
    const like = 0;
    const { name, title, comment, pw } = req.body;
    var hash = CryptoJS.SHA256(date);
    const postsId = hash["words"][0];

    const createdPosts = await Posts.create({ postsId, name, title, comment, pw, date, like });
    res.json({ posts: createdPosts });
});

//<----수정하기API---->
router.put("/posts/revise", async (req, res) => {
    const { name, postsId, comment, title } = req.body;

    const createdPosts = await Posts.updateOne({ postsId: Number(postsId) }, { $set: { name,comment,title }});
    
    res.json({ posts:  createdPosts });
});

//<----삭제하기API---->
router.delete("/delete/:postsId", async (req, res) => {
    const { postsId } = req.params;

    const existsPosts = await Posts.find({ postsId: Number(postsId) });
    if (existsPosts.length) {
        await Posts.deleteOne({ postsId: Number(postsId) });
    }
    const existsComments = await Comments.find({ postsId: Number(postsId) });
    if (existsComments.length) {
        await Comments.deleteMany({ postsId: Number(postsId) });
    }

    res.json({ success: true });
});

//<----회원가입API---->
router.post("/users", async (req, res) => {
    const { nickname, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(400).send({
            errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
        });
        return;
    }

    const existUsers = await User.find({
        $or: [{ nickname }],
    });
    if (existUsers.length) {
        res.status(400).send({
            errorMessage: "이미 가입된 이메일 또는 닉네임이 있습니다.",
        });
        return;
    }

    const user = new User({ nickname, password });
    await user.save();

    res.status(201).send({});
});

//<----회원가입테스트코드API---->
router.post("/users/test", async (req, res) => {
    const { nickname } = req.body;

    const existUsers = await User.find({
        $or: [{ nickname }],
    });
    if (existUsers.length) {
        res.status(400).send({
            errorMessage: "이미 가입된 이메일 또는 닉네임이 있습니다.",
        });
        return;
    }

    const user = new User({ nickname, password });
    await user.save();

    res.status(201).send({});
});

//<----로그인API---->
router.post("/auth", async (req, res) => {
    const { nickname, password } = req.body;

    const user = await User.findOne({ nickname, password}).exec();

    if (!user) {
        res.status(400).send({
            errorMessage: "닉네임 또는 패스워드를 확인해주세요"
        });
        return;
    }
    const token = jwt.sign({ userId: user.userId }, "my-secret-key");
    res.send({
        token,
    });
});

//<----사용자 인증미들웨어---->
router.get("/users/me", authMiddleware, async (req, res) => {
    const { user } = res.locals;
    if(!user) {
        res.status(401).send({
            errorMessage: "닉네임 또는 패스워드가 잘못됐습니다."
        });
        return;
    }

    res.send({
        user,
    });
})

//<----댓글 작성API---->
router.post("/posts/comment", async (req, res) => {
    const today = new Date();
    const date = today.toLocaleString();
    const { postsId, userId, commentss } = req.body;
    var hash = CryptoJS.SHA256(date);
    const commentId = hash["words"][0];

    const user = new Comments({ postsId, userId, commentss, commentId });
    await user.save();

    res.status(201).send({});
});

//<----댓글 조회API---->
router.get("/posts/showcomment", async (req,res) => {
    const comments = await Comments.find();
    res.json({
        comments,
    });
});

//<----댓글 수정API----> 
router.put("/posts/commentRevise", async (req, res) => {
    const { commentId, commentss, } = req.body;

    const createdPosts = await Comments.updateOne({ commentId: Number(commentId) }, { $set: { commentss }});
    
    res.json({ posts:  createdPosts });
});

//<----댓글 삭제API---->
router.delete("/deletecomment/:commentId", async (req, res) => {
    const { commentId } = req.params;

    const existsCarts = await Comments.find({ commentId: commentId });
    if (existsCarts.length) {
        await Comments.deleteOne({ commentId: commentId });
    }

    res.json({ success: true });
});

//<----좋아요API---->
router.put("/posts/like", async (req, res) => {
    const { postsId, like, userId } = req.body;

    const user = new Likes({ userId, postsId });
    await user.save();
    const createdPosts = await Posts.updateOne({ postsId: Number(postsId) }, { $set: { like: Number(like) }});
    
    res.json({ posts:  createdPosts });
});

//<----좋아요 취소1API---->
router.put("/posts/likenot", async (req, res) => {
    const { postsId, like } = req.body;

    const createdPosts = await Posts.updateOne({ postsId: Number(postsId) }, { $set: { like: Number(like) }});
    
    res.json({ posts:  createdPosts });
});

//<----좋아요 취소2API---->
router.delete("/deletelike/:postsId", async (req, res) => {
    const { postsId } = req.params;

    const existsCarts = await Likes.find({ postsId: postsId });
    if (existsCarts.length) {
        await Likes.deleteOne({ postsId: postsId });
    }
    res.json({ success: true });
});

//<----좋아요확인API---->
router.get("/posts/likecheck", async (req,res) => {
    const likecheck = await Likes.find();
    res.json({
        likecheck,
    });
});




module.exports = router;