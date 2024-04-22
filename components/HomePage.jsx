import React, { useEffect } from "react";
import confetti from 'canvas-confetti';
import ErrorTrigger from './ErrorTrigger';
import { Link, useLocation } from 'react-router-dom';
import styles from '../componentStyles/HomePage.module.css'

const HomePage = () => {
  // Get the current location
  const location = useLocation();

  useEffect(() => {
    // Trigger confetti effect when the component mounts
    confetti({
      particleCount: 1000,
      spread: 120,
      origin: { x: 0.5, y: 0.5 },
      decay: 0.9 
    });

    // Cleanup function to stop the confetti effect when the component unmounts or navigates away
    return () => {
      confetti.reset(); // Clear any existing confetti
    };
  }, []); // Only run this effect once when the component mounts

  useEffect(() => {
    // Stop the confetti effect when the user navigates away from the page
    return () => {
      confetti.reset(); // Clear any existing confetti
    };
  }, [location]); // Run this effect whenever the location changes

  return (
    <main>
      <section className={styles.side1}>
      <header className={styles.homeheader}>
        <h1 className={styles.username}>Edikan Odokwo</h1>
        <h3 className={styles.userInfo}>A Software Developer</h3>
      </header>
      <section>
        <p style={{fontSize:'1.2rem', margin:'50px 0 50px 0'}}>
          <span className={styles['span-tag']}>I build exceptional and accessible digital</span> interfaces
        </p>
        
      </section>

    <footer> 
    <Link to="/repos">
          <button className={styles.homebtns}>View Repositories</button>
        </Link>
      <ErrorTrigger
      className={styles.homebtns}
      />
      </footer>
      </section>
      <section className={styles.side2}>
        <figure><img src="/Profile pic.jpeg" alt="my image" />
        </figure>
      </section>
    </main>
  );
};

export default HomePage;
