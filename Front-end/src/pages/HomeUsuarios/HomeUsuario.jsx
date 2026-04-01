import ListaProdutos from "../HomeAdmin/ListaProdutos"

function HomeUsuario({ usuario, produtos, aumentarQuantidade, diminuirQuantidade }) {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-info">
          <h1>Consulta de Estoque</h1>
          <p>Operador: <strong>{usuario}</strong></p>
        </div>
        <button className="btn-logout">Sair</button>
      </header>

      <main className="home-content">
        <section className="secao-lista">
          <ListaProdutos 
            produtos={produtos} 
            aumentarQuantidade={aumentarQuantidade} 
            diminuirQuantidade={diminuirQuantidade} 
            ehAdmin={false} // Passamos false para esconder a lixeira
          />
        </section>
      </main>
    </div>
  )
}

export default HomeUsuario