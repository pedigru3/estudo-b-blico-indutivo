import { createRouter } from "next-connect"
import controller from "infra/controller.js"
import bible from "models/bible.js"

const router = createRouter()

router.get(getBibleBooks)

export default router.handler(controller.errorHandlers)

async function getBibleBooks(request, response) {
  const { testament } = request.query
  const books = bible.getBooks({ testament })

  response.status(200).json({
    total: books.length,
    books,
  })
}
