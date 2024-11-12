import { AppContext } from "../mod.ts";
import { Cep, Session } from "../utils/types.ts";

interface Props {
  data: Cep;
}

const CepSessionInit = async (
  props: Props,
  _req: Request,
  ctx: AppContext
): Promise<Session | null> => {
  const { data } = props;

  const responseViaCep = await ctx.viaCep["GET /ws/:cep/json"]({
    cep: data.public.postalCode.value,
  });

  const resultViaCep = await responseViaCep.json();

  if (
    (resultViaCep && resultViaCep.localidade === "Cascavel") ||
    resultViaCep.localidade === "Curitiba"
  ) {
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
  }

  return null;
};

export default CepSessionInit;
