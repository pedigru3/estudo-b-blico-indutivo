import * as React from "react"
import Head from "next/head"
import Link from "next/link"
import {
  BookOpenText,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react"
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Steps,
  Heading,
  Text,
  SectionHeader,
  SparkleStar,
  BookmarkIcon,
  LookUpIcon,
  LookDownIcon,
  QuestionIcon,
  InsightIcon,
  ApplyIcon,
} from "@/components/ui"

const STEPS = [
  { label: "1. Olhe para cima", description: "Deus & Caráter", icon: LookUpIcon },
  { label: "2. Olhe para baixo", description: "Humanidade", icon: LookDownIcon },
  { label: "3. O que não entendi", description: "Dúvidas", icon: QuestionIcon },
  { label: "4. Insights", description: "Revelações", icon: InsightIcon },
  { label: "5. Aplicação", description: "Ação prática", icon: ApplyIcon },
]

const STEPS_DATA = [
  {
    step: 1,
    title: "Olhe para cima",
    subtitle: "Revelação de Deus",
    icon: LookUpIcon,
    description:
      "Direcione o olhar para o Criador. Identifique o que a passagem bíblica ensina e revela expressamente sobre a natureza, o caráter, o amor e os propósitos de Deus Pai, do Filho e do Espírito Santo.",
    question:
      "O que esse texto aponta e revela sobre Deus, Seu amor e caráter?",
    guidelines: [
      "Quais atributos de Deus são destacados (amor, santidade, justiça, fidelidade, soberania)?",
      "O que o texto revela sobre a atuação e os propósitos de Deus na história?",
      "Há promessas feitas por Deus nesta passagem?",
    ],
  },
  {
    step: 2,
    title: "Olhe para baixo",
    subtitle: "A Condição Humana",
    icon: LookDownIcon,
    description:
      "Examine o que o texto revela sobre a condição e o coração humano. Observe as reações, fragilidades, atitudes, virtudes ou pecados das pessoas mencionadas na narrativa ou no ensinamento.",
    question:
      "O que revela do ser humano, suas fragilidades, atitudes ou pecados?",
    guidelines: [
      "Quais sentimentos, medos ou motivações humanas aparecem no texto?",
      "Há pecados, erros de julgamento ou atitudes reprováveis a serem evitados?",
      "Como as pessoas reagiram diante da voz ou da presença de Deus?",
    ],
  },
  {
    step: 3,
    title: "O que não entendi",
    subtitle: "Dúvidas e Aprofundamento",
    icon: QuestionIcon,
    description:
      "Mantenha um espírito humilde e curioso. Anote tudo aquilo que não ficou claro à primeira leitura para pesquisar em comentários, dicionários bíblicos ou estudar com o grupo.",
    question:
      "Quais dúvidas, perguntas difíceis ou termos você gostaria de se aprofundar?",
    guidelines: [
      "Existem palavras, termos teológicos ou costumes culturais desconhecidos?",
      "Há aparente contradição ou versículos de difícil interpretação?",
      "Que perguntas sobre o contexto histórico ou geográfico precisam de resposta?",
    ],
  },
  {
    step: 4,
    title: "Insights",
    subtitle: "Destaques e Revelações",
    icon: InsightIcon,
    description:
      "Registre as verdades marcantes que saltaram aos seus olhos durante a leitura. Aqueles princípios espirituais e conexões bíblicas que chamaram sua atenção e trouxeram clareza ao coração.",
    question:
      "Quais verdades, destaques e revelações mais saltam aos seus olhos?",
    guidelines: [
      "Qual versículo ou frase mais impactou você durante o estudo?",
      "Que conexões com outras partes das Escrituras você conseguiu fazer?",
      "Qual princípio eterno ou verdade imutável ficou evidente para você?",
    ],
  },
  {
    step: 5,
    title: "Aplicação",
    subtitle: "Vida Prática & Ação",
    icon: ApplyIcon,
    description:
      "Transforme a verdade descoberta em compromisso diário. O estudo bíblico indutivo só se completa quando gera transformação pessoal, obediência e atitudes práticas na vida real.",
    question:
      "Como transformar essa palavra em ação prática no dia a dia hoje?",
    guidelines: [
      "Existe um mandamento a obedecer ou um pecado a confessar?",
      "Que atitude concreta você precisa tomar com sua família, trabalho ou comunidade?",
      "Como você pode orar em resposta a esta verdade hoje?",
    ],
  },
]

