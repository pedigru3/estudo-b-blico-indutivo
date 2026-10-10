import Head from "next/head"
import Link from "next/link"
import useSWR from "swr"
import { ArrowLeft, Database, Activity, RefreshCw } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

async function fetchAPI(key) {
  const response = await fetch(key)
  const responseBody = await response.json()
  return responseBody
}

export default function StatusPage() {
  const { mutate, isValidating } = useSWR("/api/v1/status", fetchAPI)

  return (
    <>
      <Head>
        <title>Status do Sistema | Estudo Bíblico</title>
      </Head>

      <div className="min-h-screen bg-[#FAFAFB] text-[#162235] px-4 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {/* Header Navigation */}
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                leftIcon={ArrowLeft}
                className="text-xs text-[#59656C]"
              >
                Voltar ao Início
              </Button>
            </Link>

            <Button
              variant="secondary"
              size="sm"
              leftIcon={RefreshCw}
              isLoading={isValidating}
              onClick={() => mutate()}
              className="text-xs"
            >
              Atualizar
            </Button>
          </div>

          {/* Title Area */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E9EA]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-5 h-5 text-[#3266F1]" />
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#162235]">
                  Status do Sistema
                </h1>
              </div>
              <p className="text-sm text-[#7B878E]">
                Monitoramento em tempo real dos serviços e infraestrutura.
              </p>
            </div>
            <StatusIndicator />
          </div>

          {/* Content */}
          <main className="grid gap-6">
            <DatabaseCard />
          </main>
        </div>
      </div>
    </>
  )
}

function StatusIndicator() {
  const { data, error, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  })

  if (error) {
    return (
      <div className="flex flex-col sm:items-end gap-1">
        <Badge variant="red" dot>
          Serviços Indisponíveis
        </Badge>
        <span className="text-xs text-[#E05E4D]">Falha na conexão</span>
      </div>
    )
  }

  if (isLoading || !data) {
    return (
      <div className="flex flex-col sm:items-end gap-1">
        <Badge variant="orange" dot>
          Verificando...
        </Badge>
        <span className="text-xs text-[#7B878E]">Aguardando resposta</span>
      </div>
    )
  }

  const formattedDate = new Date(data.updated_at).toLocaleString("pt-BR")

  return (
    <div className="flex flex-col sm:items-end gap-1">
      <Badge variant="green" dot>
        Todos os Sistemas Operacionais
      </Badge>
      <span className="text-xs text-[#7B878E]">
        Atualizado: {formattedDate}
      </span>
    </div>
  )
}

function DatabaseCard() {
  const { data, error, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  })

  if (error) {
    return (
      <Card className="border-[#E05E4D]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#E05E4D]" />
              <CardTitle className="text-[#E05E4D]">
                Banco de Dados (PostgreSQL)
              </CardTitle>
            </div>
            <Badge variant="red">Erro</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#E05E4D]">
            Não foi possível conectar à instância do banco de dados PostgreSQL.
          </p>
        </CardContent>
      </Card>
    )
  }

  const db = !isLoading && data ? data.dependencies.database : null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#EEF3FF] text-[#3266F1]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>PostgreSQL Engine</CardTitle>
              <p className="text-xs text-[#7B878E] mt-0.5">
                Instância de banco relacional local
              </p>
            </div>
          </div>
          <Badge variant={db ? "green" : "orange"} dot>
            {db ? "Online" : "Conectando..."}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#FAFAFB] border border-[#E7E9EA] flex flex-col gap-1">
            <span className="text-xs font-medium text-[#7B878E]">
              Versão do Banco
            </span>
            <span className="text-xl font-bold text-[#162235]">
              {db ? db.version : "..."}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFB] border border-[#E7E9EA] flex flex-col gap-1">
            <span className="text-xs font-medium text-[#7B878E]">
              Conexões Abertas
            </span>
            <span className="text-xl font-bold text-[#3266F1]">
              {db ? db.opened_connections : "..."}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#FAFAFB] border border-[#E7E9EA] flex flex-col gap-1">
            <span className="text-xs font-medium text-[#7B878E]">
              Máximo de Conexões
            </span>
            <span className="text-xl font-bold text-[#162235]">
              {db ? db.max_connections : "..."}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
