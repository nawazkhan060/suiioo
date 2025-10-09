// src/pages/CallForPapers.jsx (or wherever your pages/components live)
import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router. For Next.js, use `next/link`

const CallForPapers = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Call for Papers
          </h1>
          <p className="text-gray-600">
            International Journal of Engineering Practices and Applications (IJEPA)
          </p>
        </div>

        {/* Content Cards */}
        <div className="space-y-6">
          {/* Introduction */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="mb-3">
              The <strong>International Journal of Engineering Practices and Applications (IJEPA)</strong> invites researchers, academicians, industry professionals, and practitioners from around the world to submit their original research articles, review papers, case studies, and technical notes for publication in our upcoming issues.
            </p>
            <p>
              IJEPA provides an international platform for disseminating cutting-edge research and innovative practices in all fields of engineering and technology. We aim to bridge the gap between theoretical advances and practical applications, encouraging interdisciplinary contributions that address real-world challenges.
            </p>
          </div>

          {/* Scope */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Scope of the Journal</h2>
            <p className="mb-3 text-gray-700">Topics of interest include (but are not limited to):</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Civil, Mechanical, Electrical, and Electronics Engineering</li>
              <li>Computer Science, Artificial Intelligence, and Information Technology</li>
              <li>Industrial and Manufacturing Engineering</li>
              <li>Materials Science and Engineering Applications</li>
              <li>Communication, Signal Processing, and Control Systems</li>
              <li>Renewable Energy, Green Technologies, and Sustainable Engineering</li>
              <li>Emerging Trends and Interdisciplinary Engineering Practices</li>
            </ul>
          </div>

          {/* Why Publish */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Why Publish with IJEPA?</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Peer-reviewed and high-quality publications',
                'Open access for global visibility and readership',
                'Rapid and transparent review process',
                'International editorial and reviewer panel',
                'Opportunities for academic recognition and collaboration'
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Submission Guidelines */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Submission Guidelines</h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                • Authors are requested to submit their manuscripts in accordance with the journal’s formatting guidelines, available on the{' '}
                <Link to="/author-guidelines" className="text-blue-500 hover:underline">
                  Author Guidelines
                </Link>{' '}
                page.
              </li>
              <li>• Submissions should be original, unpublished, and not under consideration elsewhere.</li>
              <li>
                • Manuscripts can be submitted online via our{' '}
                <Link to="/submit" className="text-blue-500 hover:underline">
                  Online Submission System
                </Link>{' '}
                or by email to{' '}
                <a href="mailto:editor@ijepa.org" className="text-blue-500 hover:underline">
                  editor@ijepa.org
                </a>
                .
              </li>
            </ul>
          </div>

          {/* Important Dates */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Important Dates</h2>
            <div className="space-y-3">
              {[
                ['Manuscript Submission Deadline', '20/12/2024'],
                ['Notification of Acceptance', '[Insert Date]'],
                ['Final Camera-Ready Paper Due', '[Insert Date]'],
                ['Publication Date', '[Insert Date]']
              ].map(([label, date], i) => (
                <div key={i} className="flex flex-wrap justify-between border-b pb-2 last:border-0 last:pb-0">
                  <span>{label}</span>
                  <span className="font-medium">{date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <Link
              to="/submit"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Submit Your Manuscript
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} International Journal of Engineering Practices and Applications (IJEPA). All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default CallForPapers;