export default function HomePage() {
  const [currentStep, setCurrentStep] = React.useState(1)
  const activeStepData = STEPS_DATA[currentStep - 1]
  const ActiveIcon = activeStepData.icon

  return (
    <>
      <Head>
        <title>Estudo Bíblico Indutivo</title>
        <meta
          name="description"
          content="Metodologia indutiva para examinar as Escrituras: Olhe para cima, Olhe para baixo, O que não entendi, Insights e Aplicação."
        />
      </Head>

      <div className="min-h-screen bg-[#FAFAFB] text-[#162235] px-4 sm:px-8 py-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          {/* Top Category Header */}
          <header className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-bold tracking-widest text-[#162235] uppercase">
              <span>ESTUDO BÍBLICO INDUTIVO</span>
              <div className="flex items-center gap-4 lowercase font-normal tracking-normal text-[#7B878E]">
                <Link
                  href="/estudos"
                  className="hover:text-[#3266F1] flex items-center gap-1 transition-colors"
                >
                  <BookmarkIcon size={14} /> meus estudos
                </Link>
              </div>
            </div>
            <div className="w-full h-px bg-[#162235]" />
          </header>

          {/* Main Title Section */}
          <section className="flex flex-col gap-4">
            <SparkleStar className="w-7 h-7 text-[#162235]" variant="filled" />
            <Heading level={1}>Estudo Bíblico Indutivo</Heading>
            <Text variant="body3" className="max-w-3xl">
              Metodologia indutiva para examinar as Escrituras. Estude a bíblia e
              compartilhe com os amigos.
            </Text>
            <div className="flex items-center gap-3 pt-1">
              <Link href="/estudo">
                <Button variant="primary" size="md" rightIcon={ArrowRight}>
                  Começar Estudo Bíblico
                </Button>
              </Link>
            </div>
          </section>

          {/* Stepper Section */}
          <section className="flex flex-col gap-5">
            <SectionHeader title="Fluxo do Método" />

            {/* Interactive Stepper */}
            <Card>
              <CardContent className="py-7 px-3 sm:px-6 overflow-x-auto">
                <Steps
                  steps={STEPS}
                  currentStep={currentStep}
                  onStepChange={setCurrentStep}
                />
              </CardContent>
            </Card>

            {/* Selected Step Detail Card */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#EEF3FF] text-[#3266F1] flex items-center justify-center border border-[#C6D8FF] shrink-0">
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {currentStep}. {activeStepData.title}
                    </CardTitle>
                   
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-5 pt-1">
                <Text variant="body4">{activeStepData.description}</Text>

                <div className="flex flex-col gap-2">
                  <Text variant="body5" color="default" className="font-bold">
                    Diretrizes da Etapa:
                  </Text>
                  <div className="flex flex-col gap-2">
                    {activeStepData.guidelines.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#47A46A] shrink-0 mt-0.5" />
                        <Text variant="body4" color="muted">
                          {item}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={ArrowLeft}
                  disabled={currentStep === 1}
                  onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                  className="text-xs"
                >
                  Anterior
                </Button>

                <Text variant="body5" color="subtle" className="font-medium">
                  Etapa {currentStep} de 5
                </Text>

                {currentStep < 5 ? (
                  <Button
                    variant="primary"
                    size="sm"
                    rightIcon={ArrowRight}
                    onClick={() => setCurrentStep((s) => Math.min(5, s + 1))}
                    className="text-xs"
                  >
                    Próximo
                  </Button>
                ) : (
                  <Link href="/estudo">
                    <Button
                      variant="success"
                      size="sm"
                      rightIcon={ArrowRight}
                      className="text-xs"
                    >
                      Começar agora
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          </section>

          {/* Footer */}
          <footer className="pt-6 border-t border-[#E7E9EA] flex flex-col sm:flex-row items-center justify-between gap-3">
            <Text variant="body5" color="subtle">
              Estudo Bíblico Indutivo
            </Text>
            <div className="flex items-center gap-4">
              <Link
                href="/#"
                className="text-xs text-[#7B878E] hover:text-[#3266F1]"
              >
                Todos os direitos reservados. © 2026 - Felipe Ferreira
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
