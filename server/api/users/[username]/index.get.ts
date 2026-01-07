import {prisma} from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
    const username = getRouterParam(event, 'username')
    const session = await getUserSession(event)

    const user = await prisma.user.findUnique({
        where: {
            name: username
        },
        include: {
            _count: {
                select: {
                    likesReceived: true
                }
            }
        }
    }) as any

    if (!user) {
        throw createError({
            statusCode: 404,
            message: 'User not found'
        })
    }

    let isLikedByCurrentUser = false
    if (session?.user) {
        const currentUser = await prisma.user.findUnique({
            where: {
                githubId: (session.user as any).githubId
            }
        })

        if (currentUser) {
            const like = await prisma.like.findUnique({
                where: {
                    fromUserId_toUserId: {
                        fromUserId: currentUser.id,
                        toUserId: user.id
                    }
                }
            }) as any

            isLikedByCurrentUser = !!like
        }
    }

    return {
        id: user.id,
        githubId: user.githubId,
        name: user.name,
        avatarUrl: user.avatarUrl,
        bio: user.bio || null,
        createdAt: user.createdAt,
        likesCount: user._count?.likesReceived || 0,
        isLikedByCurrentUser
    }
})

