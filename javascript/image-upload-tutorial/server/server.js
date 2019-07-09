require('dotenv').config()
const os = require('os')
const fs = require('fs')
const express = require('express')
const formData = require('express-form-data')
const cors = require('cors')
const { CLIENT_ORIGIN } = require('./config')

const app = express()

app.use(cors({
  origin: CLIENT_ORIGIN
}))

app.use(formData.parse())

app.get('/health', (req, res) => res.send('all good'))

app.post('/image-upload', (req, res) => {
  const values = Object.values(req.files)
  console.log(values)
  const promises = values.map(image => {
    console.log(image.path, os.homedir(), fs.existsSync('./uploads'))
    return fs.copyFileSync(image.path, `./uploads/${image.name}`)
  })

  Promise
    .all(promises)
    .then(() => {
      console.log('Succesfully uploaded files')
      res.status(200).json({result: 'Succesfully uploaded files'})
    })
    .catch((err) => res.status(400).json(err))
})

app.listen(process.env.PORT || 8080, () => console.log('Running'))