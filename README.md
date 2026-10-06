# Backend de autenticação com JWT

API de autenticação com cadastro, login, envio e verificação de códigos por e-mail e redefinição de senha. O código é organizado em rotas, controllers, services, middlewares e configurações.

## Tecnologias

JavaScript, Node.js, Express, MySQL, mysql2, JSON Web Token (jsonwebtoken), bcrypt, Nodemailer, CORS, Morgan e dotenv.

## Como iniciar

1. Tenha Node.js, npm e um servidor MySQL disponíveis.
2. Clone o projeto e instale os pacotes dentro de `back-end`:

```bash
git clone https://github.com/joseaugustodearaujoaraujo1-lgtm/Autenticacao-JWT-backend-SQL.git
cd Autenticacao-JWT-backend-SQL/back-end
npm install
```

3. Abra `tabela_em_sql` no MySQL Workbench ou em outro cliente MySQL e execute os comandos de criação do banco e da tabela. O arquivo não possui extensão `.sql`.
4. Copie `exemple.env` para `.env`, dentro de `back-end`, e configure:
   - `PORTA`: por exemplo, `3001`.
   - `SECRET`: chave de assinatura dos tokens JWT.
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`: conexão MySQL; substitua os valores de exemplo.
   - `DB_SCHEMA`: `sistema_authenticacao_jwt_01`, se manteve o nome do script.
   - `EMAIL` e `EMAIL_SENHA`: credenciais SMTP aceitas pela conta Gmail usada no envio; use uma senha de app quando exigida.
5. Inicie, ainda dentro de `back-end`:

```bash
npm start
```

Com `PORTA=3001`, a base da API é `http://localhost:3001/v1/auth`.

## Rotas

Todas recebem requisições `POST` com corpo JSON.

| Rota | Finalidade |
| --- | --- |
| `/v1/auth/cadastrar` | Cadastro de usuário |
| `/v1/auth/logar` | Login |
| `/v1/auth/enviar-codigo` | Envio de código por e-mail |
| `/v1/auth/verificar-codigo` | Verificação de código |
| `/v1/auth/redefinir-senha` | Redefinição de senha com validação de token pelo middleware |

## Observações

- Crie o usuário de teste pela rota de cadastro. O INSERT de exemplo em `tabela_em_sql` contém senha em texto simples e não é compatível com a comparação bcrypt do login.
- O script `npm run dev` depende de nodemon, que não está declarado no package.json atual. `npm start` executa sem essa dependência.
- As instruções foram conferidas no código; a execução completa requer banco e credenciais de e-mail.
