const Job = require('../model/jobs-api');

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId });
    res.status(200).json({ jobs, count: jobs.length });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const getJob = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;
    const job = await Job.findOne({ _id: jobId, createdBy: userId });
    if (!job || job === null)
      return res.status(404).send('there is no job with this id');

    res.status(200).json({ job });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;

    const job = await Job.create(req.body);

    res.status(200).json({ job });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const {
      body: { company, position },
      user: { userId },
      params: { id: jobId },
    } = req;
    if (company === '' || position === '')
      return res
        .status(400)
        .send('company and position fields cannot be empty');
    const job = await Job.findByIdAndUpdate(
      { _id: jobId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!job || job === null)
      return res.status(404).send('there is no job with this id');
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;
    const job = await Job.findByIdAndRemove({
      _id: jobId,
      createdBy: userId,
    });
    if (!job || job === null)
      return res.status(404).send('there is no job with this id');
    res.status(200).json({ job });
  } catch (error) {}
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
