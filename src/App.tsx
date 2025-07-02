import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SecondPage from "./pages/SecondPage";
import CandidatesPage from "./pages/CandidatesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/candidatos" element={<CandidatesPage />} />
          <Route path="/segunda-pagina" element={<SecondPage />} />
          <Route path="/igreja" element={<SecondPage />} />
          <Route path="/como-funciona" element={<SecondPage />} />
          <Route path="/depoimentos" element={<SecondPage />} />
          <Route path="/cadastre-se" element={<SecondPage />} />
          <Route path="/contato" element={<SecondPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
