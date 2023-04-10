import lucia from 'lucia-auth';
import prismaAdapter from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import { prisma } from './prisma';

export const auth = lucia({
    adapter: prismaAdapter(prisma),
    env: dev ? "DEV" : "PROD",
    transformUserData: (userdata) => {
        return {
            userId: userdata.id,
            username: userdata.username,
            name: userdata.name,
            level: userdata.level
        }
    }
})

export type Auth = typeof auth