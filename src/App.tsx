import "./App.css"
import { ErrorBoundary } from "./ErrorBoundary";
import GridLight from "./GridLight";

export default function App() {

  return (
    <ErrorBoundary>
      <GridLight />
    </ErrorBoundary>
  );
}