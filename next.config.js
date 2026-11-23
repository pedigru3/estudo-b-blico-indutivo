/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // A página principal agora é a apresentação do app Só Bíblia.
  // Temporário (307) para poder voltar atrás sem cache de navegador.
  async redirects() {
    return [{ source: "/", destination: "/so-biblia", permanent: false }]
  },
}

module.exports = nextConfig
