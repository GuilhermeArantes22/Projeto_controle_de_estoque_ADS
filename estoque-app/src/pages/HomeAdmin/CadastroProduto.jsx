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
    <div>
      <h2>Cadastrar Produto</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />

        <br /><br />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}

export default CadastroProduto