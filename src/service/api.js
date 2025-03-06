const connection = require('./../app/database');

class ApiService {
    async createPost (postInfo) {
        try {
            let {
                id, photo, title, desce
            } = postInfo;

            if (!photo) {
                photo = "123";
            }

            const statement = `INSERT INTO posts (user_id, photo, title, desce) VALUES (?, ?, ?, ?);`
            const result = await connection.execute(statement, [id, photo, title, desce]);
            return result[0];
        } catch (error) {
            console.log(error);
        }
    }

    async createCategory (name) {
        try {
            const statement = `INSERT INTO category (name) VALUES (?);`
            const result = await connection.execute(statement, [name]);
            return result[0];
        } catch (error) {

        }
    }

    async getAllCategory () {
        try {
            const statement = `SELECT * FROM category;`
            const result = await connection.execute(statement);
            return result[0];
        } catch (error) {

        }
    }


    async removePost (id) {
        try {
            const statement = `DELETE FROM posts WHERE id = ?;`
            const result = await connection.execute(statement, [id]);
            return result[0];
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async updatePost (postInfo) {
        try {
            let { id, ...other } = postInfo;
            // console.log(id);
            // console.log(other);

            let keys = Object.keys(other),
                values = Object.values(other);


            const statement = `UPDATE posts SET ${keys.join(' = ? , ') + ' = ?'} WHERE id = ?;`
            // const statement = `UPDATE posts SET ? WHERE id = ?;`
            // const result = await connection.execute(statement, [other, id]);
            const result = await connection.execute(statement, [...values, id]);
            return result[0];
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async getSinglePost (postId) {
        try {
            const statement = `SELECT * FROM posts WHERE id = ?;`;
            const result = await connection.execute(statement, [postId]);
            return result[0];
        } catch (error) {
            return;
        }
    }

    async getAllPosts () {
        try {
            const statement = `SELECT * FROM posts;`;
            const result = await connection.execute(statement);
            return result[0];
        } catch (error) {
            return;
        }
    }

    async getAllPostsWithUserId (user_id) {
        try {

            const statement = `SELECT * FROM posts WHERE user_id = ?;`;
            const result = await connection.execute(statement, [user_id]);
            return result[0];
        } catch (error) {
            return;
        }
    }

    async getAllPostsWithCat (cat_id) {
        try {
            // console.log(cat_id)

            // 不用写别名？？？
            // 不用JSON_OBJECT
            const statement = `
                SELECT 
                    p.id, p.user_id, p.photo, p.title, p.desce, p.createdAt 
                FROM posts p
                LEFT JOIN post_category pc ON pc.post_id = p.id
                WHERE pc.cat_id = ?;
            `;
            // console.log('object')/
            const result = await connection.execute(statement, [cat_id]);
            // console.log(result[0]);
            return result[0];
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async getAllPostsOfUser (userId) {
        try {
            const statement = `SELECT * FROM posts WHERE user_id = ?;`;
            const result = await connection.execute(statement, [userId]);
            return result[0];
        } catch (error) {
            return;
        }
    }
    // 多对多关系
    async getLabelsOfPost (postId) {
        try {
            // 是取出来就弄好格式，还是取出之后处理格式
            // IF(COUNT(pc.id), JSON_ARRAYAGG(c.name), NULL)
            // 
            // IF(COUNT(pc.id), JSON_ARRAYAGG(c.name), JSON_ARRAYAGG()) labels
            const statement = `
                SELECT 
                    JSON_ARRAYAGG(c.name) labels
                FROM post_category pc
                LEFT JOIN category c ON c.id = pc.cat_id
                WHERE pc.post_id = ?
                GROUP BY pc.post_id;
            `;
            const result = await connection.execute(statement, [postId]);
            // console.log(result[0]);
            return result[0];
        } catch (error) {
            return;
        }
    }

    //更新/添加 一个博客
    async uploadPost (postInfo) {
        try {
            let {
                user_id, photo, title, desce
            } = postInfo;

            const statement = `INSERT INTO posts (user_id, photo, title, desce) VALUES (?, ?, ?, ?);`

            const result = await connection.execute(statement, [user_id, photo, title, desce]);
            // console.log(result);
            return result[0];
        } catch (error) {
            // console.log(error);
            throw error;
        }
    }
}

module.exports = new ApiService();