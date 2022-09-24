const express = require('express');
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controller/job-api');
const routes = express.Router();

routes.get('/', getAllJobs);
routes.get('/:id', getJob);
routes.post('/', createJob);
routes.put('/:id', updateJob);
routes.delete('/:id', deleteJob);

module.exports = routes;
