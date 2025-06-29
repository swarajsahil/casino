'use client';
import { useState } from 'react';

const faqs = [
  {
    question: "How can I reset my password?",
    answer: "Go to settings > security > reset password. Follow the instructions there.",
  },
  {
    question: "Where can I see my billing history?",
    answer: "Billing history is available under your profile > billing > history.",
  },
  {
    question: "How do I contact support?",
    answer: "You can use the Contact Us form above or email us directly at support@example.com.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="max-w-3xl mx-auto p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-xl p-4">
            <button
              onClick={() => toggle(index)}
              className="flex justify-between w-full text-left font-medium text-gray-800"
            >
              <span>{faq.question}</span>
              <span>{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;