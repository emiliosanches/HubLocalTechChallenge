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
- Material UI

## Como instalar e executar o projeto

Passo a passo:

1. Clone o repositório
2. Entre no diretório do projeto utilizando um terminal (`cd path/to/repo`)
3. Execute `yarn` ou `npm i` nas duas janelas de terminal
4. Adicione um arquivo .env em cada um dos diretórios, com o formato abaixo, substituindo os valores de acordo com o seu ambiente de execução

```shell
VITE_SERVER_URL='http://localhost:3000/'
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

### 4. Página de cadastro de usuario

Com o Redux e Axios funcionando, a tela de cadastro de usuário foi iniciada com a implementação do layout e, em seguida, a funcionalidade.
Foi utilizada a biblioteca react-toastify para informar erros ao usuário, e o uso da mesma biblioteca foi implementado na tela de login.
Após o cadastro, o login é feito automaticamente.

### 5. Validação de formulário

Os formulários são validados por um schema do Zod usando o zodResolver do react-hook-form.
Na tela de cadastro, há validação no comprimento do nome do usuário, formato do e-mail e força da senha.
Na tela de login, apenas é validado se os campos foram preenchidos.

### 6. Persistência de estado

Com o redux-persist, foi implementada a persistência de estado para que, ao recarregar a página ou alterar a url diretamente na barra de endereço, o usuário logado seja preservado.

### 7. Remoção do DefaultLayout e implementação do Header

Enquanto implementava o Header, percebi que havia um problema em utilizá-lo em um layout - como estava sendo feito anteriormente: ele precisa ter acesso aos dados internos da página (nome da empresa, na tela de listagem de locais).
Para conseguir fazer isso, eu deveria salvar esse dado no meu estado global com Redux ou com um Contexto. No entanto, essa solução seria algo muito maior do que o problema que temos, portanto, optei por remover o DefaultLayout e chamar o componente Header diretamente nas páginas de listagem de empresas e locais.
Assim, o nome da empresa pôde ser passado ao Header por meio de props.

### 8. Componente PageGuard

Como o DefaultLayout foi removido, as rotas de listagem de empresas e locais ficaram desprotegidas (já que era o DefaultLayout quem possuia a lógica para redirecionar à tela de login caso o usuário não estivesse autenticado).
Portanto, criei o componente PageGuard, que não possui nenhum layout, retornando apenas o Outlet (restante da página), com essa verificação.

### 9. Página de listagem de empresas

A página de listagem de empresas foi implementada utilizando os componentes de tabela e paginação do MaterialUI, assim como os modais de criação, atualização e exclusão de empresas foram criados utilizando os componentes de Modal do MUI.
O footer da tabela (paginação) ficou diferente do proposto no protótipo do figma pois foi utilizado o componente do MUI.
O modal de criação de empresa e o modal de atualização de empresa são o mesmo componente, porém, quando recebe uma propriedade com os dados de uma empresa, usa esses dados como valor padrão e, ao salvar, utiliza o endpoint de atualização.

### 10. Página de listagem de locais

A página de listagem de locais foi implementada com base na listagem de empresas. Além das alterações de texto, formulário, nomes de variáveis e funções e lógica de comunicação com a API, foi implementado uma verificação para caso o usuário tente acessar a página de uma empresa que não possui acesso.
Caso não houvesse essa verificação, apenas seria exibida uma mensagem de erro genérica. No entanto, essa implementação redireciona o usuário à listagem de empresas e informa que ele não possui acesso à empresa que tentou visualizar.

> This is a challenge by [Coodesh](https://coodesh.com/)
