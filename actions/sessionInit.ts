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

  console.log(cookies, vtex_session, vtex_segment);

  const response = await ctx.getSession[
    "GET /api/sessions?items=public.postalCode"
  ](
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: `vtex_session=${vtex_session}; vtex_segment=${vtex_segment}`,
      },
    }
  );

  // const response = await ctx.session["POST /api/sessions"](
  //   {},
  //   {
  //     body: data,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Cookie: `vtex_session=${vtex_session}; vtex_segment=${vtex_segment}`,
  //     },
  //   }
  // );

  const result = await response.json();

  console.log(result);

  return result;
};

export default CepSessionInit;
