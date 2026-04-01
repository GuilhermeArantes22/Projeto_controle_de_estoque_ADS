function ListaProdutos({ produtos, aumentarQuantidade, diminuirQuantidade, removerProduto, ehAdmin }) {
  return (
    <div className="card-lista">
      <h2 className="titulo-secao">📋 Estoque Atual</h2>

      <div className="tabela-container">
        <table className="tabela-estilizada">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th className="coluna-acoes">Ações</th>
            </tr>
          </thead>

          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td className="nome-produto">{produto.nome}</td>
                <td>
                  <span className={`badge-quantidade ${produto.quantidade < 5 ? 'estoque-baixo' : ''}`}>
                    {produto.quantidade}
                  </span>
                </td>
                <td className="acoes">
                  <button 
                    className="btn-acao btn-mais" 
                    onClick={() => aumentarQuantidade(produto.id)}
                  >
                    +
                  </button>
                  <button 
                    className="btn-acao btn-menos" 
                    onClick={() => diminuirQuantidade(produto.id)}
                  >
                    -
                  </button>
                  
                  {/* Só mostra o botão de lixeira se for Admin */}
                  {ehAdmin && (
                    <button 
                      className="btn-acao btn-remover" 
                      onClick={() => removerProduto(produto.id)}
                    >
                      🗑️
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {produtos.length === 0 && (
          <p className="lista-vazia">Nenhum produto cadastrado no momento.</p>
        )}
      </div>
    </div>
  )
}

export default ListaProdutos