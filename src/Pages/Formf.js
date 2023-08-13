
import React, { useState } from 'react';
import {
  Container,
  Slider,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { add_r } from '../redux/action';
import { useNavigate } from 'react-router-dom';
import questionsData from '../components/test.json';
import { useSelector } from 'react-redux';
import { resetData } from '../redux/action'; 

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

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.entries(ratings).forEach(([question, rating]) => {
      dispatch(add_r(question, rating));
    });
    dispatch(resetData());
    navigate('/end');
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
