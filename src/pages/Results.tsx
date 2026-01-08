import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity, ArrowLeft, TrendingUp, Package, Calendar, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const medicines: Record<string, { name: string; category: string }> = {
  '00': { name: 'Amoxicillin 500mg', category: 'Antibiotic' },
  '01': { name: 'Atorvastatin 20mg', category: 'Cholesterol' },
  '02': { name: 'Insulin Glargine 10ml', category: 'Diabetes' },
  '03': { name: 'Surgical Gloves Box', category: 'PPE' },
  '04': { name: 'Surgical Masks Box', category: 'PPE' },
};


const durations: Record<string, { label: string; months: number }> = {
  '3months': { label: '3 Months', months: 3 },
  '6months': { label: '6 Months', months: 6 },
  '1year': { label: '1 Year', months: 12 },
};

const generatePredictionData = (months: number) => {
  const data = [];
  const baseValue = Math.floor(Math.random() * 5000) + 3000;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();

  for (let i = 0; i < months; i++) {
    const monthIndex = (currentMonth + i) % 12;
    const seasonalFactor = 1 + Math.sin((monthIndex / 12) * Math.PI * 2) * 0.2;
    const randomVariation = (Math.random() - 0.5) * 0.15;
    const trend = 1 + (i / months) * 0.1;
    
    data.push({
      month: monthNames[monthIndex],
      demand: Math.floor(baseValue * seasonalFactor * trend * (1 + randomVariation)),
      lowerBound: Math.floor(baseValue * seasonalFactor * trend * 0.85),
      upperBound: Math.floor(baseValue * seasonalFactor * trend * 1.15),
    });
  }

  return data;
};

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const medicineId = searchParams.get('medicine') || '';
  const durationId = searchParams.get('duration') || '';

  const medicine = medicines[medicineId];
  const duration = durations[durationId];

  if (!medicine || !duration) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Invalid Parameters</h2>
          <p className="text-muted-foreground mb-6">Please go back and select valid options.</p>
          <Button onClick={() => navigate('/dashboard')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const predictionData = generatePredictionData(duration.months);
  const totalDemand = predictionData.reduce((sum, d) => sum + d.demand, 0);
  const avgDemand = Math.floor(totalDemand / predictionData.length);
  const peakDemand = Math.max(...predictionData.map(d => d.demand));
  const peakMonth = predictionData.find(d => d.demand === peakDemand)?.month || '';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-medium">
                <Activity className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-foreground">ForecastAI</h1>
                <p className="text-xs text-muted-foreground">Prediction Results</p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="gap-2 border-border hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            AI-Powered Prediction
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            {medicine.name} Demand Forecast
          </h2>
          <p className="text-lg text-muted-foreground">
            {duration.label} prediction with confidence intervals
          </p>
        </div>

        {/* Stas Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-15">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Total Predicted</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{totalDemand.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">units</p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground">Monthly Average</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{avgDemand.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">units/month</p>
          </div>
{/* 
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <span className="text-sm text-muted-foreground">Peak Demand</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{peakDemand.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">units in {peakMonth}</p>
          </div> */}

          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Calendar className="w-5 h-5 text-secondary-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Forecast Period</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{duration.months}</p>
            <p className="text-xs text-muted-foreground mt-1">months</p>
          </div>
        </div>

        {/* Chart Section
        <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-medium mb-8 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-xl font-display font-bold text-foreground mb-6">Demand Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictionData}>
                <defs>
                  <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
                <XAxis dataKey="month" stroke="hsl(215, 15%, 50%)" fontSize={12} />
                <YAxis stroke="hsl(215, 15%, 50%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0, 0%, 100%)',
                    border: '1px solid hsl(210, 20%, 90%)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1)',
                  }}
                  labelStyle={{ fontWeight: 'bold', color: 'hsl(215, 25%, 15%)' }}
                />
                <Area
                  type="monotone"
                  dataKey="demand"
                  stroke="hsl(173, 58%, 39%)"
                  strokeWidth={3}
                  fill="url(#demandGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confidence Interval Chart */}
        {/* <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-medium animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-xl font-display font-bold text-foreground mb-2">Prediction with Confidence Bands</h3>
          <p className="text-sm text-muted-foreground mb-6">Showing upper and lower bounds for demand estimation</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
                <XAxis dataKey="month" stroke="hsl(215, 15%, 50%)" fontSize={12} />
                <YAxis stroke="hsl(215, 15%, 50%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0, 0%, 100%)',
                    border: '1px solid hsl(210, 20%, 90%)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1)',
                  }}
                  labelStyle={{ fontWeight: 'bold', color: 'hsl(215, 25%, 15%)' }}
                />
                <Line
                  type="monotone"
                  dataKey="upperBound"
                  stroke="hsl(35, 92%, 55%)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Upper Bound"
                />
                <Line
                  type="monotone"
                  dataKey="demand"
                  stroke="hsl(173, 58%, 39%)"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(173, 58%, 39%)', strokeWidth: 2 }}
                  name="Predicted Demand"
                />
                <Line
                  type="monotone"
                  dataKey="lowerBound"
                  stroke="hsl(215, 15%, 50%)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Lower Bound"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <Button
            onClick={() => navigate('/dashboard')}
            className="h-12 px-8 bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold shadow-medium"
          >
            Generate New Prediction
          </Button>
          <Button
            variant="outline"
            className="h-12 px-8 border-border hover:bg-muted font-semibold"
          >
            Export Report
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Results;
