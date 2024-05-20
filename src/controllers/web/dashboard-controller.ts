import { Request, Response } from "express";
import { getDashboardCounts } from "../../repository/dashboard-repository";

export const dashboard = async (request: Request, response: Response) => {
  const counts = await getDashboardCounts("all");
  console.log(request.session.user);
  return response.render("pages/dashboard", counts);
};
