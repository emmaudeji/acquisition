import logger from "../config/logger"
import { createUser } from "../services/auth.service";
import { cookies } from "../utils/cookies";
import { jwttoken } from "../utils/jwt";
import { signupSchema } from "../validations/auth.validation";

// signup
export const signup = async (req, res, next) => {
    try {
        const validationresult = signupSchema.safeParse(req.body);
        if(!validationresult.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: formatValidationError(validationresult.error)
            })
        }

        const {name,email,role,password} =validationresult.data

        // AUTH SERVICE
        const user = await createUser({name,email,password,role})

        const token = jwttoken.sign({
            id:user.id, email:user.email, role: user.role
        })

        cookies.set(res, `token`, token)

        logger.info('User resgistered successfully: ${email');
        res.status(201).json({
            message: "User registered",
            user: {
                id: user.id, name:user.name, email:user.email, role:user.role,
            }
        })

    } catch (e) {
        logger.error('Signup error', e);

        if(e.message = "User with this email already exists") {
            return res.status(409).json({error: 'Email already exist'});
        }
        next(e)
    }
}