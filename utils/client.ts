import { Cep, Session } from "./types.ts";

export interface SessionInterface {
  "POST /api/sessions": {
    response: Session;
    body: Cep;
  };
  "GET /api/sessions?items=public.postalCode": {
    response: {
      public: {
        postalCode: string;
      };
    };
  };
}
