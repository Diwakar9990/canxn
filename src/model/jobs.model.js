export default class JobsModel {
    fetchJobs() {
        return jobs;
    }
    fetchDetailsById(id) {
        return jobs.find((job) => job.id == id);
    }
    addJobDetails(body) {
        if (typeof body.skill == typeof 'string') {
            const arr = [];
            arr.push(body.skill);
            body.skill = arr;
        }
        const job = {
            id: jobs.length + 1,
            title: body.title,
            company: body.company,
            location: body.location,
            salary: body.salary,
            date: body.date,
            openings: body.openings,
            applicants: 0,
            skill: body.skill,
        }
        jobs.push(job);
    }
    updateJobDetails(body) {
        if (typeof body.skill == typeof 'string') {
            const arr = [];
            arr.push(body.skill);
            body.skill = arr;
        }
        const index = jobs.findIndex(j => j.id == body.id);
        jobs[index] = body;
        return jobs[index];
    }
    delete(id) {
        const index = jobs.findIndex(j => j.id == id);
        jobs.splice(index, 1);
    }
    addApplication(jid, name, email, contact, uploadFileURL) {
        console.log(jid);
        const job = jobs.find(j => j.id == jid);
        console.log(job);
        job.applicants += 1;
        const ap = {
            id: resumes.length + 1,
            job_id: jid,
            name: name,
            email: email,
            contact: contact,
            uploadFileURL: uploadFileURL,
        }
        resumes.push(ap);
    }

    searchResult(title) {
        const data = jobs.filter((job) => {
            const a = job.title.trim();
            const b = title.trim();
            if (a == b) {
                return job;
            }
        });
        return data;
    };
}

const jobs = [
    {
        id: 1,
        title: 'Machine Learning Engineer',
        company: 'Groww',
        location: 'Bengaluru, Karnataka, India(On-Site)',
        salary: '12 LPA',
        date: '15-04-2024',
        openings: 2,
        applicants: 0,
        skill: ['Python', 'Pandas', 'Numpy', 'Sci-Kit Learn', 'PowerBI', 'SQL']
    },
    {
        id: '2',
        title: 'Software Engineer',
        company: 'Google',
        location: 'Noida',
        salary: '11 LPA',
        date: '2024-08-18',
        openings: '2',
        applicants: 0,
        skill: ['Python', 'Pandas', 'Numpy', 'Sci-Kit Learn', 'PowerBI', 'SQL']
    }
];

const resumes = [];