import { Queue } from "bullmq";
import { defineWorkers } from "./worker";

/**
 * The `redis` connection settings.
 */
export const connection = {
  host: "localhost",
  port: 6379,
};

/**
 * Define the queue.
 */
export const randomizerQueue = new Queue("randomizer", { connection });

/**
 * Then, add jobs to the queue.
 */
export default async function addJobs() {
  await randomizerQueue.add(
    "generate-random-number",
    {
      description: "Generate a random number between 1 and 100",
    },
    {
      repeat: {
        every: 1000,
        limit: 100,
      },
      jobId: "job-1",
    }
  );
}

/**
 * Define the workers, and let them do the job.
 */
defineWorkers();
