import mongoose ,{ Schema } from 'mongoose';


const noteSchema = new Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    public: {type: Boolean, required: false}
});

const Notes = mongoose.model('notes', noteSchema);

export = Notes;