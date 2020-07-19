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
import { DynamoDB } from "aws-sdk";

class User {
  constructor(readonly username: string, readonly password: string) {}
}

class DBUser {
  private static db = new DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

  static async getUser(username: string): Promise<User> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
       TableName: process.env.USERS_TABLE,
       Key: {
         username: username,
       },
    };
    try {
      const result = await DBUser.db.get(params).promise();
      return Promise.resolve(new User(result.Item.username,
        result.Item.password));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async putUser(username: string, password: string): Promise<void> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
       TableName: process.env.USERS_TABLE,
       Item: {
         username: username,
         password: password,
       },
    };
    try {
      await DBUser.db.put(params).promise();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export { User, DBUser };

