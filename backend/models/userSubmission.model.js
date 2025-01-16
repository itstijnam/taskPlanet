import mongoose from 'mongoose';

const userSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  social_media_handle: { type: String, required: true, unique: true, trim: true },
  images: [{ type: String, required: true }] },
  { timestamps: true }
);

export const UserSubmission = mongoose.model('UserSubmission', userSubmissionSchema);