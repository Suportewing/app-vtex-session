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
  const vtex_segment = cookies["vtex_segment"];

  // console.log("App context", ctx);
  // console.log("Request", _req);
  // console.log("Props", props);

  // const responseGet = await ctx.session[
  //   "GET /api/sessions?items=public.postalCode"
  // ]({
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  // });

  // if (!responseGet.ok) {
  //   console.error("Erro ao obter a sessão:", responseGet.status);
  //   throw new Error(`Failed to fetch postal code: ${responseGet.statusText}`);
  // }

  // const resultGet = await responseGet.json();
  // console.log("Resultado GET (JSON):", resultGet);

  const responsePost = await ctx.session["POST /api/sessions"](
    {},
    {
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const resultPost = await responsePost.json();
  console.log("Resultado POST (JSON):", resultPost);

  return resultPost;
};

export default CepSessionInit;
