import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add_r } from '../redux/action';
import { useNavigate } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import questionsData from '../components/test.json';
import { useSelector } from 'react-redux';
import { resetData } from '../redux/action'; 

const questions = questionsData.questions;

const RatingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isDiagnosed, setIsDiagnosed] = useState(false);
  const handleRatingChange = (question, rating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [question]: rating
    }));
    setIsDiagnosed(true);
  };

  
  const handleNext = () => {
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
    setIsDiagnosed(false);
  };


  const data1 = useSelector(state => state.reducera.questionResponses);
  let dataArray = data1.map((qr) => qr.response);
  console.log(dataArray)
if(dataArray.length === 10)
{
  const mobileNumber = localStorage.getItem('mobile');
    // Construct the data object
    try {
      console.log(mobileNumber)
     //console.log(dataArray)
      const response = fetch('https://gt-7tqn.onrender.com/api/auth/AT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber, dataArray }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to store data in the server');
      }
    }
    catch (error) {
      throw new Error('Error storing data in the server: ' + error.message);
    }
}


  const handleSubmit = async e => {
    e.preventDefault();
    Object.entries(ratings).forEach(([question, rating]) => {
      dispatch(add_r(question, rating));
    });
    // await apiCallToStoreDataInServer();
    dispatch(resetData());
    navigate('/end');
  };

  return (
    <div className="bg-image" style={{ backgroundImage: "url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg')", height: "100vh" }}>
      <Container className="rating-form-container transparent-bg">
        <Form onSubmit={handleSubmit}>
          {currentQuestion < questions.length ? (
            <div>
              <p className="question">{questions[currentQuestion]}</p>
              <div className="response">
                <Form.Group className="response-group">
                  <Form.Check
                    type="radio"
                    id={`rating-very-often-${currentQuestion}`}
                    label="Very Often"
                    name={`rating-${currentQuestion}`}
                    value="Very Often"
                    onClick={() => handleRatingChange(questions[currentQuestion], "Very Often")}
                  />
                  <Form.Check
                    type="radio"
                    id={`rating-often-${currentQuestion}`}
                    label="Often"
                    name={`rating-${currentQuestion}`}
                    value="Often"
                    onClick={() => handleRatingChange(questions[currentQuestion], "Often")}
                  />
                  <Form.Check
                    type="radio"
                    id={`rating-sometimes-${currentQuestion}`}
                    label="Sometimes"
                    name={`rating-${currentQuestion}`}
                    value="Sometimes"
                    onClick={() => handleRatingChange(questions[currentQuestion], "Sometimes")}
                  />
                  <Form.Check
                    type="radio"
                    id={`rating-rarely-${currentQuestion}`}
                    label="Rarely"
                    name={`rating-${currentQuestion}`}
                    value="Rarely"
                    onClick={() => handleRatingChange(questions[currentQuestion], "Rarely")}
                  />
                  <Form.Check
                    type="radio"
                    id={`rating-never-${currentQuestion}`}
                    label="Never"
                    name={`rating-${currentQuestion}`}
                    value="Never"
                    onClick={() => handleRatingChange(questions[currentQuestion], "Never")}
                  />
                </Form.Group>
              </div>
              <div className="store-data">
          {isDiagnosed ? (
            <>
            <button className="btn btn-primary" type = "button" onClick={handleNext}>Next</button>
            </>
          ) : (<p>Please select one which suits you best</p>)}
        </div>
            </div>
          ) : (
            <>
              <p>All questions answered. Thank you!</p>
              <button className="btn btn-primary" type="submit">Submit</button>
            </>
          )}
        </Form>
      </Container>
    </div>
  );
};

export default RatingForm;









