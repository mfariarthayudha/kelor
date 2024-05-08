import { Request, Response, NextFunction } from "express";

export const login = (request: Request, response: Response) => {
  if (request.session.user != undefined) {
    return response.redirect("/");
  }
  return response.render("pages/authentication/login", {
    pageTitle: "Masuk | Kelor",
  });
};

export const logout = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  request.session.destroy(function (error) {
    if (error) {
      next(error);
    }
  });
  return response.redirect("/authentication/login");
};
