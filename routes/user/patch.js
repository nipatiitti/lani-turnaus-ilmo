import { PlayerModel } from '../../database/models'

const handlePatch = async (req, res) => {
    const { id, bearer, attends } = req.headers
    if(!id || !bearer || !attends) throw new Error('Invalid Params')

    PlayerModel.validate(id, bearer, validation => {
        if(validation.valid) {
            PlayerModel.attends(id, attends, (err, player) => {
                if(err) throw new Error(err)

                res.status(200).json(player)
            })
        } else {
            res.status(401).json(validation)
        }
    })
}
  
export default handlePatch