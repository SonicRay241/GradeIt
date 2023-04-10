import type { LayoutServerLoad } from './$types';
import { fail, redirect, error } from "@sveltejs/kit";

export const load = (async ({ locals }) => {
    const { user, session } = await locals.validateUser()
    return {
        user
    }
}) satisfies LayoutServerLoad