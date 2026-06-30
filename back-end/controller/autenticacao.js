import {cadastrar , logar , enviarcodigo , verificarcodigo , redefinirsenha} from "../service/autenticacao.js";

export async function CadastrarUsuario(req , res , next){
    try {
        const {Usuario , token} = await cadastrar(req.body)

        return res.status(201).json({Registro : Usuario , token:  token})
    } catch (error) {
        next(error)
    }
}

export async function LogarUsuario(req , res , next){
    try {
        const { resposta , token} = await logar(req.body)

        return res.status(201).json({resposta: resposta , token:token})
    } catch (error) {
        next(error)
    }
}

export async function EnviarCodigo(req , res , next){
    try {
        const {email , codigoJwt} = await enviarcodigo(req.body)

        return res.status(200).json({resposta: `Codigo enviado para e-mail ${email} com susseco!` , codigo: codigoJwt})
    } catch (error) {
        next(error)
    }
}

export async function VerificarCodigo(req , res , next){
    try {
        const {tokenJwt} = await verificarcodigo(req.body)

        return res.status(200).json({resposta: `Codigo correto!` , token: tokenJwt})
    } catch (error) {
        next(error)
    }
}

export async function RedefinirSenha(req , res , next){
    try {
        const {resposta , token} = await redefinirsenha(req.body)

        return res.status(200).json({resposta: resposta , token: token})
    } catch (error) {
        next(error)
    }
}
