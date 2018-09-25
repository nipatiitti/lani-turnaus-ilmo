import mongoose from 'mongoose'
import { playerSchema } from './playerSchema'

// Add Schema
export const tournamentSchema = mongoose.Schema({
  name: String,
  teams: [{name: String, players: [playerSchema]}],
  createdAt: Number
})

export const TournamentModel = mongoose.model('TournamentSchema', tournamentSchema)

