import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import PageTransition from "./components/PageTransition";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { ThemeProvider } from "./components/theme-provider";
import Index from "./pages/Index";
import Solutions from "./pages/Solutions";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// Optimeret QueryClient konfiguration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutter
      gcTime: 10 * 60 * 1000, // 10 minutter (tidligere cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/solutions"
          element={
            <PageTransition>
              <Solutions />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/portfolio"
          element={
            <PageTransition>
              <Portfolio />
            </PageTransition>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageTransition>
              <ProtectedRoute requiredRole="user">
                <Dashboard />
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/profile"
          element={
            <PageTransition>
              <ProtectedRoute requiredRole="user">
                <Profile />
              </ProtectedRoute>
            </PageTransition>
          }
        />
        <Route
          path="/admin"
          element={
            <PageTransition>
              <ProtectedRoute adminOnly={true}>
                <Admin />
              </ProtectedRoute>
            </PageTransition>
          }
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <ThemeProvider defaultTheme="light" storageKey="nordweb-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
