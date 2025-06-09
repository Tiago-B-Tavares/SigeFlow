import { ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError";

export const globalErrorHandler: ErrorRequestHandler = (
    error,  
    req,
    res,
    next
) => {
   
    
    if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
    }

    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
};
