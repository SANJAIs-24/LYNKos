import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';

const App = () => {
  const [view, setView] = useState('welcome');
  const [user, setUser] = useState(null);

  if (user) {
    return <div>Welcome, {user.username}!</div>;
  }

  return (
    <div>
      {view === 'welcome' && (
        <>
          <h1>Welcome to HyperDesk</h1>
          <button onClick={() => setView('login')}>Login</button>
          <button onClick={() => setView('signup')}>Sign Up</button>
        </>
      )}
      {view === 'login' && (
        <>
          <LoginForm onLoginSuccess={setUser} />
          <button onClick={() => setView('forgot')}>Forgot Password?</button>
          <button onClick={() => setView('welcome')}>Back</button>
        </>
      )}
      {view === 'signup' && (
        <>
          <SignupForm />
          <button onClick={() => setView('welcome')}>Back</button>
        </>
      )}
      {view === 'forgot' && (
        <>
          <ForgotPasswordForm />
          <button onClick={() => setView('login')}>Back to Login</button>
        </>
      )}
    </div>
  );
};

export default App;
