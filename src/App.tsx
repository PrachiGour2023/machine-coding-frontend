import "./App.css"
import { ErrorBoundary } from "./ErrorBoundary";
import Tabs from "./Tabs";

const tabs = [
  { title: "Tab 1", content: "This is the content of Tab 1" },
  { title: "Tab 2", content: "This is the content of Tab 2" },
  { title: "Tab 3", content: "This is the content of Tab 3" }
]

export default function App() {

  return (
    <ErrorBoundary>
      <Tabs tabs={tabs}/>
    </ErrorBoundary>
  );
}