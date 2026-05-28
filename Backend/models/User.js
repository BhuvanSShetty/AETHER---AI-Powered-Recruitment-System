import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed password here
    

    geminiApiKey: {
        iv: { type: String },
        content: { type: String }
    },
    
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);