export const extractToken = (authorization: string) => {
    const [prefix, token] = authorization.split(' ');
    const prefixes = ['basic', 'bearer']
    if(!prefixes.includes(prefix.toLowerCase())) return null;
    return token;
}