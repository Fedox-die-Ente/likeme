import {prisma} from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)

    if (!session || !session.user) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    await prisma.user.delete({
        where: {
            githubId: (session.user as any).githubId
        }
    })

    await clearUserSession(event)

    return {
        success: true,
        message: 'Account deleted successfully'
    }
})

