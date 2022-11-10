import brcrypt from 'bcryptjs'

const authControllers = {
    async loginFaculty(req,res){
        try {
            
        } catch (error) {
            return res.status(500).json({status:500,message:"Internal Server Error",error})
        }
    },
    async registerFaculty(req,res){
        try {
            
        } catch (error) {
            return res.status(500).json({status:500,message:"Internal Server Error",error})
        }
    },
}

export default authControllers;