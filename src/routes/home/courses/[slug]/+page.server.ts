import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
    const { user, session } = await locals.validateUser()
    if ( !session ) {
        throw redirect(302, "/login")
    }
    if (params.slug === "AMOGUS") {
        return {
            message: params.slug
        }
    }
    return {
        message: "404"
    }
}
    