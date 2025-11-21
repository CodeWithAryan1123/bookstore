import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  const stats = [
    { icon: 'fa-book', number: '10,000+', label: 'Books Available' },
    { icon: 'fa-users', number: '50,000+', label: 'Happy Customers' },
    { icon: 'fa-trophy', number: '500+', label: 'Bestsellers' },
    { icon: 'fa-star', number: '4.9', label: 'Average Rating' }
  ];

  const values = [
    {
      icon: 'fa-heart',
      title: 'Passion for Books',
      description: 'We love books and believe in their power to inspire, educate, and transform lives.'
    },
    {
      icon: 'fa-shield-halved',
      title: 'Quality Guaranteed',
      description: 'Every book we sell is authentic and carefully inspected to ensure the highest quality.'
    },
    {
      icon: 'fa-handshake',
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We provide excellent service and support at every step.'
    },
    {
      icon: 'fa-leaf',
      title: 'Sustainability',
      description: 'We are committed to eco-friendly practices and supporting sustainable publishing.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Book lover with 15 years in publishing industry'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Curation',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Expert in literary collections and rare books'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Customer Experience',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bio: 'Dedicated to making every customer happy'
    },
    {
      name: 'David Kumar',
      role: 'Technology Lead',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      bio: 'Building the future of online book shopping'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="about-hero-title">
              Once Upon A <span className="gradient-text">Bookshelf</span>
            </h1>
            <p className="about-hero-subtitle">
              Your gateway to a world of stories, knowledge, and imagination
            </p>
            <p className="about-hero-text">
              We believe that every book has the power to transport you to different worlds, 
              teach you new perspectives, and inspire you to dream bigger. Since our founding, 
              we've been dedicated to making quality books accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  <i className={`fa-solid ${stat.icon}`}></i>
                </div>
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2 className="section-title">Our Story</h2>
              <p>
                Once Upon A Bookshelf was born from a simple idea: to create a space where book lovers 
                could discover their next great read. What started as a small collection has grown into 
                a curated library of over 10,000 titles spanning every genre imaginable.
              </p>
              <p>
                We're more than just a bookstore. We're a community of readers, dreamers, and thinkers 
                who believe in the transformative power of literature. Every book we select is chosen 
                with care, ensuring that our collection reflects diverse voices and perspectives.
              </p>
              <p>
                Today, we serve thousands of happy readers across India, delivering not just books, 
                but experiences. Whether you're looking for the latest bestseller or a hidden gem, 
                we're here to help you find your perfect read.
              </p>
            </div>
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800" 
                alt="Bookstore" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <p className="section-subtitle">The principles that guide everything we do</p>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  <i className={`fa-solid ${value.icon}`}></i>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">The passionate people behind Once Upon A Bookshelf</p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Reading Journey?</h2>
            <p>Explore our collection of handpicked books and find your next favorite read</p>
            <div className="cta-buttons">
              <Link to="/books" className="btn btn-primary btn-large">
                Browse Books
              </Link>
              <Link to="/bestsellers" className="btn btn-outline btn-large">
                View Bestsellers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
