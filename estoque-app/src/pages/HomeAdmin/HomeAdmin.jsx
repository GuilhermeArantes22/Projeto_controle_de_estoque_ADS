import { useState } from "react"
import ListaProdutos from "./Listaprodutos"
import CadastroProduto from "./CadastroProduto"


function HomeAdmin() {
  const [produtos, setProdutos] = useState([])

  function adicionarProduto(novoProduto) {
    setProdutos([...produtos, novoProduto])
  }

  function aumentarQuantidade(id) {
    const novaLista = produtos.map((produto) => {
      if (produto.id === id) {
        return {
          ...produto,
          quantidade: produto.quantidade + 1
        }
      }
      return produto
    })

    setProdutos(novaLista)
  }

  function diminuirQuantidade(id) {
    const novaLista = produtos.map((produto) => {
      if (produto.id === id && produto.quantidade > 0) {
        return {
          ...produto,
          quantidade: produto.quantidade - 1
        }
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
    <div>
      <h1>Área do Administrador</h1>

      <CadastroProduto adicionarProduto={adicionarProduto} />

      <ListaProdutos
        produtos={produtos}
        aumentarQuantidade={aumentarQuantidade}
        diminuirQuantidade={diminuirQuantidade}
        removerProduto={removerProduto}
      />
    </div>
  )
}

export default HomeAdmin