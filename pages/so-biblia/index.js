import * as React from "react"
import Head from "next/head"
import Link from "next/link"
import { EB_Garamond, Montserrat } from "next/font/google"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import { ICONES, FUNDO } from "@/components/so-biblia/icones"
import {
  VAGAS,
  MINUTOS,
  desenharPlanta,
  montarIlha,
} from "@/components/so-biblia/plantas"

// Página de apresentação do app Android Só Bíblia.
// Rolagem com camadas 2,5D (GSAP ScrollTrigger + Lenis). Tudo estático, sem banco.

const serif = EB_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--sb-serif",
})
const sans = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--sb-sans",
})

const WHATSAPP =
  "https://wa.me/5511944655986?text=" +
  encodeURIComponent("Oi! Vi o site do Só Bíblia e quero testar o app.")

const NOTIFICACOES = [
  [
    "instagram",
    "Instagram",
    "maria.flor e mais 11 pessoas publicaram stories",
    "agora",
    0.6,
  ],
  ["whatsapp", "WhatsApp", "Grupo da Família: 48 mensagens novas", "1 min", 1],
  ["tiktok", "TikTok", "Vídeos que você vai gostar 🔥", "3 min", 0.75],
  [
    "youtube",
    "YouTube",
    "Novo vídeo de um canal que você segue",
    "6 min",
    1.15,
  ],
  ["instagram", "Instagram", "Você tem 3 novos seguidores", "12 min", 0.85],
  ["facebook", "Facebook", "Você tem 3 lembranças para hoje", "20 min", 1.05],
  ["tiktok", "TikTok", "ana.luz publicou um vídeo novo", "31 min", 0.7],
  ["whatsapp", "WhatsApp", 'Trabalho: "alguém viu o e-mail?"', "40 min", 0.95],
]

const APPS_DO_CELULAR = [
  ["instagram", "Instagram", true],
  ["tiktok", "TikTok", true],
  ["youtube", "YouTube", true],
  ["facebook", "Facebook", true],
  ["whatsapp", "WhatsApp", false],
]

const PERGUNTAS = [
  [
    "M12 20V5M6 11l6-6 6 6",
    "Olhe para cima",
    "Quem é Deus nesse texto?",
    "Deus que chama e conserta.",
  ],
  [
    "M12 4v15M6 13l6 6 6-6",
    "Olhe para baixo",
    "O que ele mostra do coração humano?",
    "Pedro negou por medo.",
  ],
  [
    "M9.2 9a3 3 0 1 1 4.3 2.7c-.9.5-1.5 1.2-1.5 2.3M12 18h.01",
    "Dúvidas e insights",
    "O que não entendi? O que saltou aos olhos?",
    "Por que o galo cantou bem ali?",
  ],
  [
    "M5 12h13M13 6l6 6-6 6",
    "Aplicação",
    "O que muda na minha vida hoje?",
    "Orar antes de reagir.",
  ],
]

const PLANTAS_LISTA = [
  ["arbusto", "15 min", "um arbusto"],
  ["pinheiro", "30 min", "um pinheiro"],
  ["ipe", "60 min", "um ipê florido"],
]

// logo do app: cadeado cuja base é a Bíblia aberta, com a cruz na lombada
function Logo({ cor = "#5A1A2B", ids = false, ...props }) {
  const id = (nome) => (ids ? { id: nome } : {})
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true" {...props}>
      <path
        {...id("sb-alca")}
        d="M86 112V80a42 42 0 0 1 84 0v32"
        fill="none"
        stroke={cor}
        strokeWidth="20"
      />
      <path
        {...id("sb-pgE")}
        d="M115 110C94 98 68 95 40 102V208c28-7 54-4 75 6Z"
        fill={cor}
      />
      <path
        {...id("sb-pgD")}
        d="M141 110c21-12 47-15 75-8V208c-28-7-54-4-75 6Z"
        fill={cor}
      />
      <path
        {...id("sb-cruz")}
        d="M122 54h12v16h16v12h-16v136h-12V82h-16V70h16Z"
        fill="#D9A441"
      />
    </svg>
  )
}

