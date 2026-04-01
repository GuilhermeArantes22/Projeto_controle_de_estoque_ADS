import CadastroProduto from "./CadastroProduto"
import ListaProdutos from "./ListaProdutos"

function HomeAdmin({ usuario, produtos, adicionarProduto, aumentarQuantidade, diminuirQuantidade, removerProduto }) {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-info">
          <h1>Painel Administrativo</h1>
          <p>Bem-vindo, <strong>{usuario}</strong> 👋</p>
        </div>
        <button className="btn-logout">Sair</button>
      </header>

      <main className="home-content">
        {/* Seção de Cadastro */}
        <section className="secao-cadastro">
          <CadastroProduto adicionarProduto={adicionarProduto} />
        </section>

        {/* Seção da Lista */}
        <section className="secao-lista">
          <ListaProdutos 
            produtos={produtos} 
            aumentarQuantidade={aumentarQuantidade} 
            diminuirQuantidade={diminuirQuantidade} 
            removerProduto={removerProduto}
            ehAdmin={true} // Passamos true para mostrar a lixeira
          />
        </section>
      </main>
    </div>
  )
}

export default HomeAdmin