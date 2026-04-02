import { useState, useEffect } from "react"
import Login from "./pages/login/Login"
import HomeAdmin from "./pages/HomeAdmin/HomeAdmin"
import HomeUsuario from "./pages/HomeUsuarios/HomeUsuario"
import "./App.css"

const API_URL = "http://127.0.0.1:8000/produtos"

function App() {
  const [tela, setTela] = useState("login")
  const [usuario, setUsuario] = useState(null)
  const [produtos, setProdutos] = useState([])

  // 1. CARREGAR PRODUTOS (Busca do banco sempre que o App inicia)
  useEffect(() => {
    async function carregarDados() {
      try {
        const res = await fetch(API_URL)
        if (res.ok) {
          const dados = await res.json()
          setProdutos(dados)
        }
      } catch (err) {
        console.error("Erro ao carregar banco:", err)
      }
    }
    carregarDados()
  }, [])

  // 2. ADICIONAR PRODUTO (Atualiza a lista com o que veio do CadastroProduto.jsx)
  function adicionarProduto(produtoVindoDoBanco) {
    setProdutos((prev) => [...prev, produtoVindoDoBanco])
  }

  // 3. AUMENTAR QUANTIDADE
  async function aumentarQuantidade(id) {
    const produto = produtos.find((p) => p.id === id)
    const novaQtd = produto.quantidade + 1

    try {
      const res = await fetch(`${API_URL}/${id}?nova_qtd=${novaQtd}`, {
        method: "PATCH",
      })

      if (res.ok) {
        setProdutos((prev) =>
          prev.map((p) => (p.id === id ? { ...p, quantidade: novaQtd } : p))
        )
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor")
    }
  }

  // 4. DIMINUIR QUANTIDADE
  async function diminuirQuantidade(id) {
    const produto = produtos.find((p) => p.id === id)
    if (produto.quantidade <= 0) return

    const novaQtd = produto.quantidade - 1

    try {
      const res = await fetch(`${API_URL}/${id}?nova_qtd=${novaQtd}`, {
        method: "PATCH",
      })

      if (res.ok) {
        setProdutos((prev) =>
          prev.map((p) => (p.id === id ? { ...p, quantidade: novaQtd } : p))
        )
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor")
    }
  }

  // 5. REMOVER PRODUTO
  async function removerProduto(id) {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setProdutos((prev) => prev.filter((p) => p.id !== id))
      }
    } catch (err) {
      alert("Erro ao remover produto")
    }
  }

  return (
    <div className="app-container">
      {/* TELA DE LOGIN */}
      {tela === "login" && (
        <Login setTela={setTela} setUsuario={setUsuario} />
      )}

      {/* TELA DO ADMINISTRADOR (Se o banco retornar role 'admin') */}
      {tela === "admin" && (
        <div className="painel-geral">
          <HomeAdmin
            usuario={usuario}
            setTela={setTela}
            produtos={produtos}
            adicionarProduto={adicionarProduto}
            aumentarQuantidade={aumentarQuantidade}
            diminuirQuantidade={diminuirQuantidade}
            removerProduto={removerProduto}
          />
        </div>
      )}

      {/* TELA DO USUÁRIO/OPERADOR (Se o banco retornar role 'user') */}
      {tela === "user" && (
        <div className="painel-geral">
          <HomeUsuario
            setTela={setTela}
            usuario={usuario}
            produtos={produtos}
            aumentarQuantidade={aumentarQuantidade}
            diminuirQuantidade={diminuirQuantidade}
          />
        </div>
      )}
    </div>
  )
}

export default App