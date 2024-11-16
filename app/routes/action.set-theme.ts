import { createThemeAction } from "remix-themes"

import { themeSessionResolver } from "@/services/session"

export const action = createThemeAction(themeSessionResolver)