import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class RoleMiddleware {
  public async handle({ auth,response }: HttpContextContract, next: () => Promise<void>, allowedRoles: string[]) {
    const user = auth.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return response.unauthorized({message:"You can't acces this route"});
    }

    await next();
  }
}