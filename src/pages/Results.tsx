import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity, ArrowLeft, TrendingUp, Package, Calendar, AlertCircle } from 'lucide-react';
import axios from 'axios';

const medicines: Record<string, { name: string; category: string }> = {
  'Amoxicillin 500mg': { name: 'Amoxicillin 500mg', category: 'Antibiotic' },
  'Atorvastatin 20mg': { name: 'Atorvastatin 20mg', category: 'Cholesterol' },
  'Insulin Glargine 10ml': { name: 'Insulin Glargine 10ml', category: 'Diabetes' },
  'Surgical Gloves Box': { name: 'Surgical Gloves Box', category: 'PPE' },
  'Surgical Masks Box': { name: 'Surgical Masks Box', category: 'PPE' },
};

const durations: Record<string, { label: string; months: number }> = {
  '3': { label: '3 Months', months: 3 },
  '6': { label: '6 Months', months: 6 },
  '12': { label: '1 Year', months: 12 },
};

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const medicineId = searchParams.get('medicine') || '';
  const durationId = searchParams.get('duration') || '';

  const [predictionData, setPredictionData] = useState<number | null>(null);  // Adjusted to store a number
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const medicine = medicines[medicineId];
  const duration = durations[durationId];

  useEffect(() => {
    if (!medicine || !duration) {
      return;
    }


    // In Results.tsx file, modify the useEffect to use the real API

const fetchForecastData = async () => {
  try {
    setLoading(true);
    setError(null);
    
    console.log('Sending request with:', medicine.name, duration.months);
    // Replace this with the real API endpoint once the backend is ready
    const response = await axios.post('http://localhost:8000/predict', {
      input1: medicine.name,
      input2: duration.months,
    });
    console.log(response);
    setPredictionData(response.data.output2);  // Set the forecast data
  } catch (err) {
    setError('Failed to fetch forecast data.');
  } finally {
    setLoading(false);
  }
};


    // Fetch forecast data from backend API (using dummy data for testing)
    // const fetchForecastData = async () => {
    //   try {
    //     setLoading(true);
    //     setError(null);

    //     // Dummy API data for testing
    //     // Simulating backend response with a hardcoded value
    //     const response = {
    //       data: {
    //         output1: 10000, // Simulate a total demand of 10,000 units
    //       }
    //     };

    //     setPredictionData(response.data.output1);  // Set the dummy output1 value
    //   } catch (err) {
    //     setError('Failed to fetch forecast data.');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchForecastData();
  }, [medicineId, durationId]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground mb-2">Loading forecast data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Error</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => navigate('/dashboard')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Use dummy data for testing
  const totalDemand = predictionData || 0 
  const avgDemand = totalDemand / duration.months; // Calculate the average based on months

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

        {/* Stats Cards */}
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-slide-up" style={{ animationDelay: '0.7s' }}>
          <Button
            onClick={() => navigate('/dashboard')}
            className="h-12 px-8 bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold shadow-medium"
          >
            Generate New Prediction
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Results;
