import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>Nice Thats it for today</h1>
      <p>We have all your responses and is being analyzed for diagnosis, which you will receive on your whatsapp number</p>
      <p>Activate your Whatsapp number </p>
      <p>To get all diagnostic report message following OTP "5678" to No. "91-9016315937"</p>
      <p>From hereon all procedures will be performed through Whatsapp for your convinece adn privacy purposes</p>
    </div>
  );
}

export default HeroSection;
