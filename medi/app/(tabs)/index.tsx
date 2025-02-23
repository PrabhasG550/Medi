import { useState } from 'react';
import StartupAnimation from '../screens/StartupAnimation';
import RegistrationScreen from '../screens/RegistrationScreen';
import EmailScreen from '../screens/EmailScreen';
import AllDoneScreen from '../screens/AllDoneScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import JournalScreen from '../screens/JournalScreen';

type ScreenType = 'startup' | 'registration' | 'email' | 'allDone' | 'welcome' | 'home' | 'journal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('startup');

  const screenMap = {
    startup: <StartupAnimation onComplete={() => setCurrentScreen('registration')} />,
    registration: <RegistrationScreen onComplete={() => setCurrentScreen('email')} />,
    email: <EmailScreen 
      onComplete={() => setCurrentScreen('allDone')}
      onSkip={() => setCurrentScreen('allDone')}
    />,
    allDone: <AllDoneScreen onComplete={() => setCurrentScreen('welcome')} />,
    welcome: <WelcomeScreen onComplete={() => setCurrentScreen('home')} />,
    home: <HomeScreen
      onNavigateToJournal={() => setCurrentScreen('journal')}  
    />,
    journal: <JournalScreen onBack={() => setCurrentScreen('home')} />,
  };

  return screenMap[currentScreen];
}