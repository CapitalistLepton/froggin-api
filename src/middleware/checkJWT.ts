/*
 * Copyright 2020 Zane Littrell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import Payload from "../models/Payload";

export const checkJwt = (req: Request, res: Response, next: NextFunction): void => {
    console.log("Headers: " + JSON.stringify(req.headers));
    console.log("Auth: " + JSON.stringify(req.headers.authorization));
    const authHeader = <string> req.headers.authorization;
    // Header begins with "Bearer "
    const token = authHeader.substring(7);

    let jwtPayload: Payload;
    try {
        jwtPayload = jwt.verify(token, process.env.JWT_SECRET) as Payload;
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(401).send();
        return;
    }

    // Refresh the token since it is only valid for 1 hour
    const newToken = jwt.sign(jwtPayload, process.env.JWT_SECRET);
    res.setHeader("token", newToken);

    // Call the next middleware or controller
    next();
};
