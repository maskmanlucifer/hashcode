const router = require('express').Router();

const contestController = require('../controllers/contestController');

router.get('/contest', contestController.contest_landing_page);

router.get('/contest/mashup', contestController.mashup_landing_page);

router.get('/contest/lockout', contestController.lockout_landing_page);

router.get('/contest/mashup/create', contestController.mashup_form);

router.get('/contest/lockout/create', contestController.lockout_form);

router.get('/contest/mashup/:contestId/register', contestController.mashup_register_public);

router.get('/contest/mashup/:contestId/registered', contestController.mashup_registered_users);

router.get('/contest/lockout/:contestId/register', contestController.lockout_register_public );

router.get('/contest/private/register/:code', contestController.lockout_mashup_register_private);

router.post('/contest/mashup/create', contestController.mashup_create);

router.post('/contest/lockout/create', contestController.lockout_create);

router.get('/contest/mashup/:contestId/problems',contestController.mashup_contest_landing_page_problems);

router.get('/contest/mashup/:contestId',contestController.mashup_contest_landing_page_problems);

router.get('/contest/mashup/:contestId/standing', contestController.mashup_contest_landing_page_standing);

router.get('/api/registered/:contestId',contestController.get_registered_list);

router.post('/save/mashup/problems',contestController.save_mashup_problems);

router.post('/save/mashup/ranklist',contestController.save_mashup_ranklist);

router.post('/save/lockout',contestController.save_lockout);

router.get('/api/lockout/:contestId',contestController.get_lockout);

router.get('/contest/lockout/:contestId',contestController.lockout_contest_landing_page);

module.exports = router;