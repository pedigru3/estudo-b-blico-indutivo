import * as React from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { ArrowLeft, ArrowRight, SlidersHorizontal, Keyboard } from "lucide-react"
import { Button, Heading, Input, BibleIcon, BookmarkIcon, SparkleStar } from "@/components/ui"
import { BIBLE_BOOKS } from "@/models/bible"

export default function EstudoHomePage() {
  const router = useRouter()
  const [mode, setMode] = React.useState("type") // "type" | "select"
  const [passageInput, setPassageInput] = React.useState("")
  const [selectedBook, setSelectedBook] = React.useState("JHN")
  const [selectedChapter, setSelectedChapter] = React.useState(1)
  const [errorMessage, setErrorMessage] = React.useState("")

  const [todayPlan, setTodayPlan] = React.useState(null)

  // Carrega a leitura do plano diário direto do banco de dados (PostgreSQL)
  React.useEffect(() => {
    async function loadTodayPlan() {
      try {
        const res = await fetch("/api/v1/daily-reading/today")
        if (res.ok) {
          const data = await res.json()
          setTodayPlan(data)
          if (data?.passage) {
            setPassageInput(data.passage)
          }
        }
      } catch {
        // Ignora silenciosamente
      }
    }

    loadTodayPlan()
  }, [])

  const currentBookObj =
    BIBLE_BOOKS.find((b) => b.id === selectedBook) || BIBLE_BOOKS[0]
  const totalChapters = currentBookObj.chapters || 1

  function handleTypeSubmit(e) {
    e.preventDefault()
    const trimmed = passageInput.trim()
    if (!trimmed) {
      setErrorMessage("Por favor, digite uma passagem (ex: joao 3:1-16).")
      return
    }
    setErrorMessage("")
    router.push(`/estudo/${encodeURIComponent(trimmed)}`)
  }

  function handleSelectSubmit(e) {
    e.preventDefault()
    const passage = `${currentBookObj.name} ${selectedChapter}`
    router.push(`/estudo/${encodeURIComponent(passage)}`)
  }

  function handleBookChange(e) {
    const bookId = e.target.value
    setSelectedBook(bookId)
    setSelectedChapter(1)
  }

  return (
    <>
      <Head>
        <title>Novo Estudo Bíblico</title>
        <meta
          name="description"
          content="Selecione ou digite a passagem bíblica para iniciar seu estudo indutivo."
        />
      </Head>

      <div className="min-h-screen bg-[#FAFAFB] text-[#162235] flex flex-col justify-between p-6 sm:p-10">
        {/* Top Header Simplificado */}
        <header className="w-full max-w-xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-xs text-[#7B878E] hover:text-[#3266F1] flex items-center gap-1.5 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao início
          </Link>
          <Link
            href="/estudos"
            className="text-xs text-[#7B878E] hover:text-[#3266F1] flex items-center gap-1.5 transition-colors font-medium"
          >
            <BookmarkIcon size={14} /> Meus Estudos
          </Link>
        </header>

        {/* Centro: Formulário Super Clean & Focado */}
        <main className="w-full max-w-lg mx-auto flex flex-col items-center text-center my-auto py-10">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF3FF] text-[#3266F1] flex items-center justify-center mb-6 shadow-xs border border-[#C6D8FF]">
            <BibleIcon size={24} />
          </div>

          <Heading level={4} className="mb-2">
            Qual passagem você vai estudar?
          </Heading>
          
          

          {mode === "type" ? (
            /* Modo Digitação Livre */
            <form onSubmit={handleTypeSubmit} className="w-full flex flex-col gap-3">
              <div className="w-full text-left">
                <Input
                  autoFocus
                  placeholder={todayPlan?.passage || "ex: joao 3:1-16"}
                  value={passageInput}
                  onChange={(e) => {
                    setPassageInput(e.target.value)
                    if (errorMessage) setErrorMessage("")
                  }}
                  errorMessage={errorMessage}
                  className="h-14 text-base px-5 bg-white border-[#E7E9EA] shadow-xs focus:border-[#3266F1] rounded-xl text-center font-medium placeholder:text-[#A2ABB0]"
                />
              </div>

              {/* Sugestão do Plano Diário Sequencial */}
              {todayPlan && (
                <div className="flex flex-col items-center gap-1.5 pt-1 pb-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#7B878E] font-medium">
                    <SparkleStar size={13} className="text-[#3266F1]" variant="filled" />
                    <span>Leitura sugerida para hoje:</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPassageInput(todayPlan.passage)}
                    className={`text-xs px-3.5 py-1.5 rounded-lg border transition-all font-semibold flex items-center gap-1.5 ${
                      passageInput === todayPlan.passage
                        ? "bg-[#3266F1] text-white border-[#3266F1] shadow-xs"
                        : "bg-[#EEF3FF] text-[#3266F1] border-[#C6D8FF] hover:bg-[#3266F1] hover:text-white"
                    }`}
                  >
                    <span>Dia {todayPlan.day_number}:</span>
                    <span>{todayPlan.passage}</span>
                  </button>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                rightIcon={ArrowRight}
                className="w-full h-12 rounded-xl text-sm font-medium shadow-xs mt-1"
              >
                Continuar
              </Button>
            </form>
          ) : (
            /* Modo Seleção por Listas */
            <form onSubmit={handleSelectSubmit} className="w-full flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#59656C]">Livro</label>
                  <select
                    value={selectedBook}
                    onChange={handleBookChange}
                    className="w-full h-12 px-3 text-sm bg-white border border-[#E7E9EA] rounded-xl focus:outline-none focus:border-[#3266F1] font-medium text-[#162235]"
                  >
                    <optgroup label="Antigo Testamento">
                      {BIBLE_BOOKS.filter((b) => b.testament === "OT").map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Novo Testamento">
                      {BIBLE_BOOKS.filter((b) => b.testament === "NT").map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#59656C]">Capítulo</label>
                  <select
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(parseInt(e.target.value, 10))}
                    className="w-full h-12 px-3 text-sm bg-white border border-[#E7E9EA] rounded-xl focus:outline-none focus:border-[#3266F1] font-medium text-[#162235]"
                  >
                    {Array.from({ length: totalChapters }, (_, i) => i + 1).map((ch) => (
                      <option key={ch} value={ch}>
                        Capítulo {ch}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                rightIcon={ArrowRight}
                className="w-full h-12 rounded-xl text-sm font-medium shadow-xs mt-1"
              >
                Continuar com {currentBookObj.name} {selectedChapter}
              </Button>
            </form>
          )}

          {/* Alternador de Modo */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                setErrorMessage("")
                setMode(mode === "type" ? "select" : "type")
              }}
              className="text-xs text-[#59656C] hover:text-[#3266F1] transition-colors flex items-center gap-1.5 font-medium py-1 px-3 rounded-lg hover:bg-[#EEF3FF]"
            >
              {mode === "type" ? (
                <>
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Prefere escolher o livro e capítulo pela lista?
                </>
              ) : (
                <>
                  <Keyboard className="w-3.5 h-3.5" />
                  Prefere digitar a passagem livremente?
                </>
              )}
            </button>
          </div>
        </main>

        {/* Footer Minimalista */}
        <footer className="w-full max-w-xl mx-auto flex items-center justify-between text-xs text-[#A2ABB0] pt-4 border-t border-[#E7E9EA]/50">
          <span>Estudo Bíblico Indutivo</span>
          {todayPlan && (
            <span className="text-[11px] text-[#7B878E] font-medium">
              Plano: Dia {todayPlan.day_number} de {todayPlan.total_days}
            </span>
          )}
        </footer>
      </div>
    </>
  )
}
