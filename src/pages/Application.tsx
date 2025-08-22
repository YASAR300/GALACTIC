import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Send, AlertTriangle, Clock, X } from 'lucide-react';
import permits from '../utils/permits';

interface ApplicationProps {
  addNotification: (message: string, type?: string) => void;
}

interface FormData {
  fullName: string;
  galacticId: string;
  homeWorld: string;
  reason: string;
  emergencyContact: string;
  bloodType: string;
  favoriteColor: string;
  mothersMiddleName: string;
  dreamJob: string;
  fears: string;
}

function Application({ addNotification }: ApplicationProps) {
  const { permitId } = useParams();
  const [selectedPermit, setSelectedPermit] = useState(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    galacticId: '',
    homeWorld: '',
    reason: '',
    emergencyContact: '',
    bloodType: '',
    favoriteColor: '',
    mothersMiddleName: '',
    dreamJob: '',
    fears: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRejection, setShowRejection] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [additionalForms, setAdditionalForms] = useState([]);

  useEffect(() => {
    if (permitId) {
      const permit = permits.find(p => p.id === parseInt(permitId));
      setSelectedPermit(permit);
    }
  }, [permitId]);

  useEffect(() => {
    // Generate random additional forms
    const forms = [
      'Form 42-A: Certificate of Intent to Apply',
      'Form 99-Z: Emotional Stability Assessment',
      'Form 13-Ω: Quantum Signature Verification',
      'Form ∞-1: Infinite Loop Acknowledgment',
      'Form X-99: Existential Crisis Declaration'
    ];
    
    setAdditionalForms(forms.sort(() => Math.random() - 0.5).slice(0, 3));
  }, []);

  const rejectionReasons = [
    "Form filled out in the wrong shade of blue ink.",
    "Application submitted on a Tuesday. We only accept submissions on alternate Wednesdays.",
    "Your galactic ID number contains too many vowels.",
    "Insufficient suffering detected in your application essay.",
    "You forgot to include a lock of hair from a three-headed space goat.",
    "Application rejected due to excessive optimism.",
    "Your handwriting suggests dangerous levels of confidence.",
    "Form contains traces of logic - strictly prohibited.",
    "You failed to include your grandmother's recipe for cosmic soup.",
    "Application rejected for being suspiciously complete.",
    "Your application violates the Third Law of Bureaucratic Thermodynamics.",
    "Form submitted during Mercury retrograde - automatically invalid."
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Random form validation failures
    if (Math.random() < 0.1) {
      addNotification("Field validation error: Please use exactly 7.5 characters.", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate processing
    setTimeout(() => {
      const reason = rejectionReasons[Math.floor(Math.random() * rejectionReasons.length)];
      setRejectionReason(reason);
      setShowRejection(true);
      setIsSubmitting(false);
      addNotification("Application processed successfully! (Successfully rejected)", "error");
    }, 3000 + Math.random() * 2000);
  };

  if (showRejection) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-900 border-2 border-red-500 rounded-lg p-8 text-center rejection-stamp">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-3xl font-orbitron font-bold text-red-400 mb-4">
              APPLICATION REJECTED
            </h1>
            <p className="text-red-200 font-space-mono text-lg mb-6">
              {rejectionReason}
            </p>
            
            <div className="bg-black bg-opacity-50 rounded-lg p-4 mb-6">
              <h3 className="text-yellow-400 font-bold mb-2">Additional Requirements:</h3>
              <ul className="text-yellow-200 font-space-mono text-sm space-y-1">
                {additionalForms.map((form, index) => (
                  <li key={index}>• {form}</li>
                ))}
                <li>• Sacrifice of your first-born rubber duck</li>
                <li>• 47 notarized copies of your birth certificate (in Sanskrit)</li>
              </ul>
            </div>

            <div className="space-y-4">
              <Link
                to="/application"
                className="block bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded font-space-mono transition-colors"
              >
                Apply for Different Permit
              </Link>
              <Link
                to="/catalog"
                className="block bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded font-space-mono transition-colors"
              >
                Back to Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-600">
            <div className="bureaucratic-spinner mx-auto mb-6"></div>
            <h2 className="text-2xl font-orbitron font-bold text-cyan-400 mb-4">
              Processing Application...
            </h2>
            <div className="progress-bar mb-4">
              <div className="progress-fill" style={{ width: '73%' }}></div>
            </div>
            <p className="text-gray-300 font-space-mono mb-4">
              Please wait while we find creative ways to reject your application...
            </p>
            <div className="text-sm text-gray-400 font-space-mono space-y-2">
              <p>✓ Validating impossibility of request...</p>
              <p>✓ Consulting rejection algorithms...</p>
              <p>⏳ Generating bureaucratic excuses...</p>
              <p>⏳ Applying Murphy's Law...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-orbitron font-bold mb-4">
            <span className="text-cyan-400">Permit</span>{' '}
            <span className="text-purple-400">Application</span>
          </h1>
          {selectedPermit ? (
            <div className="bg-gray-800 rounded-lg p-4 border border-cyan-500 mb-6">
              <h2 className="text-xl font-bold text-cyan-400 mb-2">
                {selectedPermit.name}
              </h2>
              <p className="text-gray-300 font-space-mono">
                {selectedPermit.description}
              </p>
            </div>
          ) : (
            <p className="text-gray-400 font-space-mono">
              Select a permit to apply for guaranteed rejection!
            </p>
          )}
        </div>

        {/* Permit Selection */}
        {!selectedPermit && (
          <div className="mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-cyan-400 mb-4">
              Select a Permit to Reject
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {permits.slice(0, 6).map(permit => (
                <button
                  key={permit.id}
                  onClick={() => setSelectedPermit(permit)}
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-cyan-500 rounded-lg p-4 text-left transition-all duration-300"
                >
                  <h3 className="font-bold text-cyan-400 mb-2">{permit.name}</h3>
                  <p className="text-gray-400 text-sm font-space-mono">
                    {permit.description.substring(0, 80)}...
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Application Form */}
        {selectedPermit && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-600">
              <h3 className="text-xl font-orbitron font-bold text-cyan-400 mb-4 flex items-center">
                <FileText className="mr-2" size={24} />
                Personal Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-space-mono mb-2">
                    Full Name (Including Middle Tentacle Names)
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:outline-none font-space-mono"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 font-space-mono mb-2">
                    Galactic ID Number
                  </label>
                  <input
                    type="text"
                    name="galacticId"
                    value={formData.galacticId}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 42-IMPOSSIBLE-7777"
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:outline-none font-space-mono"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-space-mono mb-2">
                    Home World/Dimension
                  </label>
                  <input
                    type="text"
                    name="homeWorld"
                    value={formData.homeWorld}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Earth (Dimension C-137)"
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:outline-none font-space-mono"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-space-mono mb-2">
                    Emergency Contact (Inter-dimensional)
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:outline-none font-space-mono"
                  />
                </div>
              </div>
            </div>

            {/* Additional Requirements */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-600">
              <h3 className="text-xl font-orbitron font-bold text-cyan-400 mb-4">
                Unnecessary Personal Details
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-space-mono mb-2">
                    Blood Type (Alien variants accepted)
                  </label>
                  <input
                    type="text"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                    placeholder="e.g., B+ with quantum particles"
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:outline-none font-space-mono"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-space-mono mb-2">
                    Favorite Color (Must be visible light)
                  </label>
                  <input
                    type="text"
                    name="favoriteColor"
                    value={formData.favoriteColor}
                    onChange={handleInputChange}
                    placeholder="e.g., Infrared"
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:outline-none font-space-mono"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-space-mono mb-2">
                    Mother's Maiden Middle Name
                  </label>
                  <input
                    type="text"
                    name="mothersMiddleName"
                    value={formData.mothersMiddleName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:outline-none font-space-mono"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-space-mono mb-2">
                    Dream Job (Will be crushed anyway)
                  </label>
                  <input
                    type="text"
                    name="dreamJob"
                    value={formData.dreamJob}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:outline-none font-space-mono"
                  />
                </div>
              </div>
            </div>

            {/* Essay Section */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-600">
              <h3 className="text-xl font-orbitron font-bold text-cyan-400 mb-4">
                Essay Questions (Minimum 10,000 words each)
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 font-space-mono mb-2">
                    Why do you believe you deserve this permit? (Hint: You don't)
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Describe your futile hopes and dreams..."
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:outline-none font-space-mono resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-300 font-space-mono mb-2">
                    List your greatest fears (We'll use these against you)
                  </label>
                  <textarea
                    name="fears"
                    value={formData.fears}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="The more detailed, the better..."
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-cyan-500 focus:outline-none font-space-mono resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Warnings */}
            <div className="bg-red-900 bg-opacity-20 border border-red-500 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="text-red-400" size={24} />
                <h3 className="font-orbitron font-bold text-red-400">
                  Terms & Conditions
                </h3>
              </div>
              <div className="text-red-200 font-space-mono text-sm space-y-1">
                <p>• Application fee is non-refundable and will be randomly determined</p>
                <p>• Processing time may exceed your natural lifespan</p>
                <p>• All applications will be rejected on principle</p>
                <p>• Your personal information will be sold to interdimensional spam companies</p>
                <p>• By submitting, you waive all rights to happiness</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 px-8 rounded-lg font-space-mono text-lg transition-all duration-300 hover-lift hover-glow flex items-center space-x-2 mx-auto"
              >
                <Send size={24} />
                <span>Submit for Inevitable Rejection</span>
              </button>
              <p className="text-gray-400 font-space-mono text-sm mt-2">
                Processing fee: ¤{Math.floor(Math.random() * 1000)} Galactic Credits
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Application;