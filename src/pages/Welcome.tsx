/**
 * WELCOME/HOME PAGE
 * 
 * Cute landing page with teacher mascot
 * Shows before language selection
 */

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Zap, Heart } from "lucide-react";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: "1.5s" }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 relative">
        {/* Teacher Mascot - Large Hero */}
        <div className="text-center mb-8 animate-in fade-in zoom-in duration-700">
          <div className="relative inline-block">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            
            {/* Mascot Container */}
            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-2 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-white p-2 overflow-hidden">
                <img
                  src="/teacher-mascot.jpg"
                  alt="AI Sathi Teacher"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Floating Sparkles around mascot */}
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-pink-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
            <Heart className="absolute top-4 -left-8 w-6 h-6 text-red-400 animate-bounce" style={{ animationDelay: "1s" }} />
            <Heart className="absolute top-4 -right-8 w-6 h-6 text-red-400 animate-bounce" style={{ animationDelay: "1.5s" }} />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h1 className="text-6xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Sathi
            </span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            Powered by Small Language Models (SLM)
          </p>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Built for Rural India 🇮🇳
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Button
            onClick={() => navigate("/language-onboarding")}
            size="lg"
            className="text-xl px-12 py-8 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-6 h-6 mr-3" />
            Start Learning!
            <Sparkles className="w-6 h-6 ml-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
