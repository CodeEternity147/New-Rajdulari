import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Menu, X, Phone, Mail, MapPin, 
  Package, Award, Truck, Clock, Shield, Users,
  ChevronRight, Star, Play, Heart, Zap,
  Sun, Moon, Facebook, Twitter, Instagram,
  Activity, Stethoscope, Plus, Minus, 
  ArrowRight, CheckCircle, Globe, Sparkles,
  MousePointer, Eye, Microscope
} from 'lucide-react';

const PremiumMedicalPortfolio = () => {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeTab, setActiveTab] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showAllMedicines, setShowAllMedicines] = useState(false);
  const containerRef = useRef(null);

  // Enhanced medicine data
  const medicines = [
    // Tablets Category
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "tablets",
      description: "Advanced pain relief with sustained-release formula",
      price: "₹50",
      originalPrice: "₹75",
      rating: 4.8,
      reviews: 1247,
      inStock: true,
      features: ["FDA Approved", "No Side Effects", "Fast Acting"],
      image: "💊"
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "tablets",
      description: "Premium antibiotic for comprehensive infection control",
      price: "₹120",
      originalPrice: "₹150",
      rating: 4.9,
      reviews: 856,
      inStock: true,
      features: ["Broad Spectrum", "Doctor Recommended", "High Efficacy"],
      image: "💊"
    },
    {
      id: 3,
      name: "Vitamin B Complex Pro",
      category: "tablets",
      description: "Enhanced absorption formula for optimal energy",
      price: "₹250",
      originalPrice: "₹300",
      rating: 4.6,
      reviews: 423,
      inStock: true,
      features: ["Extended Release", "Bioavailable", "Clinically Tested"],
      image: "💊"
    },
    {
      id: 4,
      name: "Omeprazole 20mg",
      category: "tablets",
      description: "Advanced acid reflux treatment with long-lasting relief",
      price: "₹180",
      originalPrice: "₹220",
      rating: 4.7,
      reviews: 634,
      inStock: true,
      features: ["24-Hour Protection", "Gentle on Stomach", "Prescription Strength"],
      image: "💊"
    },
    {
      id: 5,
      name: "Metformin 500mg",
      category: "tablets",
      description: "Premium diabetes management with enhanced bioavailability",
      price: "₹95",
      originalPrice: "₹120",
      rating: 4.5,
      reviews: 789,
      inStock: true,
      features: ["Blood Sugar Control", "Weight Management", "Cardiovascular Benefits"],
      image: "💊"
    },
    {
      id: 6,
      name: "Atorvastatin 10mg",
      category: "tablets",
      description: "Advanced cholesterol management with cardiovascular protection",
      price: "₹160",
      originalPrice: "₹200",
      rating: 4.8,
      reviews: 567,
      inStock: true,
      features: ["LDL Reduction", "Heart Protection", "Once Daily"],
      image: "💊"
    },
    {
      id: 7,
      name: "Cetirizine 10mg",
      category: "tablets",
      description: "Non-drowsy allergy relief with 24-hour protection",
      price: "₹85",
      originalPrice: "₹110",
      rating: 4.4,
      reviews: 923,
      inStock: true,
      features: ["Non-Drowsy", "24-Hour Relief", "Safe for Children"],
      image: "💊"
    },
    {
      id: 8,
      name: "Ibuprofen 400mg",
      category: "tablets",
      description: "Advanced anti-inflammatory with rapid pain relief",
      price: "₹70",
      originalPrice: "₹90",
      rating: 4.6,
      reviews: 1156,
      inStock: true,
      features: ["Anti-Inflammatory", "Fever Reduction", "Muscle Pain Relief"],
      image: "💊"
    },
    {
      id: 9,
      name: "Calcium Carbonate 500mg",
      category: "tablets",
      description: "Premium bone health supplement with vitamin D",
      price: "₹140",
      originalPrice: "₹180",
      rating: 4.7,
      reviews: 445,
      inStock: true,
      features: ["Bone Strength", "Vitamin D3", "Easy Absorption"],
      image: "💊"
    },
    {
      id: 10,
      name: "Loratadine 10mg",
      category: "tablets",
      description: "Advanced allergy treatment with extended relief",
      price: "₹110",
      originalPrice: "₹140",
      rating: 4.5,
      reviews: 678,
      inStock: true,
      features: ["Extended Relief", "Non-Sedating", "Safe for Long-term Use"],
      image: "💊"
    },

    // Syrups Category
    {
      id: 11,
      name: "Advanced Cough Syrup",
      category: "syrups",
      description: "Revolutionary formula for instant respiratory relief",
      price: "₹180",
      originalPrice: "₹220",
      rating: 4.7,
      reviews: 634,
      inStock: false,
      features: ["Natural Ingredients", "Sugar Free", "Child Safe"],
      image: "🍯"
    },
    {
      id: 12,
      name: "Iron Supplement Syrup",
      category: "syrups",
      description: "Premium iron supplement with enhanced absorption",
      price: "₹220",
      originalPrice: "₹280",
      rating: 4.6,
      reviews: 389,
      inStock: true,
      features: ["High Bioavailability", "Taste Masked", "No Side Effects"],
      image: "🍯"
    },
    {
      id: 13,
      name: "Multivitamin Syrup",
      category: "syrups",
      description: "Complete nutrition for children and adults",
      price: "₹190",
      originalPrice: "₹240",
      rating: 4.8,
      reviews: 512,
      inStock: true,
      features: ["Complete Formula", "Delicious Taste", "Daily Nutrition"],
      image: "🍯"
    },
    {
      id: 14,
      name: "Digestive Health Syrup",
      category: "syrups",
      description: "Natural digestive aid with probiotic support",
      price: "₹160",
      originalPrice: "₹200",
      rating: 4.5,
      reviews: 456,
      inStock: true,
      features: ["Probiotic Blend", "Natural Herbs", "Gentle Formula"],
      image: "🍯"
    },
    {
      id: 15,
      name: "Immunity Booster Syrup",
      category: "syrups",
      description: "Advanced immunity support with herbal extracts",
      price: "₹250",
      originalPrice: "₹320",
      rating: 4.7,
      reviews: 378,
      inStock: true,
      features: ["Herbal Extracts", "Vitamin C", "Zinc Support"],
      image: "🍯"
    },
    {
      id: 16,
      name: "Sleep Aid Syrup",
      category: "syrups",
      description: "Natural sleep support with calming herbs",
      price: "₹200",
      originalPrice: "₹260",
      rating: 4.4,
      reviews: 234,
      inStock: true,
      features: ["Natural Herbs", "Non-Habit Forming", "Gentle Sleep"],
      image: "🍯"
    },
    {
      id: 17,
      name: "Joint Health Syrup",
      category: "syrups",
      description: "Advanced joint support with glucosamine",
      price: "₹280",
      originalPrice: "₹350",
      rating: 4.6,
      reviews: 189,
      inStock: true,
      features: ["Glucosamine", "Chondroitin", "MSM Support"],
      image: "🍯"
    },
    {
      id: 18,
      name: "Energy Boost Syrup",
      category: "syrups",
      description: "Natural energy enhancement with B-vitamins",
      price: "₹170",
      originalPrice: "₹220",
      rating: 4.5,
      reviews: 298,
      inStock: true,
      features: ["B-Vitamins", "Natural Caffeine", "Sustained Energy"],
      image: "🍯"
    },

    // Ointments Category
    {
      id: 19,
      name: "Therapeutic Pain Gel",
      category: "ointments",
      description: "Advanced topical solution with cooling technology",
      price: "₹150",
      originalPrice: "₹200",
      rating: 4.5,
      reviews: 789,
      inStock: true,
      features: ["Deep Penetration", "Long Lasting", "Non-Greasy"],
      image: "🧴"
    },
    {
      id: 20,
      name: "Antibacterial Ointment",
      category: "ointments",
      description: "Premium wound care with advanced healing",
      price: "₹120",
      originalPrice: "₹160",
      rating: 4.8,
      reviews: 456,
      inStock: true,
      features: ["Antibacterial", "Fast Healing", "Scar Prevention"],
      image: "🧴"
    },
    {
      id: 21,
      name: "Anti-Inflammatory Cream",
      category: "ointments",
      description: "Advanced inflammation relief with natural extracts",
      price: "₹180",
      originalPrice: "₹230",
      rating: 4.6,
      reviews: 345,
      inStock: true,
      features: ["Natural Extracts", "Rapid Relief", "Skin Friendly"],
      image: "🧴"
    },
    {
      id: 22,
      name: "Moisturizing Lotion",
      category: "ointments",
      description: "Premium skin hydration with vitamin E",
      price: "₹140",
      originalPrice: "₹180",
      rating: 4.7,
      reviews: 567,
      inStock: true,
      features: ["Vitamin E", "24-Hour Hydration", "Non-Comedogenic"],
      image: "🧴"
    },
    {
      id: 23,
      name: "Fungal Treatment Cream",
      category: "ointments",
      description: "Advanced antifungal treatment with rapid action",
      price: "₹160",
      originalPrice: "₹210",
      rating: 4.5,
      reviews: 234,
      inStock: true,
      features: ["Antifungal", "Rapid Action", "Prevents Recurrence"],
      image: "🧴"
    },
    {
      id: 24,
      name: "Joint Relief Gel",
      category: "ointments",
      description: "Advanced joint pain relief with warming effect",
      price: "₹200",
      originalPrice: "₹260",
      rating: 4.6,
      reviews: 189,
      inStock: true,
      features: ["Warming Effect", "Deep Relief", "Long Lasting"],
      image: "🧴"
    },
    {
      id: 25,
      name: "Burn Relief Ointment",
      category: "ointments",
      description: "Premium burn treatment with cooling relief",
      price: "₹130",
      originalPrice: "₹170",
      rating: 4.8,
      reviews: 123,
      inStock: true,
      features: ["Cooling Relief", "Prevents Infection", "Fast Healing"],
      image: "🧴"
    },
    {
      id: 26,
      name: "Acne Treatment Gel",
      category: "ointments",
      description: "Advanced acne treatment with salicylic acid",
      price: "₹170",
      originalPrice: "₹220",
      rating: 4.4,
      reviews: 456,
      inStock: true,
      features: ["Salicylic Acid", "Oil Control", "Prevents Breakouts"],
      image: "🧴"
    },
    {
      id: 27,
      name: "Hemorrhoid Relief Cream",
      category: "ointments",
      description: "Gentle relief for hemorrhoid symptoms",
      price: "₹150",
      originalPrice: "₹200",
      rating: 4.3,
      reviews: 89,
      inStock: true,
      features: ["Gentle Relief", "Anti-Inflammatory", "Cooling Effect"],
      image: "🧴"
    },

    // Injections Category
    {
      id: 28,
      name: "Premium Insulin Pen",
      category: "injections",
      description: "Smart delivery system for precise diabetes management",
      price: "₹450",
      originalPrice: "₹550",
      rating: 4.9,
      reviews: 234,
      inStock: true,
      features: ["Smart Dosing", "Pain-Free", "Bluetooth Enabled"],
      image: "💉"
    },
    {
      id: 29,
      name: "Vitamin B12 Injection",
      category: "injections",
      description: "Premium B12 supplement for energy and nerve health",
      price: "₹320",
      originalPrice: "₹400",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      features: ["High Bioavailability", "Energy Boost", "Nerve Health"],
      image: "💉"
    },
    {
      id: 30,
      name: "Iron Injection",
      category: "injections",
      description: "Advanced iron therapy for severe deficiency",
      price: "₹380",
      originalPrice: "₹480",
      rating: 4.6,
      reviews: 98,
      inStock: true,
      features: ["Rapid Absorption", "Severe Deficiency", "Doctor Supervised"],
      image: "💉"
    },
    {
      id: 31,
      name: "Calcium Injection",
      category: "injections",
      description: "Premium calcium therapy for bone health",
      price: "₹290",
      originalPrice: "₹370",
      rating: 4.5,
      reviews: 134,
      inStock: true,
      features: ["Bone Health", "Muscle Function", "Cardiac Support"],
      image: "💉"
    },
    {
      id: 32,
      name: "Testosterone Injection",
      category: "injections",
      description: "Hormone replacement therapy for men",
      price: "₹520",
      originalPrice: "₹650",
      rating: 4.8,
      reviews: 67,
      inStock: true,
      features: ["Hormone Balance", "Muscle Growth", "Energy Enhancement"],
      image: "💉"
    },
    {
      id: 33,
      name: "Vitamin D Injection",
      category: "injections",
      description: "High-dose vitamin D for severe deficiency",
      price: "₹260",
      originalPrice: "₹330",
      rating: 4.7,
      reviews: 89,
      inStock: true,
      features: ["High Dose", "Bone Health", "Immune Support"],
      image: "💉"
    },
    {
      id: 34,
      name: "Magnesium Injection",
      category: "injections",
      description: "Premium magnesium therapy for muscle health",
      price: "₹310",
      originalPrice: "₹390",
      rating: 4.4,
      reviews: 76,
      inStock: true,
      features: ["Muscle Relaxation", "Nerve Function", "Cardiac Health"],
      image: "💉"
    },
    {
      id: 35,
      name: "Biotin Injection",
      category: "injections",
      description: "Advanced biotin therapy for hair and nail health",
      price: "₹280",
      originalPrice: "₹350",
      rating: 4.6,
      reviews: 112,
      inStock: true,
      features: ["Hair Growth", "Nail Strength", "Skin Health"],
      image: "💉"
    },
    {
      id: 36,
      name: "Glutathione Injection",
      category: "injections",
      description: "Premium antioxidant therapy for skin whitening",
      price: "₹680",
      originalPrice: "₹850",
      rating: 4.9,
      reviews: 45,
      inStock: true,
      features: ["Skin Whitening", "Antioxidant", "Detoxification"],
      image: "💉"
    }
  ];

  // Track mouse movement and scroll
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrolled / maxScroll) * 100;
      
      setScrollY(scrolled);
      setScrollProgress(Math.min(scrollPercent, 100));
    };

    // Loading timeout
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(loadingTimeout);
    };
  }, []);

  // Enhanced intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Filter medicines
  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || medicine.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Limit medicines display
  const displayedMedicines = showAllMedicines ? filteredMedicines : filteredMedicines.slice(0, 8);

  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "Cardiologist",
      content: "Exceptional quality medicines with unmatched reliability. My patients trust their products completely.",
      rating: 5,
      image: "👩‍⚕️"
    },
    {
      name: "Rajesh Kumar",
      role: "Patient",
      content: "30 years of consistent service. They've been our family's healthcare partner through thick and thin.",
      rating: 5,
      image: "👨"
    },
    {
      name: "Dr. Amit Patel",
      role: "General Physician",
      content: "Their digital transformation while maintaining traditional values is remarkable. Highly recommended!",
      rating: 5,
      image: "👨‍⚕️"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-x-hidden">
      {/* Premium Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center animate-pulse">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30 animate-pulse"></div>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              New Rajdulari Medical
            </h2>
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Advanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic gradient mesh */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(59, 130, 246, 0.2) 0%, 
              rgba(147, 51, 234, 0.1) 25%, 
              transparent 50%)`
          }}
        />
        
        {/* Minimal Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
              transform: `translate(${(mousePosition.x - 50) * 0.05}px, ${(mousePosition.y - 50) * 0.05}px)`
            }}
          >
            <div 
              className={`rounded-full opacity-30 ${
                i % 3 === 0 ? 'w-2 h-2 bg-blue-400' :
                i % 2 === 0 ? 'w-1.5 h-1.5 bg-purple-400' :
                'w-1 h-1 bg-pink-400'
              }`}
            />
          </div>
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Navigation with Glassmorphism */}
      <nav className="fixed w-full z-50 transition-all duration-500">
        <div className="backdrop-blur-xl bg-black/40 border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    New Rajdulari Medical
                  </h1>
                  <p className="text-xs text-gray-400">Premium Healthcare Solutions</p>
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-8">
                {['Home', 'Medicines', 'Services', 'About', 'Contact'].map((item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="relative group px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/5"
                  >
                    <span className="relative z-10 font-medium">{item}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                  </a>
                ))}
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden relative group p-3 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {isMenuOpen ? <X className="w-6 h-6 relative z-10" /> : <Menu className="w-6 h-6 relative z-10" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu with Glassmorphism */}
          {isMenuOpen && (
            <div className="lg:hidden backdrop-blur-xl bg-black/50 border-t border-white/10">
              <div className="container mx-auto px-6 py-6 space-y-4">
                {['Home', 'Medicines', 'Services', 'About', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with 3D Elements */}
      <section id="home" className="pt-24 min-h-screen flex items-center relative">
        {/* Hero Background Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={`hero-particle-${i}`}
              className="absolute animate-float"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + i * 8}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i * 0.5}s`
              }}
            >
              <div className={`rounded-full ${
                i % 3 === 0 ? 'w-3 h-3 bg-blue-500/20' :
                i % 2 === 0 ? 'w-2 h-2 bg-purple-500/20' :
                'w-1 h-1 bg-pink-500/20'
              }`} />
            </div>
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${isVisible.home ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="inline-flex items-center space-x-3 backdrop-blur-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full px-6 py-3 mb-8 border border-white/10">
                <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Trusted Since 1990 • 30+ Years Excellence
                </span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Premium
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                  Healthcare
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                  Solutions
                </span>
              </h1>
              
              <p className="text-2xl mb-10 text-gray-300 leading-relaxed font-light">
                Experience the future of medical care with our cutting-edge solutions. 
                <span className="text-blue-400 font-medium"> Advanced technology</span> meets 
                <span className="text-purple-400 font-medium"> trusted tradition</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="group relative px-10 py-5 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Explore Premium Medicines</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </button>
                
                <button className="group relative px-10 py-5 rounded-2xl font-bold text-lg backdrop-blur-lg bg-white/5 border-2 border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    <Play className="w-6 h-6" />
                    <span>Watch Our Journey</span>
                  </div>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 mt-12">
                {[
                  { icon: Shield, text: "FDA Certified" },
                  { icon: Award, text: "ISO 9001:2015" },
                  { icon: CheckCircle, text: "100% Authentic" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 text-gray-400 group">
                    <item.icon className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium group-hover:text-white transition-colors duration-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${isVisible.home ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="relative">
                {/* 3D Card Effect */}
                <div className="relative group perspective-1000">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl rotate-6 opacity-20 group-hover:rotate-12 transition-transform duration-500"></div>
                  <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/20 shadow-2xl transform-gpu group-hover:rotateY-5 transition-all duration-500">
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-8">
                      {[
                        { icon: Package, label: '5000+', desc: 'Premium Medicines', color: 'from-blue-500 to-blue-600' },
                        { icon: Users, label: '50K+', desc: 'Satisfied Customers', color: 'from-purple-500 to-pink-600' },
                        { icon: Award, label: '30+', desc: 'Years Excellence', color: 'from-emerald-500 to-teal-600' },
                        { icon: Truck, label: '24/7', desc: 'Express Delivery', color: 'from-orange-500 to-red-600' }
                      ].map((stat, i) => (
                        <div key={i} className="text-center group/stat">
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center transform group-hover/stat:scale-110 transition-transform duration-300`}>
                            <stat.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                            {stat.label}
                          </div>
                          <div className="text-sm text-gray-400 font-medium">{stat.desc}</div>
                        </div>
                      ))}
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Search Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              {/* Search Input with Glassmorphism */}
              <div className="relative backdrop-blur-xl bg-black/40 rounded-3xl p-2 border border-white/20 shadow-2xl">
                <div className="flex items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search medicines, symptoms, conditions, or ask our AI assistant..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-16 pr-6 py-6 bg-transparent text-white placeholder-gray-400 text-lg font-medium focus:outline-none"
                    />
                  </div>
                  <button className="mr-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>AI Search</span>
                  </button>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-3 mt-6 justify-center">
                {['Emergency', 'Pain Relief', 'Antibiotics', 'Vitamins', 'Diabetes Care', 'Heart Care'].map((filter) => (
                  <button
                    key={filter}
                    className="px-6 py-3 backdrop-blur-lg bg-black/40 rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 text-sm font-medium hover:scale-105"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Medicines Section */}
      <section id="medicines" className="py-20">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.medicines ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center space-x-3 backdrop-blur-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full px-6 py-3 mb-6 border border-white/10">
              <Package className="w-5 h-5 text-blue-400" />
              <span className="font-semibold text-gray-300">Premium Collection</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Elite Medicine
              </span>
              <br />
              <span className="text-white">Catalog</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our curated collection of premium healthcare products, each selected for 
              superior quality and therapeutic excellence.
            </p>
          </div>

          {/* Advanced Filter Tabs */}
          <div className="flex justify-center mb-16">
            <div className="backdrop-blur-xl bg-black/40 rounded-2xl p-2 border border-white/20">
              <div className="flex space-x-2">
                {['All', 'Tablets', 'Syrups', 'Injections', 'Ointments'].map((category, index) => (
                  <button
                    key={category}
                    onClick={() => {
                      setCategoryFilter(category.toLowerCase() === 'all' ? 'all' : category.toLowerCase());
                      setActiveTab(index);
                    }}
                    className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === index 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Medicine Grid with Advanced Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedMedicines.map((medicine, index) => (
              <div
                key={medicine.id}
                className="group relative backdrop-blur-xl bg-gradient-to-br from-black/40 to-black/20 rounded-3xl overflow-hidden border border-white/20 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-4 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Premium Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Medicine Image/Icon Area */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center overflow-hidden">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-500">{medicine.image}</div>
                  
                  {/* Stock Status Badge */}
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-lg border ${
                    medicine.inStock 
                      ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' 
                      : 'bg-red-500/20 border-red-500/30 text-red-300'
                  }`}>
                    {medicine.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold text-white shadow-lg">
                    SAVE {Math.round(((parseInt(medicine.originalPrice.slice(1)) - parseInt(medicine.price.slice(1))) / parseInt(medicine.originalPrice.slice(1))) * 100)}%
                  </div>

                  {/* Floating Particles */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-20 animate-float"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${20 + i * 10}%`,
                        animationDelay: `${i * 0.5}s`
                      }}
                    />
                  ))}
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                    {medicine.name}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm line-clamp-2">{medicine.description}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {medicine.features.slice(0, 2).map((feature, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-xs font-medium text-blue-300 border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(medicine.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-yellow-400 font-bold text-sm">{medicine.rating}</span>
                      <span className="text-gray-500 text-xs">({medicine.reviews})</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {medicine.price}
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        {medicine.originalPrice}
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 rounded-2xl font-bold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center space-x-2 text-sm">
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </span>
                  </button>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* See More Button */}
          {filteredMedicines.length > 8 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllMedicines(!showAllMedicines)}
                className="group relative px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-center space-x-3">
                  <span>{showAllMedicines ? 'Show Less' : 'See More Medicines'}</span>
                  {showAllMedicines ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </div>
              </button>
              
              {/* Medicine Count */}
              <p className="text-gray-400 mt-4 text-sm">
                {showAllMedicines 
                  ? `Showing all ${filteredMedicines.length} medicines` 
                  : `Showing 8 of ${filteredMedicines.length} medicines`
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Advanced Services Section */}
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.services ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center space-x-3 backdrop-blur-lg bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full px-6 py-3 mb-6 border border-white/10">
              <Stethoscope className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-gray-300">Premium Services</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                Healthcare
              </span>
              <br />
              <span className="text-white">Excellence</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience next-generation healthcare services powered by cutting-edge technology 
              and decades of medical expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Package, 
                title: 'AI-Powered Medicine Matching', 
                desc: 'Advanced algorithms match you with the perfect medication based on your symptoms and medical history',
                color: 'from-blue-500 to-blue-600',
                features: ['99.9% Accuracy', 'Real-time Analysis', 'FDA Approved']
              },
              { 
                icon: Truck, 
                title: 'Quantum Speed Delivery', 
                desc: 'Lightning-fast delivery with real-time tracking and temperature-controlled transport',
                color: 'from-purple-500 to-pink-600',
                features: ['30min Emergency', 'GPS Tracking', 'Cold Chain']
              },
              { 
                icon: Shield, 
                title: 'Blockchain Quality Assurance', 
                desc: 'Every product verified through immutable blockchain technology for 100% authenticity',
                color: 'from-emerald-500 to-teal-600',
                features: ['Tamper Proof', 'Full Traceability', 'Smart Contracts']
              },
              { 
                icon: Activity, 
                title: 'Telehealth Integration', 
                desc: 'Connect with certified doctors and pharmacists through our integrated telemedicine platform',
                color: 'from-orange-500 to-red-600',
                features: ['24/7 Available', 'Specialist Access', 'Digital Prescriptions']
              },
              { 
                icon: Microscope, 
                title: 'Personalized Medicine', 
                desc: 'Customized medication solutions based on genetic profiling and lifestyle analysis',
                color: 'from-violet-500 to-purple-600',
                features: ['DNA Analysis', 'Custom Dosing', 'Precision Medicine']
              },
              { 
                icon: Globe, 
                title: 'Global Health Network', 
                desc: 'Access to international medical expertise and rare medicines through our global network',
                color: 'from-pink-500 to-rose-600',
                features: ['150+ Countries', 'Rare Diseases', 'Expert Network']
              }
            ].map((service, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-xl bg-gradient-to-br from-black/40 to-black/20 rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-4 hover:scale-105"
              >
                {/* Background Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className={`w-20 h-20 bg-gradient-to-r ${service.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 relative`}>
                  <service.icon className="w-10 h-10 text-white" />
                  <div className={`absolute -inset-2 bg-gradient-to-r ${service.color} rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{service.desc}</p>
                
                {/* Service Features */}
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle className={`w-5 h-5 text-emerald-400`} />
                      <span className="text-sm text-gray-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 px-6 rounded-2xl font-semibold backdrop-blur-lg bg-black/40 border border-white/20 hover:bg-white/10 transition-all duration-300 group-hover:border-blue-500/50">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Statistics Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Package, number: "5000+", label: "Premium Medicines", color: "from-blue-500 to-blue-600" },
              { icon: Users, number: "50K+", label: "Happy Customers", color: "from-purple-500 to-pink-600" },
              { icon: Award, number: "30+", label: "Years Excellence", color: "from-emerald-500 to-teal-600" },
              { icon: Truck, number: "24/7", label: "Express Delivery", color: "from-orange-500 to-red-600" }
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative text-center"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative">
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                  
                  {/* Card */}
                  <div className="relative backdrop-blur-xl bg-gradient-to-br from-black/40 to-black/20 rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-4">
                    
                    {/* Icon */}
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <stat.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    {/* Number */}
                    <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.number}
                    </div>
                    
                    {/* Label */}
                    <div className="text-gray-400 font-medium text-lg">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                What Our
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                Premium Clients Say
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Trusted by healthcare professionals and patients across the nation for over three decades
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-xl bg-gradient-to-br from-black/40 to-black/20 rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-4"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Premium Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-2xl">"</span>
                </div>

                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current animate-pulse"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                      {testimonial.image}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400 font-medium">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-blue-500 rounded-full opacity-30 animate-float"></div>
                <div className="absolute bottom-4 right-4 w-1 h-1 bg-purple-500 rounded-full opacity-30 animate-bounce-gentle"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Timeline */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className={`transition-all duration-1000 ${isVisible.about ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="inline-flex items-center space-x-3 backdrop-blur-lg bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full px-6 py-3 mb-8 border border-white/10">
                <Award className="w-5 h-5 text-violet-400" />
                <span className="font-semibold text-gray-300">Our Legacy</span>
              </div>
              
              <h2 className="text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Three Decades
                </span>
                <br />
                <span className="text-white">of Excellence</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                From a small neighborhood pharmacy to a premium healthcare technology leader, 
                our journey has been driven by an unwavering commitment to health and innovation.
              </p>
              
              {/* Timeline */}
              <div className="space-y-8">
                {[
                  { year: '1990', event: 'Founded with a vision to revolutionize healthcare', color: 'from-blue-500 to-blue-600' },
                  { year: '2000', event: 'Expanded to premium surgical instruments', color: 'from-purple-500 to-pink-600' },
                  { year: '2010', event: 'Pioneered digital health management', color: 'from-emerald-500 to-teal-600' },
                  { year: '2020', event: 'Launched AI-powered medicine platform', color: 'from-orange-500 to-red-600' },
                  { year: '2024', event: 'Premium healthcare ecosystem complete', color: 'from-violet-500 to-purple-600' }
                ].map((milestone, i) => (
                  <div key={i} className="flex items-center space-x-6 group">
                    <div className={`w-6 h-6 bg-gradient-to-r ${milestone.color} rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-300`}></div>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                      {milestone.year}
                    </div>
                    <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {milestone.event}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${isVisible.about ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl rotate-3 opacity-20"></div>
                <div className="relative backdrop-blur-xl bg-gradient-to-br from-black/40 to-black/20 rounded-3xl p-10 border border-white/20 shadow-2xl">
                  <div className="text-center mb-8">
                    <div className="text-6xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-4">
                      30+
                    </div>
                    <div className="text-gray-300 text-lg">Years of Innovation</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    {[
                      { number: '50K+', label: 'Happy Customers', icon: Users },
                      { number: '5000+', label: 'Premium Products', icon: Package },
                      { number: '24/7', label: 'Service Available', icon: Clock },
                      { number: '100%', label: 'Authentic Guarantee', icon: Shield }
                    ].map((stat, i) => (
                      <div key={i} className="text-center group">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                          {stat.number}
                        </div>
                        <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center space-x-3 backdrop-blur-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full px-6 py-3 mb-6 border border-white/10">
              <Phone className="w-5 h-5 text-green-400" />
              <span className="font-semibold text-gray-300">Get In Touch</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Connect With
              </span>
              <br />
              <span className="text-white">Excellence</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to experience premium healthcare? Our expert team is available 24/7 
              to provide personalized medical solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              {[
                {
                  icon: MapPin,
                  title: 'Premium Location',
                  info: 'Dr.YP Yadav Building, Near Dr.Chandra Pratap Gali, Bihar Talkies Road, Line bazar purnea Bihar(854301)',
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  icon: Phone,
                  title: 'Instant Connect',
                  info: '+91 8877518449, 7759082140',
                  color: 'from-green-500 to-emerald-600'
                },
                {
                  icon: Mail,
                  title: 'Digital Gateway',
                  info: 'rajdularimedical@gmail.com',
                  color: 'from-purple-500 to-pink-600'
                },
                {
                  icon: Clock,
                  title: 'Always Available',
                  info: '24/7 Emergency Service • Premium Support',
                  color: 'from-orange-500 to-red-600'
                }
              ].map((contact, i) => (
                <div key={i} className="group flex items-start space-x-6 backdrop-blur-xl bg-black/40 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      {contact.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{contact.info}</p>
                  </div>
                </div>
              ))}

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                <button className="group relative px-6 py-4 rounded-2xl font-bold backdrop-blur-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  <div className="relative z-10 flex items-center justify-center space-x-2">
                    <Phone className="w-5 h-5" />
                    <span>Call Now</span>
                  </div>
                </button>
                
                <button className="group relative px-6 py-4 rounded-2xl font-bold backdrop-blur-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 hover:border-green-400 transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  <div className="relative z-10 flex items-center justify-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Live Chat</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-black/40 to-black/20 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-slate-400 font-medium focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300 group-hover:bg-white/10"
                    />
                  </div>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-slate-400 font-medium focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300 group-hover:bg-white/10"
                    />
                  </div>
                </div>
                
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Premium Email Address"
                    className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-slate-400 font-medium focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300 group-hover:bg-white/10"
                  />
                </div>
                
                <div className="relative group">
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-slate-400 font-medium focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300 group-hover:bg-white/10"
                  />
                </div>

                <div className="relative group">
                  <select className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white font-medium focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300 group-hover:bg-white/10">
                    <option value="">Select Service Type</option>
                    <option value="consultation">Medical Consultation</option>
                    <option value="prescription">Prescription Medicine</option>
                    <option value="emergency">Emergency Service</option>
                    <option value="bulk">Bulk Orders</option>
                  </select>
                </div>
                
                <div className="relative group">
                  <textarea
                    placeholder="Describe your healthcare needs..."
                    rows="4"
                    className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-slate-400 font-medium focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300 group-hover:bg-white/10 resize-none"
                  ></textarea>
                </div>
                
                <button className="w-full relative group py-5 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Send Premium Message</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Premium Footer */}
      <footer className="relative bg-gradient-to-br from-black via-gray-900 to-black border-t border-white/10">
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    New Rajdulari Medical
                  </h3>
                  <p className="text-gray-400 text-sm">Premium Healthcare Solutions</p>
                </div>
              </div>
              
              <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
                Leading the future of healthcare with cutting-edge technology and unwavering commitment to quality. 
                Trusted by healthcare professionals and patients for over three decades.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center space-x-6 mb-8">
                {[
                  { icon: Shield, text: "FDA Certified", color: "text-emerald-400" },
                  { icon: Award, text: "ISO 9001:2015", color: "text-blue-400" },
                  { icon: CheckCircle, text: "100% Authentic", color: "text-purple-400" }
                ].map((badge, i) => (
                  <div key={i} className="flex items-center space-x-2 group">
                    <badge.icon className={`w-5 h-5 ${badge.color} group-hover:scale-110 transition-transform duration-300`} />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300 font-medium">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Quick Links
              </h4>
              <div className="space-y-4">
                {[
                  { icon: Package, text: "Premium Medicines", href: "#medicines" },
                  { icon: Activity, text: "Health Services", href: "#services" },
                  { icon: Users, text: "About Us", href: "#about" },
                  { icon: Phone, text: "Contact", href: "#contact" }
                ].map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300 group"
                  >
                    <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.text}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Premium Categories */}
            <div>
              <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Premium Categories
              </h4>
              <div className="space-y-4">
                {[
                  { icon: Package, text: "Tablets & Capsules", count: "2000+" },
                  { icon: Activity, text: "Injections", count: "500+" },
                  { icon: Stethoscope, text: "Medical Devices", count: "300+" },
                  { icon: Microscope, text: "Lab Equipment", count: "150+" }
                ].map((category, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <category.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                      <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                        {category.text}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 group-hover:text-blue-400 transition-colors duration-300">
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Stay Updated with Premium Offers
              </h4>
              <p className="text-gray-400 mb-8">
                Get exclusive access to premium medicines and healthcare solutions
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300 backdrop-blur-lg"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 New Rajdulari Medical. All rights reserved.
            </p>
            
            {/* Enhanced Social Media */}
            <div className="flex items-center space-x-4">
              {[
                { icon: Facebook, href: "#", color: "hover:text-blue-400" },
                { icon: Twitter, href: "#", color: "hover:text-sky-400" },
                { icon: Instagram, href: "#", color: "hover:text-pink-400" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className={`w-12 h-12 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 border border-white/10 hover:border-white/30 backdrop-blur-lg`}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse"></div>
          <button className="relative w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 group-hover:rotate-12">
            <Heart className="w-8 h-8" />
          </button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-black/80 backdrop-blur-lg rounded-lg text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Premium Support
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <div className={`fixed bottom-8 left-8 z-50 transition-all duration-300 ${scrollY > 400 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group w-14 h-14 backdrop-blur-xl bg-black/40 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6 transform -rotate-90 group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Custom Cursor Effect */}
      <div 
        className="fixed w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full pointer-events-none z-50 opacity-50 transition-all duration-100 ease-out"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  );
}

export default PremiumMedicalPortfolio;