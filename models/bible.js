import { ValidationError, NotFoundError, ServiceError } from "infra/errors.js"

// Metadados completos dos 66 livros da Bíblia (Almeida)
export const BIBLE_BOOKS = [
  // Antigo Testamento (OT)
  { id: "GEN", name: "Gênesis", abbrev: "Gn", testament: "OT", chapters: 50 },
  { id: "EXO", name: "Êxodo", abbrev: "Êx", testament: "OT", chapters: 40 },
  { id: "LEV", name: "Levítico", abbrev: "Lv", testament: "OT", chapters: 27 },
  { id: "NUM", name: "Números", abbrev: "Nm", testament: "OT", chapters: 36 },
  { id: "DEU", name: "Deuteronômio", abbrev: "Dt", testament: "OT", chapters: 34 },
  { id: "JOS", name: "Josué", abbrev: "Js", testament: "OT", chapters: 24 },
  { id: "JDG", name: "Juízes", abbrev: "Jz", testament: "OT", chapters: 21 },
  { id: "RUT", name: "Rute", abbrev: "Rt", testament: "OT", chapters: 4 },
  { id: "1SA", name: "1 Samuel", abbrev: "1Sm", testament: "OT", chapters: 31 },
  { id: "2SA", name: "2 Samuel", abbrev: "2Sm", testament: "OT", chapters: 24 },
  { id: "1KI", name: "1 Reis", abbrev: "1Rs", testament: "OT", chapters: 22 },
  { id: "2KI", name: "2 Reis", abbrev: "2Rs", testament: "OT", chapters: 25 },
  { id: "1CH", name: "1 Crônicas", abbrev: "1Cr", testament: "OT", chapters: 29 },
  { id: "2CH", name: "2 Crônicas", abbrev: "2Cr", testament: "OT", chapters: 36 },
  { id: "EZR", name: "Esdras", abbrev: "Ed", testament: "OT", chapters: 10 },
  { id: "NEH", name: "Neemias", abbrev: "Ne", testament: "OT", chapters: 13 },
  { id: "EST", name: "Ester", abbrev: "Et", testament: "OT", chapters: 10 },
  { id: "JOB", name: "Jó", abbrev: "Jó", testament: "OT", chapters: 42 },
  { id: "PSA", name: "Salmos", abbrev: "Sl", testament: "OT", chapters: 150 },
  { id: "PRO", name: "Provérbios", abbrev: "Pv", testament: "OT", chapters: 31 },
  { id: "ECC", name: "Eclesiastes", abbrev: "Ec", testament: "OT", chapters: 12 },
  { id: "SNG", name: "Cânticos", abbrev: "Ct", testament: "OT", chapters: 8 },
  { id: "ISA", name: "Isaías", abbrev: "Is", testament: "OT", chapters: 66 },
  { id: "JER", name: "Jeremias", abbrev: "Jr", testament: "OT", chapters: 52 },
  { id: "LAM", name: "Lamentações", abbrev: "Lm", testament: "OT", chapters: 5 },
  { id: "EZK", name: "Ezequiel", abbrev: "Ez", testament: "OT", chapters: 48 },
  { id: "DAN", name: "Daniel", abbrev: "Dn", testament: "OT", chapters: 12 },
  { id: "HOS", name: "Oséias", abbrev: "Os", testament: "OT", chapters: 14 },
  { id: "JOL", name: "Joel", abbrev: "Jl", testament: "OT", chapters: 3 },
  { id: "AMO", name: "Amós", abbrev: "Am", testament: "OT", chapters: 9 },
  { id: "OBA", name: "Obadias", abbrev: "Ob", testament: "OT", chapters: 1 },
  { id: "JON", name: "Jonas", abbrev: "Jn", testament: "OT", chapters: 4 },
  { id: "MIC", name: "Miquéias", abbrev: "Mq", testament: "OT", chapters: 7 },
  { id: "NAM", name: "Naum", abbrev: "Na", testament: "OT", chapters: 3 },
  { id: "HAB", name: "Habacuque", abbrev: "Hc", testament: "OT", chapters: 3 },
  { id: "ZEP", name: "Sofonias", abbrev: "Sf", testament: "OT", chapters: 3 },
  { id: "HAG", name: "Ageu", abbrev: "Ag", testament: "OT", chapters: 2 },
  { id: "ZEC", name: "Zacarias", abbrev: "Zc", testament: "OT", chapters: 14 },
  { id: "MAL", name: "Malaquias", abbrev: "Ml", testament: "OT", chapters: 4 },

  // Novo Testamento (NT)
  { id: "MAT", name: "Mateus", abbrev: "Mt", testament: "NT", chapters: 28 },
  { id: "MRK", name: "Marcos", abbrev: "Mc", testament: "NT", chapters: 16 },
  { id: "LUK", name: "Lucas", abbrev: "Lc", testament: "NT", chapters: 24 },
  { id: "JHN", name: "João", abbrev: "Jo", testament: "NT", chapters: 21 },
  { id: "ACT", name: "Atos", abbrev: "At", testament: "NT", chapters: 28 },
  { id: "ROM", name: "Romanos", abbrev: "Rm", testament: "NT", chapters: 16 },
  { id: "1CO", name: "1 Coríntios", abbrev: "1Co", testament: "NT", chapters: 16 },
  { id: "2CO", name: "2 Coríntios", abbrev: "2Co", testament: "NT", chapters: 13 },
  { id: "GAL", name: "Gálatas", abbrev: "Gl", testament: "NT", chapters: 6 },
  { id: "EPH", name: "Efésios", abbrev: "Ef", testament: "NT", chapters: 6 },
  { id: "PHP", name: "Filipenses", abbrev: "Fp", testament: "NT", chapters: 4 },
  { id: "COL", name: "Colossenses", abbrev: "Cl", testament: "NT", chapters: 4 },
  { id: "1TH", name: "1 Tessalonicenses", abbrev: "1Ts", testament: "NT", chapters: 5 },
  { id: "2TH", name: "2 Tessalonicenses", abbrev: "2Ts", testament: "NT", chapters: 3 },
  { id: "1TI", name: "1 Timóteo", abbrev: "1Tm", testament: "NT", chapters: 6 },
  { id: "2TI", name: "2 Timóteo", abbrev: "2Tm", testament: "NT", chapters: 4 },
  { id: "TIT", name: "Tito", abbrev: "Tt", testament: "NT", chapters: 3 },
  { id: "PHM", name: "Filemom", abbrev: "Fm", testament: "NT", chapters: 1 },
  { id: "HEB", name: "Hebreus", abbrev: "Hb", testament: "NT", chapters: 13 },
  { id: "JAS", name: "Tiago", abbrev: "Tg", testament: "NT", chapters: 5 },
  { id: "1PE", name: "1 Pedro", abbrev: "1Pe", testament: "NT", chapters: 5 },
  { id: "2PE", name: "2 Pedro", abbrev: "2Pe", testament: "NT", chapters: 3 },
  { id: "1JN", name: "1 João", abbrev: "1Jo", testament: "NT", chapters: 5 },
  { id: "2JN", name: "2 João", abbrev: "2Jo", testament: "NT", chapters: 1 },
  { id: "3JN", name: "3 João", abbrev: "3Jo", testament: "NT", chapters: 1 },
  { id: "JUD", name: "Judas", abbrev: "Jd", testament: "NT", chapters: 1 },
  { id: "REV", name: "Apocalipse", abbrev: "Ap", testament: "NT", chapters: 22 },
]

