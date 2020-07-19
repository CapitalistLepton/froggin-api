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
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middleware/checkJwt";

const router = Router();

router.get("/login", (_req: Request, res: Response) => {
  res.send({ message: "This is message route" });
});
router.post("/login", AuthController.login);
router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;
