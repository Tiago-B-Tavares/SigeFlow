import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
   
  
  next(); // passa para o próximo middleware ou rota
}