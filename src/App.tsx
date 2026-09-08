import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Legend, Cell
} from 'recharts';
import { BrowserData } from './types';
import { loadAllBrowserData, getOverallScore, getCategoryScores } from './utils/dataLoader';
import { categories } from './data/categories';
import { browserAnalyses } from './data/analysis';
import { chartPalette } from './theme';

function App() {
  const [browsers, setBrowsers] = useState<BrowserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    loadAllBrowserData()
      .then(data => {
        setBrowsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e1e2e] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-[#cba6f7] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#cdd6f4] text-lg">Loading benchmark data...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1e1e2e] flex items-center justify-center">
        <div className="text-center p-8 bg-[#313244] rounded-2xl border border-[#45475a]">
          <p className="text-[#f38ba8] text-xl mb-2">⚠️ Failed to load data</p>
          <p className="text-[#a6adc8]">{error}</p>
          <p className="text-[#6c7086] text-sm mt-4">Make sure data files are in the /data folder</p>
        </div>
      </div>
    );
  }

  // Compute overall scores
  const overallScores = browsers.map(b => ({
    name: b.browser_full_name,
    shortName: b.browser_short_name,
    ...getOverallScore(b),
  })).sort((a, b) => b.combined - a.combined);

  // Compute JetStream and Speedometer rankings
  const jetstreamRanking = [...browsers].sort((a, b) => {
    const aScore = a.benchmarks.find(x => x.name === 'JetStream 3.0')?.overall_score || 0;
    const bScore = b.benchmarks.find(x => x.name === 'JetStream 3.0')?.overall_score || 0;
    return bScore - aScore;
  });

  const speedometerRanking = [...browsers].sort((a, b) => {
    const aScore = a.benchmarks.find(x => x.name === 'Speedometer 3.0')?.overall_score || 0;
    const bScore = b.benchmarks.find(x => x.name === 'Speedometer 3.0')?.overall_score || 0;
    return bScore - aScore;
  });

  const navItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'categories', label: 'Categories', icon: '📁' },
    { id: 'rankings', label: 'Rankings', icon: '🏆' },
    { id: 'analysis', label: 'Analysis', icon: '🔍' },
  ];

  return (
    <div className="min-h-screen bg-[#1e1e2e] text-[#cdd6f4] font-['Inter',sans-serif]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#181825]/90 backdrop-blur-xl border-b border-[#313244]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#cba6f7] to-[#89b4fa] flex items-center justify-center text-lg font-bold">
              B
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-[#cdd6f4]">Browser Benchmark Analytics</h1>
              <p className="text-xs text-[#6c7086] hidden sm:block">JetStream 3.0 & Speedometer 3.0 • {browsers.length} Browsers</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-[#cba6f7]/20 text-[#cba6f7]'
                    : 'text-[#a6adc8] hover:text-[#cdd6f4] hover:bg-[#313244]'
                }`}
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg bg-[#313244] text-[#cdd6f4]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-[#313244] overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileMenuOpen(false);
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? 'bg-[#cba6f7]/20 text-[#cba6f7]'
                        : 'text-[#a6adc8] hover:bg-[#313244]'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#313244]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#cba6f7]/5 via-transparent to-[#89b4fa]/5" />
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#cba6f7] via-[#89b4fa] to-[#94e2d5] bg-clip-text text-transparent">
              Browser Performance Deep Dive
            </h2>
            <p className="text-[#a6adc8] text-lg md:text-xl max-w-2xl mx-auto mb-6">
              Comprehensive analysis of {browsers.length} browsers across JetStream 3.0 and Speedometer 3.0 benchmarks
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-4 py-2 rounded-xl bg-[#313244]/50 border border-[#45475a] text-sm">
                <span className="text-[#cba6f7] font-semibold">{browsers.length}</span>
                <span className="text-[#6c7086] ml-1">Browsers Tested</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-[#313244]/50 border border-[#45475a] text-sm">
                <span className="text-[#89b4fa] font-semibold">2</span>
                <span className="text-[#6c7086] ml-1">Benchmark Suites</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-[#313244]/50 border border-[#45475a] text-sm">
                <span className="text-[#a6e3a1] font-semibold">{categories.length}</span>
                <span className="text-[#6c7086] ml-1">Categories</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-16">
        {/* Overall Performance Section */}
        <section id="overview">
          <SectionHeader
            icon="📊"
            title="Overall Performance"
            subtitle="Combined normalized scores from JetStream 3.0 and Speedometer 3.0"
          />
          
          {/* Overall Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {overallScores.slice(0, 3).map((browser, i) => (
              <motion.div
                key={browser.shortName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl border ${
                  i === 0 ? 'bg-gradient-to-br from-[#cba6f7]/10 to-[#89b4fa]/10 border-[#cba6f7]/30' :
                  i === 1 ? 'bg-[#313244]/50 border-[#45475a]' :
                  'bg-[#313244]/30 border-[#45475a]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                  <span className="text-3xl font-bold text-[#cba6f7]">{browser.combined.toFixed(1)}</span>
                </div>
                <p className="text-lg font-semibold text-[#cdd6f4]">{browser.name}</p>
                <div className="flex gap-4 mt-3 text-sm text-[#a6adc8]">
                  <span>JS: {browser.jetstream.toFixed(1)}</span>
                  <span>SP: {browser.speedometer.toFixed(2)}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Overall Bar Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#181825] rounded-2xl border border-[#313244] p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-[#cdd6f4]">Combined Performance Score</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={overallScores} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#313244" />
                <XAxis type="number" stroke="#6c7086" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="#6c7086" fontSize={12} width={120} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#313244', border: '1px solid #45475a', borderRadius: '12px' }}
                  labelStyle={{ color: '#cdd6f4' }}
                  itemStyle={{ color: '#cdd6f4' }}
                />
                <Bar dataKey="combined" radius={[0, 8, 8, 0]}>
                  {overallScores.map((entry, index) => (
                    <Cell key={entry.shortName} fill={chartPalette[index % chartPalette.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-[#181825] rounded-2xl border border-[#313244] p-6 mt-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-[#cdd6f4]">Performance Radar (Top 5)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={categories.map(cat => {
                const catData: Record<string, string | number> = { category: cat.name };
                browsers.slice(0, 5).forEach(browser => {
                  const scores = getCategoryScores(browser, cat.testNames, cat.benchmarkSuite);
                  const avg = scores.length > 0 ? scores.reduce((s, t) => s + t.score, 0) / scores.length : 0;
                  catData[browser.browser_full_name] = Math.round(avg);
                });
                return catData;
              })}>
                <PolarGrid stroke="#313244" />
                <PolarAngleAxis dataKey="category" stroke="#6c7086" fontSize={10} />
                <PolarRadiusAxis stroke="#45475a" fontSize={10} />
                {browsers.slice(0, 5).map((browser, i) => (
                  <Radar
                    key={browser.browser_short_name}
                    name={browser.browser_full_name}
                    dataKey={browser.browser_full_name}
                    stroke={chartPalette[i]}
                    fill={chartPalette[i]}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                ))}
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#313244', border: '1px solid #45475a', borderRadius: '12px' }}
                  labelStyle={{ color: '#cdd6f4' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </section>

        {/* Categories Section */}
        <section id="categories">
          <SectionHeader
            icon="📁"
            title="Category Breakdown"
            subtitle="Detailed performance analysis across specific workload categories"
          />

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat.id
                    ? 'bg-[#cba6f7]/20 border-[#cba6f7]/50 text-[#cba6f7]'
                    : 'bg-[#313244]/50 border-[#45475a] text-[#a6adc8] hover:border-[#6c7086] hover:text-[#cdd6f4]'
                }`}
              >
                <span className="mr-1.5">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Category Charts */}
          <AnimatePresence mode="wait">
            {(activeCategory ? categories.filter(c => c.id === activeCategory) : categories).map(cat => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#181825] rounded-2xl border border-[#313244] p-6 mb-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#cdd6f4]">{cat.name}</h3>
                    <p className="text-sm text-[#6c7086]">{cat.description}</p>
                  </div>
                </div>
                <p className="text-xs text-[#585b70] mb-4">Source: {cat.benchmarkSuite} • {cat.testNames.length} tests</p>
                
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={browsers.map(browser => {
                      const scores = getCategoryScores(browser, cat.testNames, cat.benchmarkSuite);
                      const avg = scores.length > 0 ? scores.reduce((s, t) => s + t.score, 0) / scores.length : 0;
                      return {
                        name: browser.browser_full_name,
                        score: Math.round(avg * 100) / 100,
                        testCount: scores.length,
                      };
                    }).sort((a, b) => b.score - a.score)}
                    margin={{ bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#313244" />
                    <XAxis dataKey="name" stroke="#6c7086" fontSize={11} angle={-20} textAnchor="end" height={60} />
                    <YAxis stroke="#6c7086" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#313244', border: '1px solid #45475a', borderRadius: '12px' }}
                      labelStyle={{ color: '#cdd6f4' }}
                      formatter={(value: number) => [value.toFixed(2), 'Avg Score']}
                    />
                    <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                      {browsers.map((browser, index) => (
                        <Cell key={browser.browser_short_name} fill={chartPalette[index % chartPalette.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {/* Rankings Section */}
        <section id="rankings">
          <SectionHeader
            icon="🏆"
            title="Rankings"
            subtitle="Overall and category-specific browser rankings"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Overall Rankings */}
            <RankingTable
              title="Overall Rankings"
              icon="🏆"
              data={overallScores.map((b, i) => ({
                rank: i + 1,
                name: b.name,
                score: b.combined.toFixed(1),
                detail: `JS: ${b.jetstream.toFixed(1)} | SP: ${b.speedometer.toFixed(2)}`,
              }))}
            />

            {/* JetStream Rankings */}
            <RankingTable
              title="JetStream 3.0 Rankings"
              icon="⚡"
              data={jetstreamRanking.map((b, i) => ({
                rank: i + 1,
                name: b.browser_full_name,
                score: (b.benchmarks.find(x => x.name === 'JetStream 3.0')?.overall_score || 0).toFixed(2),
                detail: 'Higher is better',
              }))}
            />

            {/* Speedometer Rankings */}
            <RankingTable
              title="Speedometer 3.0 Rankings"
              icon="🏎️"
              data={speedometerRanking.map((b, i) => ({
                rank: i + 1,
                name: b.browser_full_name,
                score: (b.benchmarks.find(x => x.name === 'Speedometer 3.0')?.overall_score || 0).toFixed(2),
                detail: 'Higher is better',
              }))}
            />

            {/* Category Winners */}
            <RankingTable
              title="Category Champions"
              icon="👑"
              data={categories.map((cat, i) => {
                let best = { name: '', avg: 0 };
                browsers.forEach(browser => {
                  const scores = getCategoryScores(browser, cat.testNames, cat.benchmarkSuite);
                  const avg = scores.length > 0 ? scores.reduce((s, t) => s + t.score, 0) / scores.length : 0;
                  if (avg > best.avg) best = { name: browser.browser_full_name, avg };
                });
                return {
                  rank: i + 1,
                  name: `${cat.icon} ${cat.name}`,
                  score: best.avg.toFixed(1),
                  detail: `🏅 ${best.name}`,
                };
              })}
            />
          </div>
        </section>

        {/* Browser Analysis Section */}
        <section id="analysis">
          <SectionHeader
            icon="🔍"
            title="In-Depth Browser Analysis"
            subtitle="Detailed analysis, pros & cons, and recommendations for each browser"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {browsers.map((browser, i) => {
              const analysis = browserAnalyses[browser.browser_short_name];
              const scores = getOverallScore(browser);
              
              return (
                <motion.div
                  key={browser.browser_short_name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-[#181825] rounded-2xl border border-[#313244] p-6 hover:border-[#cba6f7]/30 transition-colors duration-300"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#cdd6f4]">{browser.browser_full_name}</h3>
                      <p className="text-xs text-[#6c7086]">{browser.browser_short_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#cba6f7]">{scores.combined.toFixed(1)}</p>
                      <p className="text-xs text-[#6c7086]">combined</p>
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="flex gap-3 mb-4">
                    <div className="flex-1 bg-[#313244]/50 rounded-lg p-2 text-center">
                      <p className="text-sm font-semibold text-[#89b4fa]">{scores.jetstream.toFixed(1)}</p>
                      <p className="text-xs text-[#6c7086]">JetStream</p>
                    </div>
                    <div className="flex-1 bg-[#313244]/50 rounded-lg p-2 text-center">
                      <p className="text-sm font-semibold text-[#a6e3a1]">{scores.speedometer.toFixed(2)}</p>
                      <p className="text-xs text-[#6c7086]">Speedometer</p>
                    </div>
                  </div>

                  {/* Description */}
                  {analysis && (
                    <>
                      <p className="text-sm text-[#a6adc8] mb-4 leading-relaxed">{analysis.description}</p>

                      {/* Best For Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {analysis.bestFor.map(tag => (
                          <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-[#cba6f7]/10 text-[#cba6f7] border border-[#cba6f7]/20">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Pros */}
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-[#a6e3a1] mb-1.5">✓ Strengths</p>
                        <ul className="space-y-1">
                          {analysis.pros.slice(0, 3).map((pro, j) => (
                            <li key={j} className="text-xs text-[#a6adc8] flex items-start gap-1.5">
                              <span className="text-[#a6e3a1] mt-0.5">•</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Cons */}
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-[#f38ba8] mb-1.5">✗ Weaknesses</p>
                        <ul className="space-y-1">
                          {analysis.cons.slice(0, 3).map((con, j) => (
                            <li key={j} className="text-xs text-[#a6adc8] flex items-start gap-1.5">
                              <span className="text-[#f38ba8] mt-0.5">•</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommendation */}
                      <div className="mt-4 pt-3 border-t border-[#313244]">
                        <p className="text-xs font-semibold text-[#f9e2af] mb-1">💡 Recommendation</p>
                        <p className="text-xs text-[#a6adc8] leading-relaxed">{analysis.recommendation}</p>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#313244] mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-[#6c7086]">
            Browser Benchmark Analytics • Data from JetStream 3.0 & Speedometer 3.0
          </p>
          <p className="text-xs text-[#45475a] mt-2">
            Benchmarks measure browser engine performance. Real-world usage may vary.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Section Header Component
function SectionHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{icon}</span>
        <h2 className="text-2xl font-bold text-[#cdd6f4]">{title}</h2>
      </div>
      <p className="text-[#6c7086] ml-12">{subtitle}</p>
    </motion.div>
  );
}

// Ranking Table Component
function RankingTable({ title, icon, data }: {
  title: string;
  icon: string;
  data: { rank: number; name: string; score: string; detail: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#181825] rounded-2xl border border-[#313244] p-6"
    >
      <h3 className="text-lg font-semibold text-[#cdd6f4] mb-4 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      <div className="space-y-2">
        {data.map((item, i) => (
          <div
            key={i}
            className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
              i === 0 ? 'bg-[#cba6f7]/10 border border-[#cba6f7]/20' :
              'bg-[#313244]/30 hover:bg-[#313244]/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                i === 0 ? 'bg-[#cba6f7] text-[#1e1e2e]' :
                i === 1 ? 'bg-[#a6adc8] text-[#1e1e2e]' :
                i === 2 ? 'bg-[#fab387] text-[#1e1e2e]' :
                'bg-[#45475a] text-[#a6adc8]'
              }`}>
                {item.rank}
              </span>
              <div>
                <p className="text-sm font-medium text-[#cdd6f4]">{item.name}</p>
                <p className="text-xs text-[#6c7086]">{item.detail}</p>
              </div>
            </div>
            <span className="text-sm font-bold text-[#cba6f7]">{item.score}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default App;
