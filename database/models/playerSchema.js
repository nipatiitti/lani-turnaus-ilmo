import mongoose from 'mongoose'

// Add Schema
export const playerSchema = mongoose.Schema({
  name: String,
  attends: [String],
  createdAt: Number,
  accessToken: String,
  expiry: Number,
  isAdmin: {
    type: Boolean,
    default: false
  }
})

playerSchema.methods.setTokens = (id, accessToken, expiry, name, cb) => {
  this.model('PlayerSchema').update({ _id: id }, {
    $set: {
      accessToken,
      expiry: expiry + new Date().getTime() / 1000,
      name
    },
    $setOnInsert: {
      createdAt: new Date().getTime() / 1000,
      name,
      attends: []
    }
  }, {upsert: true, setDefaultsOnInsert: true, new: true}, cb)
}

playerSchema.methods.attends = (id, attends, cb) => {
  this.model('PlayerSchema').update({ _id: id }, {
    $set: {
      attends
    }
  }, {new: true}, cb)
}

playerSchema.methods.validate = (id, accessToken, cb) => {
  this.model('PlayerSchema').findById(id, (err, player) => {
    if(err) throw new Error(err)

    const expired = player.expiry <= new Date().getTime() / 1000

    if(accessToken === player.accessToken && !expired) {
      cb({valid: true, player})
    } else if (accessToken === player.accessToken && expired){
      cb({valid: false, reason: 'expired', message: 'Expired token. Please relogin'})
    } else {
      cb({valid: false, reason: 'unvalid_token', message: 'Your token is unvalid. Please relogin'})
    }
  })
}

export const PlayerModel = mongoose.model('PlayerSchema', playerSchema)
