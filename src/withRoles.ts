import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import nookies from "nookies";
import Role from "./roles"; // import your Role enum

interface User {
  roles: Role[];
  // Add other user properties if needed
}

/**
 * For the purposes of this example, we are storing the user object in a cookie, including the user's roles.
 *
 * @param ctx
 * @returns user object from cookies, or null if the user is not logged in
 */
async function getUserFromCookies(
  ctx: GetServerSidePropsContext
): Promise<User | null> {
  const cookies = nookies.get(ctx);
  const user = cookies.user ? JSON.parse(cookies.user) : null;
  return user;
}

/**
 * This function is a higher-order function that takes a GetServerSideProps function and an array of allowed roles.
 * It returns a new GetServerSideProps function that checks if the user has the required role before executing the original GetServerSideProps function.
 *
 * @param getServerSidePropsFunc
 * @param allowedRoles
 * @returns
 */
export function withRole<P extends { [key: string]: any }>(
  getServerSidePropsFunc: GetServerSideProps<P>,
  allowedRoles: Role[]
) {
  return async (context: GetServerSidePropsContext) => {
    const user = await getUserFromCookies(context);
    if (allowedRoles.length === 0) {
      return await getServerSidePropsFunc(context);
    }
    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const hasRequiredRole = user.roles.some((role) =>
      allowedRoles.includes(role)
    );

    if (!hasRequiredRole) {
      return {
        redirect: {
          destination: "/unauthorized",
          permanent: false,
        },
      };
    }

    return await getServerSidePropsFunc(context);
  };
}
