exports.register = (req, res) => {
  const { email, password, channelName, description } = req.body

  res.send({
    status: 'Success',
    data: {
      channel: {
        email: email,
        password: password,
      },
    },
  })
}

exports.login = (req, res) => {
  const { email, password } = req.body

  res.send({
    status: 'Success',
    data: {
      channel: {
        email: email,
        password: password,
      },
    },
  })
}
