import "./App.css"
import { ErrorBoundary } from "./ErrorBoundary";
import WordCounter from "./WordCounter";

export default function App() {

  return (
    <ErrorBoundary>
      <WordCounter />
    </ErrorBoundary>
  );
}