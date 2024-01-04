import Route from '@ioc:Adonis/Core/Route'

Route.group(() =>{
    Route.post("/auth/login", "AuthController.login")
    Route.post("/auth/register", "AuthController.register")

Route.group(() =>{
   Route.get("/user","AuthController.getUser")
   Route.post("/auth/logout","AuthController.logout")
   Route.put("/user/edit","UsersController.editUser")
}).middleware("auth:api")

Route.group(() =>{
   Route.post("/tasks","TasksController.createTask")
   Route.delete("/tasks/:taskId","TasksController.deleteTask")
   Route.put("/tasks/:taskId","TasksController.editTask")
   Route.get("/tasks/","TasksController.getAllUserTasks")
   
}).middleware("auth:api")

Route.group(() =>{
   Route.get("/admin/users","AdminController.getAllUsers")
   Route.delete("/admin/users/:id","AdminController.deleteUser")
   Route.get("/admin/tasks/","TasksController.getAllTasks")
}).middleware(["auth:api","role:admin"])

}).prefix("/api")