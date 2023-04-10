import { fail, redirect, error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load = (async () => {
    throw redirect(301, "/home/dashboard")
}) satisfies PageServerLoad