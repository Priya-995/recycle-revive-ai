import { useState } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "@/components/ParticlesBackground";
import WasteScanner from "@/components/WasteScanner";
import AIAssistant from "@/components/AIAssistant";
import ImpactDashboard from "@/components/ImpactDashboard";

const Index = () => {
  const [itemsScanned, setItemsScanned] = useState(0);

  const handleItemScanned = () => {
    setItemsScanned(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <ParticlesBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            🌱 EcoSegrega
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground font-light"
          >
            AI-Powered Waste Segregation Helper
          </motion.p>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6 max-w-md"
          />
        </motion.div>

        <div className="space-y-8">
          <WasteScanner onItemScanned={handleItemScanned} />
          <AIAssistant />
          <ImpactDashboard itemsScanned={itemsScanned} />
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16 pb-8"
        >
          <p className="text-muted-foreground">
            Made with 💚 for a sustainable future
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
