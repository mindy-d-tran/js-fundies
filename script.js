const courseInfo = {
    id: 1,
    name: "How to Win Your Cat Over"
};

const assignmentGroup = {
    id: 1,
    name: "owo",
    //id of course the assgnment group belongs to 
    course_id: 1,
    // percentage weight of the entire assignment group
    group_weight: 30,
    assignments: [{
        id: 1,
        name: "assignment name",
        // due date for assignment
        due_at: "07/20/2024",
        // max pnts possible for assignments
        points_possible: 20
    }]
};

const learnerSubmission =[
    {
        learner_id: 1,
        assignment_id: 1,
        submission: {
            submitted_at: "02/23/2024",
            score: 15
        }
    },
    {
        learner_id: 2,
        assignment_id: 1,
        submission: {
            submitted_at: "03/23/2024",
            score: 17
        }
    }
];

console.log(learnerSubmission);

function getLearnerData(course, assignGroup, submissions){

}

/*result should look like 
{
    // the ID of the learner for which this data has been collected
    "id": number,

    // the learner’s total, weighted average, in which assignments
    // with more points_possible should be counted for more
    // e.g. a learner with 50/100 on one assignment and 190/200 on another
    // would have a weighted average score of 240/300 = 80%.
    "avg": number,

    // each assignment should have a key with its ID,
    // and the value associated with it should be the percentage that
    // the learner scored on the assignment (submission.score / points_possible)
    assignment_id: number

    // if an assignment is not yet due, it should not be included in either
    // the average or the keyed dictionary of scores
}*/