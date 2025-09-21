import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CameraOff, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WasteScannerProps {
  onItemScanned: () => void;
}

interface Prediction {
  className: string;
  probability: number;
}

const WasteScanner = ({ onItemScanned }: WasteScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [status, setStatus] = useState("Click 'Start Camera' to begin scanning waste items!");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const wasteTypes = [
    { name: "Plastic Bottle", category: "Dry Waste", points: 5 },
    { name: "Paper", category: "Dry Waste", points: 3 },
    { name: "Organic Waste", category: "Wet Waste", points: 4 },
    { name: "Metal Can", category: "Dry Waste", points: 6 },
  ];

  const startCamera = async () => {
    try {
      setStatus("Loading AI brain... Please wait!");
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        await videoRef.current.play();
      }

      // Simulate model loading
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsScanning(true);
      setStatus("✅ Camera ready! Point at waste items!");
      startPrediction();
      
    } catch (error) {
      setStatus("❌ Camera not available. Please check permissions!");
      console.error("Camera error:", error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsScanning(false);
    setPredictions([]);
    setStatus("Camera stopped. Click 'Start Camera' to scan again!");
  };

  const startPrediction = () => {
    const predict = () => {
      if (!isScanning) return;

      // Simulate predictions
      const newPredictions = wasteTypes.map(type => ({
        className: type.name,
        probability: Math.random(),
        category: type.category,
        points: type.points,
      }));

      // Sort by probability
      newPredictions.sort((a, b) => b.probability - a.probability);
      setPredictions(newPredictions);
      
      // Update scan count
      if (Math.random() > 0.7) {
        onItemScanned();
      }

      setTimeout(predict, 1000);
    };

    predict();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const getConfidenceColor = (probability: number) => {
    if (probability > 0.7) return "text-green-400";
    if (probability > 0.4) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-hover p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Scan className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">📷 Smart Waste Scanner</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Point your camera at any waste item and I'll tell you how to dispose it!
      </p>

      <div className="flex gap-4 justify-center mb-6">
        <Button
          onClick={startCamera}
          disabled={isScanning}
          className="btn-primary"
        >
          <Camera className="w-4 h-4 mr-2" />
          Start Camera
        </Button>
        
        <Button
          onClick={stopCamera}
          disabled={!isScanning}
          variant="outline"
          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
        >
          <CameraOff className="w-4 h-4 mr-2" />
          Stop Camera
        </Button>
      </div>

      <div className="flex justify-center mb-6">
        <motion.div 
          className={`relative rounded-2xl overflow-hidden ${isScanning ? 'border-glow scan-frame' : ''}`}
          animate={isScanning ? { boxShadow: "0 0 30px hsl(var(--primary) / 0.5)" } : {}}
        >
          <video
            ref={videoRef}
            className="rounded-2xl max-w-full h-auto"
            width={320}
            height={240}
            style={{ transform: 'scaleX(-1)' }}
          />
          <canvas ref={canvasRef} className="hidden" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-6"
      >
        <div className={`p-4 rounded-xl ${
          status.includes('✅') ? 'bg-green-500/20 text-green-400' :
          status.includes('❌') ? 'bg-red-500/20 text-red-400' :
          'bg-muted/50 text-muted-foreground'
        }`}>
          {status}
        </div>
      </motion.div>

      <AnimatePresence>
        {predictions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-center mb-4">Predictions</h3>
            {predictions.map((prediction, index) => (
              <motion.div
                key={prediction.className}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-4 flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">{prediction.className}</div>
                  <div className="text-sm text-muted-foreground">
                    Category: {(prediction as any).category}
                  </div>
                </div>
                <div className={`text-lg font-bold ${getConfidenceColor(prediction.probability)}`}>
                  {(prediction.probability * 100).toFixed(0)}%
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WasteScanner;