import { Request, Response } from "express"
// import knex from "../../utilities/knex"

export const error404 = (request: Request, response: Response) => {
  return response.render("pages/error/404")
}