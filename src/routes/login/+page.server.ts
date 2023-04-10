import { auth } from "$lib/server/lucia";
import { fail, redirect, error } from "@sveltejs/kit";
import { LuciaError } from "lucia-auth";
import type { PageServerLoad, Actions } from "./$types";

export const load = (async ({ locals }) => {
    const { user, session } = await locals.validateUser()
    if ( session ) {
        throw redirect(302, "/home/dashboard")
    }
    const rootAccount = await prisma.user.findUnique({
        where: {
            username: 'root'
        }
    })
    if (rootAccount == null) {
        try {
            await auth.createUser({
                primaryKey: {
                    providerId: "username",
                    providerUserId: "root",
                    password: "rootaccess123"
                },
                attributes: {
                    name: "root",
                    username: "root",
                    level: "ADMIN"
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
}) satisfies PageServerLoad

export const actions = {
	default: async ({ request, locals }) => {
		const { username, password } = Object.fromEntries(
			await request.formData(),
		) as Record<string, string>

		try {
			const key = await auth.useKey("username", username, password)
			const session = await auth.createSession(key.userId)
			locals.setSession(session)
		} catch (err) {
			if (err instanceof LuciaError) {
				if (err.message === "AUTH_INVALID_USER_ID" || err.message === "AUTH_INVALID_PASSWORD" || err.message === "AUTH_INVALID_KEY_ID") {
                    throw error(400, { message: "Invalid credentials" })
                }
			}
			console.log(err)
			return fail(500, { message: "Could not login user." })
		}
		throw redirect(302, "/home/dashboard")
	},
} satisfies Actions