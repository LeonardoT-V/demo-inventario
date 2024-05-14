import { createCookieSessionStorage } from "@remix-run/node"
import { createThemeSessionResolver } from "remix-themes"

export const Cookies_Name = {
  theme: 'theme',
  user: 'user',
  career: 'career',
}

// const isProduction = process.env.NODE_ENV === "production"

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: Cookies_Name.theme,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    // Set domain and secure only if in production
    // ...(isProduction
    //   ? { domain: "your-production-domain.com", secure: true }
    //   : {}),
  },
})



export const themeSessionResolver = createThemeSessionResolver(themeStorage)