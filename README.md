# bullmq-demo

<p align="center">
  <img width="auto" height="100px" src="public/bull.png" />
</p>

BullMQ with `express` and `typescript`. The example demonstrates how you can set up a `queue`, a (repeatable) `job` and a `worker`.

## Getting started

1. Run `pnpm i`.
1. Run `pnpm build` to compile (to check if build is successful).
1. For `docker-compose` and setting up local `redis`, run `docker-compose -f .docker/docker-compose.yml up -d`.
1. Run `pnpm dev` to start the server in development mode with `nodemon`, or `pnpm start`.
