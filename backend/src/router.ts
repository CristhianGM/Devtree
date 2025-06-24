import { Router } from "express";
import { createAccount, getUser, login } from "./handlers/index";
import { body } from 'express-validator';
import { handleInputErrors } from "./middleware/Validation";
import { authenticate } from "./middleware/auth";
const router = Router();

router.post('/register',
    body('handle')
        .notEmpty()
        .withMessage('El nombre de usuario es obligatorio'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede estar vacío'),
    body('email')
        .isEmail()
        .withMessage('E-mail no válido'),
    body('password')
        .notEmpty()
        .withMessage('El password es obligatorio')
        .bail() // rescata la primera validación fallida
        .isLength({ min: 8 })
        .withMessage('El password tiene que tener al menos 8 caracteres'),
    handleInputErrors,
    createAccount);

router.post('/login',
    body('email')
        .isEmail()
        .withMessage('E-mail no válido'),
    body('password')
        .notEmpty()
        .withMessage('El password es obligatorio'),
    handleInputErrors,
    login);

router.get('/user', authenticate, getUser)

export default router;