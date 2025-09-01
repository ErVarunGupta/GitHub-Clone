import mongoose from "mongoose";
const { Schema } = mongoose;

const IssueSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
    },
    repository: {
        type: Schema.Types.ObjectId,
        ref: 'RepositoryModel',
        required: true
    }
})

const IssueModel = mongoose.model('IssueModel', IssueSchema);
export default IssueModel;