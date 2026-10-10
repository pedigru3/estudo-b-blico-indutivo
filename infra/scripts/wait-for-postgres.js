const { exec } = require("node:child_process")

function checkPostgres() {
  exec(
    "docker exec estudo-biblico-postgres-dev pg_isready --host localhost",
    handleReturn,
  )

  function handleReturn(error, stdout) {
    if (!stdout || stdout.search("accepting connections") === -1) {
      process.stdout.write(".")
      setTimeout(checkPostgres, 200)
      return
    }

    process.stdout.write("\n🟢 Postgres está pronto e aceitando conexões!\n")
  }
}

process.stdout.write("\n🔴 Aguardando Postgres aceitar conexões...")
checkPostgres()
