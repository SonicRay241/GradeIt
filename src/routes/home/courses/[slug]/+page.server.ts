import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
    const { user, session } = await locals.validateUser()
    if ( !session ) {
        throw redirect(302, "/login")
    }
    const urmom = await prisma.courses.findUnique({
        where: {
            urlID: params.slug
        }
    })

    if (!urmom) {
        throw error(404, "Course not found")
    }
}
    