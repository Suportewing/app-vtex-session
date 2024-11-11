import { AppContext } from "../mod.ts";
import { Cep, Session } from "../utils/types.ts";

interface Props {
  data: Cep;
}

/**
 * @title This name will appear on the admin
 */
const CepSessionInit = async (props: Props, _req: Request, ctx: AppContext): Promise<Session | null> => {
  const { data } = props;

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
