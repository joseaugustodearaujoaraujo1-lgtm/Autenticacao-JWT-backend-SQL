import dotenv from "dotenv"
import nodemailer from "nodemailer"

dotenv.config()

const configuracoesDeEnvio = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_SENHA
    }
})

export default configuracoesDeEnvio