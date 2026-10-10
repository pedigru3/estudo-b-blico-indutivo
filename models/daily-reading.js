import database from "infra/database.js"
import { genesis } from "data/pericopes/genesis.js"
import { exodo } from "data/pericopes/exodo.js"
import { NotFoundError, ValidationError } from "infra/errors.js"

// Retorna todas as perícopes diretamente dos arquivos de dados (Gênesis + Êxodo)
// Qualquer alteração em genesis.js ou exodo.js reflete instantaneamente!
export function getAllPericopes() {
  return [
    ...genesis.map((passage) => ({
      book: "Gênesis",
      passage,
    })),
    ...exodo.map((passage) => ({
      book: "Êxodo",
      passage,
    })),
  ]
}

export async function getPlanStartDate() {
  const result = await database.query({
    text: "SELECT value FROM reading_plan_settings WHERE key = 'start_date';",
  })

  if (result.rows.length === 0) {
    const todayStr = new Date().toISOString().split("T")[0]
    await database.query({
      text: `
        INSERT INTO reading_plan_settings (key, value)
        VALUES ('start_date', $1)
        ON CONFLICT (key) DO NOTHING;
      `,
      values: [todayStr],
    })
    return todayStr
  }

  return result.rows[0].value
}

export async function setPlanStartDate(startDateStr) {
  await database.query({
    text: `
      INSERT INTO reading_plan_settings (key, value, updated_at)
      VALUES ('start_date', $1, now())
      ON CONFLICT (key) DO UPDATE SET value = $1, updated_at = now();
    `,
    values: [startDateStr],
  })

  return startDateStr
}

export async function getTodayReading() {
  const allPericopes = getAllPericopes()
  const totalDays = allPericopes.length

  if (totalDays === 0) {
    throw new NotFoundError({
      message: "Nenhuma perícopo cadastrada no plano.",
    })
  }

  const startDateStr = await getPlanStartDate()
  const startDate = new Date(startDateStr + "T00:00:00Z")
  const today = new Date(new Date().toISOString().split("T")[0] + "T00:00:00Z")

  // Calcula a diferença de dias (Dia 1 na data de início, Dia 2 no dia seguinte...)
  const diffTime = today.getTime() - startDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const dayNumber = Math.max(1, diffDays + 1)

  // Faz o loop circular após terminar o plano
  const effectiveDayNumber = ((dayNumber - 1) % totalDays) + 1
  const item = allPericopes[effectiveDayNumber - 1]

  // Consulta se o dia está marcado como concluído no banco
  const completionResult = await database.query({
    text: "SELECT is_completed, completed_at FROM daily_readings WHERE day_number = $1;",
    values: [effectiveDayNumber],
  })

  const isCompleted = completionResult.rows.length > 0 ? completionResult.rows[0].is_completed : false
  const completedAt = completionResult.rows.length > 0 ? completionResult.rows[0].completed_at : null

  return {
    day_number: effectiveDayNumber,
    calculated_day: dayNumber,
    book: item.book,
    passage: item.passage,
    is_completed: isCompleted,
    completed_at: completedAt,
    total_days: totalDays,
    start_date: startDateStr,
    current_date: today.toISOString().split("T")[0],
  }
}

export async function getReadingByDay(dayNumber) {
  const allPericopes = getAllPericopes()
  const parsedDay = parseInt(dayNumber, 10)

  if (isNaN(parsedDay) || parsedDay < 1) {
    throw new ValidationError({
      message: "Número de dia inválido.",
      action: "Informe um número inteiro positivo para o dia.",
    })
  }

  if (parsedDay > allPericopes.length) {
    throw new NotFoundError({
      message: `Leitura para o dia ${parsedDay} não encontrada. O plano tem ${allPericopes.length} dias.`,
    })
  }

  const item = allPericopes[parsedDay - 1]

  const completionResult = await database.query({
    text: "SELECT is_completed, completed_at FROM daily_readings WHERE day_number = $1;",
    values: [parsedDay],
  })

  const isCompleted = completionResult.rows.length > 0 ? completionResult.rows[0].is_completed : false
  const completedAt = completionResult.rows.length > 0 ? completionResult.rows[0].completed_at : null

  return {
    day_number: parsedDay,
    book: item.book,
    passage: item.passage,
    is_completed: isCompleted,
    completed_at: completedAt,
  }
}

export async function toggleDayCompletion(dayNumber) {
  const reading = await getReadingByDay(dayNumber)
  const newStatus = !reading.is_completed
  const completedAt = newStatus ? new Date().toISOString() : null

  const result = await database.query({
    text: `
      INSERT INTO daily_readings (day_number, book, passage, is_completed, completed_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, now())
      ON CONFLICT (day_number)
      DO UPDATE SET is_completed = $4, completed_at = $5, updated_at = now()
      RETURNING day_number, book, passage, is_completed, completed_at;
    `,
    values: [dayNumber, reading.book, reading.passage, newStatus, completedAt],
  })

  return result.rows[0]
}

const dailyReading = {
  getAllPericopes,
  getTodayReading,
  getReadingByDay,
  toggleDayCompletion,
  getPlanStartDate,
  setPlanStartDate,
}

export default dailyReading
