import React, { useState, useEffect } from 'react';
import { 
  Heart, Menu, X, ArrowRight, Play, Shield, Award, CheckCircle, 
  Package, Users, Truck, Star, Phone, Mail, MapPin, Search, 
  ShoppingCart, Clock, Globe, Stethoscope, Activity, TrendingUp, 
  Target, BookOpen, MessageCircle, ChevronRight, Plus, Filter,
  User, Calendar, FileText, Settings, Home, Info, Contact2
} from 'lucide-react';

const ElegantMedicalWebsite = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAllMedicines, setShowAllMedicines] = useState(false);

  const categoryColors = {
    antibiotics: 'bg-blue-200 text-blue-800',
    painkillers: 'bg-red-200 text-red-800',
    vitamins: 'bg-yellow-200 text-yellow-800',
    digestive: 'bg-green-200 text-green-800',
    allergy: 'bg-purple-200 text-purple-800',
    diabetes: 'bg-pink-200 text-pink-800',
  };

  // Medicines data with elegant structure
  const medicines = [
    { id: 1, name: "Amoxicillin", category: "antibiotics", price: "₹285", originalPrice: "₹340", description: "Broad-spectrum antibiotic for bacterial infections", rating: 4.8, inStock: true, prescription: true },
    { id: 7, name: "Ciprofloxacin", category: "antibiotics", price: "₹320", originalPrice: "₹390", description: "Used for treating various bacterial infections", rating: 4.7, inStock: true, prescription: true },
    { id: 8, name: "Azithromycin", category: "antibiotics", price: "₹210", originalPrice: "₹260", description: "Antibiotic for respiratory and skin infections", rating: 4.8, inStock: true, prescription: true },
    { id: 9, name: "Doxycycline", category: "antibiotics", price: "₹180", originalPrice: "₹230", description: "Broad-spectrum antibiotic for many infections", rating: 4.6, inStock: false, prescription: true },
    { id: 10, name: "Cephalexin", category: "antibiotics", price: "₹250", originalPrice: "₹310", description: "Treats bacterial infections of the skin, ear, and urinary tract", rating: 4.7, inStock: true, prescription: true },
    { id: 11, name: "Clindamycin", category: "antibiotics", price: "₹295", originalPrice: "₹350", description: "Effective against serious bacterial infections", rating: 4.5, inStock: true, prescription: true },

    { id: 2, name: "Paracetamol", category: "painkillers", price: "₹45", originalPrice: "₹65", description: "Effective pain relief and fever reducer", rating: 4.9, inStock: true, prescription: false },
    { id: 12, name: "Ibuprofen", category: "painkillers", price: "₹60", originalPrice: "₹80", description: "Pain relief for headaches, muscle aches, and more", rating: 4.8, inStock: true, prescription: false },
    { id: 13, name: "Diclofenac", category: "painkillers", price: "₹55", originalPrice: "₹75", description: "Anti-inflammatory painkiller for joint pain", rating: 4.7, inStock: true, prescription: false },
    { id: 14, name: "Naproxen", category: "painkillers", price: "₹70", originalPrice: "₹90", description: "Long-lasting pain relief for arthritis and more", rating: 4.6, inStock: false, prescription: false },
    { id: 15, name: "Tramadol", category: "painkillers", price: "₹120", originalPrice: "₹150", description: "Prescription painkiller for moderate to severe pain", rating: 4.5, inStock: true, prescription: true },
    { id: 16, name: "Aspirin", category: "painkillers", price: "₹40", originalPrice: "₹60", description: "Pain relief and anti-inflammatory", rating: 4.7, inStock: true, prescription: false },

    { id: 3, name: "Vitamin D3", category: "vitamins", price: "₹425", originalPrice: "₹520", description: "Essential vitamin for bone health and immunity", rating: 4.7, inStock: true, prescription: false },
    { id: 17, name: "Vitamin B12", category: "vitamins", price: "₹350", originalPrice: "₹420", description: "Supports nerve health and energy production", rating: 4.8, inStock: true, prescription: false },
    { id: 18, name: "Vitamin C", category: "vitamins", price: "₹120", originalPrice: "₹150", description: "Boosts immunity and antioxidant support", rating: 4.9, inStock: true, prescription: false },
    { id: 19, name: "Multivitamin", category: "vitamins", price: "₹300", originalPrice: "₹370", description: "Daily essential vitamins and minerals", rating: 4.7, inStock: false, prescription: false },
    { id: 20, name: "Vitamin E", category: "vitamins", price: "₹210", originalPrice: "₹260", description: "Antioxidant for skin and cell protection", rating: 4.6, inStock: true, prescription: false },
    { id: 21, name: "Calcium + D3", category: "vitamins", price: "₹400", originalPrice: "₹480", description: "Bone health supplement with calcium and vitamin D3", rating: 4.8, inStock: true, prescription: false },

    { id: 4, name: "Omeprazole", category: "digestive", price: "₹165", originalPrice: "₹220", description: "Acid reflux and heartburn treatment", rating: 4.6, inStock: true, prescription: true },
    { id: 22, name: "Pantoprazole", category: "digestive", price: "₹150", originalPrice: "₹200", description: "Reduces stomach acid for heartburn relief", rating: 4.7, inStock: true, prescription: true },
    { id: 23, name: "Domperidone", category: "digestive", price: "₹110", originalPrice: "₹140", description: "Relieves nausea and improves digestion", rating: 4.6, inStock: true, prescription: true },
    { id: 24, name: "Lactulose", category: "digestive", price: "₹180", originalPrice: "₹220", description: "Gentle laxative for constipation relief", rating: 4.5, inStock: false, prescription: false },
    { id: 25, name: "Rabeprazole", category: "digestive", price: "₹170", originalPrice: "₹210", description: "Treats acid reflux and ulcers", rating: 4.7, inStock: true, prescription: true },
    { id: 26, name: "Probiotic Capsules", category: "digestive", price: "₹250", originalPrice: "₹300", description: "Supports gut health and digestion", rating: 4.8, inStock: true, prescription: false },

    { id: 5, name: "Cetirizine", category: "allergy", price: "₹95", originalPrice: "₹130", description: "24-hour allergy relief medication", rating: 4.8, inStock: false, prescription: false },
    { id: 27, name: "Loratadine", category: "allergy", price: "₹85", originalPrice: "₹110", description: "Non-drowsy allergy relief", rating: 4.7, inStock: true, prescription: false },
    { id: 28, name: "Fexofenadine", category: "allergy", price: "₹105", originalPrice: "₹135", description: "Long-lasting allergy medication", rating: 4.8, inStock: true, prescription: false },
    { id: 29, name: "Levocetirizine", category: "allergy", price: "₹90", originalPrice: "₹120", description: "Effective for hay fever and allergies", rating: 4.6, inStock: false, prescription: false },
    { id: 30, name: "Montelukast", category: "allergy", price: "₹130", originalPrice: "₹160", description: "Allergy and asthma management", rating: 4.7, inStock: true, prescription: true },
    { id: 31, name: "Desloratadine", category: "allergy", price: "₹115", originalPrice: "₹145", description: "Relieves sneezing and runny nose", rating: 4.7, inStock: true, prescription: false },

    { id: 6, name: "Metformin", category: "diabetes", price: "₹180", originalPrice: "₹245", description: "Type 2 diabetes management medication", rating: 4.9, inStock: true, prescription: true },
    { id: 32, name: "Gliclazide", category: "diabetes", price: "₹160", originalPrice: "₹210", description: "Oral medication for type 2 diabetes", rating: 4.8, inStock: true, prescription: true },
    { id: 33, name: "Glimepiride", category: "diabetes", price: "₹175", originalPrice: "₹220", description: "Helps control blood sugar levels", rating: 4.7, inStock: true, prescription: true },
    { id: 34, name: "Sitagliptin", category: "diabetes", price: "₹350", originalPrice: "₹420", description: "DPP-4 inhibitor for diabetes management", rating: 4.6, inStock: false, prescription: true },
    { id: 35, name: "Vildagliptin", category: "diabetes", price: "₹295", originalPrice: "₹360", description: "Improves glycemic control in diabetes", rating: 4.7, inStock: true, prescription: true },
    { id: 36, name: "Insulin Glargine", category: "diabetes", price: "₹650", originalPrice: "₹800", description: "Long-acting insulin for diabetes", rating: 4.9, inStock: true, prescription: true },
  ];

  const services = [
    {
      icon: Stethoscope,
      title: "Online Consultation",
      description: "Connect with certified doctors from the comfort of your home",
      features: ["Video calls", "Prescription delivery", "Follow-up care"]
    },
    {
      icon: Truck,
      title: "Home Delivery",
      description: "Fast and secure delivery of medicines to your doorstep",
      features: ["Same day delivery", "Temperature controlled", "Secure packaging"]
    },
    {
      icon: Activity,
      title: "Health Monitoring",
      description: "Track your health metrics and medication adherence",
      features: ["Digital health records", "Reminder alerts", "Progress tracking"]
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "100% authentic medicines with quality guarantees",
      features: ["FDA approved", "Batch tracking", "Quality certificates"]
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Family Physician",
      content: "The quality of service and genuine care for patients makes this the go-to medical supplier for our clinic.",
      rating: 5,
      image: "👩‍⚕️"
    },
    {
      name: "Michael Chen",
      role: "Regular Customer",
      content: "Reliable, fast delivery and excellent customer service. I've been trusting them for my family's health needs for years.",
      rating: 5,
      image: "👨"
    },
    {
      name: "Emma Williams",
      role: "Senior Care Coordinator",
      content: "Their home delivery service has been a blessing for our elderly patients who cannot visit the pharmacy regularly.",
      rating: 5,
      image: "👩"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(loadingTimer);
    };
  }, []);

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const medicinesToShow = showAllMedicines ? filteredMedicines : filteredMedicines.slice(0, 6);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-8 animate-pulse mx-auto shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-700 mb-4">New Rajdulari Medical</h2>
          <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-slate-500 mt-4 font-medium">Loading your healthcare experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-100">
      {/* Elegant Header */}
      <header className="fixed top-0 w-full bg-blue-200/80 backdrop-blur-md border-b border-slate-200/50 shadow-xl z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">New Rajdulari Medical</h1>
                <p className="text-xs text-slate-500 font-medium">Healthcare Excellence Since 1990</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { name: 'Home', icon: Home, href: '#home' },
                { name: 'Medicines', icon: Package, href: '#medicines' },
                { name: 'Services', icon: Stethoscope, href: '#services' },
                { name: 'About', icon: Info, href: '#about' },
                { name: 'Contact', icon: Contact2, href: '#contact' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {[
                { name: 'Home', icon: Home, href: '#home' },
                { name: 'Medicines', icon: Package, href: '#medicines' },
                { name: 'Services', icon: Stethoscope, href: '#services' },
                { name: 'About', icon: Info, href: '#about' },
                { name: 'Contact', icon: Contact2, href: '#contact' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-3 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 min-h-screen flex items-center bg-blue-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium text-sm">
                <Award className="w-4 h-4 mr-2" />
                Trusted Healthcare Partner Since 1990
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 leading-tight">
                  Your Health,
                  <span className="text-blue-600"> Our Priority</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                  Experience premium healthcare solutions with our comprehensive range of 
                  authentic medicines and professional medical services.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold">
                  Shop Medicines
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="inline-flex items-center px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-semibold">
                  <Play className="w-5 h-5 mr-2" />
                  Learn More
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { icon: Shield, label: "FDA Certified", color: "text-green-600" },
                  { icon: Award, label: "ISO 9001:2015", color: "text-blue-600" },
                  { icon: CheckCircle, label: "100% Authentic", color: "text-purple-600" }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className={`w-12 h-12 ${item.color} bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <p className="font-semibold text-slate-700 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image/Stats */}
            <div className="relative">
              <div className="bg-blue-200 rounded-3xl p-8 shadow-xl border border-slate-200/50">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Our Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Happy Customers", value: "50,000+", icon: Users, color: "text-blue-600" },
                    { label: "Years of Trust", value: "35+", icon: Clock, color: "text-green-600" },
                    { label: "Medicines Available", value: "5,000+", icon: Package, color: "text-purple-600" },
                    { label: "Cities Served", value: "100+", icon: Globe, color: "text-orange-600" }
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-4 rounded-2xl bg-blue-100 hover:bg-blue-200 transition-colors duration-200">
                      <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                      <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium text-sm mb-4">
              <Stethoscope className="w-4 h-4 mr-2" />
              Our Services
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From online consultations to home delivery, we provide everything you need for your health and wellness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medicines Section */}
      <section id="medicines" className="py-20 bg-blue-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium text-sm mb-4">
              <Package className="w-4 h-4 mr-2" />
              Medicine Collection
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
              Quality Medicines You Can Trust
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Browse our extensive collection of authentic medicines with competitive prices and fast delivery.
            </p>
          </div>

          {/* Search and Filter */}
          <div 
            className="relative rounded-2xl p-6 mb-12 shadow-2xl border border-slate-200 overflow-hidden animate-fade-in-up group backdrop-blur-xl bg-white/60"
            style={{
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
            }}
          >
            {/* Animated gradient border */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-300 group-focus-within:border-blue-400 transition-all duration-500 z-0" style={{background: 'linear-gradient(90deg,rgba(96,165,250,0.2),rgba(129,140,248,0.2))', boxShadow: '0 0 32px 0 rgba(96,165,250,0.10)'}} />
            <div className="flex flex-wrap gap-4 relative z-10">
              <div className="flex-1 min-w-[220px] relative">
                <Search 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300 group-focus-within:text-blue-500 group-hover:text-blue-400 transition-colors duration-300 animate-pulse-on-focus-glass"
                />
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-white/40 bg-white/60 text-slate-800 placeholder-slate-400 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-200 shadow-md hover:shadow-lg focus:shadow-xl transform hover:scale-[1.03] focus:scale-105 backdrop-blur-xl"
                />
              </div>
              <div className="flex-1 min-w-[180px] relative">
                <Filter 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-500 group-focus-within:text-indigo-600 group-hover:text-indigo-400 transition-colors duration-300 animate-pulse-on-focus-glass"
                  style={{zIndex: 2}}
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-white/40 bg-white/60 text-slate-800 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition-all duration-200 appearance-none shadow-md hover:shadow-lg focus:shadow-xl transform hover:scale-[1.03] focus:scale-105 backdrop-blur-xl text-base font-semibold cursor-pointer"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                >
                  <option value="all">All Categories</option>
                  <option value="antibiotics">Antibiotics</option>
                  <option value="painkillers">Pain Relief</option>
                  <option value="vitamins">Vitamins</option>
                  <option value="digestive">Digestive Health</option>
                  <option value="allergy">Allergy Care</option>
                  <option value="diabetes">Diabetes</option>
                </select>
                {/* Custom dropdown arrow */}
                <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center">
                  <svg className="w-5 h-5 text-indigo-400 group-focus-within:text-indigo-600 group-hover:text-indigo-500 transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                {/* Dropdown style enhancement (for native select, can't style dropdown itself, but can style focus/hover/active) */}
                <style>{`
                  select:focus > option, select:hover > option {
                    background: rgba(129,140,248,0.12);
                    color: #3730a3;
                  }
                  select option {
                    font-size: 1.08rem;
                    padding: 0.5rem 1rem;
                  }
                `}</style>
              </div>
            </div>
          </div>

          {/* Medicine Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {medicinesToShow.map((medicine) => (
              <div key={medicine.id} className="bg-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{medicine.name}</h3>
                    <p className="text-slate-600 text-sm mb-3">{medicine.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-semibold ml-2 ${categoryColors[medicine.category]}`}>{medicine.category.charAt(0).toUpperCase() + medicine.category.slice(1)}</span>
                  {medicine.prescription && (
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-lg text-xs font-medium ml-2">
                      Prescription Required
                    </span>
                  )}
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(medicine.rating) ? 'fill-current' : 'text-slate-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-slate-600 text-sm ml-2">({medicine.rating})</span>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-slate-800">{medicine.price}</span>
                    <span className="text-slate-400 line-through">{medicine.originalPrice}</span>
                  </div>
                  <div className="flex items-center">
                    {medicine.inStock ? (
                      <span className="flex items-center text-green-600 text-sm font-medium">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        In Stock
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600 text-sm font-medium">
                        <X className="w-4 h-4 mr-1" />
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    className="flex-1 py-3 px-4 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <ArrowRight className="w-4 h-4 inline mr-2" />
                    Know More
                  </button>
                  <button className="px-4 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors duration-200">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredMedicines.length > 6 && !showAllMedicines && (
            <div className="text-center mt-8">
              <button
                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl font-semibold transition-all duration-200"
                onClick={() => setShowAllMedicines(true)}
              >
                Show More
              </button>
            </div>
          )}
          {showAllMedicines && filteredMedicines.length > 6 && (
            <div className="text-center mt-4">
              <button
                className="inline-block px-8 py-3 bg-slate-200 text-slate-700 rounded-xl shadow font-semibold hover:bg-slate-300 transition-all duration-200"
                onClick={() => setShowAllMedicines(false)}
              >
                Show Less
              </button>
            </div>
          )}

          {filteredMedicines.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-600 mb-2">No medicines found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium text-sm mb-4">
              <MessageCircle className="w-4 h-4 mr-2" />
              Customer Stories
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Read testimonials from healthcare professionals and customers who trust us with their health.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-slate-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                    <p className="text-slate-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-blue-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-200 rounded-full text-blue-700 font-medium text-sm">
                <BookOpen className="w-4 h-4 mr-2" />
                About Us
              </div>
              
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-800">
                  35+ Years of Healthcare Excellence
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Since 1990, New Rajdulari Medical has been dedicated to providing
                  authentic medicines and exceptional healthcare services to families
                  across the nation. Our commitment to quality and customer care has
                  made us a trusted name in the healthcare industry.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  We believe that access to quality healthcare should be simple, affordable,
                  and reliable. That's why we've built a comprehensive platform that brings
                  together the best medicines, expert consultations, and convenient services
                  all in one place.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Target, title: "Our Mission", desc: "Making healthcare accessible and affordable for everyone" },
                  { icon: Heart, title: "Our Vision", desc: "A world where quality healthcare is within everyone's reach" }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white rounded-2xl shadow-lg border border-slate-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold">
                Learn More About Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>

            <div className="relative">
              <div className="bg-blue-200 rounded-3xl p-8 shadow-xl border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Why Choose Us?</h3>
                <div className="space-y-6">
                  {[
                    { icon: Shield, title: "Quality Assurance", desc: "100% authentic medicines with quality certificates" },
                    { icon: Truck, title: "Fast Delivery", desc: "Same-day delivery available in major cities" },
                    { icon: Users, title: "Expert Support", desc: "24/7 customer support from healthcare professionals" },
                    { icon: Award, title: "Trusted Brand", desc: "ISO certified with 35+ years of excellence" }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1">{feature.title}</h4>
                        <p className="text-slate-600 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium text-sm mb-4">
              <Phone className="w-4 h-4 mr-2" />
              Contact Us
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Have questions about our services or need help with your order? We're here to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              {[
                { icon: Phone, title: "Call Us", info: "+91 98765 43210", desc: "Available 24/7 for emergencies" },
                { icon: Mail, title: "Email Us", info: "care@rajdularimedical.com", desc: "We'll respond within 24 hours" },
                { icon: MapPin, title: "Visit Us", info: "Medical Plaza, Healthcare District", desc: "Open Mon-Sat, 9AM-8PM" }
              ].map((contact, i) => (
                <div key={i} className="flex items-start space-x-4 p-6 bg-indigo-100 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <contact.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">{contact.title}</h3>
                    <p className="text-blue-600 font-semibold mb-1">{contact.info}</p>
                    <p className="text-slate-600 text-sm">{contact.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Send us a Message</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6 bg-slate-700/40 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">New Rajdulari Medical</h3>
                  <p className="text-slate-400 text-sm">Healthcare Excellence</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Your trusted healthcare partner since 1990, providing authentic medicines 
                and professional medical services with unwavering commitment to quality.
              </p>
              <div className="flex space-x-4">
                {[MessageCircle, Mail, Phone, Globe].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200 cursor-pointer">
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-slate-700/40 rounded-2xl p-4 shadow-lg">
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <div className="space-y-3">
                {['Home', 'About Us', 'Our Services', 'Medicines', 'Contact Us', 'Privacy Policy'].map((link, i) => (
                  <a key={i} href="#" className="block text-slate-300 hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-slate-700/40 rounded-2xl p-4 shadow-lg">
              <h4 className="text-lg font-bold mb-6">Our Services</h4>
              <div className="space-y-3">
                {['Online Consultation', 'Home Delivery', 'Prescription Medicines', 'Health Checkups', 'Medicine Reminders', 'Emergency Support'].map((service, i) => (
                  <a key={i} href="#" className="block text-slate-300 hover:text-white transition-colors duration-200">
                    {service}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-slate-700/40 rounded-2xl p-4 shadow-lg">
              <h4 className="text-lg font-bold mb-6">Stay Updated</h4>
              <p className="text-slate-300 mb-6">
                Subscribe to our newsletter for health tips and exclusive offers.
              </p>
              <div className="space-y-4">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-r-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-400">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No spam, unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-slate-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <p className="text-slate-400">
                  © {new Date().getFullYear()} New Rajdulari Medical. All rights reserved.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Terms of Service</a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Cookie Policy</a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-slate-700 rounded-lg px-4 py-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-700 rounded-lg px-4 py-2">
                  <Award className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">ISO Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full shadow-2xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group">
          <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-200" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        </button>
      </div>

      {/* Scroll to Top Button */}
      {scrollY > 500 && (
        <div className="fixed bottom-6 left-6 z-50">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-blue-300 hover:bg-blue-400 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 text-white transform -rotate-90" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ElegantMedicalWebsite;

{/* Animation keyframes for fade-in-up and pulse-on-focus-glass */}
<style>
{`
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(24px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}
@keyframes pulse-on-focus-glass {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.3); }
}
.animate-pulse-on-focus-glass:focus, .group:focus-within .animate-pulse-on-focus-glass {
  animation: pulse-on-focus-glass 0.7s infinite;
}
`}
</style>