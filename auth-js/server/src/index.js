import { App } from "./app";

async function main() {
  try {
    const app = new App();

    await app.listen();
  } catch (err) {
    console.error(err);
  }
}

main();
