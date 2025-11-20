import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { pipeline } from "@huggingface/transformers";

interface AIModelLoaderProps {
  onModelLoaded: (pipelines: { mathModel: any; textModel: any }) => void;
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
        
        // Load Math Model - Specialized for mathematical reasoning
        // Using Flan-T5 Small (77M params) - excellent for math problems
        setStatus("Downloading math model...");
        const mathModel = await pipeline(
          "text2text-generation",
          "Xenova/flan-t5-small",
          { 
            device,
            dtype: device === "webgpu" ? "fp32" : "q8",
            progress_callback: (progress: any) => {
              if (progress.status === "progress" && progress.progress) {
                setProgress(25 + (progress.progress * 0.3));
              }
            }
          }
        );
        
        setProgress(55);
        
        // Load Text Model - For explanations and conversations
        // Using Qwen 2.5 0.5B - lightweight conversational model
        setStatus("Downloading explanation model...");
        const textModel = await pipeline(
          "text-generation",
          "Xenova/Qwen2.5-0.5B-Instruct",
          { 
            device,
            dtype: device === "webgpu" ? "fp32" : "q8",
            progress_callback: (progress: any) => {
              if (progress.status === "progress" && progress.progress) {
                setProgress(55 + (progress.progress * 0.35));
              }
            }
          }
        );
        
        setProgress(95);
        setStatus("Initializing offline mode...");
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setProgress(100);
        setStatus(`Ready! Running on ${device === "webgpu" ? "GPU" : "CPU"} 🚀`);
        
        console.log("✅ Both models loaded successfully!");
        console.log("Math Model:", mathModel);
        console.log("Text Model:", textModel);
        setTimeout(() => onModelLoaded({ mathModel, textModel }), 300);
      } catch (error) {
        console.error("❌ Error loading models:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        setStatus(`Error: ${error instanceof Error ? error.message : 'Failed to load models'}. Using fallback mode.`);
        // Still allow the app to work with rule-based responses
        setTimeout(() => onModelLoaded({ mathModel: null, textModel: null }), 500);
      }
    };

    loadModel();
  }, [onModelLoaded]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-background to-primary/5">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
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
            First time: ~200MB download (Math + Text models). After that, works completely offline! ✨
          </p>
        </div>
      </div>
    </div>
  );
};
