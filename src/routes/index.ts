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
import { Router, Request, Response } from "express";
import auth from "./auth";
import colors from "./colors";

const routes = Router();

routes.use("/auth", auth);
routes.use("/colors", colors);

routes.get("/message", (_req: Request, res: Response) => {
    res.send({ message: "This is message route" });
});

export default routes;
