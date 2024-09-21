export default class UserModel {
    addNewUser(body) {
        const user = {
            id: users.length + 1,
            name: body.name,
            email: body.email,
            password: body.password,
        }
        users.push(user);
    }
    authUser(email, password) {
        const result = users.find((use) => (use.email === email && use.password === password));
        if (result) {
            return { success: "true", message: "login successful" };
        }
        return { success: "false", message: "login failed" };
    }

}

const users = [
    {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        password: 'password'
    },
]

