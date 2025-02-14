import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Users, 
  Award, 
  BookOpen, 
  ArrowRight,
  ArrowLeft,
  Building2, 
  Globe2, 
  Newspaper,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Calendar,
  Trophy,
  Heart,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin as Location,
  ExternalLink,
  Video,
  Play,
  MessageCircle
} from 'lucide-react';

const notableAlumni = [
  {
    name: "Dr. Rajesh Kumar",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    role: "CEO, TechVision Global",
    batch: "1995",
    department: "Computer Science",
    achievements: [
      "Forbes 30 Under 30",
      "Built $1B Company",
      "100+ Patents"
    ],
    description: "Pioneering innovation in AI and robotics, leading one of the fastest-growing tech companies globally.",
    socialLinks: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Dr. Priya Sharma",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    role: "Research Director, NASA",
    batch: "1998",
    department: "Aerospace Engineering",
    achievements: [
      "Presidential Medal",
      "Space Innovation Award",
      "Published in Nature"
    ],
    description: "Leading groundbreaking research in space exploration and satellite technology at NASA.",
    socialLinks: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Amit Patel",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    role: "Founder & CTO, CloudScale",
    batch: "2005",
    department: "Electronics",
    achievements: [
      "Tech Innovator Award",
      "50M+ Users",
      "YCombinator Alumni"
    ],
    description: "Revolutionizing cloud computing with innovative solutions used by Fortune 500 companies.",
    socialLinks: {
      linkedin: "#",
      twitter: "#"
    }
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Annual Alumni Meet 2025",
    date: "March 15, 2025",
    time: "10:00 AM IST",
    location: "NITJ Campus",
    description: "Join us for the grand reunion of NITJ alumni. Connect with old friends, share experiences, and celebrate the NITJ legacy.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    registrationLink: "#"
  },
  {
    id: 2,
    title: "Global Alumni Summit",
    date: "April 20, 2025",
    time: "6:00 PM IST",
    location: "Virtual Event",
    description: "A virtual gathering of NITJ alumni from around the world discussing innovation, leadership, and future technologies.",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=400&fit=crop",
    registrationLink: "#"
  },
  {
    id: 3,
    title: "Alumni-Student Mentorship Program",
    date: "May 1, 2025",
    time: "2:00 PM IST",
    location: "Hybrid Event",
    description: "Bridge the gap between academia and industry through our mentorship program. Share your experience with current students.",
    image: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=800&h=400&fit=crop",
    registrationLink: "#"
  }
];

