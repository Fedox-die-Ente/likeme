import {prisma} from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)

    if (!session || !session.user) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    const body = await readBody(event)
    const bio = body.bio

    if (typeof bio !== 'string') {
        throw createError({
            statusCode: 400,
            message: 'Bio must be a string'
        })
    }

    if (bio.length > 500) {
        throw createError({
            statusCode: 400,
            message: 'Bio must be less than 500 characters'
        })
    }

    const updatedUser = await prisma.user.update({
        where: {
            githubId: (session.user as any).githubId
        },
        data: {
            bio: bio || null
        } as any
    })

    return {
        success: true,
        bio: (updatedUser as any).bio
    }
})

