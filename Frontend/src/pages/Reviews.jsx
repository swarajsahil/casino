import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReviews, approveReview, deleteReview } from "../common/reviewSlice";
import {  Table, Form } from "react-bootstrap";

const Review = () => {
  const dispatch = useDispatch();
  const { allReviews, loading } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  const handleApprove = (id) => {
    if (window.confirm("Are you sure you want to approve this Review?")) {
    dispatch(approveReview(id)).then(() => dispatch(fetchAllReviews()));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Review?")) {
    dispatch(deleteReview(id));
    }
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User</th>
              <th>Review</th>
              <th>Casino</th>
              <th>Rating</th>
              <th>Tags</th>
              <th>Approved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allReviews.map((review) => (
              <tr key={review._id}>
                <td>{review.user?.username || "Unknown"}</td>
                <td>{review.review?.content || "No review"}</td>
                <td>{review.review?.casino || "N/A"}</td>
                <td>{review.review?.rating || "N/A"}</td>
                <td>
                  {review.review?.tags.map((tag, index) => (
                    <span key={index} className={`badge bg-${tag.type === "positive" ? "success" : tag.type === "negative" ? "danger" : "secondary"} me-1`}>
                      {tag.text}
                    </span>
                  ))}
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={review.approved}
                    onChange={() => handleApprove(review._id)}
                    disabled={review.approved} // Disable if already approved
                  />
                </td>
                <td>
                  <button className="flex justify-center text-red-800 w-12" onClick={() => handleDelete(review._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Review;