import retry from "async-retry"
import database from "infra/database.js"
import migrator from "models/migrator.js"
import webserver from "infra/webserver.js"

const webserverUrl = webserver.origin

async function waitForAllServices() {
  await waitForWebServer()

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    })

    async function fetchStatusPage() {
      const response = await fetch(`${webserverUrl}/api/v1/status`)
      if (response.status !== 200) {
        throw Error()
      }
    }
  }
}

async function clearDatabase() {
  if (process.env.NODE_ENV === "test" || process.env.DATABASE_ENV === "test") {
    await database.query(
      "drop schema if exists test cascade; create schema test;",
    )
  } else {
    await database.query("drop schema public cascade; create schema public;")
  }
}

async function runPendingMigrations() {
  await migrator.runPendingMigrations()
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
  webserverUrl,
}

export default orchestrator
