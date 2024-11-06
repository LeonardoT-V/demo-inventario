import { ROUTES_DIRECTION } from "@/lib/routes";
import { logout } from "@/services/user-cookie.server";
import { ActionFunctionArgs, redirect } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  return await logout(request);
}

export async function loader() {
  return redirect(ROUTES_DIRECTION.login.path);
}
