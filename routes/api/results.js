var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Response = require('../../models/response');
var User = mongoose.model('User');
var Question = mongoose.model('Question');

// router.get('/', function (req, res) {
//     Response.find(function (err, doc) {
//         if (err) res.send(err);
//         res.json(doc);
//     });
// });

//Get responses by assessment id and user id
router.get('/', async function (req, res) {

    console.log("run function begin:");
    const answerOptionArray = [];

    async function run() {
        // await buildArray();
        // await buildResult();
        // sendResult();

        buildArray().then(() => buildResult(answerOptionArray)).then(() => sendResult(answerOptionArray));
    }

    function buildArray() {
        console.log("Start Build Array")
        return new Promise(resolve => {
            Response.find({ assessment_id: req.body.assessment_id, user_id: req.body.user_id }, function (err, responses) {
            // console.log('assessment id: ');
            // console.log(req.body.assessment_id);
            // console.log("Response Array:");
            // console.log(responses);
            responses.forEach(async response  => {
            // console.log("Got a Response:");
            // console.log(response);
            // let user_response = await Question.findOne({_id: response.question_id, 'answer_options._id': response.answer_option_id});
            let user_response = await Question.findOne({'answer_options._id': response.answer_option_id});
            // console.log("Response Spacer:");
            // console.log(user_response);
            //console.log(user_response.answer_options);
                user_response.answer_options.forEach( answer_option => {
                    if(answer_option._id == response.answer_option_id) {
                        // console.log(answer_option.answer_bucket);
                        answerOptionArray.push(answer_option.answer_bucket);
                        console.log("Array build in process");
                        console.log(answerOptionArray);
                    }  
                });
                    console.log("array length compare:");
                    console.log(answerOptionArray.length);
                    console.log(responses.length);
                    if (answerOptionArray.length < responses.length) {
                        console.log("Building Array....");
                    } else {
                        console.log("Array Built:");
                        console.log(answerOptionArray);
                        resolve(answerOptionArray);
                    }    
            });

        });
    });
    }

    function buildResult(answerOptionArray) {
        return new Promise(resolve => {
        console.log("Build Result:");
        console.log(answerOptionArray);
        //build results here
        resolve();
        });
    }

    function sendResult(answerOptionArray) {
        console.log("Array Values:");
        console.log(answerOptionArray);
        console.log("Here is your array End of Route!");
        res.json("Got Here!")
    }  

    run();
});




//experimenting with route
// router.get('/:assessment_id/:user_id', function (req, res) {
//     find({ assessment_id: req.params.assessment_id, user_id: req.params.user_id })
//         .then(result => {
//             if (result) {
//                 res.render('response', {
//                     asessment_id: result.assessment_id,
//                     user_id: result.user_id,
//                 });
//             } else {
//                 res.send('result not found');
//             }
//         });
// });


module.exports = router;