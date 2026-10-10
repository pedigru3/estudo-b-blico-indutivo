import * as React from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react"
import {
  Button,
  Heading,
  Text,
  Textarea,
  CheckIcon,
  ShareIcon,
  BookmarkIcon,
  CopyIcon,
  LookUpIcon,
  LookDownIcon,
  QuestionIcon,
  InsightIcon,
  ApplyIcon,
} from "@/components/ui"

const STEPS_DATA = [
  {
    step: 1,
    title: "Olhe para cima",
    subtitle: "Deus & Caráter",
    icon: LookUpIcon,
    question: "O que esse texto aponta e revela sobre Deus, Seu amor e caráter?",
    placeholder: "Ex: Este texto mostra a fidelidade de Deus, Seu amor incondicional e Sua soberania...",
  },
  {
    step: 2,
    title: "Olhe para baixo",
    subtitle: "A Condição Humana",
    icon: LookDownIcon,
    question: "O que revela do ser humano, suas fragilidades, atitudes ou pecados?",
    placeholder: "Ex: Revela as fraquezas humanas, necessidades de redenção ou atitudes a serem evitadas...",
  },
  {
    step: 3,
    title: "O que não entendi",
    subtitle: "Dúvidas & Aprofundamento",
    icon: QuestionIcon,
    question: "Quais dúvidas, perguntas difíceis ou termos você gostaria de se aprofundar?",
    placeholder: "Ex: Qual o significado deste termo específico? O que o contexto histórico diz sobre isso?",
  },
  {
    step: 4,
    title: "Insights",
    subtitle: "Destaques & Revelações",
    icon: InsightIcon,
    question: "Quais verdades, destaques e revelações mais saltam aos seus olhos?",
    placeholder: "Ex: O versículo que mais me impactou foi o que fala sobre a renovação da mente...",
  },
  {
    step: 5,
    title: "Aplicação",
    subtitle: "Vida Prática & Ação",
    icon: ApplyIcon,
    question: "Como transformar essa palavra em ação prática no dia a dia hoje?",
    placeholder: "Ex: Minha ação prática hoje será perdoar, orar especificamente por alguém e praticar a paciência...",
  },
]

