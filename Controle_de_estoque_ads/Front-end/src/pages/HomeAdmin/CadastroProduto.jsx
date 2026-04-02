import { useState } from "react"

function CadastroProduto({ adicionarProduto }) {
  const [nome, setNome] = useState("")
  const [quantidade, setQuantidade] = useState("")

  // Transformamos a função em assíncrona (async)
  async function handleSubmit(e) {
    e.preventDefault()
    
    if (nome === "" || quantidade === "") {
      alert("Preencha todos os campos!")
      return
    }

    // Criamos o objeto apenas com os dados que o Back-end espera
    const novoProdutoAPI = {
      nome: nome,
      quantidade: Number(quantidade)
    }

    try {
      // Fazemos a chamada para o seu FastAPI
      const resposta = await fetch("http://127.0.0.1:8000/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoProdutoAPI),
      })

      if (resposta.ok) {
        // O back-end nos devolve o produto já com o ID do banco
        const produtoSalvo = await resposta.json()
        
        // Atualizamos a lista no React com o produto "oficial"
        adicionarProduto(produtoSalvo)

        // Limpa os campos
        setNome("")
        setQuantidade("")
      } else {
        alert("Erro ao salvar o produto no servidor.")
      }
    } catch (error) {
      console.error("Erro de conexão:", error)
      alert("Não foi possível conectar ao servidor Python. Verifique se o Uvicorn está rodando!")
    }
  }

  return (
    <div className="card-cadastro">
      <h2 className="titulo-cadastro">Cadastrar Produto</h2>

      <form onSubmit={handleSubmit} className="form-cadastro">
        <div className="input-group">
          <input
            type="text"
            placeholder="Nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </div>  

        <button type="submit" className="btn-cadastrar">Cadastrar</button>
      </form>
    </div>
  )
}

export default CadastroProduto