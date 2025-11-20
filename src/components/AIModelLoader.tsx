import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { CreateMLCEngine, MLCEngine } from "@mlc-ai/web-llm";

interface AIModelLoaderProps {
  onModelLoaded: (engine: MLCEngine | null) => void;
}

export const AIModelLoader = ({ onModelLoaded }: AIModelLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing AI model...");

  useEffect(() => {
    const loadModel = async () => {
      try {
        setStatus("Checking GPU availability...");
        setProgress(10);

        // WebLLM requires WebGPU
        if (!("gpu" in navigator)) {
          throw new Error("WebGPU is not supported in this browser.");
        }

        setStatus("Loading Qwen 2.5 Model (WebLLM)...");
        setProgress(20);

        const initProgressCallback = (report: { text: string; progress: number }) => {
          setStatus(report.text);
          setProgress(20 + (report.progress * 80)); // Map 0-1 to 20-100
        };

        const engine = await CreateMLCEngine(
          "Qwen/Qwen2.5-0.5B-Instruct-q4f16_1-MLC",
          { initProgressCallback }
        );

        setProgress(100);
        setStatus("Ready! Running on GPU 🚀");

        setTimeout(() => onModelLoaded(engine), 300);
      } catch (error) {
        console.error("Error loading model:", error);
        setStatus("Error loading model. Using fallback mode.");
        // Still allow the app to work with rule-based responses
        setTimeout(() => onModelLoaded(null), 500);
      }
    };

    loadModel();
  }, [onModelLoaded]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-background to-primary/5">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center shadow-lg overflow-hidden border-2 border-primary/20 animate-pulse">
            <img
              src="/teacher-mascot.jpg"
              alt="AI Sathi Teacher"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-foreground">AI Sathi</h2>
          <p className="text-muted-foreground">{status}</p>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-center text-muted-foreground">{progress}% complete</p>
        </div>

        <div className="p-4 bg-card rounded-xl border border-border">
          <p className="text-sm text-muted-foreground text-center">
            First time: ~80MB download. After that, works completely offline! ✨
          </p>
        </div>
      </div>
    </div>
  );
};
