import { Request, Response } from 'express';
import User from '../models/User';
import { checkPsassword, hashPassword } from '../utils/auth';
import slug from 'slug';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { generateToken } from '../utils/jwt';

export const createAccount = async (req: Request, res: Response) => {
    try {
        //Desestructurar los datos del cuerpo de la solicitud
        const { email, password } = req.body;

        const slug = (await import('slug')).default;

        const handle = slug(req.body.handle, '');
        const handleExists = await User.findOne({ handle: handle });
        if (handleExists) {
            const error = new Error('El nombre de usuario ya existe');
            return res.status(409).json({ error: error.message });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            const error = new Error('El email ya existe en la base de datos');
            res.status(400).json({
                error: error.message
            });
            return;
        }

        // Slug es una función que convierte el handle en un formato amigable para URLs
        // Un handle es un nombre de usuario único que se usará en la URL del perfil del usuario
        // Por ejemplo, si el handle es "john_doe", el slug será "john-doe"

        const newUser = new User({
            ...req.body,
            handle: handle,
            password: await hashPassword(password)
        });

        console.log(slug(handle));

        await newUser.save();

        res.status(201).json({
            message: 'El usuario ha sido creado correctamente',
            user: newUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const login = async (req: Request, res: Response) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    //Revisar si el usuario existe
    if (!userExists) {
        const error = new Error('El usuario no existe');
        res.status(400).json({
            error: error.message
        });
        return;
    }
    //Revisar si el password es correcto

    const isPasswordCorrect = await checkPsassword(password, userExists.password)
    if (!isPasswordCorrect) {
        const error = new Error('El password es incorrecto');
        res.status(400).json({
            error: error.message
        });
        return;
    }

    const token = generateToken({ id: userExists._id });

    res.send(token);

    /* res.status(200).json({
        message: 'Login exitoso'
    }) */
};

export const getUser = async (req: Request, res: Response) => {
    res.json(req.user);
}