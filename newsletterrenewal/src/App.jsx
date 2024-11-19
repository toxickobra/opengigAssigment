import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlowVisualization from './components/FlowVisualization';
import LogViewer from './components/LogViewer';
import { Button } from './components/ui/button';
import Card from './components/ui/card';
import UserInbox from './components/UserInbox';

const API_BASE_URL = 'https://opengigassigment.onrender.com'; // Replace with your backend URL

const SIMULATION_STEP_TIME = 5000; // 1 second per step
const WAITING_TIME = 5000; // 1 second waiting period after reminder

const FlowSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState([]); // Store logs locally during the flow
  const [flowComplete, setFlowComplete] = useState(false);
  const [renewed, setRenewed] = useState(false);
  const [showRenewalPrompt, setShowRenewalPrompt] = useState(false);
  const [renewalAttempt, setRenewalAttempt] = useState(0);
  const [waitingForAutoCheck, setWaitingForAutoCheck] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  // Function to add individual logs
  const addLog = (message) => {
    const newLog = {
      message,
      timestamp: new Date().toISOString(),
    };
    setLogs((prevLogs) => [...prevLogs, newLog]);
  };

  // Function to save all logs to the database after flow completion
  const saveLogGroup = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/log-group`, { logs });
      console.log('Log group saved:', response.data);
    } catch (error) {
      console.error('Error saving log group:', error);
    }
  };

  const handleRenewal = async () => {
    try {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      setShowRenewalPrompt(false);
      setRenewed(true);
      addLog('User manually renewed subscription!');
      addLog('Thank you for renewing!');
      if (currentStep === 0 || currentStep === 1) {
        setCurrentStep(2);
      } else {
        setFlowComplete(true);
      }
      setWaitingForAutoCheck(false);
    } catch (error) {
      console.error('Error handling renewal:', error);
    }
  };

  const handleDecline = async () => {
    try {
      setShowRenewalPrompt(false);
      if (renewalAttempt === 0) {
        addLog('User declined first reminder');
        setCurrentStep(2);
      } else {
        addLog('User declined second reminder. Flow completed.');
        setFlowComplete(true);
      }
    } catch (error) {
      console.error('Error handling decline:', error);
    }
  };

  const startWaitingTimer = () => {
    setWaitingForAutoCheck(true);
    const newTimeoutId = setTimeout(async () => {
      try {
        if (renewalAttempt === 0) {
          addLog('No response after first reminder, assuming decline.');
          setCurrentStep(2);
        } else {
          addLog('No response after second reminder, assuming decline. Flow completed.');
          setFlowComplete(true);
        }
        setWaitingForAutoCheck(false);
      } catch (error) {
        console.error('Error in waiting timer:', error);
      }
    }, WAITING_TIME);
    setTimeoutId(newTimeoutId);
  };

  const resetFlow = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setCurrentStep(0);
    setLogs([]);
    setFlowComplete(false);
    setRenewed(false);
    setIsRunning(false);
    setShowRenewalPrompt(false);
    setRenewalAttempt(0);
    setWaitingForAutoCheck(false);
    setTimeoutId(null);
  };

  useEffect(() => {
    if (flowComplete) {
      saveLogGroup(); // Save logs when flow is complete
    }
  }, [flowComplete]);

  useEffect(() => {
    let timer;
    if (isRunning && !flowComplete) {
      timer = setTimeout(async () => {
        try {
          switch (currentStep) {
            case 0: // Initial reminder
              addLog('Sending initial renewal reminder email...');
              setShowRenewalPrompt(true);
              setRenewalAttempt(0);
              setCurrentStep(1);
              startWaitingTimer();
              break;
            case 2: // Second reminder
              addLog('Sending second reminder email...');
              setShowRenewalPrompt(true);
              setRenewalAttempt(1);
              setCurrentStep(3);
              startWaitingTimer();
              break;
          }
        } catch (error) {
          console.error('Error in simulation flow:', error);
        }
      }, SIMULATION_STEP_TIME);
    }

    return () => {
      clearTimeout(timer);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentStep, isRunning, flowComplete]);

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title>Subscription Renewal Flow</Card.Title>
        </Card.Header>
        <Card.Content>
          <FlowVisualization currentStep={currentStep} />
          <UserInbox
            showRenewalPrompt={showRenewalPrompt}
            handleRenewal={handleRenewal}
            handleDecline={handleDecline}
            renewalAttempt={renewalAttempt}
            waitingForAutoCheck={waitingForAutoCheck}
          />
          <LogViewer logs={logs} />
          <div className="mt-4 flex gap-4">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              className={isRunning ? 'bg-red-600' : 'bg-blue-600'}
            >
              {renewed
                ? 'Stop Simulation'
                : isRunning
                ? 'Pause Simulation'
                : 'Start Simulation'}
            </Button>
            {flowComplete && (
              <Button variant="outline" onClick={resetFlow}>
                Reset
              </Button>
            )}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default FlowSimulation;
