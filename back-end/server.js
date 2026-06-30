import cors from "cors"
import morgan from "morgan"
import express from "express"
import mySql2 from "mysql2"
import dotenv from "dotenv"
import pool from "./config/db.js"
import RotasDeAutenticacao from "./routes/autenticacao.js"

dotenv.config()

const app = express()
const porta = process.env.PORTA

async function VerificarConexao(){
    try {
        const pegarConexao = pool.getConnection()
        console.log("Conectado com susseco!")
        ;(await pegarConexao).release()
    } catch (error) {
        console.log("Erro ao conectar!")
    }
}

VerificarConexao()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

app.use("/v1/auth" , RotasDeAutenticacao)

app.use((req , res , next) => { res.status(404).json({"Resposta":"Rota não encontrada!"})})
app.use((err , req , res , next) => { res.status(500).json({"Resposta": err.message})})

app.listen(porta , () => {
    console.log(`http://localhost:${porta}`)
})