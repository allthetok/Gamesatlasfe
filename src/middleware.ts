export { default } from 'next-auth/middleware'

export const config = { matcher: ['/explore', '/recommend', '/likes', '/profile' ] }