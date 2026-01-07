import {prisma} from "~~/server/utils/db";

export default defineOAuthGitHubEventHandler({
    config: {
        emailRequired: true,
    },
    async onSuccess(event, {user, tokens}) {

        const userExists = await prisma.user.findUnique({
            where: {
                githubId: user.id
            }
        })

        if (!userExists) {
            await prisma.user.create({
                data: {
                    name: user.login,
                    githubId: user.id,
                    avatarUrl: user.avatar_url,
                    createdAt: user.created_at
                }
            })
        } else {
            if (user.login !== userExists.name) {
                await prisma.user.update({
                    data: {
                        name: user.login
                    },
                    where: {
                        githubId: user.id,
                    }
                })
            }
        }

        await setUserSession(event, {
            user: {
                githubId: user.id,
                name: user.name,
                avatarUrl: user.avatar_url,
                username: user.login
            }
        })
        return sendRedirect(event, '/')
    },
    onError(event, error) {
        console.error('GitHub OAuth error:', error)
        return sendRedirect(event, '/')
    },
})
