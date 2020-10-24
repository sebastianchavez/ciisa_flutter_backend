const { Router } = require('express')
const router = Router()

const newsCtrl = require('../controllers/new.controller.js')

router.get('/', newsCtrl.getNews);

router.post('/', newsCtrl.createNews);

router.get('/:id', newsCtrl.getNew);

router.put('/:id', newsCtrl.editNew);

router.delete('/:id', newsCtrl.deleteNew);



module.exports = router