const mongoose = require('mongoose');

const jobsAPI_schema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'must provide company name'],
      maxlength: [100, 'company name cannot not more than 100 character'],
    },
    position: {
      type: String,
      required: [true, 'must provide position'],
      maxlength: [100, 'positon  cannot not more than 100 character'],
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'please provide a user'],
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model('Job', jobsAPI_schema);