export default function EstudoPassagemPage() {
  const router = useRouter()
  const { passage } = router.query

  const [activeStep, setActiveStep] = React.useState(1)
  const [bibleData, setBibleData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [copiedSummary, setCopiedSummary] = React.useState(false)
  const [copiedText, setCopiedText] = React.useState(false)

  const [notes, setNotes] = React.useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  })

  // Carrega notas salvas no localStorage
  React.useEffect(() => {
    if (!passage) return
    try {
      const saved = localStorage.getItem(`estudo_notas_${passage}`)
      if (saved) {
        setNotes(JSON.parse(saved))
      }
    } catch (error) {
      console.log("Ocorreu erro ao carregar notas de estudo")
      console.log(error)
    }
  }, [passage])

  // Busca o texto bíblico
  React.useEffect(() => {
    if (!passage) return

    async function loadBiblePassage() {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `/api/v1/bible/passage?reference=${encodeURIComponent(passage)}&translation=almeida`
        )
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message || "Não foi possível carregar a passagem.")
        }

        setBibleData(data)
      } catch (err) {
        setError(err.message || "Erro ao conectar ao serviço.")
      } finally {
        setIsLoading(false)
      }
    }

    loadBiblePassage()
  }, [passage])

  function handleNoteChange(stepNumber, value) {
    setNotes((prev) => {
      const updated = { ...prev, [stepNumber]: value }
      try {
        localStorage.setItem(`estudo_notas_${passage}`, JSON.stringify(updated))
      } catch (error) {
        console.log(error)
      }
      return updated
    })
  }

  function handleCopyText() {
    if (!bibleData?.text) return
    navigator.clipboard.writeText(`${bibleData.reference}\n\n${bibleData.text}`)
    setCopiedText(true)
    setTimeout(() => setCopiedText(false), 2000)
  }

  function handleCopySummary() {
    const text = `📖 *ESTUDO BÍBLICO INDUTIVO — ${bibleData?.reference || passage}*\n\n` +
      `⬆️ *1. Olhe para cima (Deus & Caráter):*\n${notes[1] || "(Pendente)"}\n\n` +
      `⬇️ *2. Olhe para baixo (Humanidade):*\n${notes[2] || "(Pendente)"}\n\n` +
      `❓ *3. O que não entendi (Dúvidas):*\n${notes[3] || "(Pendente)"}\n\n` +
      `💡 *4. Insights (Revelações):*\n${notes[4] || "(Pendente)"}\n\n` +
      `➡️ *5. Aplicação (Ação Prática):*\n${notes[5] || "(Pendente)"}\n\n` +
      `_Realizado com Estudo Bíblico Indutivo_`

    navigator.clipboard.writeText(text)
    setCopiedSummary(true)
    setTimeout(() => setCopiedSummary(false), 2500)
  }

  function handleCompleteStudy() {
    const studyItem = {
      id: `${passage}_${Date.now()}`,
      passage: bibleData?.reference || passage,
      notes,
      completedAt: new Date().toISOString(),
    }
    try {
      const currentList = JSON.parse(localStorage.getItem("meus_estudos") || "[]")
      const list = Array.isArray(currentList) ? currentList : []
      const passageRef = (bibleData?.reference || passage).toLowerCase().trim()
      const filtered = list.filter(
        (s) => s.passage?.toLowerCase().trim() !== passageRef
      )
      localStorage.setItem("meus_estudos", JSON.stringify([studyItem, ...filtered]))
    } catch(error) {
      console.log("Ocorreu erro ao completar estudo")
      console.log(error)
    }
    router.push("/estudos")
  }

  const currentStepData = STEPS_DATA[activeStep - 1]

  return (
    <>
      <Head>
        <title>Estudo: {bibleData?.reference || passage || "Passagem"}</title>
      </Head>

      <div className="min-h-screen bg-[#FAFAFB] text-[#162235] px-4 sm:px-8 py-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {/* Header Superior Limpo */}
          <header className="flex items-center justify-between pb-4 border-b border-[#E7E9EA]">
            <div className="flex items-center gap-3">
              <Link
                href="/estudo"
                className="text-xs text-[#7B878E] hover:text-[#3266F1] flex items-center gap-1.5 transition-colors font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Outra passagem
              </Link>
              <span className="text-[#E7E9EA]">|</span>
              <Link
                href="/estudos"
                className="text-xs text-[#7B878E] hover:text-[#3266F1] flex items-center gap-1 transition-colors font-medium"
              >
                <BookmarkIcon size={14} /> Meus Estudos
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={copiedSummary ? CheckIcon : ShareIcon}
                onClick={handleCopySummary}
                className={`text-xs h-8 ${copiedSummary ? "text-[#47A46A] border-[#47A46A]" : ""}`}
              >
                {copiedSummary ? "Copiado!" : "Compartilhar"}
              </Button>
            </div>
          </header>

          {/* Título & Passagem Bíblica */}
          <section className="bg-white border border-[#E7E9EA] rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Heading level={4} className="text-xl sm:text-2xl">
                  {bibleData?.reference || passage}
                </Heading>
                <Text variant="body5" color="subtle">
                  {bibleData?.translation_name || "João Ferreira de Almeida"}
                </Text>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyText}
                className="text-xs text-[#7B878E] hover:text-[#3266F1]"
              >
                {copiedText ? (
                  <CheckIcon size={18} className="text-[#47A46A]" />
                ) : (
                  <CopyIcon size={18} />
                )}
              </Button>
            </div>

            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-2 text-[#7B878E]">
                <RefreshCw className="w-5 h-5 animate-spin text-[#3266F1]" />
                <Text variant="body4" color="muted">
                  Carregando passagem bíblica...
                </Text>
              </div>
            ) : error ? (
              <div className="py-8 text-center">
                <p className="text-sm text-[#E05E4D] font-medium mb-3">{error}</p>
                <Link href="/estudo">
                  <Button variant="outline" size="sm">
                    Tentar outra busca
                  </Button>
                </Link>
              </div>
            ) : bibleData?.verses && bibleData.verses.length > 0 ? (
              <div className="font-sans text-[15px] sm:text-[16px] leading-[1.85] text-[#162235] space-y-2 select-text">
                {bibleData.verses.map((v) => (
                  <span key={v.verse} className="inline mr-2">
                    <sup className="font-bold text-[11px] text-[#3266F1] select-none mr-1">
                      {v.verse}
                    </sup>
                    <span>{v.text}</span>{" "}
                  </span>
                ))}
              </div>
            ) : (
              <div className="font-sans text-[15px] sm:text-[16px] leading-[1.85] text-[#162235] whitespace-pre-wrap">
                {bibleData?.text}
              </div>
            )}
          </section>

          {/* Seção das 5 Etapas (Clean & Sequencial) */}
          <section className="bg-white border border-[#E7E9EA] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
            {/* Barra de Progresso das 5 Etapas */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#EEF3FF] text-[#3266F1] font-bold text-xs flex items-center justify-center">
                  {activeStep}
                </span>
                <span className="text-sm font-bold text-[#162235]">
                  {currentStepData.title}
                </span>
              </div>

              {/* Indicadores de bolinhas */}
              <div className="flex items-center gap-1.5">
                {STEPS_DATA.map((s) => {
                  const isFilled = notes[s.step]?.trim().length > 0
                  const isCurrent = activeStep === s.step
                  return (
                    <button
                      key={s.step}
                      onClick={() => setActiveStep(s.step)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        isCurrent
                          ? "bg-[#3266F1] scale-110"
                          : isFilled
                          ? "bg-[#47A46A]"
                          : "bg-[#E7E9EA]"
                      }`}
                      title={`Passo ${s.step}: ${s.title}`}
                    />
                  )
                })}
              </div>
            </div>

            {/* Pergunta da Etapa */}
            <div className="p-4 bg-[#FAFAFB] rounded-xl border border-[#E7E9EA]/80">
              <Text variant="body3" className="font-medium text-[#162235]">
                {currentStepData.question}
              </Text>
            </div>

            {/* Caixa de Texto de Resposta */}
            <div className="flex flex-col gap-1.5">
              <Textarea
                rows={6}
                placeholder={currentStepData.placeholder}
                value={notes[activeStep] || ""}
                onChange={(e) => handleNoteChange(activeStep, e.target.value)}
                className="text-sm font-sans bg-[#FAFAFB]/50 rounded-xl"
              />
              <span className="text-[11px] text-[#A2ABB0] text-right">
                Salvo automaticamente
              </span>
            </div>

            {/* Ações de Navegação */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E7E9EA]">
              <Button
                variant="outline"
                size="sm"
                leftIcon={ArrowLeft}
                disabled={activeStep === 1}
                onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
                className="text-xs"
              >
                Anterior
              </Button>

              {activeStep < 5 ? (
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={ArrowRight}
                  onClick={() => setActiveStep((s) => Math.min(5, s + 1))}
                  className="text-xs"
                >
                  Próxima etapa
                </Button>
              ) : (
                <Button
                  variant="success"
                  size="sm"
                  leftIcon={BookmarkIcon}
                  onClick={handleCompleteStudy}
                  className="text-xs"
                >
                  Concluir Estudo
                </Button>
              )}
            </div>
          </section>

          {/* Rodapé Minimalista */}
          <footer className="flex items-center justify-center text-xs text-[#A2ABB0] py-4">
            <span>Estudo Bíblico Indutivo</span>
          </footer>
        </div>
      </div>
    </>
  )
}
