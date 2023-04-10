import { fail, redirect, error } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia"
import type { PageServerLoad, Actions } from "./$types";

export const load = (async ({ locals }) => {
    const { user, session } = await locals.validateUser()
    if ( !session ) {
        throw redirect(302, "/login")
    }
    if (user.level != "ADMIN") {
        throw error(404, "Not Found")
    }

    const userlist = prisma.user.findMany()

    return {
        user,
        userlist
    }

}) satisfies PageServerLoad

export const actions = {
    createUser:async ({ request }) => {
        const { name, username, password, level } = Object.fromEntries(await request.formData()) as {
            name: string,
            username: string,
            password: string,
            level: string
        } as Record<string, string>

        try {
            await auth.createUser({
                primaryKey: {
                    providerId: "username",
                    providerUserId: username,
                    password: password
                },
                attributes: {
                    name,
                    username,
                    level
                }
            })

        } catch (err) {
            console.log(err)
            throw error(500, "Failed to create a new user")
        }
    },
    deleteUser:async ({ request }) => {
        const { uid } = await Object.fromEntries(await request.formData()) as {
            uid: string
        } as Record<string, string>

        try {
            await auth.deleteUser(uid)
        } catch (err) {
            console.log(err);
            throw error(500, "Failed to delete user")
        }
    },
    updateUser:async ({ request }) => {
        const { uid, name, level } = await Object.fromEntries(await request.formData()) as {
            uid: string
            name: string
            level: string
        } as Record<string, string>

        try {
            await auth.updateUserAttributes(uid, {
                name,
                level
            })
        } catch (err) {
            console.log(err);
            throw error(500, "Failed to update user")
        }
    }

} satisfies Actions