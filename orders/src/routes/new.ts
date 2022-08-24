import express, { Request, Response } from 'express';
import mongoose from "mongoose";
import {
    requireAuth,
    validateRequest,
    NotFoundError,
    BadRequestError,
} from "@dehui/common";
import { body } from "express-validator";



const router = express.Router();

router.get('/api/orders')

router.post("/api/orders",
    requireAuth,
    [
        body("ticketId")
            .not()
            .isEmpty()
            //   Validate whether it's a valid mongo ID
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage("TicketId must be provided"),
    ], validateRequest,
    async (req: Request, res: Response) => {
        res.send({});
    });

export { router as newOrderRouter };
