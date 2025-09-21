import { useState } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "@/components/ParticlesBackground";
import Navigation from "@/components/Navigation";
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
      <Navigation />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="container mx-auto px-4 pt-24 pb-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.h1 
              className="text-6xl md:text-7xl font-bold text-primary mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                textShadow: "0 0 20px hsl(var(--primary) / 0.5)"
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
        </section>

        {/* Smart Waste Scanner Section */}
        <section id="scanner" className="container mx-auto px-4 py-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <WasteScanner onItemScanned={handleItemScanned} />
          </motion.div>
        </section>

        {/* AI Assistant Section */}
        <section id="assistant" className="container mx-auto px-4 py-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AIAssistant />
          </motion.div>
        </section>

        {/* Impact Dashboard Section */}
        <section id="dashboard" className="container mx-auto px-4 py-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ImpactDashboard itemsScanned={itemsScanned} />
          </motion.div>
        </section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-16"
        >
          <div className="container mx-auto px-4">
            <p className="text-muted-foreground">
              Made with 💚 for a sustainable future
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
