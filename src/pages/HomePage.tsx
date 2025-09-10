import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Users, Award, ArrowRight, Sparkles, Star } from 'lucide-react';
import Background3D from '@/components/Background3D';
import MagicalParticles from '@/components/MagicalParticles';
import FAQSection from '@/components/FAQSection';
import HowItWorks from '@/components/HowItWorks';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
  { number: '92%', label: 'Accuracy Rate', icon: '🎯' },
  { number: '2,000+', label: 'Analyses Completed', icon: '📊' },
  { number: '30+', label: 'Compliance Rules', icon: '📋' },
  { number: '24/7', label: 'AI Availability', icon: '🕐' }];


  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden" data-id="7i26kcd8u" data-path="src/pages/HomePage.tsx">
      <Background3D data-id="bjrqyvy7e" data-path="src/pages/HomePage.tsx" />
      <MagicalParticles data-id="gzyp5dwsx" data-path="src/pages/HomePage.tsx" />
      
      {/* Enhanced Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 py-6 px-8 border-b border-slate-800/50 backdrop-blur-sm glass-morphism" data-id="8wovzar0s" data-path="src/pages/HomePage.tsx">

        <div className="container mx-auto flex justify-between items-center" data-id="8k6zzqu4t" data-path="src/pages/HomePage.tsx">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')} data-id="p0wat118n" data-path="src/pages/HomePage.tsx">

            <motion.div
              className="w-14 h-14 rounded-xl flex items-center justify-center crystal-pulse"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }} data-id="k0ka9qr6z" data-path="src/pages/HomePage.tsx">

              <img
                src="https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/23409/b424a59c-043d-4175-8f31-6c4b0ba5aa45.png"
                alt="NeoCompliance-Pro Logo"
                className="w-12 h-12 object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">✨</div>';
                }} data-id="ur4l3jnle" data-path="src/pages/HomePage.tsx" />

            </motion.div>
            <div data-id="3z5hwnmom" data-path="src/pages/HomePage.tsx">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" data-id="x16c34f5h" data-path="src/pages/HomePage.tsx">
                NeoCompliance-Pro
              </h1>
              <p className="text-xs text-slate-400" data-id="r5hyoja6b" data-path="src/pages/HomePage.tsx">Powered By NeoCompliance-Pro</p>
            </div>
          </motion.div>
          
          <nav className="space-x-4" data-id="s51lrv7wn" data-path="src/pages/HomePage.tsx">
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200" data-id="fmzkm5t7v" data-path="src/pages/HomePage.tsx">

              Home
            </Button>
            <Button
              onClick={() => navigate('/compliance')}
              className="disney-gradient-blue hover:scale-105 transition-transform duration-200 text-white font-semibold px-6" data-id="ztp79etvj" data-path="src/pages/HomePage.tsx">

              Start Checking
            </Button>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 container mx-auto py-20 px-4 text-center" data-id="pm6n0ij9o" data-path="src/pages/HomePage.tsx">

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="mb-8" data-id="84jtx23dl" data-path="src/pages/HomePage.tsx">

          <Badge className="mb-6 px-6 py-2 text-sm disney-gradient-magic text-slate-800 font-bold" data-id="poals1s4o" data-path="src/pages/HomePage.tsx">
            <Sparkles className="w-4 h-4 mr-2" data-id="sselbt0uj" data-path="src/pages/HomePage.tsx" />
            Powered By NeoCompliance-Pro
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" data-id="mezwl8qt0" data-path="src/pages/HomePage.tsx">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" data-id="kv9v44hns" data-path="src/pages/HomePage.tsx">
              Revolutionize
            </span>
            <br data-id="n5d8p064p" data-path="src/pages/HomePage.tsx" />
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent" data-id="08qsmbvvm" data-path="src/pages/HomePage.tsx">
              Ad Compliance
            </span>
            <br data-id="hx026rfrz" data-path="src/pages/HomePage.tsx" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent" data-id="bv84bk4dc" data-path="src/pages/HomePage.tsx">
              with AI Precision
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed" data-id="56vzlc6yf" data-path="src/pages/HomePage.tsx">

            Verify Ads in Seconds, Eliminate Errors, and Save Time. 
            Transform your compliance workflow with our cutting-edge AI technology that delivers
            <span className="text-amber-400 font-semibold" data-id="uhddsh1ir" data-path="src/pages/HomePage.tsx"> instant precision</span> and 
            <span className="text-cyan-400 font-semibold" data-id="zpkgr4en3" data-path="src/pages/HomePage.tsx"> unparalleled accuracy</span>.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12" data-id="hppifcd8z" data-path="src/pages/HomePage.tsx">

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }} data-id="gg6q7hat9" data-path="src/pages/HomePage.tsx">
            <Button
              onClick={() => navigate('/compliance')}
              size="lg"
              className="disney-gradient-blue hover:scale-105 transition-transform duration-200 text-white font-bold text-lg px-8 py-4 crystal-pulse shadow-2xl hover:shadow-blue-500/25" data-id="zlrmzjaq8" data-path="src/pages/HomePage.tsx">

              <Sparkles className="w-6 h-6 mr-2" data-id="t7f4cfuaw" data-path="src/pages/HomePage.tsx" />
              Analyse your ad now
              <ArrowRight className="w-6 h-6 ml-2" data-id="a00eqb0lx" data-path="src/pages/HomePage.tsx" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto" data-id="lao8hqt1b" data-path="src/pages/HomePage.tsx">

          {stats.map((stat, index) =>
          <motion.div
            key={stat.label}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
            className="text-center" data-id="sqzqwf5wm" data-path="src/pages/HomePage.tsx">

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm glass-morphism hover:scale-105 transition-transform duration-200" data-id="nbpw1gg19" data-path="src/pages/HomePage.tsx">
                <CardContent className="p-6" data-id="l3j20wu30" data-path="src/pages/HomePage.tsx">
                  <div className="text-3xl mb-2" data-id="7669dpt5m" data-path="src/pages/HomePage.tsx">{stat.icon}</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1" data-id="czk118wje" data-path="src/pages/HomePage.tsx">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-400" data-id="bbjtz6k7m" data-path="src/pages/HomePage.tsx">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 container mx-auto py-12 px-4" data-id="tz4oyrnli" data-path="src/pages/HomePage.tsx">
        <HowItWorks data-id="6ef7qvq1k" data-path="src/pages/HomePage.tsx" />
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 container mx-auto py-12 px-4" data-id="uf3er8tsw" data-path="src/pages/HomePage.tsx">
        <FAQSection data-id="tqm1rw88e" data-path="src/pages/HomePage.tsx" />
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 container mx-auto py-20 px-4" data-id="se89rvo8u" data-path="src/pages/HomePage.tsx">

        <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-slate-700/50 backdrop-blur-xl glass-morphism crystal-pulse" data-id="kh67gd0ip" data-path="src/pages/HomePage.tsx">
          <CardContent className="p-12 text-center" data-id="01zqzcsxt" data-path="src/pages/HomePage.tsx">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring" }} data-id="4yz0jrg9q" data-path="src/pages/HomePage.tsx">

              <Sparkles className="w-16 h-16 mx-auto mb-6 text-amber-400 animate-pulse" data-id="1jobm5e39" data-path="src/pages/HomePage.tsx" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent" data-id="ge1gr2mp3" data-path="src/pages/HomePage.tsx">
                Ready to Use NeoCompliance-Pro?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto" data-id="fpouhz5c8" data-path="src/pages/HomePage.tsx">
                Join thousands of users who trust our AI-powered compliance platform.
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }} data-id="rl14pslgq" data-path="src/pages/HomePage.tsx">

                <Button
                  onClick={() => navigate('/compliance')}
                  size="lg"
                  className="disney-gradient-sunset hover:shadow-2xl transition-all duration-300 text-white font-bold text-xl px-12 py-6" data-id="799805ls6" data-path="src/pages/HomePage.tsx">

                  <Zap className="w-6 h-6 mr-2" data-id="w2lo4o9d0" data-path="src/pages/HomePage.tsx" />
                  Analyze your ads now
                  <Sparkles className="w-6 h-6 ml-2" data-id="35vbzyt3n" data-path="src/pages/HomePage.tsx" />
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Enhanced Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 py-12 mt-20 backdrop-blur-sm glass-morphism" data-id="kw60y0l49" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4 text-center text-slate-500" data-id="r5huaav6z" data-path="src/pages/HomePage.tsx">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-3 mb-4" data-id="6b1oz4tgr" data-path="src/pages/HomePage.tsx">

            <motion.div
              className="w-10 h-10 rounded-lg flex items-center justify-center crystal-pulse"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }} data-id="e60c7alpv" data-path="src/pages/HomePage.tsx">

              <img
                src="https://newoaks.s3.us-west-1.amazonaws.com/AutoDev/23409/b424a59c-043d-4175-8f31-6c4b0ba5aa45.png"
                alt="NeoCompliance-Pro Logo"
                className="w-8 h-8 object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-sm">✨</div>';
                }} data-id="n98bl8b1l" data-path="src/pages/HomePage.tsx" />

            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" data-id="lbpindkng" data-path="src/pages/HomePage.tsx">
              NeoCompliance-Pro
            </span>
          </motion.div>
          <p data-id="m1akpscmb" data-path="src/pages/HomePage.tsx">© {new Date().getFullYear()} NeoCompliance-Pro. All rights reserved.</p>
          <p className="text-sm mt-2 flex items-center justify-center" data-id="gbyfqcya9" data-path="src/pages/HomePage.tsx">
            <Sparkles className="w-4 h-4 mr-2 text-amber-400" data-id="n8jmgnb53" data-path="src/pages/HomePage.tsx" />
            Ensuring advertisement compliance with magical AI technology.
            <Sparkles className="w-4 h-4 ml-2 text-amber-400" data-id="adta4sczl" data-path="src/pages/HomePage.tsx" />
          </p>
        </div>
      </footer>
    </div>);

};

export default HomePage;