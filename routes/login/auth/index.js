import express from 'express'

import handleGet from './get'

const router = express.Router({mergeParams: true})

router
  .get('/', handleGet)

export default router
