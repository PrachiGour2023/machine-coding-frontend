import "./App.css"
import { ErrorBoundary } from "./ErrorBoundary";
import PaginatedBookmarkList from "./PaginatedBookmarkList";

export default function App() {

  return (
    <ErrorBoundary>
      <PaginatedBookmarkList />
    </ErrorBoundary>
  );
}