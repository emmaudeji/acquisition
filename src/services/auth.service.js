import logger from "../config/logger"
import bcrypt from 'bcrypt'

import {eq} from 'drizzle-orm'
import {db} from '../config/database.js'
import {users} from '../user.model.js'

export const hashPassword = async (pwd) => {
    try{
        return await bcrypt.hash(pwd, 10)
    } catch (e) {
        logger.error(`Error hashing the pasword: ${e}`)
        throw new Error('Error hashing')
    }
}

export const createUser = async ({
    name,email,password,role = 'user'
}) => {
    try {
        const existingUser = db.select().from(users).where(eq(users.email, email)).limit(1);
        if((await existingUser).length > 0) throw new Error('User already exists')
        const password_hash = await hashPassword(password)
    
        const [newUser] = await db
        .insert(users)
        .values({name,email,password:password_hash,role})
        .returning({
            id:users.id,
            name: users.name,
            email: users.email,
            role: users.role,
            created_at:users.created_at,
        })

        logger.info(`User ${newUser.email} created successfully`)
        return newUser;
    } catch (error) {
        logger.error(`Error creating user ${e}`)
        throw error
    }
}