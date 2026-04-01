
import { useState } from "react"
import Login from "./pages/login/Login"
import HomeAdmin from "./pages/HomeAdmin/HomeAdmin"
import HomeUsuario from "./pages/HomeUsuarios/HomeUsuario"
import "./App.css"

function App() {
 const [tela, setTela] = useState("login")
 const [usuario, setUsuario] = useState(null)
  const [produtos, setProdutos] = useState([])
  
   function adicionarProduto(novoProduto) {
  const produtoComPadrao = {
    ...novoProduto,
    quantidade: novoProduto.quantidade || 0,
    id: Date.now()
  }

 setProdutos((prev) => [...prev, produtoComPadrao])
}
   function aumentarQuantidade(id) {
    const novaLista = produtos.map((produto) => {
      if (produto.id === id) {
        return { ...produto, quantidade: produto.quantidade + 1 }
      }
      return produto
    })
    setProdutos(novaLista)
  }
  function diminuirQuantidade(id) {
  setProdutos((prev) =>
    prev.map((produto) =>
      produto.id === id
        ? {
            ...produto,
            quantidade: Math.max(0, produto.quantidade - 1)
          }
        : produto
    )
  )
}
  
   function removerProduto(id) {
    const novaLista = produtos.filter((produto) => produto.id !== id)
    setProdutos(novaLista)
  }

 
 
 return (
     <div className="app-container">
      {tela === "login" && (
      <Login setTela={setTela} setUsuario={setUsuario}/>
      )}



      {tela === "admin" && (
        <div className="painel-geral">
        <HomeAdmin
        usuario={usuario}

          produtos={produtos}
          adicionarProduto={adicionarProduto}
          aumentarQuantidade={aumentarQuantidade}
          diminuirQuantidade={diminuirQuantidade}
          removerProduto={removerProduto}
        />
        </div>
      )}

      {tela === "user" && (
        <div className="painel-geral">
          <HomeUsuario
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