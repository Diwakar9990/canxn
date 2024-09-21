import JobsModel from "../model/jobs.model.js"

const jobs = new JobsModel();

export default class JobsController {
    fetchJobs(req, res) {
        res.render('index', { jobs: jobs.fetchJobs(), userEmail: req.session.userEmail, });
    }
    fetchJobDetails(req, res, next) {
        const id = req.params.id;
        const jobDetailsFound = jobs.fetchDetailsById(id);
        if (jobDetailsFound) {
            res.render('jobDetails', {
                job: jobDetailsFound,
                userEmail: req.session.userEmail,
            })
        }
    }
    getAddJob(req, res, next) {
        res.render('addJobs', { errorMessage: null, userEmail: req.session.userEmail });
    }
    postAddJob(req, res, next) {
        jobs.addJobDetails(req.body);
        res.redirect('index');
    }
    getUpdateJob(req, res, next) {
        const id = req.params.id;
        const jobDetailsFound = jobs.fetchDetailsById(id);
        if (jobDetailsFound) {
            res.render('updateJob', {
                job: jobDetailsFound,
                errorMessage: null,
                userEmail: req.session.userEmail,
            })
        }
    }
    postUpdateJob(req, res, next) {
        console.log(req.body);
        const updatedJob = jobs.updateJobDetails(req.body);
        res.render('jobDetails', {
            job: updatedJob,
            userEmail: req.session.userEmail,
        });
    }
    postDeleteJob(req, res, next) {
        const id = req.params.id;
        jobs.delete(id);
        res.render('index', { jobs: jobs.fetchJobs(), userEmail: req.session.userEmail });
    }
    applyJob(req, res, next) {
        const id = req.params.id;
        res.render('apply', { id });
    }
    postApplyJob(req, res, next) {
        const { id, name, email, contact } = req.body;
        console.log(req.body);
        const filename = req.file.filename;
        jobs.addApplication(id, name, email, contact, filename);
        res.render('newIndex', { jobs: jobs.fetchJobs(), userEmail: req.session.userEmail });
    }
    postSearch(req, res) {
        const title = req.body.title;
        const job = jobs.searchResult(title);
        res.render('searchResult', { jobs: job })
    }
}