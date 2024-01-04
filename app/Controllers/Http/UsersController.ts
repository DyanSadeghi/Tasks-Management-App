import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class UsersController {

    public async editUser({ request, response, auth }: HttpContextContract) {
        try {
            const payload = await request.validate({
                schema: schema.create({
                    name: schema.string.optional({ trim: true }),

                }),
            });

            const user = auth.user!;
            
            user.name = payload.name ?? user.name;

            await user.save();

            return response.json({ status: 200, message: 'User updated successfully', user });
        } catch (error) {
            return response.badRequest({ status: 400, message: error.messages });
        }
    }
}
