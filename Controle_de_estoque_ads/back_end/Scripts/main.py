from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select
from typing import List, Optional

# config baanco

# Tabela de Produtos
class Produto(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    quantidade: int

# Tabela Users
class Usuario(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    password: str
    role: str  # "admin" ou "user"

sqlite_url = "sqlite:///database.db"
engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

# inicando app

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    # cira usuario padrao se não existir nenhum
    with Session(engine) as session:
        if not session.exec(select(Usuario)).first():
            print("Criando usuários padrão...")
            session.add(Usuario(username="admin", password="123", role="admin"))
            session.add(Usuario(username="user", password="123", role="user"))
            session.commit()

# rotas produtos

@app.get("/produtos", response_model=List[Produto])
def listar_produtos(session: Session = Depends(get_session)):
    return session.exec(select(Produto)).all()

@app.post("/produtos", response_model=Produto)
def criar_produto(produto: Produto, session: Session = Depends(get_session)):
    session.add(produto)
    session.commit()
    session.refresh(produto)
    return produto

@app.patch("/produtos/{produto_id}")
def atualizar_quantidade(produto_id: int, nova_qtd: int, session: Session = Depends(get_session)):
    db_produto = session.get(Produto, produto_id)
    if not db_produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    db_produto.quantidade = nova_qtd
    session.add(db_produto)
    session.commit()
    session.refresh(db_produto)
    return db_produto

@app.delete("/produtos/{produto_id}")
def deletar_produto(produto_id: int, session: Session = Depends(get_session)):
    produto = session.get(Produto, produto_id)
    if not produto:
        raise HTTPException(status_code=404, detail="Não encontrado")
    session.delete(produto)
    session.commit()
    return {"ok": True}

# rota login

@app.post("/login")
def login(dados: dict, session: Session = Depends(get_session)):
    # o front-end envia um JSON com 'username' e 'password'
    username = dados.get("username")
    password = dados.get("password")
    
    # busca o usuário no banco
    statement = select(Usuario).where(Usuario.username == username)
    user = session.exec(statement).first()
    
    # Verifica se existe e se a senha bate
    if not user or user.password != password:
        raise HTTPException(status_code=401, detail="Usuário ou senha incorretos")
    
    # retorna os dados para o React decidir qual tela mostrar
    return {"username": user.username, "role": user.role}

# rota para criar usuario quando tiver o painel de criação de user
@app.post("/usuarios")
def criar_usuario(usuario: Usuario, session: Session = Depends(get_session)):
    session.add(usuario)
    session.commit()
    session.refresh(usuario)
    return {"mensagem": "Usuário criado com sucesso!"}