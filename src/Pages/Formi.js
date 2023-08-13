// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import questionsData from '../components/question.json';
// import { add_r } from '../redux/action';
// import { useNavigate } from 'react-router-dom';
// import { Container, Form } from 'react-bootstrap';

// const questions = questionsData.questions;

// const RatingForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [ratings, setRatings] = useState({});
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [isDiagnosed, setIsDiagnosed] = useState(false);


//   const handleRatingChange = (question, rating) => {
//     setRatings(prevRatings => ({
//       ...prevRatings,
//       [question]: rating
//     }));
//     setIsDiagnosed(true);
//   };

//   const handleNext = () => {
//     setCurrentQuestion(prevQuestion => prevQuestion + 1);
//     setIsDiagnosed(false);
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     Object.entries(ratings).forEach(([question, rating]) => {
//       dispatch(add_r(question, rating));
//     });
//     console.log(ratings);
//     navigate('/ree');
//   };

//   return (
//     <div className="bg-image" style={{ backgroundImage: "url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg')", height: "100vh" }}>
//       <Container className="rating-form-container transparent-bg">
//         <Form onSubmit={handleSubmit}>
//           {currentQuestion < questions.length ? (
//             <div>
//               <p className="question">{questions[currentQuestion]}</p>
//               <div className="response">
//                 <Form.Group className="response-group">
//                   <Form.Check
//                     type="radio"
//                     id={`rating-very-often-${currentQuestion}`}
//                     label="Very Often"
//                     name={`rating-${currentQuestion}`}
//                     value="Very Often"
//                     onClick={() => handleRatingChange(questions[currentQuestion], "Very Often")}
//                     onTouchEnd={() => handleRatingChange(questions[currentQuestion], "Very Often")}
//                   />
//                   <Form.Check
//                     type="radio"
//                     id={`rating-often-${currentQuestion}`}
//                     label="Often"
//                     name={`rating-${currentQuestion}`}
//                     value="Often"
//                     onClick={() => handleRatingChange(questions[currentQuestion], "Often")}
//                     onTouchEnd={() => handleRatingChange(questions[currentQuestion], "Often")}
//                   />
//                   <Form.Check
//                     type="radio"
//                     id={`rating-sometimes-${currentQuestion}`}
//                     label="Sometimes"
//                     name={`rating-${currentQuestion}`}
//                     value="Sometimes"
//                     onClick={() => handleRatingChange(questions[currentQuestion], "Sometimes")}
//                     onTouchEnd={() => handleRatingChange(questions[currentQuestion], "Sometimes")}
//                   />
//                   <Form.Check
//                     type="radio"
//                     id={`rating-rarely-${currentQuestion}`}
//                     label="Rarely"
//                     name={`rating-${currentQuestion}`}
//                     value="Rarely"
//                     onClick={() => handleRatingChange(questions[currentQuestion], "Rarely")}
//                     onTouchEnd={() => handleRatingChange(questions[currentQuestion], "Rarely")}
//                   />
//                   <Form.Check
//                     type="radio"
//                     id={`rating-never-${currentQuestion}`}
//                     label="Never"
//                     name={`rating-${currentQuestion}`}
//                     value="Never"
//                     onClick={() => handleRatingChange(questions[currentQuestion], "Never")}
//                     onTouchEnd={() => handleRatingChange(questions[currentQuestion], "Never")}
//                   />
//                 </Form.Group>
//               </div>
//               <div className="store-data">
//           {isDiagnosed ? (
//             <>
//             <button className="btn btn-primary" type = "button" onClick={handleNext}>Next</button>
//             </>
//           ) : (<p>Please select one which suits you best</p>)}
//         </div>
//             </div>
//           ) : (
//             <>
//               <p>All questions answered. Thank you!</p>
//               <button className="btn btn-primary" type="submit">Submit</button>
//             </>
//           )}
//         </Form>
//       </Container>
//     </div>
//   );
// };

// export default RatingForm;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import questionsData from '../components/question.json';
import { add_r } from '../redux/action';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Slider,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const questions = questionsData.questions;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  formContainerSmall: {
    padding: theme.spacing(2),
  },
  slider: {
    width: '80%',
    marginTop: theme.spacing(3),
  },
  sliderSmall: {
    width: '100%', // Full width for smaller screens
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

const RatingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [ratings, setRatings] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleRatingChange = (event, newValue) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [questions[currentQuestion]]: newValue,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setRatings({});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.entries(ratings).forEach(([question, rating]) => {
      dispatch(add_r(question, rating));
    });
    if (currentQuestion === questions.length - 1) {
      navigate('/ree');
      setRatings({});
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm" className={clsx(classes.formContainer, {
        [classes.formContainerSmall]: window.innerWidth <= 600, // Adjust the breakpoint as needed
      })}>
        <form onSubmit={handleSubmit}>
          {currentQuestion < questions.length - 1 ? (
            <div>
              <p className={classes.question}>{questions[currentQuestion]}</p>
              <Slider
                className={clsx(classes.slider, {
                  [classes.sliderSmall]: window.innerWidth <= 600, // Adjust the breakpoint as needed
                })}
                value={ratings[questions[currentQuestion]] || 0}
                onChange={handleRatingChange}
                step={1}
                marks
                min={0}
                max={10}
                valueLabelDisplay="auto"
                onClick={(event) => event.preventDefault()}
              />
              <div className={classes.button}>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={handleNextQuestion}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p>All questions answered. Thank you!</p>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Submit
              </Button>
            </>
          )}
        </form>
      </Container>
    </div>
  );
};

export default RatingForm;
