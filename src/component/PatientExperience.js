import React, { useState} from 'react';
import '../CSS/PatientExperience.css';
import video1 from '../assets/Videos/video1.mp4'

const PatientExperience = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

 
  const testimonials = [
    {
      id: 1,
      name: 'Shyam Singhal',
      content: 'One of the top hospitals in Pune. The staff, daycare team, dialysis, and billing department all provided exceptional service. Nurses, doctors, and administrators are extremely polite, down to earth, and always helpful.',
      rating: 5
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      content: 'Excellent healthcare facility with state-of-the-art equipment. The doctors are highly skilled and the staff is very caring and supportive.',
      rating: 5
    },
    {
      id: 3,
      name: 'Priya Sharma',
      content: 'Outstanding experience at Sahyadri Hospital. The medical team is professional and the facilities are world-class.',
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <span key={index} className="star">⭐</span>
    ));
  };

  return (
    <section className="patient-experience">
      <div className="experience-container">
        <div className="video-section">
          <h2>Patient Experience Stories</h2>
          <p>Hear directly from those we've treated at Sahyadri Hospitals</p>
          
          <div className="video-container">
          <video 
          
            src={video1} 
            controls 
            className="patient-video"
            poster="/path/to/your/poster.jpg"
            onPlay={(e) => e.currentTarget.play()}  // Ensures it plays only when triggered by user
          >
            Your browser does not support the video tag.
          </video>

            
            <div className="video-navigation">
              <button className="nav-btn prev" onClick={() => setActiveVideoIndex(prev => prev > 0 ? prev - 1 : 4)}>❮</button>
              <div className="video-dots">
                {[...Array(5)].map((_, index) => (
                  <button 
                    key={index}
                    className={`dot ${activeVideoIndex === index ? 'active' : ''}`}
                    onClick={() => setActiveVideoIndex(index)}
                  />
                ))}
              </div>
              <button className="nav-btn next" onClick={() => setActiveVideoIndex(prev => prev < 4 ? prev + 1 : 0)}>❯</button>
            </div>
          </div>
        </div>

        <div className="testimonials-section">
          <h2>Patient Speaks</h2>
          <p>Real Stories of Hope and Healing from Our Patients</p>
          
          <div className="testimonials-slider">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`testimonial ${index === activeTestimonialIndex ? 'active' : ''}`}
              >
                <h3>{testimonial.name}</h3>
                <p>{testimonial.content}</p>
                <div className="rating">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            ))}
            
            <div className="testimonial-navigation">
              <button className="nav-btn prev" onClick={() => setActiveTestimonialIndex(prev => prev > 0 ? prev - 1 : testimonials.length - 1)}>❮</button>
              <div className="testimonial-dots">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    className={`dot ${activeTestimonialIndex === index ? 'active' : ''}`}
                    onClick={() => setActiveTestimonialIndex(index)}
                  />
                ))}
              </div>
              <button className="nav-btn next" onClick={() => setActiveTestimonialIndex(prev => prev < testimonials.length - 1 ? prev + 1 : 0)}>❯</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientExperience;
