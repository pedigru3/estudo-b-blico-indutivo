import orchestrator from "tests/orchestrator.js"

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await orchestrator.clearDatabase()
  await orchestrator.runPendingMigrations()
})

describe("GET /api/v1/daily-reading/today", () => {
  describe("Anonymous user", () => {
    test("Retrieving today's scheduled reading from database", async () => {
      const response = await fetch(
        `${orchestrator.webserverUrl}/api/v1/daily-reading/today`,
      )
      const responseBody = await response.json()

      expect(response.status).toBe(200)
      expect(responseBody.day_number).toBe(1)
      expect(responseBody.passage).toBe("Gênesis 1:1-31")
      expect(responseBody.book).toBe("Gênesis")
      expect(responseBody.total_days).toBeGreaterThan(0)
    })
  })
})
