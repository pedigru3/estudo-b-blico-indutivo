import { createRouter } from "next-connect"
import controller from "infra/controller.js"
import dailyReading from "models/daily-reading.js"

const router = createRouter()

router.get(getTodayReadingHandler)
router.post(postTodayReadingHandler)

export default router.handler(controller.errorHandlers)

async function getTodayReadingHandler(request, response) {
  const data = await dailyReading.getTodayReading()
  response.status(200).json(data)
}

async function postTodayReadingHandler(request, response) {
  const { action, day_number, start_date } = request.body || {}

  if (action === "toggle_complete") {
    const targetDay = day_number || (await dailyReading.getTodayReading()).day_number
    const result = await dailyReading.toggleDayCompletion(targetDay)
    return response.status(200).json(result)
  }

  if (action === "set_start_date" && start_date) {
    await dailyReading.setPlanStartDate(start_date)
    const today = await dailyReading.getTodayReading()
    return response.status(200).json(today)
  }

  const today = await dailyReading.getTodayReading()
  response.status(200).json(today)
}
