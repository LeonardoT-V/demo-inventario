import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { Cookies_Name } from "./session.server";
import { CareerLocation } from "@/types";

const { commitSession, getSession } = createCookieSessionStorage({
  cookie: {
    name: Cookies_Name.career,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
  },
})

export const createCareerLocationSession = async (data: CareerLocation, redirectTo: string) => {
  const session = await getSession()
  session.set("careerData", data);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  })
}

// get cookies from request
const getCareerLocationSession = (request: Request) => {
  return getSession(request.headers.get("Cookie"))
}

// function to get user data from session
export const getCareerLocationData = async (request: Request): Promise<CareerLocation | undefined> => {
  const session = await getCareerLocationSession(request)
  const userData = session.get("careerData")

  if (!userData) return undefined
  return userData
}

// function to redirect user to login if no user data found in session
export const requireCareerLocation = async (request: Request): Promise<CareerLocation | null> => {
  const careerLocation = await getCareerLocationData(request)

  if (!careerLocation) {
    const searchParams = new URLSearchParams([
      ["redirectTo", 'redirectTo']
    ])
    throw redirect(`/sign-in?${searchParams}`)
  }
  return careerLocation
}