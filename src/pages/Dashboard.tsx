import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Activity, LogOut, Pill, Calendar, ArrowRight, TrendingUp, BarChart3, Package } from 'lucide-react';

const medicines = [
  { id: '00', name: 'Amoxicillin 500mg', category: 'Antibiotic' },
  { id: '01', name: 'Atorvastatin 20mg', category: 'Cholesterol' },
  { id: '02', name: 'Insulin Glargine 10ml', category: 'Diabetes' },
  { id: '03', name: 'Surgical Gloves Box', category: 'PPE' },
  { id: '04', name: 'Surgical Masks Box', category: 'PPE' },
];

const durations = [
  { id: '3months', label: '3 Months', value: 3 },
  { id: '6months', label: '6 Months', value: 6 },
  { id: '1year', label: '1 Year', value: 12 },
];

const Dashboard = () => {
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMedicine && selectedDuration) {
      navigate(`/results?medicine=${selectedMedicine}&duration=${selectedDuration}`);
    }
  };

  const selectedMedicineData = medicines.find(m => m.id === selectedMedicine);
  const selectedDurationData = durations.find(d => d.id === selectedDuration);

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
                <p className="text-xs text-muted-foreground">Demand Prediction Platform</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-foreground">Welcome back,</p>
                <p className="text-sm text-primary font-semibold">{user?.name || 'User'}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2 border-border hover:bg-muted hover:text-foreground transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Predict Medicine <span className="text-gradient-primary">Demand</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a medicine and forecast duration to generate AI-powered demand predictions for your inventory planning.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft hover:shadow-medium transition-shadow animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">95%</p>
                <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft hover:shadow-medium transition-shadow animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">Medicines Available</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft hover:shadow-medium transition-shadow animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Package className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">Real-time</p>
                <p className="text-sm text-muted-foreground">Data Processing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-medium animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-2xl font-display font-bold text-foreground mb-8 text-center">
              Generate Forecast
            </h3>

            <div className="space-y-6">
              {/* Medicine Select */}
              <div className="space-y-3">
                <Label htmlFor="medicine" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Pill className="w-4 h-4 text-primary" />
                  Select Medicine
                </Label>
                <Select value={selectedMedicine} onValueChange={setSelectedMedicine}>
                  <SelectTrigger className="h-14 px-4 bg-background border-border text-base hover:border-primary focus:border-primary transition-colors">
                    <SelectValue placeholder="Choose a medicine" />
                  </SelectTrigger>
                  <SelectContent>
                    {medicines.map((medicine) => (
                      <SelectItem key={medicine.id} value={medicine.id} className="py-3">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{medicine.name}</span>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            {medicine.category}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration Select */}
              <div className="space-y-3">
                <Label htmlFor="duration" className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Forecast Duration
                </Label>
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger className="h-14 px-4 bg-background border-border text-base hover:border-primary focus:border-primary transition-colors">
                    <SelectValue placeholder="Choose duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration.id} value={duration.id} className="py-3">
                        <span className="font-medium">{duration.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Selected Summary */}
              {selectedMedicine && selectedDuration && (
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 animate-fade-in">
                  <p className="text-sm text-muted-foreground mb-1">Forecast Summary</p>
                  <p className="font-semibold text-foreground">
                    {selectedMedicineData?.name} demand for {selectedDurationData?.label}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!selectedMedicine || !selectedDuration}
                className="w-full h-14 bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold text-lg shadow-medium transition-all duration-300 hover:shadow-strong disabled:opacity-50 disabled:cursor-not-allowed gap-2"
              >
                Generate Prediction
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
