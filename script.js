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
        due_at: "07/20/24",
        // max pnts possible for assignments
        points_possible: 20
    }]
};

const learnerSubmission =[
    {
        learner_id: 1,
        assignment_id: 1,
        submission: {
            submitted_at: "02/23/24",
            score: 15
        }
    },
    {
        learner_id: 2,
        assignment_id: 1,
        submission: {
            submitted_at: "03/23/24",
            score: 17
        }
    }
];

console.log(learnerSubmission);