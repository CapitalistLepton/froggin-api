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
import { Request, Response } from "express";
import { DBColors, Colors } from "../models/Colors";

export default class ColorsController {

    static async list(_req: Request, res: Response): Promise<void> {
        const username = res.locals.jwtPayload.username;

        let colors: Colors;
        try {
            colors = await DBColors.getColors(username);
        } catch (error) {
            console.error(`Failed to get colors ${error}`);
            res.status(500).send({ error: JSON.stringify(error) });
            return;
        }

        res.send(colors);
    }
}
