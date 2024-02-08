import { Request } from "express";

export function ServiceVerify(req: Request) {
  return String(req.headers["service-token"]) === String(process.env.SERVICE_TOKEN);
}
