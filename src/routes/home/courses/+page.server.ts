import { fail, redirect, error } from "@sveltejs/kit";
import { generate } from "$lib/uidGenerator"
import type { PageServerLoad, Actions } from "./$types";

export const load = (async ({ locals }) => {
    const { user, session } = await locals.validateUser()
    if ( !session ) {
        throw redirect(302, "/login")
    }

    const courses = await prisma.courses.findMany({
        where: {
            teacherId: user.userId
        }
    })

    return {
        user,
        courses
    }

}) satisfies PageServerLoad

export const actions = {
    createCourse: async ({ request, locals }) => {
        const { user, session } = await locals.validateUser()
        const { subject, kkm, classs, major } = Object.fromEntries(
            await request.formData()
        ) as {
            subject: string,
            kkm: string
            classs: string
            major: string
        } as Record<string, any>

        try {
            await prisma.courses.create({
                data: {
                    teacherId: user!.userId,
                    teacherName: user!.name,
                    class: classs + " " + (major as string).toUpperCase(),
                    subject: subject,
                    kkm: kkm,
                    urlID: generate()
                }
            })
        } catch (err) {
            console.log(err);
            return fail(500, { message: "Failed to create course" })
        }
    }
} satisfies Actions