export function sessionGuard(req: any, res: any, next: any) {
  const isAuthenticated = req.isAuthenticated();
  console.log("isAuthenticatessd", req.isAuthenticated());
  next();
}
