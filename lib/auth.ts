import jwt from "jsonwebtoken";

export function getUserIdFromCookie(request: Request): number | null {
    const cookie = request.headers.get("cookie");
    if (!cookie) return null;

    const authToken = cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

    if (!authToken) return null;

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string) as { id: number };
        return decoded.id;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}
