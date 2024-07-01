
import Post from "../models/postModel.js";
import User from "../models/userModel.js";


async function createPost(req, res) {
    try {
    
      const { title, body, userId } = req.body;
  
      if (!title || typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({ message: 'Title is required and must be a string with non-whitespace characters.' });
      }
  
      if (!body || typeof body !== 'string' || body.trim().length === 0) {
        return res.status(400).json({ message: 'Body is required and must be a string with non-whitespace characters.' });
      }
  
      if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
        return res.status(400).json({ message: 'userId is required and must be a string with non-whitespace characters.' });
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado (User not found)', data: [] });
      }
  
      const newPost = new Post({
        title,
        body,
        user: user._id,
      });
  
      await newPost.save();
  
      res.status(201).json({ message: 'ok', data: newPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating post', data: [] });
    }
  }
  
async function getPosts( req, res){
    try {
        const posts = await Post.find().populate('user');
        
        res.status(200).json({ message: 'Ok', data: posts});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error, data: []});
    }
}

const getPostForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if( !user ){
            res.status(404).json({message:'Usuario no encontrado', data: []});
        }
        
        const posts = await Post.find({ user: user._id})


        res.status(200).json({ message: 'Ok', data: posts });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error, data: []});
    }
}

async function getPostById(req, res) {
    try {
      const postId = req.params.id;
  
      if (!postId || typeof postId !== 'string' || postId.trim().length === 0) {
        return res.status(400).json({ message: 'Invalid post ID provided.' });
      }
  

      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found.', data: [] });
      }
  

      res.status(200).json({ message: 'ok', data: post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving post', data: [] });
    }
  }
  

const deletePostById = async (req, res) => {
    try {
        
        const userId = req.params.userId;
        const postId = req.params.postId;

    
        const user = await User.findById(userId);
        if( !user ){
            res.status(404).json({message:'Usuario no encontrado', data: []});
        }

       
        const postDelete = user.posts.id(postId);

        if( !postDelete ){
            res.status(404).json({message:'Post no encontrado', data: []});
        }
        postDelete.remove();
        await user.save();

        res.status(200).json({ message: 'Posteo eliminado', data: user});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error, data: []});
    }
}

async function updatePostById(req, res) {
    try {
      
      const postId = req.params.id;
      const { title, body } = req.body;
  
      if (!postId || typeof postId !== 'string' || postId.trim().length === 0) {
        return res.status(400).json({ message: 'Invalid post ID provided.' });
      }
  
      if (!title || typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({ message: 'Title is required and must be a string with non-whitespace characters.' });
      }
  
      if (!body || typeof body !== 'string' || body.trim().length === 0) {
        return res.status(400).json({ message: 'Body is required and must be a string with non-whitespace characters.' });
      }
  

      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found.', data: [] });
      }
  

      post.title = title;
      post.body = body;
  

      await post.save();

      res.status(200).json({ message: 'Post updated successfully.', data: post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating post', data: [] });
    }
  }
  

// Exporto las funciones
export { createPost, getPosts, getPostById,  getPostForUser, deletePostById, updatePostById }