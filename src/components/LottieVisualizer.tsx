import React from 'react';
import Lottie from 'lottie-react';
import { VisualAsset } from '@/data/visualAssets';

interface LottieVisualizerProps {
    asset: VisualAsset;
}

const LottieVisualizer: React.FC<LottieVisualizerProps> = ({ asset }) => {
    const [animationData, setAnimationData] = React.useState<any>(null);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        setAnimationData(null);
        setError(null);

        // Fetch the JSON from the public folder
        console.log(`Fetching animation: /lottie/${asset.assetId}.json`);
        fetch(`/lottie/${asset.assetId}.json`)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load: ${res.status} ${res.statusText}`);
                return res.json();
            })
            .then(data => {
                console.log("Loaded animation data:", data);
                setAnimationData(data);
            })
            .catch(err => {
                console.error("Failed to load animation", err);
                setError(err.message);
            });
    }, [asset.assetId]);

    if (error) return (
        <div className="h-48 w-full bg-red-50 rounded-xl flex items-center justify-center text-red-500 text-sm p-4 text-center">
            Failed to load visual: {error}
        </div>
    );

    if (!animationData) return (
        <div className="h-48 w-full bg-muted/50 animate-pulse rounded-xl flex items-center justify-center text-muted-foreground text-sm">
            Loading Visual...
        </div>
    );

    return (
        <div className="my-4 p-4 bg-card rounded-xl shadow-sm border border-border">
            <div className="h-64 w-full flex items-center justify-center bg-white/50 rounded-lg overflow-hidden">
                <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    className="h-full w-full"
                    style={{ width: '100%', height: '100%', minHeight: '200px' }}
                />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2 italic">{asset.description}</p>
        </div>
    );
};

export default LottieVisualizer;
