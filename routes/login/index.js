import express from 'express'
import auth from './auth'

import handlePost from './post'

const router = express.Router({mergeParams: true})

router.use('/auth', auth)

router
  .post('/', handlePost)

export default router
