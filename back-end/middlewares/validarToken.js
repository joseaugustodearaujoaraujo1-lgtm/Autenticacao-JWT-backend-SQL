import jwt from "jsonwebtoken"

export default function ValidadarToken (req , res , next){
        const {authorization} = req.headers
        const token = authorization?.split(" ")[1]

        if(!token){
            return res.status(401).json("Token expirado ou invalido!")
        }

    try {
        
        const secret = process.env.SECRET 
        const verificarToken = jwt.verify(token , secret)
        next()

    } catch (error) {
        res.status(401).json("Token expirado ou invalido!")
        next(error)
    }
}