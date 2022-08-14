import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth } from "@dehui/common";

const router = express.Router();

router.post(
  "/api/tickets",requireAuth,async (req: Request, res: Response) => {
    res.status(201).send({});
  }
);

export { router as createTicketRouter };