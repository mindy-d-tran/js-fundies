// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

// get the id that matches
const getIDIndex = (obj, index) => {
  return obj.findIndex((element) => element.id == index);
};

// get the current date without the time
const getCurrentDate = () => {
  // store date https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

// make list of the id's from the result array
const makeAssignmentList = (obj) => {
  const assignmentIndex = Object.keys(obj);
  const regex = /[0-9]/;
  for (let i = 0; i < assignmentIndex.length; i++) {
    // if id contains number keep it in the array.
    if (regex.test(assignmentIndex[i])) {
      continue;
    }
    // pop any element that's not a number
    assignmentIndex.pop();
  }
  return assignmentIndex;
};

// returns all students current grades, and individual submission grades
const getLearnerData = (course, ag, submissions) => {
  let result = [];
  // try to see if the course ID in given assignment group matches with the given course
  try {
    if (course.id === ag.course_id) {

      // add unique ids into the array
      const uniqueID = getUniqueIDs(submissions);
      

      // add the submissions to user's data
      submissions.forEach((element) => {
        //get current assignment id in learners submission
        const assignmentID = element.assignment_id;
        const assignmentIndex = getIDIndex(ag.assignments, assignmentID);

        //check if the due date past already
        if (getCurrentDate() > ag.assignments[assignmentIndex].due_at) {
          // get learner's ID
          const learnerID = element.learner_id;
          const index = getIDIndex(result, learnerID);

          // store score student got on assignment
          let finalScore = element.submission.score;

          // store max poins they can recieve
          const points_possible = ag.assignments[assignmentIndex].points_possible;

          // throw error if the points possible is 0
          if (points_possible==0) {
            throw "Points possible is 0. Something is wrong."
          }

          // check if the student turn in the assignment late
          if (
            element.submission.submitted_at >
            ag.assignments[assignmentIndex].due_at
          ) {
            // deduct points from final grade from assignment if it's late
            finalScore -= points_possible * 0.1;
          }

          result[index][assignmentID] = finalScore;
        }
      });

      // add avg in result array
      for (let i = 0; i < result.length; i++) {
        const assignmentIndex = makeAssignmentList(result[i]);
        const totalSum = calculateScore(assignmentIndex, i);
        const totalPoints = calculateTotalPoints(assignmentIndex, ag);
        result[i].avg = parseFloat(totalSum / totalPoints.toFixed(2));
      }

      // divide individual score of assignments after calculating avg score of student
      result.forEach((element) => {
        for (const key in element) {
          if (key !== "id" && key !=="avg") {
            const index = getIDIndex(ag.assignments, key);

            element[key] /= ag.assignments[index].points_possible;
            element[key] = parseFloat(element[key].toFixed(2));
          }
        }
      });
      return result;
    } else {
      throw "Course ID is not matching with course ID in Assignment Group";
    }
  } catch (e) {
    return e;
  }

  // making nested functions so those functions can be "private"
  //////////////////////////////////////////////////////////////////
  // get unique values reference https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
  function getUniqueIDs(submission) {
    let uniqueIDs = [];
    const learnerID = new Set(submission.map((prop) => prop.learner_id));
    learnerID.forEach((element) => result.push({ id: element }));  
    return uniqueIDs;
  }

  function calculateScore(arr, index) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += result[index][arr[i]];
    }
    return sum;
  }

  function calculateTotalPoints(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      const index = getIDIndex(ag.assignments, arr[i]);
      sum += ag.assignments[index].points_possible;
    }
    return sum;
  }
  function getFinalScore(ag, assignmentID, learnerID){

  }
};

// console.log(CourseInfo);
// console.log(AssignmentGroup);
// console.log(LearnerSubmissions);
console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));

/*result should look like 
{
    // the learner's id
    "id": number,

    // the learner’s total, weighted average, in which assignments
    // with more points_possible should be counted for more
    // e.g. a learner with 50/100 on one assignment and 190/200 on another
    // would have a weighted average score of 240/300 = 80%.
    // current final grade in class

    // input: learnerSubmission.submision.score, assignmentgroup.assignments[i].points_possible
    "avg": number,

    // each assignment should have a key with its ID,
    // and the value associated with it should be the percentage that
    // the learner scored on the assignment (submission.score / points_possible)
    // grade for each assignment
    <assignment_id>: number

    // if an assignment is not yet due, it should not be included in either
    // the average or the keyed dictionary of scores
}*/
