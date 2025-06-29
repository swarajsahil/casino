

const Legal = () => {
  return (
    <>
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Terms & Conditions</h2>
      <p className="text-gray-700 mb-4">
        By accessing or using our platform, you agree to be bound by these Terms & Conditions.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        <li>You must be at least 18 years old to use our services.</li>
        <li>All content is protected by copyright laws.</li>
        <li>Misuse of our platform may result in suspension or termination.</li>
        <li>We reserve the right to update terms at any time without prior notice.</li>
      </ul>
    </section>
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Privacy Policy</h2>
      <p className="text-gray-700 mb-4">
        Your privacy is important to us. This policy explains how we collect and use your data.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        <li>We collect data such as your name, email, and usage behavior.</li>
        <li>We do not sell your personal information to third parties.</li>
        <li>Cookies are used to improve your experience on our platform.</li>
        <li>You may request deletion of your data at any time.</li>
      </ul>
    </section>
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Responsible Gaming</h2>
      <p className="text-gray-700 mb-4">
        We are committed to promoting responsible gaming and providing a safe environment.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        <li>Always play within your financial limits and for entertainment.</li>
        <li>Take regular breaks and avoid chasing losses.</li>
        <li>We provide tools for self-exclusion and setting limits.</li>
        <li>If you feel gaming is affecting your life, seek professional help.</li>
      </ul>
      <p className="text-gray-600 mt-4">
        If you or someone you know is struggling with gambling, visit{' '}
        <a href="https://www.begambleaware.org" target="_blank" className="text-blue-600 underline">
          BeGambleAware.org
        </a>.
      </p>
    </section>
     
    </>
  )
}

export default Legal
