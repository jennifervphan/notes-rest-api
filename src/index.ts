import cors from "cors";
import express, {
	type Application,
	type Request,
	type Response,
} from "express";
import helmet from "helmet";
import { errorHandler, NotFoundError } from "./middleware/error.middleware";
import healthRoutes from "./module/healthCheck/health.routes";
import notesRoutes from "./module/notes/notes.routes";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/notes", notesRoutes);

app.use((req: Request, _res: Response) => {
	throw new NotFoundError(`Route ${req.method} ${req.path}`);
});

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
