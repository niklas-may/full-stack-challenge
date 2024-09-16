import { validationResult } from "express-validator";

export const validateRequest = (validations: any[]) => {
  return async (req: any, res: any, next: any) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
};