function IconeApp({ nome, tam }) {
  let glifo
  if (nome === "tiktok") {
    glifo = (
      <svg
        viewBox="0 0 24 24"
        width={tam * 0.56}
        style={{ overflow: "visible" }}
      >
        <path d={ICONES.tiktok} fill="#25F4EE" transform="translate(-.7,-.5)" />
        <path d={ICONES.tiktok} fill="#FE2C55" transform="translate(.7,.5)" />
        <path d={ICONES.tiktok} fill="#fff" />
      </svg>
    )
  } else if (nome === "youtube") {
    glifo = (
      <svg viewBox="0 0 24 24" width={tam * 0.68}>
        <path d={ICONES.youtube} fill="#FF0000" />
      </svg>
    )
  } else {
    glifo = (
      <svg viewBox="0 0 24 24" width={tam * 0.56}>
        <path d={ICONES[nome]} fill="#fff" />
      </svg>
    )
  }
  return (
    <span
      className="ai"
      style={{ width: tam, height: tam, background: FUNDO[nome] }}
    >
      {glifo}
    </span>
  )
}

function Biblia() {
  return (
    <svg viewBox="0 0 64 76" aria-hidden="true">
      <rect x="6" y="4" width="52" height="68" rx="5" fill="#F4EBDD" />
      <rect x="6" y="4" width="8" height="68" rx="3" fill="#e2d3bb" />
      <path d="M33 18h6v10h10v6H39v22h-6V34H23v-6h10Z" fill="#D9A441" />
    </svg>
  )
}

function fmtHoras(min) {
  return Math.floor(min / 60) + "h" + String(min % 60).padStart(2, "0")
}