// Cache em memória para evitar requisições repetidas e rate limit
const cache = new Map()
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 // 24 horas

// Passagens locais de fallback para resiliência instantânea
const FALLBACK_PASSAGES = {
  "JHN 3": {
    reference: "João 3",
    verses: [
      { book_id: "JHN", book_name: "João", chapter: 3, verse: 16, text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna." },
      { book_id: "JHN", book_name: "João", chapter: 3, verse: 17, text: "Porque Deus enviou o seu Filho ao mundo, não para que condenasse o mundo, mas para que o mundo fosse salvo por ele." }
    ],
    text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna. Porque Deus enviou o seu Filho ao mundo, não para que condenasse o mundo, mas para que o mundo fosse salvo por ele.",
    translation_id: "almeida",
    translation_name: "João Ferreira de Almeida",
  },
  "PSA 23": {
    reference: "Salmos 23",
    verses: [
      { book_id: "PSA", book_name: "Salmos", chapter: 23, verse: 1, text: "O SENHOR é o meu pastor, nada me faltará." },
      { book_id: "PSA", book_name: "Salmos", chapter: 23, verse: 2, text: "Deitar-me faz em verdes pastos, guia-me mansamente a águas tranqüilas." },
      { book_id: "PSA", book_name: "Salmos", chapter: 23, verse: 3, text: "Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome." },
      { book_id: "PSA", book_name: "Salmos", chapter: 23, verse: 4, text: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam." }
    ],
    text: "O SENHOR é o meu pastor, nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranqüilas. Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome. Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.",
    translation_id: "almeida",
    translation_name: "João Ferreira de Almeida",
  }
}

function normalizeQuery(text) {
  if (!text) return ""
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

export function findBook(searchTerm) {
  if (!searchTerm) return null
  const normalized = normalizeQuery(searchTerm)

  return BIBLE_BOOKS.find((b) => {
    return (
      b.id.toLowerCase() === normalized ||
      normalizeQuery(b.name) === normalized ||
      normalizeQuery(b.abbrev) === normalized ||
      normalizeQuery(b.name).startsWith(normalized)
    )
  })
}

export function getBooks({ testament } = {}) {
  if (testament) {
    const t = testament.toUpperCase()
    return BIBLE_BOOKS.filter((b) => b.testament === t)
  }
  return BIBLE_BOOKS
}

export async function getPassage({ reference, book, chapter, translation = "almeida" } = {}) {
  let queryPassage = reference

  if (!queryPassage && book && chapter) {
    const bookObj = findBook(book)
    const bookName = bookObj ? bookObj.name : book
    queryPassage = `${bookName} ${chapter}`
  }

  if (!queryPassage) {
    throw new ValidationError({
      message: "Passagem bíblica não especificada.",
      action: "Forneça o parâmetro 'reference' (ex: 'João 3:16') ou 'book' e 'chapter'.",
    })
  }

  const cacheKey = `${translation}:${queryPassage.toLowerCase().trim()}`
  const cached = cache.get(cacheKey)

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data
  }

  try {
    const encoded = encodeURIComponent(queryPassage)
    const url = `https://bible-api.com/${encoded}?translation=${encodeURIComponent(translation)}`

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new NotFoundError({
          message: `Passagem bíblica não encontrada: "${queryPassage}".`,
          action: "Verifique o nome do livro, capítulo e versículo informados.",
        })
      }
      throw new ServiceError({
        message: "Não foi possível carregar a passagem da API externa.",
        action: "Tente novamente em instantes.",
      })
    }

    const data = await response.json()

    // Formata o resultado garantindo padrão limpo
    const formattedResult = {
      reference: data.reference || queryPassage,
      verses: (data.verses || []).map((v) => ({
        book_id: v.book_id,
        book_name: v.book_name,
        chapter: v.chapter,
        verse: v.verse,
        text: (v.text || "").trim(),
      })),
      text: (data.text || "").trim(),
      translation_id: data.translation_id || translation,
      translation_name: data.translation_name || "João Ferreira de Almeida",
      translation_note: data.translation_note || null,
    }

    cache.set(cacheKey, {
      data: formattedResult,
      timestamp: Date.now(),
    })

    return formattedResult
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ValidationError) {
      throw error
    }

    // Tenta usar fallback local se disponível
    const fallbackKey = Object.keys(FALLBACK_PASSAGES).find((k) =>
      queryPassage.toUpperCase().includes(k)
    )
    if (fallbackKey && FALLBACK_PASSAGES[fallbackKey]) {
      return FALLBACK_PASSAGES[fallbackKey]
    }

    throw new ServiceError({
      cause: error,
      message: "Falha ao conectar com o serviço da Bíblia.",
      action: "Verifique sua conexão ou tente novamente em alguns instantes.",
    })
  }
}

const bible = {
  getBooks,
  findBook,
  getPassage,
}

export default bible
