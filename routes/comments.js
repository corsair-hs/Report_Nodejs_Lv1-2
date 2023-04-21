const express = require('express');
const router = express.Router();

const Posts = require('../schemas/post.js');
const Comments = require('../schemas/comment.js');


// 댓글 생성 : POST -> localhost:3000/posts/:postId/comments
router.post('/:_postId/comments', async (req, res) => {
    try {
        const { _postId } = req.params;
        try {
            const { user, password, content } = req.body; 
            await Comments.create({ postId:_postId, user, password, content });
            return res.status(200).json({ message: '댓글을 생성하였습니다.' })
        } catch {
            return res.status(400).send({ message: '댓글 내용을 입력해주세요.' });
        }
    } catch {
        return res.status(400).send({ message: '데이터 형식이 올바르지 않습니다.' });
    }
});


// 댓글 조회 : GET -> localhost:3000/posts/:postId/comments
router.get('/:_postId/comments', async(req, res) => {
    try {
        const { _postId } = req.params;
        const comments = await Comments.find({"postId":_postId}, {"__v":0, "postId":0, "password":0});
        const commentsPrint = comments.map((value)=>{
            return {
                commentId : value._id,
                user : value.user,
                content : value.content,
                createdAt : value.createdAt
            }
        });
        res.json({ "data" : commentsPrint })
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: '데이터 형식이 올바르지 않습니다.' });
    }
})


// 댓글 수정 : PUT -> localhost:3000/posts/:postId/comments/:commentId
router.put('/:_postId/comments/:_commentId', async(req, res) => {
    try {
        const { _postId, _commentId } = req.params;
        const [post] = await Posts.find({ _postId });
        const [comment] = await Comments.find({ commentId });
        const { password, content } = req.body;
        if (!post) {
            return res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
        }
        if (!comment) {
            return res.status(404).json({ message: '댓글 조회에 실패하였습니다.' });
        }
        if (password === comment.password) {
            await Comments.updateOne({ commentId: commentId }, { $set: { content: content } })
            return res.status(200).json({ message: '댓글을 수정하였습니다.' });
        } else {
            return res.status(404).json({ message: '비밀번호가 다릅니다.' });
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: '데이터 형식이 올바르지 않습니다.' });
    }
});


// 댓글 삭제 : DELETE -> localhost:3000/posts/:postId/comments/:commentId
router.delete('/:postId/comments/:commentId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const [ post ] = await Posts.find({ postId });
        const [ comment ] = await Comments.find({ commentId });
        const { password } = req.body;
        if (!post) {
            return res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
        }
        if (!comment) {
            return res.status(404).json({ message: '댓글 조회에 실패하였습니다.' });
        }
        if (password === comment.password) {
            await Comments.deleteOne({ commentId: commentId })
            return res.status(200).json({ message: '댓글을 삭제하였습니다.' });
        } else {
            return res.status(404).json({ message: '비밀번호가 다릅니다.' });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: '데이터 형식이 올바르지 않습니다.' })
    }
});

module.exports = router;


// const [post] = await Posts.find({ postId });
//     if (!post) {
//         return res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
//     }