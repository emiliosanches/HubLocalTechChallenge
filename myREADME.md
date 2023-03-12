# Teste Técnico - Fullstack Javascript Developer - Frontend

Esse repositório contem o backend de um teste técnico para a vaga de FullStack Javascript Developer na HubLocal. Trata-se de uma interface em React com autenticação, formulários de cadastro e telas de listagem.

## Tecnologias utilizadas

- React
- TypeScript
- Redux + Redux Persist
- Axios
- Styled Components
- React Toastify
- Zod
- React Hook Form

## Como instalar e executar o projeto

Passo a passo:

1. Clone o repositório
2. Entre no diretório do projeto utilizando um terminal (`cd path/to/repo`)
3. Execute `yarn` ou `npm i` nas duas janelas de terminal
4. Adicione um arquivo .env em cada um dos diretórios, com o formato abaixo, substituindo os valores de acordo com o seu ambiente de execução

```shell
# web
```

5. Execute `yarn dev` ou `npm run dev` para executar a aplicação
6. Acesse a URL mostrada no terminal

## Documentação do processo de desenvolvimento

Abaixo, a documentação do desenvolvimento da aplicação.

### 1. Definição das rotas

O primeiro passo, após inicializar o projeto, foi definir as rotas. A partir do layout no figma, identifiquei 4 páginas: cadastro, login, listagem de empresas e listagem de locais.
Criei as quatro rotas e dois layouts: um para as páginas de listagem (acessadas após o login) - chamado DefaultLayout - e um para as páginas de login e cadastro - chamado AuthLayout.

### 2. Funcionalidade de Login

Após as rotas estarem definidas, criei um formulário na tela de login (sem estilização) para integrar com o react-hook-form e implementar a chamada de login com axios.
Logo após, instalei o redux, configurei, e implementei o armazenamento do token e usuário logado no estado global, bem como o redirecionamento baseado na autenticação nos layouts (caso não esteja logado, redirecionar para a página de login; caso esteja, redirecionar para a listagem de empresas).

### 3. Estilização

Com a funcionalidade de login pronta e o Redux configurado, iniciei a estilização pelo AuthLayout, seguindo o proposto no protótipo do figma, utilizando styled-components para definir os estilos.
Em seguida, o restante da página de login foi estilizado.

> This is a challenge by [Coodesh](https://coodesh.com/)
