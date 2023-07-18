export default function runJobs(...jobs) {
  window.addEventListener('load', () => {
    jobs.forEach(job => {
      try {
        if (job.isTargetPage(window.location)) {
          job.init();
        }
      } catch (e) {
        console.error(`Error running job: ${job.id}`);
        console.error(e);
      }
    });
  });
}
