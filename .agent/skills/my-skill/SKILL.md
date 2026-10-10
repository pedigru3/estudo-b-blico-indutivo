---
name: my-skill
description: Use em toda task do projeto Estudo Bíblico.
---

Este documento serve como um guia de contexto para assistentes de IA que trabalharem neste projeto. Ele descreve os padrões arquiteturais e convenções adotadas.

## 🏗️ Arquitetura e Estrutura de Pastas

O projeto segue uma adaptação do padrão **MVP (Model-View-Presenter/Controller)**, segregando responsabilidades de forma clara:

1. **`/models`**: Contém a lógica de negócio e interações diretas com o banco de dados.
   - Exemplo: `models/user.js`, `models/migrator.js`.
   - Devem ser funções assíncronas que utilizam o `infra/database.js`.
   - Devem lançar erros customizados de `infra/errors.js`.

2. **`/infra`**: Contém a infraestrutura compartilhada.
   - `infra/controller.js`: Centraliza o roteamento, tratamento de erros (`onError`, `onNoMatch`).
   - `infra/database.js`: Abstração para consultas ao PostgreSQL.
   - `infra/errors.js`: Classes de erro customizadas (ValidationError, NotFoundError, etc).

3. **`/pages/api`**: Atuam como os Presenters/Controllers externos.
   - Utilizam `next-connect` para gerenciamento de rotas e middlewares.
   - **Regra de Ouro**: O arquivo de rota deve ser o mais magro possível, delegando a lógica para o `model` e a segurança para o `controller`.
   - Estrutura de pastas para rotas dinâmicas: `[id]/index.js` (exigência do projeto).

4. **`/tests`**: Testes de integração robustos.
   - `/tests/orchestrator.js`: "Canivete suíço" para testes. Contém helpers para limpar banco, esperar serviços, etc.
   - `/tests/api/integration`: Segue a mesma estrutura de pastas da API.
   - Os testes dentro de integration seguem um padrão de rota (GET, POST, PUT, DELETE) exemplo: `post.test.js`, `get.test.js`, `put.test.js`, `delete.test.js`.
   - IMPORTANTE: os testes são a base do código e devem possuir o caminho feliz e o caminho triste, cada situação precisa de um teste validado com dados concretos.

5. **`/components/ui` & Frontend**:
   - Sempre utilize os componentes padronizados de `@/components/ui` (`Button`, `Input`, `Card`, `Badge`, `Select`, `DatePicker`, `Switch`, `Checkbox`, `Tabs`, `Avatar`, etc.).
   - Siga rigorosamente a skill `frontend-design-system` para cores, tipografia e layouts.

## 🛠️ Convenções de Código

- Utiliza **JavaScript (ESM/Modules)**.
- Mensagens de erro sempre amigáveis com `message` e `action`.
- Testes rodam com `jest` e exigem os serviços via `orchestrator.waitForAllServices()`.

## 💻 Ambiente do Assistente (AI Agent)

Para que o Assistente de IA consiga executar comandos de terminal (`npm`, `node`, `docker`) com sucesso neste projeto, é necessário garantir que os caminhos dos binários estejam no `PATH`.

**Caminhos Obrigatórios:**

- `/opt/homebrew/bin` (Node e NPM)
- `/usr/local/bin` (Docker)

> [!TIP]
> Antes de rodar qualquer script ou teste, concatene os caminhos:
> `export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"`
