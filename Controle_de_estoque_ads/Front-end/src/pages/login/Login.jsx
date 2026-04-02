import { useState } from "react"

function Login({ setTela, setUsuario }) {
  const [usuarioLocal, setUsuarioLocal] = useState("")
  const [senha, setSenha] = useState("")

  // Transformamos a função em assíncrona para usar o fetch
  async function handleLogin() {
    
    // Verificação simples antes de chamar o servidor
    if (usuarioLocal === "" || senha === "") {
      alert("Por favor, preencha todos os campos.")
      return
    }

    try {
      // Fazemos a chamada para a nova rota de login no seu FastAPI
      const resposta = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usuarioLocal,
          password: senha
        }),
      })

      if (resposta.ok) {
        // O Python retorna um objeto como: { "username": "admin", "role": "admin" }
        const dadosUsuario = await resposta.json()
        
        // Salvamos o nome no estado global do App.jsx
        setUsuario(dadosUsuario.username) 
        
        // Mudamos para a tela correspondente ("admin" ou "user")
        setTela(dadosUsuario.role) 
      } else {
        // Se o status não for 200 (ex: 401), o login falhou
        alert("Usuário ou senha incorretos!")
      }
    } catch (error) {
      console.error("Erro na conexão:", error)
      alert("Não foi possível conectar ao servidor. O Uvicorn está rodando?")
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
              value={usuarioLocal}
              onChange={(e) => setUsuarioLocal(e.target.value)}
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