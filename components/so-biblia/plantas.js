// Desenhos das plantas do "Meu bosque", os mesmos do app Só Bíblia
// (fonte: Previas/bosque/plantas-v1.html). Tudo em SVG, desenhado por código.

const NS = "http://www.w3.org/2000/svg"

function E(g, tag, atrs) {
  const e = document.createElementNS(NS, tag)
  for (const k in atrs) e.setAttribute(k, atrs[k])
  g.appendChild(e)
  return e
}
const C = (g, x, y, r, fill, opacity) =>
  E(g, "circle", {
    cx: x,
    cy: y,
    r,
    fill,
    ...(opacity != null ? { opacity } : {}),
  })
const sombra = (g, rx) =>
  E(g, "ellipse", {
    cx: 0,
    cy: 1,
    rx,
    ry: rx * 0.38,
    fill: "#000",
    opacity: 0.18,
  })

// 15 min
function arbusto(g) {
  sombra(g, 15)
  ;[
    [-9, -8, 8, "#3f7d3a"],
    [9, -8, 8, "#356e33"],
    [0, -13, 10, "#4f8f45"],
    [-4, -7, 7, "#4a8a40"],
    [5, -6, 7, "#3f7d3a"],
  ].forEach(([x, y, r, c]) => C(g, x, y, r, c))
  C(g, -3, -17, 4, "#6fae58", 0.7)
  ;[
    [-9, -11],
    [-1, -17],
    [7, -12],
    [3, -6],
    [-5, -5],
  ].forEach(([x, y]) => {
    C(g, x, y, 1.6, "#fdf8ec")
    C(g, x, y, 0.6, "#e8c25a")
  })
}

// 30 min
function pinheiro(g) {
  sombra(g, 15)
  E(g, "rect", {
    x: -2.5,
    y: -10,
    width: 5,
    height: 10,
    rx: 1.5,
    fill: "#5a3e2a",
  })
  ;[
    [-8, -28, 16],
    [-22, -40, 13],
    [-35, -52, 9.5],
  ].forEach(([yb, yt, hw]) => {
    E(g, "polygon", {
      points: `${-hw},${yb} 0,${yt} 0,${yb + 4}`,
      fill: "#3d8355",
    })
    E(g, "polygon", {
      points: `${hw},${yb} 0,${yt} 0,${yb + 4}`,
      fill: "#2b6342",
    })
  })
}

