// express.d.ts

declare namespace Express {
  interface Request {
    user?: User | undefined; // Define the user property with the same type
  }
}
