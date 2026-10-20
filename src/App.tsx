import "./App.css"
import { ErrorBoundary } from "./ErrorBoundary";
import StarRating from "./StarRating"

export default function App() {

  return (
    <ErrorBoundary>
      <StarRating />
    </ErrorBoundary>
  );
}