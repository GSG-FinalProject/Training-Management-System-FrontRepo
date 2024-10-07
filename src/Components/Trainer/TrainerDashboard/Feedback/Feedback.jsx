import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Feedback.css';

const Feedback = () => {
  const [submissions, setSubmissions] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State to hold success message
  const [submitting, setSubmitting] = useState({});

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('https://localhost:7107/api/Submission');
        setSubmissions(response.data.data);
      } catch (error) {
        setError('Error fetching submissions.');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  // const handleFeedbackChange = useCallback((submissionId, feedback) => {
  //   setFeedbacks(prevFeedbacks => ({
  //     ...prevFeedbacks,
  //     [submissionId]: feedback,
  //   }));
  // }, []);

  // const handleFeedbackSubmit = useCallback(async (submissionId) => {
  //   setSubmitting(prevSubmitting => ({ ...prevSubmitting, [submissionId]: true }));
  //   setError('');
  //   setSuccessMessage(''); // Clear any previous success message

  //   const feedback = feedbacks[submissionId] || '';

  //   try {
  //     await axios.post(`/api/tasks/:taskId/feedback`, { feedback, submissionId });
  //     setSuccessMessage(`Feedback for submission ${submissionId} submitted successfully!`);
  //   } catch (error) {
  //     setError(`Error submitting feedback for submission ${submissionId}.`);
  //   } finally {
  //     setSubmitting(prevSubmitting => ({ ...prevSubmitting, [submissionId]: false }));
  //   }
  // }, [feedbacks]);

  return (
    <div className="feedback-management">
      <h2>Provide Feedback</h2>

      {loading ? (
        <p>Loading submissions...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <ul>
            {submissions.map(submission => (
              <li key={submission.id} className="submission-item">
                <div className="submission-info">
                  <strong>{submission.studentName}</strong> - <a href={submission.link} target="_blank" rel="noopener noreferrer">View Submission</a>
                </div>
                <textarea
                  value={feedbacks[submission.id] || ''}
                  onChange={(e) => handleFeedbackChange(submission.id, e.target.value)}
                  placeholder="Write feedback"
                  disabled={submitting[submission.id]}
                />
                <button 
                  onClick={() => handleFeedbackSubmit(submission.id)} 
                  disabled={submitting[submission.id]} 
                >
                  {submitting[submission.id] ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </li>
            ))}
          </ul>

          {/* Conditionally render success or error message */}
          {successMessage && <p className="success-message">{successMessage}</p>}
          {error && <p className="error-message">{error}</p>}
        </>
      )}
    </div>
  );
};

export default Feedback;
