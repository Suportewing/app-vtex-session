import { Address, Cep, Session } from "./types.ts";

export interface SessionInterface {
  "POST /api/sessions": {
    response: Session;
    body: Cep;
  };
}

export interface ViaCep {
  "GET /ws/:cep/json": {
    response: Address;
  };
}
