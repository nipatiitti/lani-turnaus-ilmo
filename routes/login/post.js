import CONFIG from '../../config'

const handleGet = async (req, res) => {
    res.redirect(`
        ${CONFIG.DISCORD.BASE_URL}/authorize?
        response_type=code&
        client_id=${CONFIG.DISCORD.CLIENT_ID}&
        scope=identify&
        redirect_uri=${encodeURI(CONFIG.DISCORD.REDIRECT_URI)}
    `)
}

export default handleGet
  