// does the same as the main branch, but only use 2 loops and fewer functions
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
  // findIndex() will return -1 if it can't find anything that mactches the condition
  if (obj.findIndex((element) => element.id == index) > -1) {
    return obj.findIndex((element) => element.id == index);
  } else {
    throw "Can not find matching IDs.";
  }
};

// get the current date without the time
const getCurrentDate = () => {
  // store date https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

// check if the ID is of type number
const checkIDType = (id) => {
  if (typeof id === "number") {
    return true;
  } else {
    throw `ID ${id} is not type number. It is of type ${typeof id}.`;
  }
};

// check if the date is in the right format
const checkDateType = (date) => {
  if (typeof date === "string") {
    return true;
  } else {
    throw `Date is not of type string. It is of type ${typeof date}.`;
  }
};

// get unique values reference https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
const getUniqueLearners = (submission) => {
  let uniqueIDs = [];
  // .map() will list all of the learner_id, new Set() will keep unique values
  const learnerIDs = new Set(submission.map((prop) => prop.learner_id));
  learnerIDs.forEach((element) => uniqueIDs.push({ id: element }));
  return uniqueIDs;
};

const getPoints = (ag, assignmentID, submission) => {
  const assignmentIndex = getIDIndex(ag.assignments, assignmentID);
  // make points and points_possible -1 if the assignment isn't due yet
  let points = -1;
  let points_possible = -1;
  //check if the due date past already
  checkDateType(ag.assignments[assignmentIndex].due_at);
  if (getCurrentDate() > ag.assignments[assignmentIndex].due_at) {
    // store score student got on assignment
    points = submission.score; //140

    // store max poins they can recieve
    points_possible = ag.assignments[assignmentIndex].points_possible;

    // throw error if the points possible is 0
    if (points_possible == 0) {
      throw "Points possible is 0. Something is wrong.";
    }

    // check if the student turn in the assignment late
    checkDateType(submission.submitted_at);
    if (submission.submitted_at > ag.assignments[assignmentIndex].due_at) {
      // deduct points from final grade from assignment if it's late
      points -= points_possible * 0.1; // 125
    }
  }
  return [points, points_possible];
};

// add total points together
const addPoints = (arr, index, property, value) => {
  // if the property exist, add to current value else make new property and set value to it
  if (arr[index].hasOwnProperty(property)) {
    arr[index][property] += value;
  } else {
    arr[index][property] = value;
  }
};

// returns all students current grades, and individual submission grades
const getLearnerData = (course, ag, submissions) => {
  let result = [];
  // try to see if the course ID in given assignment group matches with the given course
  try {
    checkIDType(course.id);
    checkIDType(ag.course_id);

    if (course.id === ag.course_id) {
      // add unique ids into the array
      result = getUniqueLearners(submissions);
      // result = [{id: 125}, {id: 132}]

      // add the submissions to user's data
      submissions.forEach((element) => {
        checkIDType(element.assignment_id);
        let points = getPoints(ag, element.assignment_id, element.submission);

        checkIDType(element.learner_id);
        const resultIndex = getIDIndex(result, element.learner_id);
        if (points[0] > -1) {
          result[resultIndex][element.assignment_id] = points[0] / points[1];
        }
        addPoints(result, resultIndex, "totalPointsEarned", points[0]);
        addPoints(result, resultIndex, "totalPotentialPointsEarned", points[1]);
      });

      // make avg property and remove totalPointsEarned totalPotentialPointsEarned
      for (const element of result) {
        element.avg =
          element.totalPointsEarned / element.totalPotentialPointsEarned;
        delete element.totalPointsEarned;
        delete element.totalPotentialPointsEarned;
      }

      return result;
    } else {
      throw "Course ID is not matching with course ID in Assignment Group";
    }
  } catch (e) {
    return e;
  }
};

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
