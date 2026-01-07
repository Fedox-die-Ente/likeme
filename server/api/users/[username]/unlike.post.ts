import {prisma} from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
    const username = getRouterParam(event, 'username')
    const session = await getUserSession(event)

    if (!session || !session.user) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            githubId: (session.user as any).githubId
        }
    })

    if (!currentUser) {
        throw createError({
            statusCode: 404,
            message: 'Current user not found'
        })
    }

    const targetUser = await prisma.user.findUnique({
        where: {
            name: username
        }
    })

    if (!targetUser) {
        throw createError({
            statusCode: 404,
            message: 'Target user not found'
        })
    }

    await prisma.like.deleteMany({
        where: {
            fromUserId: currentUser.id,
            toUserId: targetUser.id
        }
    })

    return {
        success: true,
        message: 'Profile unliked'
    }
})

