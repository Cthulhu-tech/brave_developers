import { NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";


export class AuthCheck implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {

        console.log("middleware");

        next();

    }

}