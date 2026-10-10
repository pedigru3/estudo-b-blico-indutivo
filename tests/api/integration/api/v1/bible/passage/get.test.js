import orchestrator from "tests/orchestrator.js"

beforeAll(async () => {
  await orchestrator.waitForAllServices()
})

describe("GET /api/v1/bible/passage", () => {
  describe("Anonymous user", () => {
    test("Retrieving a specific passage with reference parameter", async () => {
      const response = await fetch(
        `${orchestrator.webserverUrl}/api/v1/bible/passage?reference=joao+3:16`,
      )
      const responseBody = await response.json()

      expect(response.status).toBe(200)
      expect(responseBody.reference).toBeDefined()
      expect(responseBody.verses.length).toBeGreaterThan(0)
      expect(responseBody.text).toBeDefined()
      expect(responseBody.verses[0].verse).toBe(16)
    })

    test("Retrieving passage using book and chapter parameters", async () => {
      const response = await fetch(
        `${orchestrator.webserverUrl}/api/v1/bible/passage?book=JHN&chapter=3`,
      )
      const responseBody = await response.json()

      expect(response.status).toBe(200)
      expect(responseBody.reference).toBeDefined()
      expect(responseBody.verses.length).toBeGreaterThan(0)
    })

    test("Error when no reference or book/chapter provided", async () => {
      const response = await fetch(
        `${orchestrator.webserverUrl}/api/v1/bible/passage`,
      )
      const responseBody = await response.json()

      expect(response.status).toBe(400)
      expect(responseBody.name).toBe("ValidationError")
      expect(responseBody.message).toBe("Passagem bíblica não especificada.")
    })
  })
})
