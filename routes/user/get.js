import { PlayerModel } from '../../database/models'

const handleGet = async (req, res) => {
    const { id, bearer } = req.headers
    if(!id || !bearer) throw new Error('Invalid Params')

    PlayerModel.validate(id, bearer, validation => {
        if(validation.valid) {
            res.status(200).json(validation.player)
        } else {
            res.status(401).json(validation)
        }
    })
}
  
export default handleGet
  