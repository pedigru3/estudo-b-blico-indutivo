import * as React from "react"
import Head from "next/head"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Trash2,
  Share2,
  Check,
  Calendar,
  Plus,
} from "lucide-react"
import {
  Button,
  Heading,
  Text,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  BookmarkIcon,
  BibleIcon,
  LookUpIcon,
  LookDownIcon,
  QuestionIcon,
  InsightIcon,
  ApplyIcon,
} from "@/components/ui"

const STEPS_META = [
  { step: 1, title: "Olhe para cima", icon: LookUpIcon },
  { step: 2, title: "Olhe para baixo", icon: LookDownIcon },
  { step: 3, title: "O que não entendi", icon: QuestionIcon },
  { step: 4, title: "Insights", icon: InsightIcon },
  { step: 5, title: "Aplicação", icon: ApplyIcon },
]

export default function MeusEstudosPage() {
  const [studies, setStudies] = React.useState([])
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [copiedId, setCopiedId] = React.useState(null)

  // Carrega estudos do localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("meus_estudos")
      if (stored) {
        const parsed = JSON.parse(stored)
        setStudies(Array.isArray(parsed) ? parsed : [])
      }
    } catch {
      setStudies([])
    } finally {
      setIsLoaded(true)
    }
  }, [])

  function handleDelete(id) {
    if (!confirm("Deseja realmente remover este estudo salvo?")) return
    const updated = studies.filter((s) => s.id !== id)
    setStudies(updated)
    try {
      localStorage.setItem("meus_estudos", JSON.stringify(updated))
    } catch (error) {
      console.log("Ocorreu erro ao deletar estudo")
      console.log(error)
    }
  }

  function handleCopyStudy(study) {
    const text =
      `📖 *ESTUDO BÍBLICO INDUTIVO: ${study.passage}*\n` +
      `📅 *Data:* ${new Date(study.completedAt).toLocaleDateString("pt-BR")}\n\n` +
      `⬆️ *1. Olhe para cima (Deus & Caráter):*\n${study.notes?.[1] || "(Não respondido)"}\n\n` +
      `⬇️ *2. Olhe para baixo (Humanidade):*\n${study.notes?.[2] || "(Não respondido)"}\n\n` +
      `❓ *3. O que não entendi (Dúvidas):*\n${study.notes?.[3] || "(Não respondido)"}\n\n` +
      `💡 *4. Insights (Revelações):*\n${study.notes?.[4] || "(Não respondido)"}\n\n` +
      `➡️ *5. Aplicação (Ação Prática):*\n${study.notes?.[5] || "(Não respondido)"}\n\n` +
      `_Realizado no Estudo Bíblico Indutivo_`

    navigator.clipboard.writeText(text)
    setCopiedId(study.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  function formatDate(isoString) {
    if (!isoString) return "Recentemente"
    try {
      const date = new Date(isoString)
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    } catch {
      return "Data não disponível"
    }
  }

  return (
    <>
      <Head>
        <title>Meus Estudos Bíblicos</title>
        <meta
          name="description"
          content="Seus estudos bíblicos indutivos salvos e organizados."
        />
      </Head>

      <div className="min-h-screen bg-[#FAFAFB] text-[#162235] px-4 sm:px-8 py-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {/* Header Superior */}
          <header className="flex items-center justify-between pb-4 border-b border-[#E7E9EA]">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="text-xs text-[#7B878E] hover:text-[#3266F1] flex items-center gap-1.5 transition-colors font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Início
              </Link>
              <span className="text-[#D4D6DA]">/</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#162235]">
                Meus Estudos
              </span>
            </div>

            <Link href="/estudo">
              <Button variant="primary" size="sm" leftIcon={Plus} className="text-xs">
                Novo Estudo
              </Button>
            </Link>
          </header>

          {/* Título da Seção */}
          <section className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <BookmarkIcon size={22} className="text-[#3266F1]" variant="filled" />
              <Heading level={3}>Meus Estudos Concluídos</Heading>
            </div>
            <Text variant="body4" color="muted">
              {studies.length === 1
                ? "1 estudo registrado."
                : `${studies.length} estudos registrados.`}
            </Text>
          </section>

          {/* Lista de Estudos Salvos */}
          <main className="flex flex-col gap-4">
            {!isLoaded ? (
              <div className="py-16 text-center text-[#7B878E] text-sm">
                Carregando seus estudos...
              </div>
            ) : studies.length === 0 ? (
              /* Estado Vazio (Empty State) */
              <Card className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-white border-[#E7E9EA]">
                <div className="w-14 h-14 rounded-2xl bg-[#EEF3FF] text-[#3266F1] flex items-center justify-center border border-[#C6D8FF]">
                  <BibleIcon size={28} />
                </div>
                <div>
                  <Heading level={5} className="mb-1">
                    Nenhum estudo salvo ainda
                  </Heading>
                  <Text variant="body4" color="muted" className="max-w-md">
                    Quando você finalizar um estudo, ele ficará registrado no seu navegador.
                  </Text>
                </div>
                <Link href="/estudo">
                  <Button variant="primary" size="md" rightIcon={ArrowRight}>
                    Começar Meu Primeiro Estudo
                  </Button>
                </Link>
              </Card>
            ) : (
              /* Lista dos Cards de Estudos */
              studies.map((study) => {
                const completedSteps = Object.values(study.notes || {}).filter(
                  (val) => val && val.trim().length > 0
                ).length

                return (
                  <Card
                    key={study.id}
                    className="bg-white border-[#E7E9EA] shadow-xs hover:border-[#C6D8FF] transition-all"
                  >
                    <CardHeader className="pb-3 border-b border-[#E7E9EA]/60 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#EEF3FF] text-[#3266F1] flex items-center justify-center shrink-0 border border-[#C6D8FF]">
                          <BibleIcon size={20} />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-[#162235]">
                            {study.passage}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-[#7B878E]">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(study.completedAt)}</span>
                          </div>
                        </div>
                      </div>

                      <Badge variant="success" className="text-xs">
                        {completedSteps} de 5 etapas
                      </Badge>
                    </CardHeader>

                    <CardContent className="pt-4 flex flex-col gap-3">
                      {/* Resumo visual rápido das 5 etapas */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {STEPS_META.map((stepMeta) => {
                          const noteText = study.notes?.[stepMeta.step]
                          const hasNote = noteText && noteText.trim().length > 0
                          const IconComp = stepMeta.icon

                          return (
                            <div
                              key={stepMeta.step}
                              className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                                hasNote
                                  ? "bg-[#FAFAFB] border-[#E7E9EA] text-[#162235]"
                                  : "bg-transparent border-dashed border-[#E7E9EA] text-[#A2ABB0]"
                              }`}
                            >
                              <IconComp
                                size={16}
                                className={hasNote ? "text-[#3266F1] shrink-0 mt-0.5" : "text-[#A2ABB0] shrink-0 mt-0.5"}
                              />
                              <div className="flex flex-col min-w-0 flex-1">
                                <span className="font-semibold text-[11px]">
                                  {stepMeta.step}. {stepMeta.title}
                                </span>
                                <p className="line-clamp-1 text-[11px] text-[#59656C]">
                                  {hasNote ? noteText : "(Pendente)"}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>

                    <CardFooter className="pt-3 border-t border-[#E7E9EA] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleDelete(study.id)}
                        className="text-xs text-[#E05E4D] hover:underline flex items-center gap-1 font-medium"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Excluir
                      </button>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={copiedId === study.id ? Check : Share2}
                          onClick={() => handleCopyStudy(study)}
                          className={`text-xs h-8 ${
                            copiedId === study.id
                              ? "text-[#47A46A] border-[#47A46A]"
                              : ""
                          }`}
                        >
                          {copiedId === study.id ? "Copiado!" : "Compartilhar"}
                        </Button>

                        <Link href={`/estudo/${encodeURIComponent(study.passage)}`}>
                          <Button
                            variant="primary"
                            size="sm"
                            rightIcon={ArrowRight}
                            className="text-xs h-8"
                          >
                            Revisar / Abrir
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                )
              })
            )}
          </main>

          {/* Footer Minimalista */}
          <footer className="flex items-center justify-center text-xs text-[#A2ABB0] py-6 border-t border-[#E7E9EA]/50">
            <span>Estudo Bíblico Indutivo • Seus registros pessoais</span>
          </footer>
        </div>
      </div>
    </>
  )
}
