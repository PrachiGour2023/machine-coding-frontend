import "./App.css"
import { ErrorBoundary } from "./ErrorBoundary";
import ExpenseTracker from "./ExpenseTracker";

export default function App() {

  return (
    <ErrorBoundary>
      <ExpenseTracker />
    </ErrorBoundary>
  );
}