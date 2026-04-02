import ListaProdutos from "../HomeAdmin/ListaProdutos"


function HomeUsuario({ setTela, usuario, produtos, aumentarQuantidade, diminuirQuantidade }) {
  const handleLogout = () => {
    setTela("login"); 
  };
 



  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-info">
          <h1>Consulta de Estoque</h1>
          <p>Operador: <strong>{usuario}</strong></p>
        </div>
       <button className="btn-logout" onClick={handleLogout}>Sair</button>
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