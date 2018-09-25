import express from 'express'
import update from './update'

import handleGet from './get'
import handlePatch from './patch'

const router = express.Router({mergeParams: true})

router
  .get('/', handleGet)
  .patch('/', handlePatch)

export default router
