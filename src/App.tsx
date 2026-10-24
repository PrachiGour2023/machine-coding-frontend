import "./App.css"
import { ErrorBoundary } from "./ErrorBoundary";
import Home from "./components/Home";
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import Navbar from "./components/Navbar";
import { lazy, Suspense } from "react";

const Product = lazy(() => import('./components/Products'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Product />
          </Suspense>)
      },
      {
        path: '/product/:productId',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProductDetails />
          </Suspense>
        )
      }
    ]
  }
])

function RootLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}