# NLW Primeira API

Este projeto é uma API desenvolvida durante a trilha Node.js da Rocketseat, com o objetivo de praticar conceitos fundamentais do desenvolvimento backend utilizando Node.js.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para criação de APIs RESTful.
- **SQLite**: Banco de dados leve e fácil de configurar.
- **Knex.js**: Query builder para integração com bancos de dados SQL.
- **Jest**: Framework de testes automatizados.

## Funcionalidades

- Cadastro de usuários.
- Criação e listagem de entidades (exemplo: pontos de coleta, produtos, etc.).
- Autenticação e autorização de usuários.
- Validação de dados de entrada.
- Testes automatizados das rotas principais.

## Estrutura do Projeto

```
├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── database
│   └── app.js
├── tests
├── package.json
└── README.md
```

## Como Executar

1. Instale as dependências:
  ```bash
  npm install
  ```
2. Configure o banco de dados:
  ```bash
  npx knex migrate:latest
  ```
3. Inicie a aplicação:
  ```bash
  npm start
  ```
4. Para rodar os testes:
  ```bash
  npm test
  ```

## Considerações Importantes

- O projeto segue boas práticas de organização de código e separação de responsabilidades.
- As rotas estão documentadas e seguem o padrão REST.
- O uso de variáveis de ambiente é recomendado para dados sensíveis.
- O README pode ser atualizado conforme novas funcionalidades forem implementadas.

## Licença

Este projeto está sob a licença MIT.

## Rotas da Aplicação

A API possui as seguintes rotas principais:

### Usuários

- `POST /users`  
  Cria um novo usuário.  
  **Body:** `{ "name": "Nome", "email": "email@exemplo.com", "password": "senha" }`

- `POST /sessions`  
  Realiza login do usuário e retorna um token JWT.  
  **Body:** `{ "email": "email@exemplo.com", "password": "senha" }`

### Entidades (Exemplo: Pontos de Coleta)

- `POST /entities`  
  Cria uma nova entidade.  
  **Body:** `{ "name": "Nome", "description": "Descrição" }`  
  **Auth:** Requer token JWT.

- `GET /entities`  
  Lista todas as entidades cadastradas.  
  **Auth:** Requer token JWT.

- `GET /entities/:id`  
  Detalha uma entidade específica pelo ID.  
  **Auth:** Requer token JWT.

### Observações

- Todas as rotas protegidas exigem o envio do token JWT no header `Authorization: Bearer <token>`.
- As respostas seguem o padrão JSON.
- Para mais detalhes sobre os parâmetros e exemplos de resposta, consulte a documentação das rotas no código-fonte.

<!-- Crie uma seção contendo um diagrama mermaid com o fluxo mais importante da api -->
## Diagrama das Tabelas do Banco de Dados

```mermaid
  USERS {
    int id PK
    string name
    string email
    string password
    datetime created_at
  }
  
  ENTITIES {
    int id PK
    string name
    string description
    int user_id FK
    datetime created_at
  }
```
