import { Router } from "express";
import {CadastrarUsuario , LogarUsuario , EnviarCodigo , VerificarCodigo , RedefinirSenha} from "../controller/autenticacao.js";
import { ValidarEmailCadastro , ValidarSenhaCadastro , ValidarEmailLogin } from "../middlewares/validarCampos.js";
import ValidadarToken from "../middlewares/validarToken.js";

const router = Router()

router.post("/cadastrar" , ValidarEmailCadastro , ValidarSenhaCadastro, CadastrarUsuario )

router.post("/logar" , ValidarEmailLogin , LogarUsuario )

router.post("/enviar-codigo" , EnviarCodigo)

router.post("/verificar-codigo" , VerificarCodigo)

router.use(ValidadarToken)

router.post("/redefinir-senha" , RedefinirSenha )

export default router