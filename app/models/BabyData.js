import mongoose from 'mongoose';

const BabyDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  feedingHistory: Array,
  sleepLog: Array,
  growth: {
    milestone: String,
    tip: String,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'neonest' });  // Explicitly specify collection name

export default mongoose.models.BabyData || mongoose.model('BabyData', BabyDataSchema);
