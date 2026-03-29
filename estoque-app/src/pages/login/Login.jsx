import { useState } from "react"

function Login({setTela}) {
  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")

  function handleLogin() {
     if (usuario === "admin" && senha === "1234") {
    setTela("admin")
  } else if (usuario === "user" && senha === "123") {
    setTela("user")
  } else {
alert("Login inválido")
  }

  }

  return (
    <div>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Entrar</button>
    </div>
  )
}

export default Login