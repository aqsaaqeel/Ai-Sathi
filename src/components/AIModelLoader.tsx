import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { pipeline } from "@huggingface/transformers";

interface AIModelLoaderProps {
  onModelLoaded: (pipeline: any) => void;
}

export const AIModelLoader = ({ onModelLoaded }: AIModelLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing AI model...");

  useEffect(() => {
    const loadModel = async () => {
      try {
        setStatus("Checking GPU availability...");
        setProgress(10);

        // Try WebGPU first, fallback to WASM
        let device: "webgpu" | "wasm" = "wasm";
        try {
          if ("gpu" in navigator) {
            await (navigator as any).gpu.requestAdapter();
            device = "webgpu";
            setStatus("WebGPU detected! Loading AI model...");
          } else {
            setStatus("Loading AI model (CPU mode)...");
          }
        } catch {
          setStatus("Loading AI model (CPU mode)...");
        }

        setProgress(25);

        // Load a small text generation model optimized for on-device use
        // Using Flan-T5 Small (77M params) - good balance of size and capability
        setStatus("Downloading model files...");
        const generator = await pipeline(
          "text2text-generation",
          "Xenova/flan-t5-small",
          {
            device,
            dtype: device === "webgpu" ? "fp32" : "fp32",
            progress_callback: (progress: any) => {
              if (progress.status === "progress" && progress.progress) {
                setProgress(25 + (progress.progress * 0.6));
              }
            }
          }
        );

        setProgress(90);
        setStatus("Initializing offline mode...");
        await new Promise(resolve => setTimeout(resolve, 500));

        setProgress(100);
        setStatus(`Ready! Running on ${device === "webgpu" ? "GPU" : "CPU"} 🚀`);

        setTimeout(() => onModelLoaded(generator), 300);
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
