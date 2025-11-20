import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Welcome from "./pages/Welcome";
import LanguageOnboarding from "./pages/LanguageOnboarding";
import LiteracyAssessment from "./pages/LiteracyAssessment";
import Quiz from "./pages/Quiz";
import Learn from "./pages/Learn";
import LessonComplete from "./pages/LessonComplete";
import ClassSelection from "./pages/ClassSelection";
import Subjects from "./pages/Subjects";
import Chat from "./pages/Chat";
import ScienceChapters from "./pages/ScienceChapters";
import MathsChapters from "./pages/MathsChapters";
import NotFound from "./pages/NotFound";

// Helper to check if user has selected language
const hasSelectedLanguage = () => {
  return localStorage.getItem("selectedLanguage") !== null;
};

// Helper to check if user has selected class
const hasSelectedClass = () => {
  return localStorage.getItem("selectedClass") !== null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Page - Cute Welcome Screen */}
            <Route path="/" element={<Welcome />} />
            
            {/* NEW FLOW: Welcome → Language → Class → Subjects */}
            <Route path="/get-started" element={
              !hasSelectedLanguage() ? <Navigate to="/language-onboarding" replace /> :
              !hasSelectedClass() ? <Navigate to="/class-selection" replace /> :
              <Navigate to="/subjects" replace />
            } />
            
            {/* Step 1: Language Selection */}
            <Route path="/language-onboarding" element={<LanguageOnboarding />} />
            
            {/* Step 2: Class Selection (5-10, only 5 enabled) */}
            <Route path="/class-selection" element={<ClassSelection />} />
            
            {/* Step 3: Subjects (Maths, Science) */}
            <Route path="/subjects" element={<Subjects />} />
            
            {/* Old Literacy Flow - Keeping for backward compatibility */}
            <Route path="/literacy-assessment" element={<LiteracyAssessment />} />
            <Route path="/quiz" element={<Quiz />} />
            
            {/* Learning Routes */}
            <Route path="/learn" element={<Learn />} />
            <Route path="/lesson-complete" element={<LessonComplete />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/science-chapters" element={<ScienceChapters />} />
            <Route path="/maths-chapters" element={<MathsChapters />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
