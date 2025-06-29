import { FaShieldAlt, FaGem, FaCoins, FaHandshake, FaMobileAlt } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[url('https://images.unsplash.com/photo-1596838132731-3301c3fd4317')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-yellow-400">
            ABOUT <span className="text-white">ROYAL SPIN CASINO</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto">
            Where premium gaming meets unparalleled rewards since 2010
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <section className="mb-20">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-yellow-400 border-b-2 border-yellow-400 pb-2 inline-block">
                Our Story
              </h2>
              <p className="text-lg mb-4">
                Founded in 2010, Royal Spin Casino emerged from a simple vision: to create the most thrilling and secure online gaming experience in the industry. What began as a small startup has grown into a global phenomenon, serving millions of players across 50+ countries.
              </p>
              <p className="text-lg mb-4">
                Our journey has been marked by innovation, from being among the first to implement live dealer games in 2012 to pioneering cryptocurrency payments in 2018.
              </p>
              <p className="text-lg">
                Today, we're proud to be licensed and regulated by the Malta Gaming Authority (MGA) and UK Gambling Commission, offering 2000+ games from top providers like NetEnt, Microgaming, and Evolution Gaming.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-800 p-1 rounded-lg shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1517232115160-ff93364542dd?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Casino interior" 
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-yellow-400">
            Why Players Choose Royal Spin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaShieldAlt className="text-4xl mb-4 text-yellow-400" />,
                title: "Security First",
                desc: "256-bit SSL encryption, regular audits, and strict compliance with international gaming regulations."
              },
              {
                icon: <FaGem className="text-4xl mb-4 text-yellow-400" />,
                title: "Premium Games",
                desc: "2000+ games including exclusive slots, live dealer tables, and progressive jackpots."
              },
              {
                icon: <FaCoins className="text-4xl mb-4 text-yellow-400" />,
                title: "Fast Payouts",
                desc: "97% of withdrawals processed within 2 hours. 50+ payment methods supported."
              },
              {
                icon: <FaHandshake className="text-4xl mb-4 text-yellow-400" />,
                title: "Fair Play",
                desc: "Certified RNG systems with 98-99% RTP on slots. Regular fairness audits."
              },
              {
                icon: <FaMobileAlt className="text-4xl mb-4 text-yellow-400" />,
                title: "Mobile Optimized",
                desc: "Seamless experience across all devices. No download required."
              },
              {
                icon: <FaCoins className="text-4xl mb-4 text-yellow-400" />,
                title: "Generous Bonuses",
                desc: "Welcome package up to €/$2000 + 200 free spins. Weekly reload bonuses."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition duration-300 h-full">
                <div className="text-center">
                  {feature.icon}
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-yellow-400">
            Meet Our Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alexander Volkov",
                title: "CEO & Founder",
                bio: "20+ years in gaming industry. Former executive at major software provider.",
                img: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Sophia Chen",
                title: "Head of Security",
                bio: "Cybersecurity expert with specialization in financial systems protection.",
                img: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Marcus Johnson",
                title: "Game Operations Director",
                bio: "Oversees our portfolio of 2000+ games from 50+ providers.",
                img: "https://randomuser.me/api/portraits/men/75.jpg"
              }
            ].map((member, index) => (
              <div key={index} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-yellow-400 mb-3">{member.title}</p>
                  <p className="text-gray-300">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-800 rounded-xl p-8 mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-yellow-400">
            By The Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "10M+", label: "Players Worldwide" },
              { number: "2000+", label: "Games Available" },
              { number: "24/7", label: "Customer Support" },
              { number: "98%", label: "Payout Rate" }
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <p className="text-4xl font-bold text-yellow-400 mb-2">{stat.number}</p>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">
            Ready to Experience Premium Gaming?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join over 10 million players who trust Royal Spin Casino for their online gaming experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-lg transition duration-300">
              Join Now - Get 200% Bonus
            </button>
            <button className="bg-transparent hover:bg-gray-700 text-white font-bold py-3 px-8 border-2 border-yellow-400 rounded-lg transition duration-300">
              Explore Games
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;