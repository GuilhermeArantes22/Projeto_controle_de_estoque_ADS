import ListaProdutos from "../HomeAdmin/Listaprodutos"

function HomeUsuario({produtos,aumentarQuantidade, diminuirQuantidade}){ 
  return (
    <div>
      <h1>Area do Usuario</h1>`
      <ListaProdutos
      produtos={produtos}
      aumentarQuantidade={aumentarQuantidade}
      diminuirQuantidade={diminuirQuantidade}/>
    </div>
  )
}


export default HomeUsuario