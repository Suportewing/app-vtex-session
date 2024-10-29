import { createHttpClient } from "apps/utils/http.ts";
import { removeDirtyCookies } from "apps/utils/normalize.ts";
import workflow from "apps/workflows/mod.ts";
import { fetchSafe } from "apps/vtex/utils/fetchVTEX.ts";
import { SessionInterface, ViaCep } from "./utils/client.ts";
import { Markdown } from "apps/decohub/components/Markdown.tsx";
import {
  type App as A,
  type AppContext as AC,
  type AppRuntime,
  type ManifestOf,
} from "@deco/deco";
import manifest, { Manifest } from "./manifest.gen.ts";
export type App = ReturnType<typeof VTEX_SESSION>;
export type AppContext = AC<App>;
export type AppManifest = ManifestOf<App>;

/**@title VTEX Session */
export interface Props {
  /**
   * @description VTEX Account name. For more info, read here: https://help.vtex.com/en/tutorial/o-que-e-account-name--i0mIGLcg3QyEy8OCicEoC.
   */
  account: string;
  /**
   * @title Default Sales Channel
   * @description (Use defaultSegment instead)
   * @default 1
   * @deprecated
   */
  salesChannel?: string;
  /**
   * @description Use VTEX as backend platform
   * @default vtex
   * @hide true
   */
  platform: "vtex";
}
export const color = 0xf71963;
/**
 * @title VTEX Session Init
 * @description Vtex Session initialization
 * @category Ecommmerce
 * @logo https://raw.githubusercontent.com/deco-cx/apps/main/vtex/logo.png
 */
export default function VTEX_SESSION({
  account,
  salesChannel,
  ...props
}: Props) {
  const session = createHttpClient<SessionInterface>({
    base: `https://${account}.vtexcommercestable.com.br/`,
    processHeaders: removeDirtyCookies,
    fetcher: fetchSafe,
  });

  const viaCep = createHttpClient<ViaCep>({
    base: `https://viacep.com.br/`,
    processHeaders: removeDirtyCookies,
    fetcher: fetchSafe,
  });

  const state = {
    ...props,
    account,
    salesChannel,
    session,
    viaCep,
  };

  const app: A<Manifest, typeof state, [ReturnType<typeof workflow>]> = {
    state,
    manifest,
    dependencies: [workflow({})],
  };
  return app;
}
export const preview = async (props: AppRuntime) => {
  const markdownContent = await Markdown(
    new URL("./README.md", import.meta.url).href
  );
  return {
    props: {
      ...props,
      markdownContent,
    },
  };
};
