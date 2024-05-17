import { Request, Response, NextFunction } from "express";
import lodash from "lodash";

export default (request: Request, response: Response, next: NextFunction) => {
  // @ts-ignore
  // console.log(next());
  if (lodash.isNil(request.session.user)) {
    // if (request.accepts("application/json")) {
    //   return next({
    //     httpStatusCode: 401,
    //     responseBody: {
    //       code: "unauthenticated",
    //     },
    //   });
    // }

    return response.redirect("/authentication/login");
  }

  return next();
};
