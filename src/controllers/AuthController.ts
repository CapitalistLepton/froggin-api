/*
 * Copyright 2020 Zane Littrell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { compare } from "bcryptjs";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { DBUser, User } from "../models/User";

export default class AuthController {

  static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
      return;
    }

    let user: User;
    try {
      user = await DBUser.getUser(username);
    } catch (error) {
      console.error(`Failed to get user ${error}`);
      res.status(401).send();
      return;
    }

    let result: boolean = false;
    try {
      result = await compare(password, user.password);
    } catch (error) {
      res.status(401).send();
      return;
    }
    if (!result) {
      res.status(401).send();
      return;
    }

    console.log(`Got ${username} ${password}`);
    const token = jwt.sign(
      { username: username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    //Send the jwt in the response
    res.send(token);
  };

  static changePassword = async (req: Request, res: Response) => {
    res.status(404).send();
    // Get username from JWT
    const username = res.locals.jwtPayload.username;

    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    let user: User;
    try {
      user = await DBUser.getUser(username);
    } catch (error) {
      res.status(401).send();
    }

    let result: boolean = false;
    try {
      result = await compare(oldPassword, user.password);
    } catch (error) {
      res.status(401).send();
    }
    if (!result) {
      res.status(401).send();
    }

    try {
      await DBUser.putUser(username, newPassword);
    } catch (error) {
      res.status(401).send();
    }

    res.status(204).send();
  };
}