const alumniTalks = [
  {
    id: 1,
    title: "Innovation in AI and Machine Learning",
    speaker: "Dr. Rajesh Kumar",
    role: "AI Research Lead, Google",
    batch: "1995",
    date: "February 28, 2025",
    time: "5:00 PM IST",
    thumbnail: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=400&fit=crop",
    description: "Exploring the latest trends in AI and their impact on future technologies.",
    registrationLink: "#",
    videoLink: "#"
  },
  {
    id: 2,
    title: "Entrepreneurship Journey: From NITJ to Silicon Valley",
    speaker: "Priya Sharma",
    role: "Founder & CEO, TechStart",
    batch: "2000",
    date: "March 5, 2025",
    time: "6:30 PM IST",
    thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop",
    description: "Learn about building successful startups and navigating the entrepreneurial landscape.",
    registrationLink: "#",
    videoLink: "#"
  },
  {
    id: 3,
    title: "Future of Sustainable Engineering",
    speaker: "Dr. Amit Patel",
    role: "Chief Sustainability Officer, Tesla",
    batch: "1998",
    date: "March 12, 2025",
    time: "4:00 PM IST",
    thumbnail: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=800&h=400&fit=crop",
    description: "Discussing sustainable engineering practices and their impact on climate change.",
    registrationLink: "#",
    videoLink: "#"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentAlumni, setCurrentAlumni] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=600&fit=crop",
      title: "Welcome to NIT Jalandhar Alumni Network",
      subtitle: "Connecting Generations of Excellence"
    },
    {
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=600&fit=crop",
      title: "Building Stronger Connections",
      subtitle: "Join Our Global Community"
    },
    {
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&h=600&fit=crop",
      title: "Empowering Future Leaders",
      subtitle: "Share Your Success Story"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextAlumni = () => {
    setCurrentAlumni((prev) => (prev + 1) % notableAlumni.length);
  };

  const prevAlumni = () => {
    setCurrentAlumni((prev) => (prev - 1 + notableAlumni.length) % notableAlumni.length);
  };

  useEffect(() => {
    const timer = setInterval(nextAlumni, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-1 animate-fade-in">
      {/* Navigation Bar */}
      <nav className="bg-[#1a237e] text-white shadow-lg fixed top-0 left-0 right-0 z-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-5">
              <img 
                src="https://res.cloudinary.com/dtu19fejc/image/upload/v1739470943/Logo_of_NIT_Jalandhar_siybqg.png" 
                alt="NITJ Logo" 
                className="h-16 w-auto"
              />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold">NITJ Alumni Association (NITJAA)</h1>
                <h1 className="text-xl font-bold">Dr. BR Ambedkar National Institute of Technology Jalandhar</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-indigo-200 font-medium">Home</Link>
              <Link to="/about" className="text-white hover:text-indigo-200 font-medium">About</Link>
              <Link to="/events" className="text-white hover:text-indigo-200 font-medium">Awards</Link>
              <Link to="/gallery" className="text-white hover:text-indigo-200 font-medium">Gallery</Link>
              <Link to="/contact" className="text-white hover:text-indigo-200 font-medium">Contact</Link>
              <Link 
                to="/login" 
                className="bg-white text-[#1a237e] px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-indigo-200 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#1a237e] border-t border-indigo-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 text-white hover:bg-indigo-800 rounded-md"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 text-white hover:bg-indigo-800 rounded-md"
              >
                About
              </Link>
              <Link 
                to="/events" 
                className="block px-3 py-2 text-white hover:bg-indigo-800 rounded-md"
              >
                Events
              </Link>
              <Link 
                to="/gallery" 
                className="block px-3 py-2 text-white hover:bg-indigo-800 rounded-md"
              >
                Gallery
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-2 text-white hover:bg-indigo-800 rounded-md"
              >
                Contact
              </Link>
              <Link 
                to="/login" 
                className="block px-3 py-2 bg-white text-[#1a237e] rounded-md hover:bg-indigo-100"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Add margin-top to account for fixed navbar */}
      <div className="pt-24">
        {/* Hero Slider */}
        <div className="relative h-[600px] overflow-hidden rounded-2xl shadow-2xl m-20">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: index === currentSlide ? 1 : 0,
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="h-full flex flex-col justify-center items-center text-center text-white p-8">
                <h1 className="text-5xl font-bold mb-4 animate-slide-up">{slide.title}</h1>
                <p className="text-xl mb-8 animate-slide-up">{slide.subtitle}</p>
                <div className="space-x-4 animate-slide-up">
                  <Link
                    to="/login"
                    className="bg-[#1a237e] hover:bg-[#283593] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white hover:bg-gray-100 text-[#1a237e] px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {/* Slide indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Events Section */}
        <div className="px-8 py-16 bg-gradient-to-br from-indigo-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
              <p className="text-lg text-gray-600">Join us for these exciting alumni events and activities</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Location className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <a
                      href={event.registrationLink}
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Register Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notable Alumni Section */}
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 py-20 px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop')] opacity-10 bg-cover bg-center" />
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Notable Alumni</h2>
              <p className="text-indigo-200 text-lg">Meet our distinguished alumni making waves globally</p>
            </div>

            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={prevAlumni}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextAlumni}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Alumni Cards */}
              <div className="flex justify-center">
                <div className="w-full max-w-4xl bg-white">
                  <div className="relative h-[600px]">
                    {notableAlumni.map((alumni, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-700 transform ${
                          index === currentAlumni
                            ? 'opacity-100 translate-x-0'
                            : index < currentAlumni
                            ? 'opacity-0 -translate-x-full'
                            : 'opacity-0 translate-x-full'
                        }`}
                      >
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 h-full flex flex-col md:flex-row items-center gap-8 border border-white/10">
                          {/* Image Section */}
                          <div className="w-full md:w-1/2">
                            <div className="relative group">
                              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                              <img
                                src={alumni.image}
                                alt={alumni.name}
                                className="relative rounded-lg w-full h-[400px] object-cover"
                              />
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="w-full md:w-1/2 text-black space-y-6">
                            <div>
                              <h3 className="text-3xl font-bold mb-2">{alumni.name}</h3>
                              <p className="text-black-200 text-lg">{alumni.role}</p>
                            </div>

                            <div className="space-y-2">
                              <p className="text-grey-200">
                                <span className="font-semibold">Batch:</span> {alumni.batch}
                              </p>
                              <p className="text-grey-200">
                                <span className="font-semibold">Department:</span> {alumni.department}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold mb-2">Key Achievements</h4>
                              <ul className="space-y-2">
                                {alumni.achievements.map((achievement, i) => (
                                  <li key={i} className="flex items-center text-grey-200">
                                    <Award className="h-5 w-5 mr-2 text-grey-400" />
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <p className="text-black-200">{alumni.description}</p>

                            <div className="flex items-center space-x-4">
                              <a
                                href={alumni.socialLinks.linkedin}
                                className="text-indigo-400 hover:text-black transition-colors"
                              >
                                <Linkedin className="h-6 w-6" />
                              </a>
                              <a
                                href={alumni.socialLinks.twitter}
                                className="text-indigo-400 hover:text-black transition-colors"
                              >
                                <Twitter className="h-6 w-6" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dots Navigation */}
              <div className="flex justify-center space-x-2 mt-8">
                {notableAlumni.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentAlumni(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentAlumni
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alumni Talks Section */}
        <div className="px-8 py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Alumni Talks</h2>
              <p className="text-lg text-gray-600">Learn from the experiences of our distinguished alumni</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {alumniTalks.map((talk) => (
                <div key={talk.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img 
                      src={talk.thumbnail} 
                      alt={talk.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white opacity-80" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{talk.title}</h3>
                        <p className="text-indigo-600 font-medium">{talk.speaker}</p>
                        <p className="text-gray-600 text-sm">{talk.role}</p>
                      </div>
                      <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded">
                        {talk.batch} Batch
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{talk.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{talk.time}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{talk.description}</p>
                    
                    <div className="flex space-x-3">
                      <a
                        href={talk.registrationLink}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Join Discussion
                      </a>
                      <a
                        href={talk.videoLink}
                        className="inline-flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Watch
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* About */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <GraduationCap className="h-8 w-8" />
                  <span className="text-xl font-bold">NITJ Alumni</span>
                </div>
                <p className="text-gray-400 mb-6">
                  Connecting and empowering NITJ alumni worldwide through a vibrant and supportive community.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" className="text-gray-400 hover:text-white transition-colors">
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/gallery" className="text-gray-400 hover:text-white transition-colors">
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-indigo-400" />
                    <span className="text-gray-400">G.T Road, Jalandhar, Punjab, India</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-indigo-400" />
                    <span className="text-gray-400">+91 181 2690301</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-indigo-400" />
                    <span className="text-gray-400">alumni@nitj.ac.in</span>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-2">Subscribe to Newsletter</h4>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button className="bg-indigo-600 px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
             </div>

            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400">© 2025 NITJ Alumni Cell. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                  <Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                    Sitemap
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}