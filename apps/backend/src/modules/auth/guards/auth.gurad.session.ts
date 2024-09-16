export function sessionGuard(req: any, res: any, next: any) {
  const isAuthenticated = req.isAuthenticated();
  if(!isAuthenticated) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}
