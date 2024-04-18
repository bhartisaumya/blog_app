import mongoose ,{ Schema } from 'mongoose';


const commentSchema = new Schema({
    comment: {type: String, required: true},
    noteId: {type: String, required: true}
});

const Comment = mongoose.model('comment', commentSchema);

export = Comment;