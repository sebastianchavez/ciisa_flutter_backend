const { Router } = require('express')
const router = Router()

const activitiesCtrl = require('../controllers/activity.controller.js')

router.get('/', activitiesCtrl.getActivities);

router.post('/', activitiesCtrl.createActivities);

router.get('/:id', activitiesCtrl.getActivity);

router.put('/:id', activitiesCtrl.editActivity);

router.delete('/:id', activitiesCtrl.deleteActivity);



module.exports = router