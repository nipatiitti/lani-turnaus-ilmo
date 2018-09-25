const handleGet = async (req, res) => {
  res.status(200).json({msg: 'Welcome to the LAN api'})
}

export default handleGet
