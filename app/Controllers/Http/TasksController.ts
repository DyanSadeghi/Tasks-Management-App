import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
import Task from 'App/Models/Task';

type PayloadT = {
    title:string;
    priority:"low" | "medium" | "high";
    user_Id: number 
}

export default class TasksController {

    public async createTask({request,response,auth}:HttpContextContract) {
        const payload: PayloadT= {
            ...await request.validate({
                schema: schema.create({
                    title: schema.string(),
                    priority: schema.enum(["low", "medium", "high"] as const),
                }),
            }),
            user_Id: auth.user!.id,
        };

        try {
    
        
        await Task.create(payload)
        return response.status(200).json({message:"task has been created successfully"})
    } catch (error) {
      
        return response.status(500).json({message:"somthing went wrong",error})
    }
    }

    public async deleteTask({ params, response, auth }: HttpContextContract) {
        const taskId = params.taskId;
        const userId = auth.user!.id;

        try {
            const task = await Task.query()
                .where('id', taskId)
                .andWhere('user_Id', userId)
                .firstOrFail();

            await task.delete();

            return response.json({ status: 200, message: 'Task deleted successfully' });
        } catch (error) {
            return response.status(404).json({ status: 404, message: 'Task not found or unauthorized' });
        }
    }
    public async editTask({ params, request, response, auth }: HttpContextContract) {
        const taskId = params.taskId;
        const userId = auth.user!.id;

        try {
            const task = await Task.query()
                .where('id', taskId)
                .andWhere('user_Id', userId)
                .firstOrFail();

             const payload: PayloadT= {
            ...await request.validate({
                schema: schema.create({
                    title: schema.string(),
                    priority: schema.enum(["low", "medium", "high"] as const),
                }),
            }),
            user_Id: auth.user!.id,
        };

            task.merge(payload);
            await task.save();

            return response.json({ status: 200, message: 'Task updated successfully', task });
        } catch (error) {
            return response.status(404).json({ status: 404, message: 'Task not found or unauthorized' });
        }
    }

    public async getAllUserTasks({ response, auth }: HttpContextContract) {
        const userId = auth.user!.id;

        try {
            const tasks = await Task.query().where('user_Id', userId).orderBy('created_at', 'desc');
            return response.json({ status: 200, tasks });
        } catch (error) {
            return response.status(500).json({ status: 500, message: 'Something went wrong', error });
        }
    }
    public async getAllTasks({ response,request }: HttpContextContract) {
        const page = request.input('page', 1);
        const limit = 10

        try {
            const tasks = await Task.query().paginate(page, limit);
            return response.json({ status: 200, tasks });
        } catch (error) {
            return response.status(500).json({ status: 500, message: 'Something went wrong', error });
        }
    }
}
