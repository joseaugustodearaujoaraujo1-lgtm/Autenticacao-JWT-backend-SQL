import pool from "../config/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import EnviarCodigoEmail from "./nodemailerEnviar.js"

const secret = process.env.SECRET

export async function cadastrar({ nome, email, senha }) {

    const nomeValue = nome.trim()
    const emailValue = email.trim()
    const senhaValue = senha.trim()

    if (!nomeValue) {
        const erro = new Error("Todos os campos devem estar preenchidos !")
        throw erro;
    }

    const senhaHash = await bcrypt.hash(senhaValue, 12)

    const criarRegistro = await pool.execute(
        "insert into usuario (nome , email , senha) value ( ? , ? , ?);",
        [nomeValue, emailValue, senhaHash]
    )

    const tokenJwt = jwt.sign({ email: emailValue }, secret, { expiresIn: "5m" })

    return { Usuario: { nomeValue, emailValue, senhaHash }, token: tokenJwt }
}

export async function logar({email , senha}){

    if (!email || !senha) {
        const erro = new Error("Todos os campos devem estar preenchidos !")
        throw erro
    }

    const [[buscarDados]] = await pool.execute(
        "select email , senha from usuario where email = ? ;",
        [email , senha]
    )

    if(!buscarDados){
        const erro = new Error("Email ou senha invalidos!")
        throw erro
    }

    const verificaSenha = await bcrypt.compare(senha , buscarDados.senha)

    if(!verificaSenha){
        const erro = new Error("Email ou senha invalidos!")
        throw erro
    }

    const tokenJwt = jwt.sign({email: buscarDados.email} , secret , {expiresIn: "5m"})

    return {resposta: "Usuario autenticacdo com susseco!" , token: tokenJwt}
}

export async function enviarcodigo({email}){
     
    const [[verificarEmail]] = await pool.execute(
        "select email , nome from usuario where email = ?;",
        [email]
    )

    if(!verificarEmail){
        const erro = new Error("Email inexitente!")
        throw erro
    }

    const codigo = Math.floor(Math.random() * 999999) - 100000
    const codigoJwt = jwt.sign({codigo: codigo} , secret , {expiresIn: "2m"})

    console.log(codigo)

    EnviarCodigoEmail(verificarEmail.nome , email , codigo )

    return {email , codigoJwt}
}

export function verificarcodigo({codigoJwt , codigo , email}){
    const verificando = jwt.verify(codigoJwt , secret)

    if(!verificando){
        const erro = new Error("Codigo invalido ou expirado!")
        throw erro
    }

    console.log(verificando.codigo)

    if(verificando.codigo !== codigo){
        const erro = new Error("Codigo invalido ou expirado!")
        throw erro
    }

    const tokenJwt = jwt.sign({email:email} , secret , {expiresIn: "2m"})

    return { tokenJwt}
}

export async function redefinirsenha({senha , confirmarSenha , email}){
    
    if(senha !== confirmarSenha){
        const erro = new Error("A senha não são iguais!")
        throw erro
    }

    const senhaHash = await bcrypt.hash(senha , 12)

    const redefinirSenha = await pool.execute(
        "update usuario set senha = ? where email = ?;",
        [senhaHash , email]
    )

    const tokenJwt = jwt.sign({email:email} , secret , {expiresIn: "5m"})

    return {resposta: "Senha redefinida com susseco!" , token: tokenJwt}
}