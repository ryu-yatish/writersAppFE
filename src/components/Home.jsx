import React, { useEffect } from "react";
import "./Home.css";
import { ping } from "./services/miscService";

const Home = () => {
  useEffect(() => {
    handlePing();
  }, []);  
  const handlePing = async () => {
    try {
      await ping();
      
    } catch (error) {
      console.error("Error occurred while fetching books:", error);
    }
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to WriteFlow</h1>
          <p>Unleash your creativity, with everything you need at your fingertips turn your words into magic.</p>
          <button className="cta-button" onClick={()=>{window.location.href = '/login'}}>Join the Community</button>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>Why WriteFlow?</h2>
        <p>WriteFlow is the ultimate platform for writers to collect your thoughts, organize them, and Just write. Whether you're a fiction, history, or even smut, we provide the tools you need to excel.</p>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Fully customizable database system</h3>
            <p>Keep a track of all your story components on the go</p>
          </div>
          <div className="feature-item">
            <h3>powerful writing tools</h3>
            <p>A full fledged text editerin a style perfect for distraction free writing</p>
          </div>
          <div className="feature-item">
            <h3>Ask GPT</h3>
            <p>stuck somewhere? gpt has access to your entire book the moment you save anything, so ask away.</p>
          </div>
          <div className="feature-item">
            <h3>(upcoming)Idea board</h3>
            <p>A seemless ideation board, fill it with pictures, notes, make it your own murder board with pins and threads</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Writers Say(this is fake for now)</h2>
        <div className="testimonials-grid">
          <div className="testimonial-item">
            <p>"WriteFlow transformed the way I collaborate with other authors. It's a must for any writer!"</p>
            <span>- Alex J.</span>
          </div>
          <div className="testimonial-item">
            <p>"I found my voice here, and the challenges helped me finish my first novel!"</p>
            <span>- Sarah M.</span>
          </div>
          <div className="testimonial-item">
            <p>"The community here is incredible. There's so much support and inspiration."</p>
            <span>- Daniel K.</span>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 WriteFlow | Where words meet inspiration</p>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </>
  );
};

export default Home;
