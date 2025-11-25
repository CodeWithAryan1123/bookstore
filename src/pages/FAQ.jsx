import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      category: "Orders & Payment",
      questions: [
        {
          question: "How do I place an order?",
          answer: "Browse our collection, add books to your cart, and proceed to checkout. You can pay securely using credit card, debit card, or PayPal."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and digital wallets like Apple Pay and Google Pay."
        },
        {
          question: "Can I modify or cancel my order?",
          answer: "You can modify or cancel your order within 1 hour of placing it. After that, the order enters processing and cannot be changed. Contact our support team for assistance."
        },
        {
          question: "Do you offer gift cards?",
          answer: "Yes! We offer digital gift cards in various denominations. They can be purchased on our website and sent directly to the recipient's email."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 5-7 business days. Express shipping delivers in 2-3 business days. International orders may take 10-15 business days."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes! We ship to over 100 countries worldwide. International shipping rates and delivery times vary by location."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order from your account dashboard."
        },
        {
          question: "What if my package is lost or damaged?",
          answer: "If your package doesn't arrive or arrives damaged, contact us immediately. We'll work with the carrier and arrange a replacement or refund."
        }
      ]
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for unopened books in original condition. E-books and digital content are non-refundable once downloaded."
        },
        {
          question: "How do I return a book?",
          answer: "Contact our support team to initiate a return. We'll provide a return label and instructions. Refunds are processed within 5-7 business days of receiving the return."
        },
        {
          question: "Can I exchange a book?",
          answer: "Yes! If you'd like to exchange a book for another title, contact us. We'll arrange the exchange at no additional shipping cost."
        },
        {
          question: "What if I receive the wrong book?",
          answer: "We sincerely apologize! Contact us immediately and we'll send the correct book at no charge and arrange pickup of the incorrect item."
        }
      ]
    },
    {
      category: "Account & Privacy",
      questions: [
        {
          question: "Do I need an account to make a purchase?",
          answer: "No, you can checkout as a guest. However, creating an account lets you track orders, save favorites, and access exclusive offers."
        },
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page. Enter your email address and we'll send you a password reset link."
        },
        {
          question: "Is my personal information secure?",
          answer: "Absolutely. We use industry-standard SSL encryption to protect your data. We never share your information with third parties without consent."
        },
        {
          question: "How do I delete my account?",
          answer: "You can delete your account from your account settings, or contact our support team for assistance. Note that this action is permanent."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our bookstore</p>
        </div>
      </div>

      <div className="faq-content">
        <div className="container">
          <div className="faq-search">
            <input type="text" placeholder="Search for answers..." />
            <button className="search-btn">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div className="faq-categories">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="faq-category">
                <h2 className="category-title">
                  <i className="fa-solid fa-circle-question"></i>
                  {category.category}
                </h2>
                <div className="faq-items">
                  {category.questions.map((item, questionIndex) => {
                    const index = `${categoryIndex}-${questionIndex}`;
                    const isActive = activeIndex === index;
                    return (
                      <div
                        key={questionIndex}
                        className={`faq-item ${isActive ? 'active' : ''}`}
                      >
                        <button
                          className="faq-question"
                          onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        >
                          <span>{item.question}</span>
                          <i className={`fa-solid fa-chevron-${isActive ? 'up' : 'down'}`}></i>
                        </button>
                        <div className={`faq-answer ${isActive ? 'show' : ''}`}>
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="faq-contact">
            <h3>Still have questions?</h3>
            <p>Can't find the answer you're looking for? Our customer support team is here to help.</p>
            <a href="/contact" className="btn btn-primary">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
