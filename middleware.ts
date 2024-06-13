import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = createRouteMatcher(['/','/api/webhook/clerk']);
const ignoredRoutes = createRouteMatcher(['/api/webhook/clerk']);

export default clerkMiddleware((auth,req)=>{
    if (publicRoutes(req)) auth().protect();

  // Restrict dashboard routes to signed in users
    if (ignoredRoutes(req)) auth().protect();
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};