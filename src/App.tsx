import "./App.css"
import { ErrorBoundary } from "./ErrorBoundary";
import PriceRangeSlider from "./PriceRangeSlider";

export default function App() {

  return (
    <ErrorBoundary>
      <PriceRangeSlider />
    </ErrorBoundary>
  );
}