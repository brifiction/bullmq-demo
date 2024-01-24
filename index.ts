import express, { Express } from "express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import addJobs, { randomizerQueue } from "./queue";

const app: Express = express();

const serverAdapter = new ExpressAdapter();

createBullBoard({
  queues: [new BullMQAdapter(randomizerQueue)],
  serverAdapter: serverAdapter,
  options: {
    uiConfig: {
      boardTitle: "BullMQ Demo",
      boardLogo: {
        path: "/bull.png",
        width: "auto",
        height: "100%",
      },
      miscLinks: [
        { text: "Github | Brifiction", url: "https://github.com/brifiction" },
        { text: "Github | Entwurfhaus", url: "https://github.com/entwurfhaus" },
      ],
      favIcon: {
        default: "/favicon.ico",
        alternative: "/favicon-16x16.png",
      },
      locale: {
        lng: "en-US",
      },
    },
  },
});

serverAdapter.setBasePath("/admin");

app.use("/admin", serverAdapter.getRouter());

(() => {
  addJobs()
    .then(() => console.log("Jobs added!"))
    .catch(console.log);
})();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(express.static("public"));

app.listen(3000, () =>
  console.info("Server is running at http://localhost:3000")
);
