# Projeto Twitter

## Backend - Rotas

### Autenticação

- **POST /api/token/**: Para login (gera o token).
- **POST /api/token/refresh/**: Para atualizar o token.

### Feed e Trends

- **GET /api/feeds/**: Carregar o feed.
- **GET /api/trends/**: Carregar os trends.

### Tweets

- **GET /api/tweets/**: Listar todos os tweets.
- **POST /api/tweets/**: Enviar um novo tweet.
- **PUT /api/tweets/:id/**: Atualizar um tweet.
- **DELETE /api/tweets/:id/**: Deletar um tweet.
- **GET /api/tweets/:id/**: Detalhes de um tweet específico.
- **POST /api/tweets/:id/comment/**: Comentar em um tweet.
- **POST /api/tweets/:id/like/**: Dar like em um tweet.

### Usuários

- **GET /api/usuarios/**: Listar todos os usuários.
- **Post /api/usuarios/**: Criar um usuario (Cadastro de usuarios usando essa rota)
- **GET /api/usuarios/:id/**: Obter dados de um usuário pelo ID.
- **POST /api/usuarios/:id/follow/**: Seguir ou parar de seguir um usuário.
- **GET /api/usuarios/me/**: Obter dados do usuário logado (usando o token).

### Outros

- **GET /media/<path>**: Servir arquivos de mídia.

---

## Explicação das Rotas

### Autenticação
- **/api/token/**: Endpoint para autenticação do usuário, gerando um token JWT.
- **/api/token/refresh/**: Endpoint para renovar o token de autenticação.

### Feed e Trends
- **/api/feeds/**: Endpoint para carregar o feed, mostrando os tweets mais recentes.
- **/api/trends/**: Endpoint para carregar os trends, ou tópicos mais comentados no momento.

### Tweets
- **/api/tweets/**: Endpoint para listar todos os tweets ou criar um novo tweet.
- **/api/tweets/:id/**: Endpoint para obter detalhes de um tweet específico ou atualizar/deletar um tweet.
- **/api/tweets/:id/comment/**: Endpoint para comentar em um tweet.
- **/api/tweets/:id/like/**: Endpoint para dar like ou remover o like de um tweet.

### Usuários
- **/api/usuarios/**: Endpoint para listar todos os usuários.
- **/api/usuarios/:id/**: Endpoint para obter dados de um usuário específico pelo ID.
- **/api/usuarios/:id/follow/**: Endpoint para seguir ou parar de seguir um usuário.
- **/api/usuarios/me/**: Endpoint para obter os dados do usuário autenticado (usando o token).

---

## Informações adicionais

Para mais detalhes, você pode executar o comando `python manage.py show_urls` para listar todas as rotas disponíveis no backend.
