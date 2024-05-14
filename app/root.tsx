import {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { themeSessionResolver } from "@/services/session.server";

import style from "./main.css?url";
import "@fontsource-variable/onest";
import clsx from "clsx";
import WithNavLayout from "./components/layouts/with-nav";
import { getCareerLocationData } from "./services/career-cookie.server";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: style }];
export const meta: MetaFunction = () => {
  return [
    {
      title: "Remix: Search a TV show",
      description: "Search a TV show",
    },
  ];
};
export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  const careerLocation = await getCareerLocationData(request);
  return {
    theme: getTheme(),
    careerLocation,
  };
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body className="flex h-screen min-h-screen w-screen gap-8">
        <WithNavLayout careerLocation={data.careerLocation}>
          <Outlet />
        </WithNavLayout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
