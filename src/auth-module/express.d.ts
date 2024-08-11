import { jina } from './path/to/jina.entity'; // Adjust the path as necessary

declare global {
  namespace Express {
    interface Request {
      user?: jina;
    }
  }
}
