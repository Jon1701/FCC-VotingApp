const poll = (req, res, next) => {

  console.log(req.params)

  return res.json('Reached endpoint /view/poll/:poll_id')
}

module.exports = poll;
