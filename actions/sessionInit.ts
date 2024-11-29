import { AppContext } from "../mod.ts";
import { Cep, Session } from "../utils/types.ts";

interface Props {
  data: Cep;
}

const isValidCep = (cep: string): boolean => {
  const curitibaMin = 80000000;
  const curitibaMax = 83800999;
  const cascavelMin = 85800001;
  const cascavelMax = 85824999;

  const cepInt = parseInt(cep, 10);

  return (
    (cepInt >= curitibaMin && cepInt <= curitibaMax) ||
    (cepInt >= cascavelMin && cepInt <= cascavelMax)
  );
};

const CepSessionInit = async (
  props: Props,
  _req: Request,
  ctx: AppContext
): Promise<Session | null> => {
  const { data } = props;

  if (isValidCep(data.cep)) {
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
