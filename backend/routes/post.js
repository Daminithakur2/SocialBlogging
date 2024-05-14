import express from 'express'
import { created } from '../models/post.js';
import { applyMiddleware } from "../middleware/middlewareAuth.js"
import { upload } from '../middleware/fileUploads.js';
import moment from 'moment';

const postRouter = express.Router()
postRouter.post("/post", applyMiddleware ,upload.single("image"), async (req, res) => {
    const { title, description, liked } = req.body;
    const image = req.file.path;    
    if (!title || !description || !image) {
        res.status(400).json({ message: "All field are required" });
    } else {
        const post = new created({
            title,
            description,
            image,
            liked,
            created_date: new Date(),
            user:req.user
        });
        try {
            const created = await post.save();
            res.status(201).json(created);

        } catch (error) {
            console.log(error, "dgfhjk");
            res.status(400).json({ message: error.message });
        }
    }
});
postRouter.get("/post", applyMiddleware, async (req, res) => {
    try {
        const userId = req.user
        const post = await created.find({user:userId});
        res.json(post);

    } catch (error) {
        console.log(error);
    }
});
postRouter.get("/post/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const post = await created.findById(id);
        res.json(post);
    } catch (err) {
        console.log(err);
    }
})
postRouter.delete("/post/:id", async (req, res) => {
    const id = req.params.id
    const deletepost = await created.findByIdAndDelete(id)
    res.json({ message: 'Post deleted Successfully' })
});
postRouter.put("/post/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description } = req.body;
        const image = req.file.path;
        if (!title || !description || !image) {
            res.status(400).json({ message: "All field are required" });

        } else {
            const Updatenew = await created.findByIdAndUpdate(
                id,
                {
                    title,
                    description,
                    image,
                    liked,
                    created_date: new Date()
                },
                { new: true }
            );
            res.json(Updatenew);

        }
    } catch (error) {
        console.log(error);
    }
});
postRouter.patch("/post/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updated = req.body;
        const updateBlog = await created.findByIdAndUpdate(id, updated, {
            new: true,

        });
        res.json(updateBlog);

    } catch (error) {
        console.log(error);
    }
});
postRouter.post("/post/:id/comment", async (req, res) => {
    const id = req.params.id;
    const { text } = req.body;
    try {
        const post = await created.findById(id);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        post.comment.push({ text });
        await post.save();
        res.status(201).json(post)
    } catch (error) {
        console.log(error);
    }
});

postRouter.delete("/post/:postId/comment/:commentId", async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId
    try {
        const post = await created.findById(postId)
        console.log(post)
        if (!post) {
            return res.status(404).json({ message: "post not found" })
        }
        post.comment.pull(commentId)
        await post.save()
        res.json(post)
    } catch (err) {
        console.log(err, "err")
    }

})
postRouter.get('/filtered-posts', async (req, res) => {
    try {
        const { title, created_date } = req.query
        let query = {}
        if (title) {
            query.title = title;
        }
        if (created_date) {
            const startofDay = moment(created_date).startOf('day').toDate();
            const endofDay = moment(created_date).endOf('day').toDate();
            query.created_date = { $gte: startofDay, $lte: endofDay }
        }
        const posts = await created.find(query);
        res.json(posts)
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ message: 'internal server error' });
    }
})
postRouter.get('/search-post', async (req, res) => {
    try {
        const { searchText } = req.query;
        if (!searchText) {
            return res.json([])
        }
        const posts = await created.find({
            title: { $regex: searchText, $options: 'i' },
        })
        res.json(posts);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'internal server error' })  
    }
});




export default postRouter