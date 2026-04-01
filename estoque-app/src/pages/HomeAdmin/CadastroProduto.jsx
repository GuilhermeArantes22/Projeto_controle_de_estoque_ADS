import { useState } from "react"

function CadastroProduto({ adicionarProduto }) {
  const [nome, setNome] = useState("")
  const [quantidade, setQuantidade] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
      if (nome === "" || quantidade === "") {
    alert("Preencha todos os campos!")
    return
  }

    const novoProduto = {
      id: Date.now(),
      nome: nome,
      quantidade: Number(quantidade)
    }

    adicionarProduto(novoProduto)

    setNome("")
    setQuantidade("")
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