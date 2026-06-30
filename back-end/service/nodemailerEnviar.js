import configuracoesDeEnvio from "../config/nodemailer.js";

export default function EnviarCodigoEmail(nome , email , codigo){
    const enviarCodigo = configuracoesDeEnvio.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: `Olá ${nome} indentificamos uma suposta redefinicao de senha por meio de sua conta!\nSe isso foi um engano, ignore este email caso tenha sido mesmo voçê considere o codigo e as instruçoes abaixo!`,
        html: `<h3>Caso tenha sido mesmo voçê que solicitou a redefinição de senha da sua conta insira o codigo abaixo no campo de inserir o codigo na etapa verificacao de email! </h3></br><h1>Seu codigo: ${codigo}</h1>`
    })
}