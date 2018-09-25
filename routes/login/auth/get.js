import axios from 'axios'

import { PlayerModel } from '../../../database/models' 

import CONFIG from '../../../config'

const handleGet = async (req, res) => {
    if (!req.query.code) throw new Error('Error in discord Oauth2')

    const code = req.query.code
    axios.post(`
        ${CONFIG.DISCORD.BASE_URL}
        /token?
        grant_type=authorization_code&
        code=${code}&
        client_id=${CONFIG.DISCORD.CLIENT_ID}&
        client_secret=${CONFIG.DISCORD.CLIENT_SECRET}&
        redirect_uri=${CONFIG.DISCORD.REDIRECT_URI}&
        scope=identify
    `,
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(({tokenData}) => {
        axios.get(`${CONFIG.DISCORD.BASE_URL}/users/@me`, {
            headers: {
                'Authorization': 'Bearer ' + tokenData.access_token
            }
        })
        .then(({userData}) => {
            PlayerModel.setTokens(userData.id, tokenData.access_token, tokenData.expires_in, `${userData.username}#${userData.discriminator}`, (err, player) => {
                if(err) throw new Error(err)

                res.redirect(`/auth/?token=${tokenData.access_token}&expiry=${tokenData.expires_in}`)
            })
        })
    })
    .catch(e => {
        throw new Error(e.response ? e.response.message : e.errno)
    })
}

export default handleGet
  