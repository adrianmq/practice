import React, { Component } from 'react'
import { notify } from 'react-notify-toast'
import Spinner from './Spinner'
import Images from './Images'
import Buttons from './Buttons'
import WakeUp from './WakeUp'
import { API_URL, TOAST_COLOR } from '../config'
import './App.css'

export default class UploadImage extends Component {

  state = {
    loading: true,
    uploading: false,
    images: []
  }

  componentDidMount() {
    fetch(`${API_URL}/health`)
      .then(res => {
        if (res.ok) {
          console.log(res)
          return this.setState({ loading: false })
        }
        const msg = 'Something is went wrong'
        this.toast(msg, 'custom', 2000, TOAST_COLOR)
      })
  }

  toast = notify.createShowQueue()

  onChange = e => {
    const errs = []
    const files = Array.from(e.target.files)

    if (files.length > 3) {
      const msg = 'Only 3 images can be uploaded at a time'
      return this.toast(msg, 'custom', 2000, TOAST_COLOR)
    }

    const formData = new FormData()
    const types = ['image/png', 'image/jpeg', 'image/gif']

    files.forEach((file, i) => {

      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`)
      }

      if (file.size > 180000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`)
      }

      formData.append(i, file)
    })

    if (errs.length) {
      return errs.forEach(err => this.toast(err, 'custom', 2000, TOAST_COLOR))
    }

    this.setState({ uploading: true })

    fetch(`${API_URL}/image-upload`, {
      method: 'POST',
      body: formData
    })
      .then(res => {
        if (!res.ok) {
          throw res
        }
        return res.json()
      })
      .then(images => {
        this.setState({
          uploading: false,
          images
        })
      })
      .catch(err => {
        this.setState({ uploading: false })
        err.json().then(e => {
          this.toast(e.message, 'custom', 2000, TOAST_COLOR)
        }).catch(err_json => {
          console.log(err.statusText)
          this.toast('Something went wrong, please try again later!', 'custom', 2000, TOAST_COLOR)
        })
      })
  }

  filter = id => {
    return this.state.images.filter(image => image.public_id !== id)
  }

  removeImage = id => {
    this.setState({ images: this.filter(id) })
  }

  onError = id => {
    this.toast('Oops, something went wrong', 'custom', 2000, TOAST_COLOR)
    this.setState({ images: this.filter(id) })
  }

  render() {
    const { loading, uploading, images } = this.state

    const content = () => {
      switch (true) {
        case loading:
          return <WakeUp />
        case uploading:
          return <Spinner />
        case images.length > 0:
          return <Images
            images={images}
            removeImage={this.removeImage}
            onError={this.onError}
          />
        default:
          return <Buttons onChange={this.onChange} />
      }
    }

    return (
      <div className='buttons'>
        {content()}
      </div>
    )
  }
}