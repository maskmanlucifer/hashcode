const router = require('express').Router();

const contestController = require('../controllers/contestController');

router.get('/contest', contestController.contest_landing_page); // for contest landing page

router.get('/contest/mashup', contestController.mashup_landing_page); // for mashup landing page 

router.get('/contest/lockout', contestController.lockout_landing_page); // for lockout landing page 

router.get('/contest/mashup/create', contestController.mashup_form); // for mashup create 

router.get('/contest/lockout/create', contestController.lockout_form); // for lockout create

router.get('/contest/mashup/:contestId/register', contestController.mashup_register_public); // for register in mashup public

router.get('/contest/lockout/:contestId/register', contestController.lockout_register_public ); // for register in lockout public

router.get('/contest/private/register/:code', contestController.lockout_mashup_register_private); // for register in mashup and lockout private

router.post('/contest/mashup/create', contestController.mashup_create); // for creating mashup

router.post('/contest/lockout/create', contestController.lockout_create); // for creating lockout

router.get('/contest/mashup/:contestId',contestController.mashup_contest_landing_page_problems); // mashup contest main page

router.get('/contest/mashup/:contestId/problems',contestController.mashup_contest_landing_page_problems); // mashup contest main page or problem page

router.get('/contest/mashup/:contestId/standing', contestController.mashup_contest_landing_page_standing); // mashup contets standing page 

router.get('/contest/mashup/:contestId/registered', contestController.mashup_registered_users); // mashup contets registered users page

router.get('/api/registered/:contestId',contestController.get_registered_list); // get registered users list

router.post('/save/mashup/problems',contestController.save_mashup_problems); // save mashup problems from first user
 
router.post('/save/mashup/ranklist',contestController.save_mashup_ranklist); // save ranklist snaps

router.get('/contest/lockout/:contestId',contestController.lockout_contest_landing_page); // lockout main page

router.get('/api/lockout/:contestId',contestController.get_lockout); // get lockout info json

router.post('/save/lockout',contestController.save_lockout); // save lockout info

module.exports = router;