import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from '@dehui/common';
import { User } from '../models/user';
import { BadRequestError } from '@dehui/common';
import jwt from "jsonwebtoken";
import { validateRequest } from '@dehui/common';

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const {email, password}=req.body;
    const existingUser=await User.findOne({email});

    if(existingUser){
      throw new BadRequestError('Email was in use!!');
    }

    const user = User.build({email,password});
    await user.save();

    //Generate JWT
    //How to create a secret in kubectl?
    //kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
    //kubectl get secret
    //imperative approach
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!);

    //Store it on session Object
    req.session = {
      jwt: userJwt
    };


    res.status(201).send(user);


  }
);

export { router as signupRouter };
