import "./App.css"
import { ErrorBoundary } from "./ErrorBoundary";
import PinItems from "./PinItems";

export default function App() {

  return (
    <ErrorBoundary>
      <PinItems />
    </ErrorBoundary>
  );
}