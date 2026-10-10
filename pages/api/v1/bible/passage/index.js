import { createRouter } from "next-connect"
import controller from "infra/controller.js"
import bible from "models/bible.js"

const router = createRouter()

router.get(getBiblePassage)

export default router.handler(controller.errorHandlers)

async function getBiblePassage(request, response) {
  const { reference, book, chapter, translation } = request.query

  const passage = await bible.getPassage({
    reference,
    book,
    chapter,
    translation: translation || "almeida",
  })

  response.status(200).json(passage)
}
