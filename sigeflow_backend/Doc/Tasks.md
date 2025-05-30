

# Tasks para implementação do Sigeflow

## 1. Configuração inicial e modelagem do banco

* [ ] Criar o schema Prisma com os models: Supplier, Contract, Supply, StockMovement
* [ ] Ajustar datasource e client no Prisma para conexão com PostgreSQL
* [ ] Rodar a migration para criar as tabelas no banco
* [ ] Validar esquema com Prisma Studio ou banco para garantir estrutura correta

---

## 2. Implementação das rotas CRUD básicas

### 2.1. Supplier (Fornecedor)

* [ ] Rota GET `/suppliers` — listar todos fornecedores
* [ ] Rota POST `/suppliers` — criar fornecedor (validação: nome obrigatório)
* [ ] Rota GET `/suppliers/:id` — obter fornecedor por id (verificar existência)
* [ ] Rota PUT `/suppliers/:id` — atualizar dados do fornecedor (validação)
* [ ] Rota DELETE `/suppliers/:id` — deletar fornecedor (checar vínculos com contratos)

### 2.2. Contract (Contrato)

* [ ] Rota GET `/contracts` — listar contratos
* [ ] Rota POST `/contracts` — criar contrato (validação: número, datas e supplierId)
* [ ] Rota GET `/contracts/:id` — obter contrato específico
* [ ] Rota PUT `/contracts/:id` — atualizar contrato
* [ ] Rota DELETE `/contracts/:id` — deletar contrato (validação vínculos com supplies)

### 2.3. Supply (Insumo)

* [ ] Rota GET `/supplies` — listar insumos
* [ ] Rota POST `/supplies` — criar insumo (validação: nome, unidade, minStock, contractId)
* [ ] Rota GET `/supplies/:id` — obter insumo
* [ ] Rota PUT `/supplies/:id` — atualizar insumo
* [ ] Rota DELETE `/supplies/:id` — deletar insumo (validar vínculos com movimentos)

### 2.4. StockMovement (Movimentação de estoque)

* [ ] Rota GET `/movements` — listar movimentações, filtro por supplyId opcional
* [ ] Rota POST `/movements` — criar movimentação (validação: tipo, quantidade, supplyId, data)
* [ ] Rota GET `/movements/:id` — obter movimentação específica
* [ ] Rota PUT `/movements/:id` — atualizar movimentação
* [ ] Rota DELETE `/movements/:id` — deletar movimentação

---

## 3. Funcionalidades adicionais

* [ ] Rota para consultar saldo de um supply (ex: GET `/supplies/:id/balance`)
* [ ] Rota para consultar saldo por contrato (ex: GET `/contracts/:id/balance`)
* [ ] Relatórios semanais de saldo e movimentação (backend e formato exportável)
* [ ] Tratamento detalhado de erros e respostas padronizadas (400, 404, 500, etc)

---

## 4. Frontend / Consumo da API (opcional)

* [ ] Criar formulários e tabelas para cadastro e listagem dos fornecedores, contratos, insumos e movimentações
* [ ] Dashboard simples para exibir saldo, alertas de estoque baixo, e relatórios
* [ ] Validações básicas no frontend para evitar requisições inválidas

---

## 5. Testes

* [ ] Testes unitários para funções de manipulação dos dados
* [ ] Testes de integração para as rotas principais (uso de Jest, supertest, etc)

---

## 6. Documentação final

* [ ] Atualizar documentação em Markdown com exemplos completos
* [ ] Gerar PDF com a documentação para compartilhar

