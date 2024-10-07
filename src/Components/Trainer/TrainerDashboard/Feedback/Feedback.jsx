import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import './Feedback.css';
import { UserContext } from '../../../../Context/UserContext';

const Feedback = () => {
  const [submissions, setSubmissions] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(''); // Unified state for success and error messages
  const [messageType, setMessageType] = useState(''); // To track if it's success or error
  const [submitting, setSubmitting] = useState({});
  const [ratings, setRatings] = useState({}); // State for ratings

  let { userId } = useContext(UserContext);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('https://localhost:7107/api/Submission');
        setSubmissions(response.data.data);
      } catch (error) {
        setMessage('Error fetching submissions.');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const handleFeedbackChange = useCallback((submissionId, feedback) => {
    setFeedbacks(prevFeedbacks => ({
      ...prevFeedbacks,
      [submissionId]: feedback,
    }));
  }, []);

  const handleRatingChange = useCallback((submissionId, rating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [submissionId]: rating,
    }));
  }, []);

  const handleFeedbackSubmit = useCallback(async (submissionId) => {
    setSubmitting(prevSubmitting => ({ ...prevSubmitting, [submissionId]: true }));
    setMessage(''); // Clear previous message
    setMessageType('');

    const feedback = feedbacks[submissionId] || '';
    const rating = ratings[submissionId] || 0;
    const submissionDetails = submissions.find(sub => sub.id === submissionId);

    const payload = {
      comment: feedback,
      rating: rating,
      trainerId: userId,
      submissionId: submissionDetails.id,
    };

    try {
      await axios.post(`https://localhost:7107/api/Feedback`, payload);
      setMessage(`Feedback for submission ${submissionId} submitted successfully!`);
      setMessageType('success');
    } catch (error) {
      setMessage(`Error submitting feedback for submission ${submissionId}: ${error.response ? error.response.data : error.message}`);
      setMessageType('error');
    } finally {
      setSubmitting(prevSubmitting => ({ ...prevSubmitting, [submissionId]: false }));
    }
  }, [feedbacks, ratings, submissions, userId]);

  return (
    <div className="feedback-management">
      <h2>Provide Feedback</h2>

      {loading ? (
        <p>Loading submissions...</p>
      ) : messageType === 'error' ? (
        <p className="error-message">{message}</p>
      ) : (
        <>
          <ul>
            {submissions.map(submission => (
              <li key={submission.id} className="submission-item">
                <div className="submission-info">
                  <strong>{submission.studentName}</strong> - <a href={submission.filePath} target="_blank" rel="noopener noreferrer">View Submission</a>
                  <p>Submitted At: {submission.submittedAt}</p>
                </div>

                {/* Only show the feedback form if the submission doesn't already have feedback */}
                {submission.feedback ? (
                  <p className="feedback-exists">Feedback already provided: {submission.feedback.comment}</p>
                ) : (
                  <>
                    <textarea
                      value={feedbacks[submission.id] || ''}
                      onChange={(e) => handleFeedbackChange(submission.id, e.target.value)}
                      placeholder="Write feedback"
                      disabled={submitting[submission.id]}
                    />
                    <input
                      type="number"
                      placeholder="Rating (0-10)"
                      value={ratings[submission.id] || ''}
                      onChange={(e) => handleRatingChange(submission.id, parseInt(e.target.value))}
                      min="0"
                      max="10"
                      disabled={submitting[submission.id]}
                    />
                    <button 
                      onClick={() => handleFeedbackSubmit(submission.id)} 
                      disabled={submitting[submission.id] || !feedbacks[submission.id] || !ratings[submission.id]} // Disable if no feedback or rating
                    >
                      {submitting[submission.id] ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* Conditionally render success or error message */}
          {messageType === 'success' && <p className="success-message">{message}</p>}
        </>
      )}
    </div>
  );
};

export default Feedback;
