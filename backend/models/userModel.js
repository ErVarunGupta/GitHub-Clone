import mongoose from 'mongoose';
const {Schema} = mongoose;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    repositories: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: 'RepositoryModel'
        }
    ],
    followers: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: 'UserModel'
        }
    ],
    starRepos: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: 'RepositoryModel'
        }
    ]
})

const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;