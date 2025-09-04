import Community from '../model/community.js';

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const newPost = new Community({
      user: req.user._id, 
      content
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Community.find()
      .populate('user', 'name email')
      .populate('comments.user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;

    if (!comment) return res.status(400).json({ message: 'Comment is required' });

    const post = await Community.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({
      user: req.user._id,
      comment
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Community.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!post.likes.includes(req.user._id)) {
      post.likes.push(req.user._id);
      await post.save();
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Community.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
