
import { useState } from "react"
import Login from "./pages/login/Login"
import HomeAdmin from "./pages/HomeAdmin/HomeAdmin"
import HomeUsuario from "./pages/HomeUsuarios/HomeUsuario"

function App() {
 const [tela, setTela] = useState("login")
  const [produtos, setProdutos] = useState([])
  
   function adicionarProduto(novoProduto) {
    setProdutos([...produtos, novoProduto])

 
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
    const novaLista = produtos.map((produto) => {
      if (produto.id === id && produto.quantidade > 0) {
        return { ...produto, quantidade: produto.quantidade - 1 }
      }
      return produto
    })
    setProdutos(novaLista)
  }
   function removerProduto(id) {
    const novaLista = produtos.filter((produto) => produto.id !== id)
    setProdutos(novaLista)
  }

 
 
 return (
     <>
      {tela === "login" && <Login setTela={setTela} />}

      {tela === "admin" && (
        <HomeAdmin
          produtos={produtos}
          adicionarProduto={adicionarProduto}
          aumentarQuantidade={aumentarQuantidade}
          diminuirQuantidade={diminuirQuantidade}
          removerProduto={removerProduto}
        />
      )}

      {tela === "user" && (
        <HomeUsuario
          produtos={produtos}
          aumentarQuantidade={aumentarQuantidade}
          diminuirQuantidade={diminuirQuantidade}
        />
      )}
    </>
  )
}



export default App