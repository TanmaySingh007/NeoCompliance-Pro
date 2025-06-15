import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Users, TrendingUp, CheckCircle, ArrowRight, Sparkles, Brain, Cpu, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
  {
    icon: Brain,
    title: "Neural Intelligence",
    description: "Advanced AI-powered compliance analysis with deep learning capabilities",
    color: "from-cyan-400 to-blue-500"
  },
  {
    icon: Zap,
    title: "Quantum Speed",
    description: "Instant compliance validation with bioluminescent neural processing",
    color: "from-purple-400 to-pink-500"
  },
  {
    icon: Eye,
    title: "Pandora Vision",
    description: "See compliance issues through the lens of advanced alien technology",
    color: "from-emerald-400 to-cyan-500"
  },
  {
    icon: Cpu,
    title: "Matrix Analytics",
    description: "Comprehensive reporting with three-dimensional data visualization",
    color: "from-blue-400 to-purple-500"
  }];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10],
      rotate: [0, 5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden" data-id="ewcd4uryq" data-path="src/pages/HomePage.tsx">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden" data-id="3lrzsh6p0" data-path="src/pages/HomePage.tsx">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-cyan-500/20 to-transparent rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }} data-id="1h2k2jval" data-path="src/pages/HomePage.tsx" />

        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-purple-500/20 to-transparent rounded-full"
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }} data-id="4uwq3w0xy" data-path="src/pages/HomePage.tsx" />

        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) =>
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [-20, 20],
            x: [-10, 10],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }} data-id="1kkrbsp28" data-path="src/pages/HomePage.tsx" />

        )}
      </div>

      {/* Hero Section with Neural Image */}
      <section className="relative py-20 px-4 overflow-hidden" data-id="c4il61qj1" data-path="src/pages/HomePage.tsx">
        {/* Neural Compliance Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-0 left-0 w-full h-full" data-id="ij13si6vl" data-path="src/pages/HomePage.tsx">

          <div className="relative w-full h-full" data-id="d5gnkw7xe" data-path="src/pages/HomePage.tsx">
            <img
              src="https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/22523/668667e9-6bf3-40fb-b747-897d395ee230.png"
              alt="Welcome to the neural compliance world"
              className="w-full h-full object-cover opacity-20" data-id="ob2utfy0q" data-path="src/pages/HomePage.tsx" />

            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-indigo-900/80" data-id="erp2wy2o4" data-path="src/pages/HomePage.tsx" />
          </div>
        </motion.div>

        <div className="container mx-auto text-center relative z-10" data-id="ebaly1zg6" data-path="src/pages/HomePage.tsx">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6" data-id="64xhyypvh" data-path="src/pages/HomePage.tsx">

            <Badge
              variant="outline"
              className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 backdrop-blur-sm" data-id="jchsub8cs" data-path="src/pages/HomePage.tsx">

              <Sparkles className="w-4 h-4 mr-2" data-id="26bber00y" data-path="src/pages/HomePage.tsx" />
              Next-Gen Neural Compliance Platform
            </Badge>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              textShadow: "0 0 30px rgba(6, 182, 212, 0.3)"
            }} data-id="cmluvwxiw" data-path="src/pages/HomePage.tsx">

            NeoCompliance Pro
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-cyan-200/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }} data-id="8bdvpezwn" data-path="src/pages/HomePage.tsx">

            Transform your compliance workflow with Avatar-inspired AI intelligence, 
            bioluminescent monitoring, and seamless neural automation
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }} data-id="m0epvvc9o" data-path="src/pages/HomePage.tsx">

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                "0 0 20px rgba(6, 182, 212, 0.3)",
                "0 0 40px rgba(6, 182, 212, 0.6)",
                "0 0 20px rgba(6, 182, 212, 0.3)"]

              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity },
                scale: { duration: 0.2 }
              }} data-id="yjasfi7d0" data-path="src/pages/HomePage.tsx">

              <Button
                size="lg"
                className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 shadow-2xl text-white border-0"
                onClick={() => navigate('/compliance')} data-id="2bak8wbjw" data-path="src/pages/HomePage.tsx">

                Initiate Neural Scan
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }} data-id="kgr912a1g" data-path="src/pages/HomePage.tsx">

                  <ArrowRight className="w-5 h-5" data-id="7h8ohya3y" data-path="src/pages/HomePage.tsx" />
                </motion.div>
              </Button>
            </motion.div>
            
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-semibold border-2 border-cyan-400/50 text-cyan-300 hover:border-cyan-400 hover:text-cyan-200 hover:bg-cyan-400/10 backdrop-blur-sm transition-all duration-300" data-id="0tvd6tu34" data-path="src/pages/HomePage.tsx">

              View Neural Demo
            </Button>
          </motion.div>
        </div>

        {/* Floating 3D elements */}
        <motion.div
          className="absolute top-20 left-10 text-cyan-400/20"
          variants={floatingVariants}
          animate="float" data-id="7fuvxsqga" data-path="src/pages/HomePage.tsx">

          <Shield className="w-16 h-16" data-id="z9rb01p5r" data-path="src/pages/HomePage.tsx" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-purple-400/20"
          variants={floatingVariants}
          animate="float"
          transition={{ delay: 1 }} data-id="fhy0hlizk" data-path="src/pages/HomePage.tsx">

          <CheckCircle className="w-12 h-12" data-id="h93vh5zwu" data-path="src/pages/HomePage.tsx" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-20 text-emerald-400/20"
          variants={floatingVariants}
          animate="float"
          transition={{ delay: 2 }} data-id="namcdgpxl" data-path="src/pages/HomePage.tsx">

          <Brain className="w-14 h-14" data-id="54fr6zpae" data-path="src/pages/HomePage.tsx" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative" data-id="sj67wmlq3" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto" data-id="m5si1lyc0" data-path="src/pages/HomePage.tsx">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }} data-id="36ivnl0n8" data-path="src/pages/HomePage.tsx">

            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent" data-id="1wtybh9ag" data-path="src/pages/HomePage.tsx">
              Pandora-Level Features
            </h2>
            <p className="text-xl text-cyan-200/70 max-w-2xl mx-auto" data-id="0el2jfsx5" data-path="src/pages/HomePage.tsx">
              Harness the power of bioluminescent technology for unparalleled compliance intelligence
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }} data-id="qrgh92jr4" data-path="src/pages/HomePage.tsx">

            {features.map((feature, index) =>
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateY: 5
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group" data-id="jmta7n8ya" data-path="src/pages/HomePage.tsx">

                <Card className="h-full border-0 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 bg-slate-800/40 backdrop-blur-xl border border-cyan-500/30 overflow-hidden" data-id="mayy24ek6" data-path="src/pages/HomePage.tsx">
                  <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"
                  animate={{
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }} data-id="9urug3tzr" data-path="src/pages/HomePage.tsx" />

                  <CardHeader className="text-center pb-4 relative z-10" data-id="49in5n6yk" data-path="src/pages/HomePage.tsx">
                    <motion.div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-2xl group-hover:shadow-lg transition-all duration-300`}
                    whileHover={{
                      rotate: 360,
                      scale: 1.1
                    }}
                    transition={{ duration: 0.6 }}
                    animate={{
                      boxShadow: [
                      "0 0 20px rgba(6, 182, 212, 0.3)",
                      "0 0 30px rgba(6, 182, 212, 0.5)",
                      "0 0 20px rgba(6, 182, 212, 0.3)"]

                    }} data-id="mfetrt5b1" data-path="src/pages/HomePage.tsx">

                      <feature.icon className="w-8 h-8 text-white" data-id="2r4pm7p3g" data-path="src/pages/HomePage.tsx" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors" data-id="hiwq7ehfc" data-path="src/pages/HomePage.tsx">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10" data-id="jgu47molv" data-path="src/pages/HomePage.tsx">
                    <CardDescription className="text-center text-cyan-200/70 leading-relaxed" data-id="ts7hb05d5" data-path="src/pages/HomePage.tsx">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden" data-id="8d65b1z37" data-path="src/pages/HomePage.tsx">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-indigo-700/20"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }} data-id="oa2haynoy" data-path="src/pages/HomePage.tsx" />

        <div className="container mx-auto text-center relative z-10" data-id="l1842585k" data-path="src/pages/HomePage.tsx">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }} data-id="0ejhyv979" data-path="src/pages/HomePage.tsx">

            <h2 className="text-4xl md:text-5xl font-bold text-cyan-300 mb-6" data-id="jciyay5qz" data-path="src/pages/HomePage.tsx">
              Ready to Enter Pandora?
            </h2>
            <p className="text-xl text-cyan-200/80 mb-8 max-w-2xl mx-auto" data-id="ympau6ssv" data-path="src/pages/HomePage.tsx">
              Join the neural network of organizations using NeoCompliance Pro 
              to achieve unprecedented compliance intelligence
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                "0 0 30px rgba(6, 182, 212, 0.4)",
                "0 0 60px rgba(6, 182, 212, 0.7)",
                "0 0 30px rgba(6, 182, 212, 0.4)"]

              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity },
                scale: { duration: 0.2 }
              }} data-id="qwxbnn2t4" data-path="src/pages/HomePage.tsx">

              <Button
                size="lg"
                className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 shadow-2xl text-white border-0"
                onClick={() => navigate('/compliance')} data-id="nl16fwe3l" data-path="src/pages/HomePage.tsx">

                Begin Neural Journey
                <ArrowRight className="w-5 h-5 ml-2" data-id="x14tkvrgf" data-path="src/pages/HomePage.tsx" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }} data-id="l9vxotcte" data-path="src/pages/HomePage.tsx">

          <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform rotate-12" data-id="vti24xtzb" data-path="src/pages/HomePage.tsx"></div>
        </motion.div>
      </section>
    </div>);

};

export default HomePage;