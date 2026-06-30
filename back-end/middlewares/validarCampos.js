import pool from "../config/db.js";

export function ValidarSenhaCadastro(req, res, next) {
    try {
        const { senha } = req.body

        if (!senha) {
            const erro = new Error("Todos os campos deveme estar preenchidos!")
            throw erro;
        }

        const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if (!regexSenha.test(senha)) {
            const erro = new Error("Mínimo de 8 caracteres, Pelo menos uma letra minúscula, Pelo menos uma letra maiúscula, Pelo menos um número e Pelo menos um caractere especial")
            throw erro;
        }

        next()
    } catch (error) {
        next(error)
    }
}

export async function ValidarEmailCadastro(req, res, next) {
    try {
        const { email } = req.body

        if (!email) {
            const erro = new Error("Todos os campos devem estar preenchidos!")
            throw erro;
        }

        const [vericarDuplicacao] = await pool.execute(
            "select email from usuario where email = ?;",
            [email]
        )

        console.log(vericarDuplicacao)

        if(vericarDuplicacao.length !== 0){
            const erro = new Error("Email já exitente, troce por favor!")
            throw erro;
        }

        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!regexEmail.test(email)) {
            const erro = new Error("Letras, números, pontos, sublinhados e sinais comuns antes do @.O caractere @ obrigatório, O nome do servidor (ex: gmail, outlook), Um ponto seguido do TLD (ex: .com, .com.br) com no mínimo 2 letras.")
            throw erro;
        }

        next()
    } catch (error) {
        next(error)
    }
}

export async function ValidarEmailLogin(req, res, next) {
    try {
        const { email } = req.body

        if (!email) {
            const erro = new Error("Todos os campos devem estar preenchidos!")
            throw erro;
        }

        const [vericarDuplicacao] = await pool.execute(
            "select email from usuario where email = ?;",
            [email]
        )

        

        if(vericarDuplicacao.length === 0){
            const erro = new Error("Email inexitente, troce por favor!")
            throw erro;
        }

        next()
    } catch (error) {
        next(error)
    }
}