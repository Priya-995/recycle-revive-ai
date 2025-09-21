import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Leaf, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Stats {
  itemsScanned: number;
  co2Saved: number;
  treesEquivalent: number;
  pointsEarned: number;
}

interface ImpactDashboardProps {
  itemsScanned: number;
}

const ImpactDashboard = ({ itemsScanned }: ImpactDashboardProps) => {
  const [stats, setStats] = useState<Stats>({
    itemsScanned: 0,
    co2Saved: 0,
    treesEquivalent: 0,
    pointsEarned: 0,
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setStats(prev => ({
      ...prev,
      itemsScanned,
    }));
  }, [itemsScanned]);

  const updateStats = () => {
    setIsAnimating(true);
    
    // Simulate real impact calculations
    const newCo2Saved = Math.floor(itemsScanned * 0.5 + Math.random() * 10);
    const newTreesEquivalent = Math.floor(newCo2Saved / 22); // 1 tree = ~22kg CO2/year
    const newPointsEarned = stats.pointsEarned + Math.floor(Math.random() * 50) + 10;

    // Animate numbers
    animateNumber('co2Saved', stats.co2Saved, newCo2Saved);
    animateNumber('treesEquivalent', stats.treesEquivalent, newTreesEquivalent);
    animateNumber('pointsEarned', stats.pointsEarned, newPointsEarned);

    setTimeout(() => setIsAnimating(false), 1500);
  };

  const animateNumber = (key: keyof Stats, start: number, end: number) => {
    const duration = 1000;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(start + (end - start) * progress);
      
      setStats(prev => ({
        ...prev,
        [key]: currentValue,
      }));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const statCards = [
    {
      icon: Zap,
      label: "Items Scanned",
      value: stats.itemsScanned,
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-blue-600/10",
    },
    {
      icon: Leaf,
      label: "kg CO₂ Saved",
      value: stats.co2Saved,
      color: "text-green-400",
      bgColor: "from-green-500/20 to-green-600/10",
    },
    {
      icon: TrendingUp,
      label: "Trees Equivalent",
      value: stats.treesEquivalent,
      color: "text-emerald-400",
      bgColor: "from-emerald-500/20 to-emerald-600/10",
    },
    {
      icon: Award,
      label: "Green Points",
      value: stats.pointsEarned,
      color: "text-yellow-400",
      bgColor: "from-yellow-500/20 to-yellow-600/10",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card-hover p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">📊 Impact Dashboard</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        See how your waste segregation helps the environment!
      </p>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${stat.bgColor} mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            
            <motion.div
              key={stat.value}
              initial={{ scale: 1 }}
              animate={isAnimating ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`text-3xl font-bold ${stat.color} counter mb-2`}
            >
              {stat.value}
            </motion.div>
            
            <div className="text-sm text-muted-foreground font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center">
        <Button
          onClick={updateStats}
          disabled={isAnimating}
          className="btn-primary"
        >
          <motion.div
            animate={isAnimating ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 1, repeat: isAnimating ? Infinity : 0 }}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
          </motion.div>
          {isAnimating ? "Calculating Impact..." : "Update Impact Stats"}
        </Button>
      </div>

      {stats.pointsEarned > 50 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-400/30"
        >
          <div className="flex items-center gap-2 text-yellow-400">
            <Award className="w-5 h-5" />
            <span className="font-semibold">Achievement Unlocked!</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            You're making a real difference! Keep up the great work! 🌱
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImpactDashboard;