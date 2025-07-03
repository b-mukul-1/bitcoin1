// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ConnectWallet from "./components/ConnectWallet";
import LoanForm from "./components/LoanForm";
import LoanDashboard from "./components/LoanDashboard";
import Footer from "./components/Footer";
import AboutSection from "./components/AboutSection";
import "./styles.css";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [loans, setLoans] = useState([]);
  const [theme, setTheme] = useState("dark"); // Default to dark
  const [showAbout, setShowAbout] = useState(false);

  // Toggle light/dark theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Toggle About section
  const toggleAbout = () => {
    setShowAbout((prev) => !prev);
  };

  // Handle wallet connection
  const connectWallet = (principal) => {
    setWalletAddress(principal.toText());
  };

  // Handle wallet disconnect
  const disconnectWallet = () => {
    setWalletAddress(null);
  };

  // Handle new loan
  const handleNewLoan = (loan) => {
    const newLoan = {
      ...loan,
      id: Date.now(),
      owner: walletAddress,
    };
    setLoans([...loans, newLoan]);
  };

  // Handle loan repayment
  const handleRepayLoan = (loanId) => {
    const updatedLoans = loans.filter((loan) => loan.id !== loanId);
    setLoans(updatedLoans);
  };

  return (
    <div className={`App ${theme}`}>
      <Header
        toggleTheme={toggleTheme}
        theme={theme}
        onAboutClick={toggleAbout}
      />

      {showAbout && (
        <div className="about-overlay">
          <AboutSection onClose={toggleAbout} />
        </div>
      )}

      <div className="container">
        <HeroSection />

        <ConnectWallet
          walletAddress={walletAddress}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
        />

        {walletAddress ? (
          <>
            <LoanForm onSubmitLoan={handleNewLoan} />
            <LoanDashboard loans={loans} onRepayLoan={handleRepayLoan} />
          </>
        ) : (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            Please connect your Plug Wallet to access loan features.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
