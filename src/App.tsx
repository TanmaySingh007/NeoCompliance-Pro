
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ComplianceProvider } from "@/contexts/ComplianceContext";
import HomePage from "./pages/HomePage";
import CompliancePage from "./pages/CompliancePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () =>
<QueryClientProvider client={queryClient} data-id="tofmocgci" data-path="src/App.tsx">
    <TooltipProvider data-id="c5zzn8m5z" data-path="src/App.tsx">
      <ComplianceProvider data-id="lied6mncg" data-path="src/App.tsx">
        <Toaster data-id="h3cbluqdo" data-path="src/App.tsx" />
        <BrowserRouter data-id="2hssundui" data-path="src/App.tsx">
          <Routes data-id="qkchhhbwp" data-path="src/App.tsx">
            <Route path="/" element={<HomePage data-id="f2bmr358y" data-path="src/App.tsx" />} data-id="sf2n4wevx" data-path="src/App.tsx" />
            <Route path="/compliance" element={<CompliancePage data-id="irua13z9r" data-path="src/App.tsx" />} data-id="9asbqtbk8" data-path="src/App.tsx" />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound data-id="a84d00x3g" data-path="src/App.tsx" />} data-id="9mpaac61b" data-path="src/App.tsx" />
          </Routes>
        </BrowserRouter>
      </ComplianceProvider>
    </TooltipProvider>
  </QueryClientProvider>;


export default App;