import { Navigate, createBrowserRouter } from "react-router-dom";

import AppLayout from "./layout/AppLayout";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ServicesPage from "./pages/ServicesPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      
      // Redirect unknown routes (404) back to HomePage.
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

