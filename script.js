
// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
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
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

const getLearnerData = (assignGroup, submissions) =>{
    let result = [];
    const uniqueID = getUniqueID(submissions);
    uniqueID.forEach(element => result.push({id: element}));

    submissions.forEach( element =>{
        let currentId = element.learner_id;
        let index = result.findIndex(element => element.id === currentId);
        let assignment = element.assignment_id;
        result[index][assignment] = element.submission.score;
    });

    for(let i=0; i<result.length; i++){
        let assID = makeAssignmentList(result[i]);
        let avgValue = calculateScore(assID, i);
        let totalPoints = calculateTotalPoints(assID, assignGroup);
        result[i].avg = (avgValue/totalPoints).toFixed(2);
    }

    return result;

    // making nested functions so those functions can be "private"
    //////////////////////////////////////////////////////////////////
    // get unique values reference https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
    function getUniqueID(submission){
        const learnerID = new Set(submission.map(prop => prop.learner_id));
        return learnerID;
    }

    function makeAssignmentList (obj) {
        let assID = Object.keys(obj);
        assID.pop();
        return assID;
    }

    function calculateScore (arr, index){
        let sum = 0;
        for(let i=0; i<arr.length; i++){
            sum+=result[index][arr[i]];
        }
        return sum;
    }

    function calculateTotalPoints (arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            const index = assignGroup.assignments.findIndex(element => element.id == arr[i]);
            sum += assignGroup.assignments[index].points_possible;
        }
        return sum;
    }
}

console.log(getLearnerData(AssignmentGroup, LearnerSubmissions));


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