import { Cep, Session } from "./types.ts";

export interface SessionInterface {
  "POST /api/sessions": {
    response: Session;
    body: Cep;
  };
}
