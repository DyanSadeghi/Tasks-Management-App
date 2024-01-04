import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class AdminController {
     public async getAllUsers({ response,request }: HttpContextContract) {
        try {
            const page = request.input('page', 1);
            const limit = 10

            const users = await User.query().paginate(page, limit);
            
            return response.json({ status: 200, users });
        } catch (error) {
            return response.status(500).json({ status: 500, message: 'Something went wrong', error });
        }
    }

    public async deleteUser({ params, response }: HttpContextContract) {
    const userId = params.id;

    try {
        const user = await User.findOrFail(userId);

        await user.delete();

        return response.json({ status: 200, message: 'User deleted successfully' });
    } catch (error) {
        return response.status(404).json({ status: 404, message: 'User not found' });
    }
}
}
