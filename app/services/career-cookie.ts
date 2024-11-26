import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { Cookies_Name, Routes_Exclude } from "./session";
import { CareerLocation } from "@/types";
import { ROUTES_DIRECTION } from "@/lib/routes";

const { commitSession, getSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: Cookies_Name.career,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secrets: ["s3cr3t"],
    },
  });

export const createCareerLocationSession = async (
  data: CareerLocation,
  redirectTo: string
) => {
  const session = await getSession();
  session.set("careerData", data);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

// get cookies from request
const getCareerLocationSession = (request: Request) => {
  return getSession(request.headers.get("Cookie"));
};

// function to get user data from session
export const getCareerLocationData = async (
  request: Request
): Promise<CareerLocation | undefined> => {
  const session = await getCareerLocationSession(request);
  const userData = session.get("careerData");

  if (!userData) return undefined;
  return userData;
};

// function to redirect user to login if no user data found in session
export const requireCareerLocation = async (
  request: Request
): Promise<CareerLocation | null> => {
  const careerLocation = await getCareerLocationData(request);

  const url = new URL(request.url).pathname;
  if (careerLocation && Routes_Exclude.some((route) => route === url)) {
    throw redirect(ROUTES_DIRECTION.inicio.path);
  }

  if (!careerLocation) {
    throw redirect(ROUTES_DIRECTION["select-place"].path);
  }
  return careerLocation;
};

export const deleteCareerData = async (request: Request) => {
  const session = await getCareerLocationSession(request);
  // return redirect(ROUTES_DIRECTION["select-place"].path, {
  //   headers: {
  //     "Set-Cookie": await destroySession(session),
  //   }
  // })
  return await destroySession(session);
};
