import "./App.css"
import { ErrorBoundary } from "./ErrorBoundary";
import KanbanBoard from "./KanbanBoard";

export default function App() {

  return (
    <ErrorBoundary>
      <KanbanBoard />
    </ErrorBoundary>
  );
}