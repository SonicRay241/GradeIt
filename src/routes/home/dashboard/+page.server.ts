import { fail, redirect, error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load = (async ({ locals }) => {
    const { user, session } = await locals.validateUser()
    if ( !session ) {
        throw redirect(302, "/login")
    }
    
    const hours = new Date().getHours()
    let time = "Night"
    if (hours < 5) {
        time = "Night"
    } else if (hours < 12) {
        time = "Morning"
    } else if (hours < 18) {
        time = "Afternoon"
    } else if (hours < 20) {
        time = "Evening"
    } else {
        time = "Night"
    }
    
    return {
        user,
        time
    }
}) satisfies PageServerLoad