import { fail, redirect, error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load = (async ({ locals }) => {
    const { user, session } = await locals.validateUser()
    if ( !session ) {
        throw redirect(302, "/login")
    }
    if (user.level != "ADMIN") {
        throw error(404, "Not Found")
    }
    return {
        user
    }
}) satisfies PageServerLoad