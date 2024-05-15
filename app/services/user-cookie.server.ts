import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { Cookies_Name } from "./session.server";
import { LoginResponse } from "@/types";
import { ROUTES_DIRECTION } from "@/lib/routes";

const { commitSession, destroySession, getSession } = createCookieSessionStorage({
  cookie: {
    name: Cookies_Name.user,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    maxAge: 60 * 60 * 24 * 30,
  },
})

export const createUserSession = async (userData: LoginResponse, redirectTo: string) => {
  const session = await getSession()
  session.set("userData", userData);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  })
}

// get cookies from request
const getUserSession = (request: Request) => {
  return getSession(request.headers.get("Cookie"))
}

// function to get user data from session
export const getUserData = async (request: Request): Promise<LoginResponse | null> => {
  const session = await getUserSession(request)
  const userData = session.get("userData")

  if (!userData) return null
  return userData
}

// fucntion to redirect user to login if no user data found in session
export const requireUser = async (request: Request): Promise<LoginResponse | null> => {
  const userData = await getUserData(request)
  const routesExclude = [ROUTES_DIRECTION.login.path, ROUTES_DIRECTION.sigin.path]
  const url = new URL(request.url).pathname

  if (userData && routesExclude.some(route => route === url)) {
    throw redirect(ROUTES_DIRECTION.inicio.path)
  }
  // TODO: comprobar funcionamiento
  if (routesExclude.some(route => route === url)) {
    return null
  }

  if (!userData) {
    throw redirect(ROUTES_DIRECTION.login.path)
  }

  return userData
}

// function to remove user data from session, logging user out
export const logout = async (request: Request) => {
  const session = await getUserSession(request);

  return redirect(ROUTES_DIRECTION.login.path, {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  })
}