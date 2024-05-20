import { Request, Response } from "express";
import { getDashboardCounts } from "../../repository/dashboard-repository";

export const today = async (request: Request, response: Response) => {
  const data_today = await getDashboardCounts("today");
  return response.status(200).send(data_today);
};
export const monthly = async (request: Request, response: Response) => {
  const data_monthly = await getDashboardCounts("monthly");
  return response.status(200).send(data_monthly);
};
export const annual = async (request: Request, response: Response) => {
  const data_annual = await getDashboardCounts("annual");
  return response.status(200).send(data_annual);
};
