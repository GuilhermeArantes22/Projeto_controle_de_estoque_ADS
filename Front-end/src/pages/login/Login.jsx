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
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="login-icon">⛪</span>
          <h2>Acesso ao Sistema</h2>
          <p>Controle de Estoque - Igreja</p>
        </div>

        <div className="login-form">
          <div className="input-group">
            <label>Usuário</label>
            <input
              type="text"
              placeholder="Digite o usuário"
              className="login-input"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite a senha"
              className="login-input"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button className="btn-login" onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login