export default function SoBibliaPage() {
  const raiz = React.useRef(null)
  const ilhaRef = React.useRef(null)

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // plantas pequenas da lista e a ilha (desenhadas por código, como no app)
    raiz.current.querySelectorAll(".mini").forEach((g) => {
      g.replaceChildren()
      desenharPlanta(g, g.dataset.tipo, "amarelo")
    })
    const ilha = montarIlha(ilhaRef.current)

    // rolagem suave
    let lenis
    let tick
    if (!reduz) {
      lenis = new Lenis({ lerp: 0.09 })
      lenis.on("scroll", ScrollTrigger.update)
      tick = (t) => lenis.raf(t * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    const fixa = (alvo, extensao, extra = {}) => ({
      trigger: alvo,
      start: "top top",
      end: "+=" + extensao,
      pin: true,
      scrub: reduz ? true : 0.6,
      ...extra,
    })

    const ctx = gsap.context(() => {
      // 1. abertura: toca sozinha ao carregar, igual à animação do app
      if (!reduz) {
        gsap.set("#sb-pgE", { transformOrigin: "115px 214px" })
        gsap.set("#sb-pgD", { transformOrigin: "141px 214px" })
        gsap
          .timeline({ delay: 0.25 })
          .from(
            "#sb-pgE",
            { scaleX: 0.05, duration: 0.7, ease: "power2.out" },
            0,
          )
          .from(
            "#sb-pgD",
            { scaleX: 0.05, duration: 0.7, ease: "power2.out" },
            0,
          )
          .from(
            "#sb-cruz",
            { y: 110, opacity: 0, duration: 0.6, ease: "power2.out" },
            0.45,
          )
          .from(
            "#sb-alca",
            { y: -70, opacity: 0, duration: 0.55, ease: "back.out(3)" },
            0.95,
          )
          .from(".tit", { y: 40, opacity: 0, duration: 0.7 }, 1.3)
          .from("#abertura .sub", { y: 30, opacity: 0, duration: 0.7 }, 1.5)
          .from(".rolar", { opacity: 0, duration: 0.5 }, 2)
      }
      // ao rolar, a logo fica para trás mais devagar que o texto (paralaxe)
      const rolaAbertura = {
        trigger: "#abertura",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
      gsap.to("#abertura .logo", {
        y: 140,
        ease: "none",
        scrollTrigger: rolaAbertura,
      })
      gsap.to(".rolar", {
        opacity: 0,
        ease: "none",
        scrollTrigger: { ...rolaAbertura, end: "15% top" },
      })
      gsap.utils.toArray(".luz").forEach((l) =>
        gsap.to(l, {
          y: -260 * Number(l.dataset.v),
          ease: "none",
          scrollTrigger: rolaAbertura,
        }),
      )

      // 2. o dia dela: notificações chegando em profundidades diferentes
      const hora = raiz.current.querySelector("#dia .hora")
      const HORAS = ["6h00", "6h47", "22h40"]
      const frases = gsap.utils.toArray("#dia .frase")
      const tlDia = gsap.timeline({
        scrollTrigger: fixa("#dia", "260%", {
          onUpdate: (s) => {
            const k = s.progress < 0.36 ? 0 : s.progress < 0.7 ? 1 : 2
            if (hora.textContent !== HORAS[k]) hora.textContent = HORAS[k]
          },
        }),
      })
      // como num celular de verdade: a nova chega no topo e empurra as outras
      // para baixo; as que não cabem mais somem. Uma nunca cobre a outra.
      const nts = gsap.utils.toArray(".nt")
      const pilha = raiz.current.querySelector("#dia .pilha")
      const passo = Math.max(...nts.map((n) => n.offsetHeight)) + 10
      const cabem = Math.max(3, Math.floor(pilha.clientHeight / passo))
      gsap.set(nts, { xPercent: -50, top: 0, y: 0, opacity: 0 })
      nts.forEach((n, i) => {
        const t = i * 0.55
        tlDia.fromTo(
          n,
          {
            y: -24,
            opacity: 0,
            scale: 0.92,
            rotateX: -55,
            transformOrigin: "50% 0%",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 0.45,
            ease: "back.out(1.6)",
          },
          t,
        )
        for (let j = 0; j < i; j++) {
          const lugar = i - j
          tlDia.to(
            nts[j],
            {
              y: lugar * passo,
              opacity: lugar < cabem ? 1 : 0,
              duration: 0.35,
              ease: "power2.out",
            },
            t,
          )
        }
      })
      tlDia
        .to(frases[0], { opacity: 0, y: -20, duration: 0.3 }, 2.2)
        .fromTo(
          frases[1],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3 },
          2.4,
        )
        .to(frases[1], { opacity: 0, y: -20, duration: 0.3 }, 4.1)
        .fromTo(
          frases[2],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3 },
          4.3,
        )
        .to(
          "#dia .pilha",
          { filter: "blur(3px)", opacity: 0.55, duration: 0.6 },
          4.6,
        )

      // 3. a virada: 1h27 por dia = 6 Bíblias por ano; 15 min bastam
      const cont = raiz.current.querySelector("#virada .cont")
      const tempo = { m: 0 }
      gsap
        .timeline({ scrollTrigger: fixa("#virada", "260%") })
        .to(
          tempo,
          {
            m: 87,
            duration: 1.6,
            ease: "power1.inOut",
            onUpdate: () => (cont.textContent = fmtHoras(Math.round(tempo.m))),
          },
          0,
        )
        .fromTo(
          ".t1",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4 },
          1.7,
        )
        .from(
          "#virada .biblias svg",
          {
            y: 60,
            opacity: 0,
            rotation: -12,
            stagger: 0.12,
            duration: 0.5,
            ease: "back.out(2)",
          },
          1.9,
        )
        .to(".t1", { opacity: 0, y: -16, duration: 0.3 }, 3.3)
        .fromTo(
          ".t2",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.3 },
          3.5,
        )
        .to(
          "#virada .biblias svg:not(:first-child)",
          { opacity: 0.12, scale: 0.8, stagger: 0.06, duration: 0.4 },
          3.5,
        )
        .to(
          "#virada .biblias svg:first-child",
          { scale: 1.25, duration: 0.4 },
          3.7,
        )
        .to("#virada h2", { opacity: 1, duration: 0.5 }, 4.3)
        .to({}, { duration: 0.6 })

      // 4. como funciona: o celular gira em 3D
      const passos = gsap.utils.toArray(".passo")
      gsap
        .timeline({
          scrollTrigger: fixa("#como", "300%", {
            onUpdate: (s) => {
              const k = s.progress < 0.34 ? 0 : s.progress < 0.68 ? 1 : 2
              passos.forEach((p, i) => p.classList.toggle("on", i === k))
            },
          }),
        })
        .fromTo(
          ".cel",
          { rotateY: -32, rotateX: 10, y: 60 },
          { rotateY: -14, rotateX: 6, y: 0, duration: 1 },
          0,
        )
        .from(
          ".grade > span",
          {
            scale: 0.5,
            opacity: 0,
            stagger: 0.08,
            duration: 0.4,
            ease: "back.out(2)",
          },
          0,
        )
        .to(".grade .cad", { opacity: 1, stagger: 0.18, duration: 0.25 }, 0.6)
        .from(
          ".grade .cad",
          { y: -18, stagger: 0.18, duration: 0.25, ease: "bounce.out" },
          0.6,
        )
        .to(".cel", { rotateY: 16, rotateX: 4, duration: 1.6 }, 1.2)
        .to(".toque", { opacity: 1, scale: 1.2, duration: 0.2 }, 1.6)
        .to(".toque", { opacity: 0, scale: 1.6, duration: 0.25 }, 1.85)
        .to(".s-leitura", { opacity: 1, duration: 0.4 }, 1.9)
        .to(".cel", { rotateY: -10, rotateX: 6, duration: 1.4 }, 2.9)
        .to(".concluido .veu", { opacity: 1, duration: 0.3 }, 3.3)
        .fromTo(
          ".concluido .selo",
          { scale: 0 },
          { scale: 1, duration: 0.45, ease: "back.out(1.8)" },
          3.4,
        )
        .fromTo(
          ".concluido path",
          { strokeDashoffset: 60 },
          { strokeDashoffset: 0, duration: 0.4, ease: "power1.out" },
          3.8,
        )
        .fromTo(
          ".concluido .selo-txt",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35 },
          3.9,
        )
        .to(".cel", { rotateY: 0, rotateX: 0, scale: 1.04, duration: 0.6 }, 4.2)

      // 5. o estudo: as cartas viram em 3D
      gsap
        .timeline({ scrollTrigger: fixa("#estudo", "200%") })
        .from("#estudo .cab", { y: 40, opacity: 0, duration: 0.6 }, 0)
        .from(
          ".carta",
          {
            rotateY: -95,
            x: -30,
            opacity: 0,
            stagger: 0.5,
            duration: 0.8,
            ease: "power2.out",
          },
          0.4,
        )
        .to({}, { duration: 0.6 })

      // 6. o bosque nasce
      const itens = gsap.utils.toArray("#bosque .item")
      const [n1, n2, n3] = [".n1", ".n2", ".n3"].map((s) =>
        raiz.current.querySelector(s),
      )
      ilha.plantas.forEach((g) =>
        gsap.set(g, { scale: 0, transformOrigin: "50% 100%" }),
      )
      gsap.set([ilha.semente, ilha.anel], { opacity: 0 })
      // instante (no tempo da animação) em que cada planta aparece
      const tS = 0.2 + (VAGAS.length - 1) * 0.45
      const nascimentos = VAGAS.map((_, k) =>
        k < VAGAS.length - 1 ? 0.3 + k * 0.45 : tS + 1.75,
      )
      const tlBosque = gsap.timeline({
        scrollTrigger: fixa("#bosque", "360%"),
      })
      // a lista e os contadores seguem o nascimento de cada planta, no mesmo
      // compasso da animação (não da barra de rolagem)
      tlBosque.eventCallback("onUpdate", () => {
        const agora = tlBosque.time()
        const qtd = nascimentos.filter((tn) => tn <= agora).length
        const min = VAGAS.slice(0, qtd).reduce((a, v) => a + MINUTOS[v[2]], 0)
        n1.textContent = qtd
        n2.textContent = qtd
        n3.textContent = fmtHoras(min)
        // acende quando nasce a primeira planta do tipo e fica aceso
        const nascidas = new Set(VAGAS.slice(0, qtd).map((v) => v[2]))
        itens.forEach((it) =>
          it.classList.toggle("on", nascidas.has(it.dataset.tipo)),
        )
      })
      tlBosque.fromTo(
        ".ilha",
        { scale: 1.5, y: 60 },
        { scale: 1, y: 0, duration: 5.5, ease: "power1.inOut" },
        0,
      )
      ilha.plantas
        .slice(0, -1)
        .forEach((g, k) =>
          tlBosque.to(
            g,
            { scale: 1, duration: 0.45, ease: "back.out(2.2)" },
            0.2 + k * 0.45,
          ),
        )
      // a semente aparece no alto, espera um instante e cai devagar
      // (antes a queda inteira cabia em ~2 voltas da rodinha e passava batido)
      tlBosque
        .fromTo(
          ilha.semente,
          { opacity: 0, attr: { cy: ilha.sy - 200 } },
          { opacity: 1, duration: 0.25, immediateRender: false },
          tS,
        )
        .to(
          ilha.semente,
          { attr: { cy: ilha.sy - 6 }, duration: 1.1, ease: "power2.in" },
          tS + 0.55,
        )
        .to(ilha.vaga, { opacity: 0, duration: 0.2 }, tS + 1.45)
        .to(ilha.semente, { opacity: 0, duration: 0.05 }, tS + 1.65)
        .fromTo(
          ilha.anel,
          { opacity: 1, attr: { rx: 6, ry: 3 } },
          {
            opacity: 0,
            attr: { rx: 44, ry: 22 },
            duration: 0.5,
            immediateRender: false,
          },
          tS + 1.65,
        )
        .to(
          ilha.plantas[VAGAS.length - 1],
          { scale: 1, duration: 0.6, ease: "back.out(2.5)" },
          tS + 1.7,
        )

      // 7. convite
      gsap.from("#convite > *", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: "#convite", start: "top 70%" },
      })
    }, raiz)

    return () => {
      ctx.revert()
      if (lenis) {
        gsap.ticker.remove(tick)
        lenis.destroy()
      }
    }
  }, [])

  // pontinhos de luz da abertura (posições fixas para não mudar entre servidor e navegador)
  const luzes = React.useMemo(() => {
    let x = 7
    const r = () => (x = (x * 16807) % 2147483647) / 2147483647
    return Array.from({ length: 16 }, () => ({
      t: 3 + r() * 7,
      l: r() * 100,
      top: r() * 100,
      v: (r() * 2 + 0.4).toFixed(2),
    }))
  }, [])

  return (
    <>
      <Head>
        <title>Só Bíblia · Antes do Instagram, a Palavra.</title>
        <meta
          name="description"
          content="O app Android que tranca as redes sociais até você fazer a sua leitura bíblica do dia. Cada leitura planta algo no seu bosque."
        />
        <meta name="theme-color" content="#5A1A2B" />
        <link rel="icon" href="/so-biblia/icone.png" />
        <link rel="apple-touch-icon" href="/so-biblia/icone.png" />
        <meta
          property="og:title"
          content="Só Bíblia · Antes do Instagram, a Palavra."
        />
        <meta
          property="og:description"
          content="Tranque as redes sociais até fazer a sua leitura bíblica do dia. Em breve no Google Play."
        />
      </Head>

      <div ref={raiz} className={`sb ${serif.variable} ${sans.variable}`}>
        <header>
          <a className="marca" href="#abertura">
            <Logo width={28} />
            Só Bíblia
          </a>
          <a
            className="btn btn-v"
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
          >
            Quero testar
          </a>
        </header>

        {/* 1. abertura */}
        <section id="abertura" className="v">
          <div className="stage">
            {luzes.map((z, i) => (
              <i
                key={i}
                className="luz"
                data-v={z.v}
                style={{
                  width: z.t,
                  height: z.t,
                  left: z.l + "%",
                  top: z.top + "%",
                }}
              />
            ))}
            <Logo className="logo" cor="#F4EBDD" ids />
            <h1 className="tit">
              Antes do Instagram,
              <br />a Palavra.
            </h1>
            <p className="sub">
              O app que tranca as redes sociais até você fazer a sua leitura
              bíblica do dia.
            </p>
            <div className="rolar">ROLE ↓</div>
          </div>
        </section>

        {/* 2. o dia dela */}
        <section id="dia" className="c">
          <div className="stage">
            <div className="lado">
              <div className="txt">
                <div className="hora serif">6h00</div>
                <div className="frases">
                  <p className="frase">
                    O despertador toca.
                    <br />E a primeira coisa que você pega é o celular.
                  </p>
                  <p className="frase">
                    Era só uma olhadinha.
                    <br />
                    Quase uma hora depois, você sai correndo.
                  </p>
                  <p className="frase">
                    Você abre a Bíblia, lê dois versículos…
                    <br />e quando vê, já voltou pro feed.
                  </p>
                </div>
              </div>
              <div className="pilha" aria-hidden="true">
                {NOTIFICACOES.map(([app, nome, texto, quando, z], i) => (
                  <div key={i} className="nt" data-z={z}>
                    <IconeApp nome={app} tam={34} />
                    <div>
                      <b>{nome}</b>
                      <i>{quando}</i>
                      <p>{texto}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. a virada */}
        <section id="virada" className="v">
          <div className="stage">
            <div className="rot">A média do brasileiro no Instagram é de</div>
            <div className="cont">0h00</div>
            <div className="rot">por dia.</div>
            <div className="troca">
              <p className="t1">
                Em um ano, daria para ler a Bíblia inteira <b>6 vezes</b>.
              </p>
              <p className="t2">
                Mas você só precisa de <b>1/6</b> desse tempo.
              </p>
            </div>
            <div className="biblias" aria-hidden="true">
              {Array.from({ length: 6 }, (_, i) => (
                <Biblia key={i} />
              ))}
            </div>
            <h2>15 minutos por dia bastam.</h2>
          </div>
        </section>

        {/* 4. como funciona */}
        <section id="como" className="v">
          <div className="stage">
            <div className="lado">
              <div className="passos">
                <div className="passo on">
                  <small>PASSO 1</small>
                  <h3>Escolha os apps que te tiram da leitura.</h3>
                </div>
                <div className="passo">
                  <small>PASSO 2</small>
                  <h3>Abriu o Instagram? A Bíblia abre primeiro.</h3>
                </div>
                <div className="passo">
                  <small>PASSO 3</small>
                  <h3>Leu pelo tempo que escolheu? Tudo destrava.</h3>
                </div>
              </div>
              <div className="cena">
                <div className="cel">
                  <div className="tela">
                    <div className="grade camada">
                      {APPS_DO_CELULAR.map(([app, nome, trancado]) => (
                        <span key={app}>
                          <IconeApp nome={app} tam={44} />
                          {trancado && (
                            <i className="cad">
                              <Logo cor="#F4EBDD" width={26} />
                            </i>
                          )}
                          {nome}
                        </span>
                      ))}
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="camada s-leitura"
                      src="/so-biblia/leitura.jpg"
                      alt="Tela de leitura do Só Bíblia"
                    />
                    {/* selo de "Leitura concluída", igual ao do app */}
                    <div className="camada concluido" aria-hidden="true">
                      <div className="veu" />
                      <div className="selo">
                        <svg viewBox="0 0 70 70">
                          <path
                            d="M18 36 L30 48 L53 23"
                            fill="none"
                            stroke="#D9A441"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="selo-txt">Leitura concluída</div>
                    </div>
                    <div className="toque" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. o estudo */}
        <section id="estudo" className="c">
          <div className="stage">
            <div className="cab">
              <small>ESTUDO BÍBLICO INDUTIVO</small>
              <h2>Não é só ler. É conversar com o texto.</h2>
              <p>
                Enquanto lê, toque em <b>Anotar</b>. Quatro perguntas simples
                transformam a leitura em estudo.
              </p>
            </div>
            <div className="cartas">
              {PERGUNTAS.map(([d, titulo, pergunta, exemplo]) => (
                <div key={titulo} className="carta">
                  <div className="ic">
                    <svg
                      width="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#5A1A2B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={d} />
                    </svg>
                  </div>
                  <div>
                    <h3>{titulo}</h3>
                    <p>{pergunta}</p>
                    <em>“{exemplo}”</em>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. o bosque */}
        <section id="bosque" className="v">
          <div className="stage">
            <div className="lado">
              <div className="txt">
                <h2>Cada leitura planta algo.</h2>
                <div className="lista">
                  {PLANTAS_LISTA.map(([tipo, tempo, nome]) => (
                    <div key={tipo} className="item" data-tipo={tipo}>
                      <svg viewBox="-34 -78 68 86" aria-hidden="true">
                        <g className="mini" data-tipo={tipo} />
                      </svg>
                      <div>
                        <b>{tempo}</b>
                        <span>{nome}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="nums">
                  <div>
                    <b className="n1">0</b>
                    <span>plantas</span>
                  </div>
                  <div>
                    <b className="n2">0</b>
                    <span>dias seguidos</span>
                  </div>
                  <div>
                    <b className="n3">0h00</b>
                    <span>de leitura</span>
                  </div>
                </div>
              </div>
              <svg
                ref={ilhaRef}
                className="ilha"
                viewBox="-300 -260 600 500"
                role="img"
                aria-label="Ilha do bosque com as plantas nascendo"
              />
            </div>
          </div>
        </section>

        {/* 7. convite */}
        <section id="convite" className="c">
          <Logo width={86} />
          <h2>
            Quer testar antes
            <br />
            de todo mundo?
          </h2>
          <p>
            O Só Bíblia está em fase de testes no Android. Chama no WhatsApp que
            eu te coloco na lista.
          </p>
          <div className="gp">
            <svg viewBox="0 0 24 24" width="24" aria-hidden="true">
              <path d={ICONES.googleplay} fill="#fff" />
            </svg>
            <div>
              <small>EM BREVE NO</small>
              <b>Google Play</b>
            </div>
          </div>
          <div>
            <a
              className="btn btn-o"
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" width="22" aria-hidden="true">
                <path d={ICONES.whatsapp} fill="#5A1A2B" />
              </svg>
              Quero testar
            </a>
          </div>
          <footer>
            <span>© 2026 Felipe Ferreira</span>
            <Link href="/so-biblia/privacidade">Política de privacidade</Link>
          </footer>
        </section>
      </div>
    </>
  )
}
