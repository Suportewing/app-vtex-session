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

  const responseViaCep = await ctx.viaCep["GET /ws/:cep/json"](
    {
      cep: data.public.postalCode.value,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const resultViaCep = await responseViaCep.json();

  console.log(resultViaCep);

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

  return resultPost;
};

export default CepSessionInit;
