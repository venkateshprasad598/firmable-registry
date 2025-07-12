import { NotFound, Registry } from "./pages";

export const routes = [
  { path: "/", element: <Registry /> },
  { path: "*", element: <NotFound /> },
];
