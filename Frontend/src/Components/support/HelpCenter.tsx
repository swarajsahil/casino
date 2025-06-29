import { Link } from "react-router-dom";

const HelpCenter = () => {
  return (
    <section className="max-w-4xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold mb-4">Help Center</h2>
      <p className="text-gray-600 mb-6">
        Welcome to the Help Center. Browse FAQs or reach out to our team for assistance.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/faq"className="bg-gray-200 text-black px-6 py-2 rounded-xl hover:bg-gray-700 transition">
          View FAQs</Link>
        {/* <a href="#faq" className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
          View FAQs
        </a> */}
        <Link to="/contact"className="bg-gray-200 text-black px-6 py-2 rounded-xl hover:bg-gray-700 transition">
          Contact Support</Link>
      </div>
    </section>
  );
};

export default HelpCenter;