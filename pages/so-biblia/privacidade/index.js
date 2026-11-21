import Head from "next/head"

// Política de privacidade do app Android "Só Bíblia" (exigida pelo Google Play).
// Página estática: não usa banco nem API do site.

const ATUALIZADA_EM = "21 de novembro de 2026"
const CONTATO = "ferreira.contato1@gmail.com"

const secoes = [
  {
    titulo: "Resumo",
    paragrafos: [
      "O Só Bíblia não pede cadastro, não coleta dados pessoais e não usa anúncios nem ferramentas de análise. Tudo o que você faz no app fica guardado só no seu celular.",
    ],
  },
  {
    titulo: "Serviço de Acessibilidade",
    paragrafos: [
      "Para trancar os apps que você escolheu, o Só Bíblia usa o serviço de Acessibilidade do Android, e só depois que você concorda com o aviso dentro do app e ativa o serviço nas configurações.",
      "O serviço recebe apenas o nome do app que foi aberto. Ele não lê o conteúdo da tela, não registra o que você digita e não guarda nem envia o histórico de apps abertos. Essa informação é usada na hora, só para decidir se deve levar você de volta à leitura da Bíblia.",
      "Você pode desativar o serviço a qualquer momento em Configurações → Acessibilidade.",
    ],
  },
  {
    titulo: "Lista de apps instalados",
    paragrafos: [
      "Para você escolher quais apps trancar, o Só Bíblia mostra os apps instalados no celular. Essa lista é lida no aparelho e não sai dele.",
    ],
  },
  {
    titulo: "O que fica guardado no seu celular",
    paragrafos: [
      "Apps escolhidos, tempo de leitura, posição na Bíblia, tradução escolhida, plantas do bosque e as respostas que você escreve nas perguntas de estudo. Nada disso é enviado para servidores do Só Bíblia, que não existem.",
    ],
  },
  {
    titulo: "Texto e áudio da Bíblia",
    paragrafos: [
      "O texto e o áudio bíblico vêm da API.Bible. Para baixar um capítulo, o app faz uma requisição à API.Bible informando apenas o capítulo e a tradução. Como em qualquer acesso à internet, o serviço recebe o endereço IP do aparelho. O uso desses dados pela API.Bible segue a política de privacidade dela, em api.bible.",
      "Os capítulos baixados ficam guardados no celular por até 30 dias, para funcionar sem internet.",
    ],
  },
  {
    titulo: "Compartilhamento",
    paragrafos: [
      "O Só Bíblia não vende, não compartilha e não transfere dados de usuários para terceiros.",
    ],
  },
  {
    titulo: "Como apagar seus dados",
    paragrafos: [
      "Desinstalar o app ou limpar os dados dele em Configurações → Apps → Só Bíblia apaga tudo o que ele guardou no celular.",
    ],
  },
  {
    titulo: "Crianças",
    paragrafos: ["O app não coleta dados de ninguém, inclusive de crianças."],
  },
  {
    titulo: "Mudanças nesta política",
    paragrafos: [
      "Se o funcionamento do app mudar, esta página será atualizada e a data no topo mudará junto.",
    ],
  },
]

export default function PrivacidadeSoBiblia() {
  return (
    <>
      <Head>
        <title>Política de privacidade | Só Bíblia</title>
        <meta
          name="description"
          content="Política de privacidade do app Só Bíblia para Android."
        />
      </Head>

      <main className="min-h-screen bg-[#FBF7F0] text-[#2B1D1F] px-4 py-12">
        <article className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#B07F1E]">
            Só Bíblia
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold font-serif text-[#5A1A2B]">
            Política de privacidade
          </h1>
          <p className="mt-2 text-sm text-[#7A6A62]">
            Atualizada em {ATUALIZADA_EM}
          </p>

          {secoes.map((secao) => (
            <section key={secao.titulo} className="mt-8">
              <h2 className="text-xl font-semibold font-serif text-[#5A1A2B]">
                {secao.titulo}
              </h2>
              {secao.paragrafos.map((p) => (
                <p key={p} className="mt-3 leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <section className="mt-8 pt-6 border-t border-[#E6DCCD]">
            <h2 className="text-xl font-semibold font-serif text-[#5A1A2B]">
              Contato
            </h2>
            <p className="mt-3 leading-relaxed">
              Dúvidas sobre esta política:{" "}
              <a
                className="text-[#5A1A2B] underline"
                href={`mailto:${CONTATO}`}
              >
                {CONTATO}
              </a>
            </p>
          </section>
        </article>
      </main>
    </>
  )
}
