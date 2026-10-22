import "./App.css"
import { ErrorBoundary } from "./ErrorBoundary";
import TransferList from "./TransferList";

export default function App() {

  return (
    <ErrorBoundary>
      <TransferList />
    </ErrorBoundary>
  );
}