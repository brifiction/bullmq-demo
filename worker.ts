import { Job, Worker } from "bullmq";
import { connection } from "./queue";

/**
 * Add multiple workers here..
 */
export const defineWorkers = async () => {
  /**
   * Define the worker, and it is assigned to 'randomizer' queue.
   */
  const worker = new Worker(
    "randomizer",
    async (job: Job) => {
      console.log("Job data: ", job.data);
      return Math.floor(Math.random() * 100) + 1;
    },
    { connection }
  );

  worker.on("completed", (job) => {
    console.log(`${job.id} has completed!`);
  });

  worker.on("failed", (job, err) => {
    console.log(`${job} has failed with ${err.message}`);
  });
};
