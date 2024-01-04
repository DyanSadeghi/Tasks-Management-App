import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema,rules} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
  public async login({ request, response ,auth}: HttpContextContract) {

    const payload = await request.validate({
        schema: schema.create({
            email: schema.string([rules.email()]),
            password: schema.string(),
        
        })
    })
    try {
        const token = await auth.use("api").attempt(payload.email,payload.password)
        const userId = auth.user?.id;
        return response.json({status:200,message:"you are logged in",token,userId})
    } catch (error) {
        return response.unauthorized("invalid informations")
    }
  }
  public async register({request,response}: HttpContextContract){
    const payload = await request.validate(RegisterValidator)
    try {
    
        
        await User.create(payload)
        return response.status(200).json({message:"account created"})
    } catch (error) {
      
        return response.status(500).json({message:"somthing went wrong",error})
    }
  }
  public async getUser({response,auth}: HttpContextContract){
    const user = auth.use("api").user
    return response.json({status:200,user})
  }
    public async logout({response,auth}: HttpContextContract){
    await auth.use("api").logout()
    return response.json({message:"logged out successfully"})
  }
}

