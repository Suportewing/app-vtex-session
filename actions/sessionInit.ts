import { getCookies } from "@std/http/cookie";
import { AppContext } from "../mod.ts";
import { Cep, Session } from "../utils/types.ts";

interface Props {
  data: Cep;
}

/**
 * @title This name will appear on the admin
 */
const CepSessionInit = async (
  props: Props,
  _req: Request,
  ctx: AppContext
): Promise<Session> => {
  const { data } = props;
  const cookies = getCookies(_req.headers);
  const vtex_session = cookies["vtex_is_session"];
  const vtex_segment = cookies["vtex_segment"];

  console.log("Iniciando a chamada GET para a sessão...");
  console.log(
    "Cookies:",
    cookies,
    "Session:",
    vtex_session,
    "Segment:",
    vtex_segment
  );

  // Realizando o GET para verificar o postalCode e fazer log
  const responseGet = await ctx.session[
    "GET /api/sessions?items=public.postalCode"
  ]({
    headers: {
      "Content-Type": "application/json",
      Cookie: `vtex_session=${vtex_session}; vtex_segment=${vtex_segment}`,
    },
  });

  console.log("Resposta bruta do GET:", responseGet);

  if (!responseGet.ok) {
    console.error("Erro ao obter a sessão:", responseGet.status);
    throw new Error(`Failed to fetch postal code: ${responseGet.statusText}`);
  }

  const resultGet = await responseGet.json();
  console.log("Resultado GET (JSON):", resultGet);

  // Realizando o POST para definir o postalCode
  console.log("Iniciando a chamada POST para a sessão...");

  const responsePost = await ctx.session["POST /api/sessions"](
    {},
    {
      body: data,
      headers: {
        "Content-Type": "application/json",
        Cookie: `vtex_session=${vtex_session}; vtex_segment=${vtex_segment}`,
      },
    }
  );

  console.log("Resposta bruta do POST:", responsePost);

  if (!responsePost.ok) {
    console.error("Erro ao definir a sessão:", responsePost.status);
    throw new Error(`Failed to set postal code: ${responsePost.statusText}`);
  }

  const resultPost = await responsePost.json();
  console.log("Resultado POST (JSON):", resultPost);

  return resultPost;
};

export default CepSessionInit;
