import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'farmer',
    required: false
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'farmer'
  }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'farmer' },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
}, { timestamps: true });

const Community = mongoose.model('Community', communitySchema);
export default Community;
