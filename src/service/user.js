const connection = require('./../app/database');

class UserService {
    async create (userInfo) {
        try {
            let {
                name, email, password
            } = userInfo;
            console.log(userInfo);
            const statement = `INSERT INTO user (name, email, password) VALUES (?, ?, ?);`
            const result = await connection.execute(statement, [name, email, password]);
            return result[0];
        } catch (error) {

        }
    }

    async search (userInfo) {
        try {
            let {
                email, password
            } = userInfo;
            // console.log(userInfo);
            const statement = `SELECT * FROM user WHERE email = ? and password = ?;`
            const result = await connection.execute(statement, [email, password]);
            return result[0];
        } catch (error) {
            return;
        }
    }

    async updateAvatarUrlById (avatarUrl, id) {
        // console.log(avatarUrl.length)
        // console.log(id);

        try {
            // console.log(userInfo);
            const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`
            const result = await connection.execute(statement, [avatarUrl, id]);
            return result[0];
        } catch (error) {
            return;
        }
    }

    async updateUser ({ name, email, password }, id) {
        // console.log('sdfsadf');
        // console.log(name);
        // console.log(email);
        // console.log(password);

        try {
            // console.log(userInfo);
            let statement,
                result;
            //如果带有password的话
            if (password) {
                statement = `UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?;`;
                result = await connection.execute(statement, [name, email, password, id]);
            } else {
                statement = `UPDATE user SET name = ?, email = ? WHERE id = ?;`;
                result = await connection.execute(statement, [name, email, id]);
            }
            return result[0];
        } catch (error) {
            return;
        }
    }
    async getUserName (userId) {
        try {
            const statement = `SELECT name FROM user WHERE id = ?;`
            const result = await connection.execute(statement, [userId]);
            return result[0][0];
        } catch (error) {
            return;
        }
    }
}

module.exports = new UserService();