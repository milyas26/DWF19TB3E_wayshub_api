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