// 60 min
const CORES = {
  rosa: ["#c94485", "#e46fa8", "#f39cc6", "#fcd6e8"],
  amarelo: ["#d39a0e", "#efbd22", "#f8d757", "#fdf0b0"],
  roxo: ["#7a3fa3", "#9c62c4", "#bf93de", "#e9d6f6"],
}
function sorteio(seed) {
  let x = seed
  return () => (x = (x * 16807) % 2147483647) / 2147483647
}
function ipe(g, cor = "rosa") {
  const [c1, c2, c3, c4] = CORES[cor]
  const R = sorteio(23)
  sombra(g, 15)
  for (let k = 0; k < 12; k++) {
    const a = R() * Math.PI * 2
    const d = 4 + R() * 15
    C(g, Math.cos(a) * d, 1 + Math.sin(a) * d * 0.36, 1.1, k % 2 ? c2 : c3)
  }
  const lob = [
    [2, -64, 10, 8],
    [-9, -54, 9, 7.5],
    [10, -51, 9, 8],
    [-12, -43, 8, 5.5],
    [11, -39, 8.5, 6],
    [-1, -47, 4, 4],
    [-5, -36, 5, 3.5],
  ]
  const dentro = (x, y) =>
    lob.some(
      ([cx, cy, rx, ry]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1,
    )
  const pts = []
  let tent = 0
  while (pts.length < 170 && tent < 5000) {
    tent++
    const x = -22 + R() * 44
    const y = -73 + R() * 43
    if (dentro(x, y)) pts.push([x, y])
  }
  const topo = (x, y) => ((-y - 30) / 43) * 0.7 + ((-x + 22) / 44) * 0.3
  pts.forEach(([x, y]) => {
    if (R() < 0.8) C(g, x + 0.8, y + 1.4, 2.2 + R() * 1.5, c1)
  })
  const tr = { stroke: "#4a3324", fill: "none", "stroke-linecap": "round" }
  E(g, "path", {
    d: "M-0.5 0 C-1.6 -10 0.8 -20 -0.2 -32",
    ...tr,
    "stroke-width": 3,
  })
  ;[
    ["M-0.2 -31 C-2 -38 -6 -44 -8 -52", 1.5],
    ["M-0.2 -31 C2 -38 5 -42 9 -49", 1.5],
    ["M-0.3 -33 C0 -42 1 -52 1 -62", 1.4],
    ["M-4 -40 C-7 -42 -10 -42 -12 -42", 1],
    ["M3 -38 C6 -38 9 -37 11 -38", 1],
    ["M1 -50 C-2 -54 -4 -56 -6 -58", 0.9],
  ].forEach(([d, w]) => E(g, "path", { d, ...tr, "stroke-width": w }))
  pts.forEach(([x, y]) => {
    if (R() < 0.2) return
    C(g, x, y, 1.8 + R() * 1.3, topo(x, y) > 0.62 ? c3 : c2)
  })
  pts.forEach(([x, y]) => {
    if (R() < 0.3)
      C(g, x - 0.5, y - 0.7, 0.6 + R() * 0.5, topo(x, y) > 0.55 ? c4 : c3)
  })
  pts
    .filter(([x, y]) => !dentro(x, y + 3))
    .forEach(([x, y]) => {
      if (R() < 0.5) C(g, x + R() * 1.2, y + 2 + R() * 1.5, 1.3, c2)
    })
}

export const PLANTAS = { arbusto, pinheiro, ipe }
export const MINUTOS = { arbusto: 15, pinheiro: 30, ipe: 60 }

// Ordem em que as plantas nascem na ilha. A última nasce da semente dourada.
export const VAGAS = [
  [3, 0, "arbusto"],
  [0, 1, "pinheiro"],
  [2, 2, "ipe"],
  [1, 4, "arbusto"],
  [4, 3, "pinheiro"],
  [1, 1, "arbusto"],
  [5, 5, "ipe"],
  [3, 4, "arbusto"],
  [0, 4, "pinheiro"],
  [5, 1, "arbusto"],
  [2, 5, "pinheiro"],
  [4, 1, "ipe"],
]

export function desenharPlanta(g, tipo, cor) {
  PLANTAS[tipo](g, cor)
}

// Ilha isométrica 6×6. Devolve os grupos de cada planta (na ordem de VAGAS)
// e as peças da semente que cai na última vaga.
export function montarIlha(svg) {
  svg.replaceChildren()
  const W = 44
  const H = 22
  const N = 6
  const P = (i, j) => [(i - j) * W, (i + j) * H - 130]
  const [tx, ty] = P(0, 0)
  const [rx, ry] = P(N, 0)
  const [bx, by] = P(N, N)
  const [lx, ly] = P(0, N)

  E(svg, "ellipse", {
    cx: 0,
    cy: 200,
    rx: 240,
    ry: 34,
    fill: "#000",
    opacity: 0.25,
  })
  E(svg, "polygon", {
    points: `${lx},${ly} ${bx},${by} ${bx},${by + 56} ${lx},${ly + 56}`,
    fill: "#8a5a3b",
  })
  E(svg, "polygon", {
    points: `${bx},${by} ${rx},${ry} ${rx},${ry + 56} ${bx},${by + 56}`,
    fill: "#6e4630",
  })
  E(svg, "polygon", {
    points: `${lx},${ly} ${bx},${by} ${bx},${by + 8} ${lx},${ly + 8}`,
    fill: "#5c9e48",
  })
  E(svg, "polygon", {
    points: `${bx},${by} ${rx},${ry} ${rx},${ry + 8} ${bx},${by + 8}`,
    fill: "#4e8a3d",
  })
  E(svg, "polygon", {
    points: `${tx},${ty} ${rx},${ry} ${bx},${by} ${lx},${ly}`,
    fill: "#7dbb5e",
  })
  for (let i = 0; i < N; i++)
    for (let j = 0; j < N; j++)
      if ((i * 7 + j * 3) % 5 === 0) {
        const [x, y] = P(i + 0.5, j + 0.5)
        E(svg, "ellipse", {
          cx: x,
          cy: y,
          rx: 20,
          ry: 9,
          fill: "#8cc76c",
          opacity: 0.45,
        })
      }

  // desenha de trás para a frente, para uma planta não cobrir a da frente
  const plantas = []
  VAGAS.map((v, k) => [...v, k])
    .sort((a, b) => a[0] + a[1] - (b[0] + b[1]))
    .forEach(([i, j, tipo, k]) => {
      const [x, y] = P(i + 0.5, j + 0.5)
      const fora = E(svg, "g", {
        transform: `translate(${x},${y}) scale(1.55)`,
      })
      const g = E(fora, "g", {})
      desenharPlanta(
        g,
        tipo,
        tipo === "ipe" ? (i % 2 ? "amarelo" : "rosa") : undefined,
      )
      plantas[k] = g
    })

  const [ui, uj] = VAGAS[VAGAS.length - 1]
  const [sx, sy] = P(ui + 0.5, uj + 0.5)
  const vaga = E(svg, "polygon", {
    points: `${sx},${sy - H * 0.8} ${sx + W * 0.8},${sy} ${sx},${sy + H * 0.8} ${sx - W * 0.8},${sy}`,
    fill: "none",
    stroke: "#D9A441",
    "stroke-width": 2.5,
    "stroke-dasharray": "6 5",
  })
  const semente = E(svg, "ellipse", {
    cx: sx,
    cy: sy - 6,
    rx: 6,
    ry: 8,
    fill: "#D9A441",
  })
  const anel = E(svg, "ellipse", {
    cx: sx,
    cy: sy,
    rx: 14,
    ry: 7,
    fill: "none",
    stroke: "#D9A441",
    "stroke-width": 2,
  })

  return { plantas, vaga, semente, anel, sy }
}
