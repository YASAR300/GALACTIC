import React, { useState, useEffect } from 'react';
import { Clock, XCircle, AlertCircle, RefreshCw, Eye, TrendingDown } from 'lucide-react';

interface ApplicationStatus {
  id: string;
  permitName: string;
  status: 'pending' | 'rejected' | 'lost' | 'limbo';
  submittedDate: string;
  lastUpdate: string;
  rejectionReason?: string;
  processingStage: string;
  waitTime: string;
}

interface StatusProps {
  addNotification: (message: string, type?: string) => void;
}

function Status({ addNotification }: StatusProps) {
  const [applications, setApplications] = useState<ApplicationStatus[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationStatus | null>(null);

  // Generate fake applications
  useEffect(() => {
    const permits = [
      "Permission to Blink",
      "License to Exist in 3D Space",
      "Permit to Breathe Oxygen",
      "Form 7B: Right to Complain",
      "Authorization to Yawn",
      "Cosmic Queue Standing Pass",
      "Time Travel Request Form",
      "Galactic Hug Authorization"
    ];

    const statuses: Array<'pending' | 'rejected' | 'lost' | 'limbo'> = ['pending', 'rejected', 'lost', 'limbo'];
    
    const rejectionReasons = [
      "Insufficient documentation of sadness",
      "Application submitted in wrong century",
      "Handwriting too legible",
      "Failed to include tears of desperation",
      "Application demonstrates dangerous levels of hope",
      "Form filled out with wrong type of ink",
      "Submitted on a day ending in 'y'",
      "Violated the law of bureaucratic entropy"
    ];

    const processingStages = [
      "Initial Rejection Review",
      "Advanced Disappointment Analysis",
      "Committee of Perpetual Delays",
      "Department of Circular Logic",
      "Final Denial Preparation",
      "Lost in the Void",
      "Quantum Rejection State",
      "Bureaucratic Limbo Level 7"
    ];

    const fakeApps = permits.map((permit, index) => ({
      id: `APP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      permitName: permit,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      submittedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      lastUpdate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      rejectionReason: Math.random() > 0.5 ? rejectionReasons[Math.floor(Math.random() * rejectionReasons.length)] : undefined,
      processingStage: processingStages[Math.floor(Math.random() * processingStages.length)],
      waitTime: `${Math.floor(Math.random() * 500) + 50} years`
    }));

    setApplications(fakeApps);
  }, []);

  const refreshStatus = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Randomly update some statuses
      setApplications(prev => prev.map(app => ({
        ...app,
        lastUpdate: new Date().toLocaleDateString(),
        waitTime: `${Math.floor(Math.random() * 500) + 50} years`,
        processingStage: app.status === 'pending' ? 
          ["Still Finding Reasons to Reject", "Advanced Procrastination Phase", "Committee of Infinite Delays"][Math.floor(Math.random() * 3)] :
          app.processingStage
      })));
      
      addNotification("Status refreshed! Nothing has changed, as expected.", "warning");
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-400" size={24} />;
      case 'rejected':
        return <XCircle className="text-red-400" size={24} />;
      case 'lost':
        return <AlertCircle className="text-orange-400" size={24} />;
      case 'limbo':
        return <TrendingDown className="text-purple-400" size={24} />;
      default:
        return <AlertCircle className="text-gray-400" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      case 'lost':
        return 'bg-orange-900 text-orange-200';
      case 'limbo':
        return 'bg-purple-900 text-purple-200';
      default:
        return 'bg-gray-900 text-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
          <span className="text-cyan-400">Application</span>{' '}
          <span className="text-purple-400">Status</span>
        </h1>
        <p className="text-xl text-gray-300 font-space-mono mb-6">
          Track your journey through bureaucratic purgatory
        </p>
        
        <button
          onClick={refreshStatus}
          disabled={isLoading}
          className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 text-white py-2 px-6 rounded font-space-mono flex items-center space-x-2 mx-auto transition-colors"
        >
          <RefreshCw className={isLoading ? 'animate-spin' : ''} size={20} />
          <span>{isLoading ? 'Refreshing...' : 'Refresh Status'}</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-600 text-center">
          <div className="text-2xl font-bold text-yellow-400">{applications.filter(app => app.status === 'pending').length}</div>
          <div className="text-sm text-gray-400 font-space-mono">Pending</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-600 text-center">
          <div className="text-2xl font-bold text-red-400">{applications.filter(app => app.status === 'rejected').length}</div>
          <div className="text-sm text-gray-400 font-space-mono">Rejected</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-600 text-center">
          <div className="text-2xl font-bold text-orange-400">{applications.filter(app => app.status === 'lost').length}</div>
          <div className="text-sm text-gray-400 font-space-mono">Lost</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-600 text-center">
          <div className="text-2xl font-bold text-green-400">0</div>
          <div className="text-sm text-gray-400 font-space-mono">Approved</div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-gray-800 rounded-lg border border-gray-600 hover:border-cyan-500 transition-all duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(app.status)}
                    <h3 className="text-xl font-orbitron font-bold text-cyan-400">
                      {app.permitName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-space-mono ${getStatusColor(app.status)}`}>
                      {app.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm font-space-mono text-gray-300">
                    <div>
                      <span className="text-gray-400">Application ID:</span>
                      <br />
                      <span className="text-cyan-400">{app.id}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Submitted:</span>
                      <br />
                      <span>{app.submittedDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Last Update:</span>
                      <br />
                      <span>{app.lastUpdate}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedApplication(selectedApplication?.id === app.id ? null : app)}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition-colors"
                >
                  <Eye size={20} />
                </button>
              </div>

              {/* Expanded Details */}
              {selectedApplication?.id === app.id && (
                <div className="mt-6 pt-4 border-t border-gray-600 space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-yellow-400 mb-2">Current Processing Stage:</h4>
                      <p className="text-gray-300 font-space-mono">{app.processingStage}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-yellow-400 mb-2">Estimated Wait Time:</h4>
                      <p className="text-gray-300 font-space-mono">{app.waitTime}</p>
                    </div>
                  </div>

                  {app.rejectionReason && (
                    <div>
                      <h4 className="font-bold text-red-400 mb-2">Rejection Reason:</h4>
                      <p className="text-red-200 font-space-mono bg-red-900 bg-opacity-20 p-3 rounded">
                        {app.rejectionReason}
                      </p>
                    </div>
                  )}

                  {/* Fake Progress Bar */}
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">Processing Progress:</h4>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: app.status === 'rejected' ? '100%' : 
                                app.status === 'lost' ? '50%' : 
                                app.status === 'limbo' ? '25%' : '10%' 
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 font-space-mono">
                      Progress is inversely related to your happiness level
                    </p>
                  </div>

                  {/* Fake Timeline */}
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">Processing Timeline:</h4>
                    <div className="space-y-2 text-sm font-space-mono">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Application received and immediately regretted</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Forwarded to Department of Circular Logic</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span>Currently generating reasons for rejection</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <span>Eventual rejection (ETA: {app.waitTime})</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {applications.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-orbitron font-bold text-gray-400 mb-2">No Applications Found</h2>
          <p className="text-gray-500 font-space-mono">
            You haven't submitted any applications yet. Lucky you!
          </p>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-16 bg-blue-900 bg-opacity-20 border border-blue-500 rounded-lg p-6">
        <h3 className="text-xl font-orbitron font-bold text-blue-400 mb-4">
          📞 Need Help Understanding Your Status?
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-blue-200 font-space-mono text-sm">
          <div>
            <strong>Pending:</strong> We're actively ignoring your application
          </div>
          <div>
            <strong>Rejected:</strong> Your dreams have been successfully crushed
          </div>
          <div>
            <strong>Lost:</strong> Your application has been misplaced in the void
          </div>
          <div>
            <strong>Limbo:</strong> Your application exists in a quantum state of maybe
          </div>
        </div>
      </div>
    </div>
  );
}

export default Status;