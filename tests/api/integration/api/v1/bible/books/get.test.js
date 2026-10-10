import orchestrator from "tests/orchestrator.js"

beforeAll(async () => {
  await orchestrator.waitForAllServices()
})

describe("GET /api/v1/bible/books", () => {
  describe("Anonymous user", () => {
    test("Retrieving all 66 books of the Bible", async () => {
      const response = await fetch(`${orchestrator.webserverUrl}/api/v1/bible/books`)
      const responseBody = await response.json()

      expect(response.status).toBe(200)
      expect(responseBody.total).toBe(66)
      expect(Array.isArray(responseBody.books)).toBe(true)
      expect(responseBody.books.length).toBe(66)
      expect(responseBody.books[0]).toEqual({
        id: "GEN",
        name: "Gênesis",
        abbrev: "Gn",
        testament: "OT",
        chapters: 50,
      })
    })

    test("Retrieving only New Testament books", async () => {
      const response = await fetch(`${orchestrator.webserverUrl}/api/v1/bible/books?testament=NT`)
      const responseBody = await response.json()

      expect(response.status).toBe(200)
      expect(responseBody.total).toBe(27)
      expect(responseBody.books.every((b) => b.testament === "NT")).toBe(true)
    })
  })
})
