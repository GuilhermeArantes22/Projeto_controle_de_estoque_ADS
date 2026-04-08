# Sistema de Controle de Estoque (Front-end)

## 📌 Objetivo

Desenvolver um sistema de controle de estoque com dois perfis:

* Administrador
* Usuário

O administrador pode cadastrar, alterar e remover produtos.
O usuário pode apenas visualizar e movimentar quantidades.

---

## 🛠 Tecnologias Utilizadas

* React
* JavaScript
* useState
* useEffect
* localStorage
* CSS básico

---

## 👥 Perfis do Sistema

### Administrador

* Cadastrar produtos
* Visualizar lista
* Aumentar quantidade
* Diminuir quantidade
* Remover produto

### Usuário

* Visualizar lista
* Aumentar quantidade
* Diminuir quantidade
* Não pode cadastrar
* Não pode remover

---

## 📦 Funcionalidades Implementadas

* Tela de login com escolha de perfil
* Separação entre área Admin e Usuário
* Cadastro de produtos
* Listagem de produtos
* Controle de quantidade (+ / -)
* Exclusão de produtos (Admin)
* Validação de formulário
* ID automático com Date.now()
* Estado global no App.jsx
* Compartilhamento de dados entre telas
* Persistência com localStorage
* Estrutura básica de CSS

---

## 🧠 Estrutura do Projeto

App.jsx controla:

* estado global dos produtos
* navegação entre telas
* funções de estoque

Estrutura de componentes:

App
├── Login
├── HomeAdmin
│    ├── CadastroProduto
│    └── ListaProdutos
└── HomeUsuario

---

## 📊 Modelo de Produto

Cada produto segue a estrutura:

{
id: number,
nome: string,
quantidade: number
}

---

## 🔄 Fluxo de Funcionamento

1. Usuário realiza login
2. Sistema identifica perfil
3. Admin pode cadastrar produtos
4. Produtos aparecem na lista
5. Quantidade pode ser alterada
6. Admin pode excluir produtos
7. Dados são salvos no localStorage
8. Ao atualizar a página, os dados permanecem

---

## 💾 Persistência

Os dados são armazenados no navegador utilizando localStorage, garantindo que os produtos não sejam perdidos ao atualizar a página.

---

## 🚀 Status Atual

✔ Front-end funcional
✔ Separação de perfis
✔ CRUD completo
✔ Persistência local
✔ Validação básica

Próximos passos:

* Estilização CSS
* Integração com backend
* Melhorias de UX

