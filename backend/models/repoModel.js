import mongoose from "mongoose";
const { Schema } = mongoose;

const RepoSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String
    },
    content:{
        type: String,
    },
    visibility:{
        type: String,
        enum: ['public', 'private'],
        default: 'public',
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    issues: [
        {
            type: Schema.Types.ObjectId,
            ref: 'IssueModel'
        }
    ]
})

const RepositoryModel = mongoose.model('RepositoryModel', RepoSchema);
export default RepositoryModel;