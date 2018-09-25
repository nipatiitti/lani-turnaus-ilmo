import express from 'express'

import login from './login'

import handleGet from './get'

const router = express.Router({mergeParams: true})

router.use('/login', login)

router
  .get('/', handleGet)

export default router
