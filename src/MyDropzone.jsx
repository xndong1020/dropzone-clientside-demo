import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
const FormData = require('form-data')
const makeRandomString = require('./utils/randomStringGen')

class MyDropzone extends React.Component {
  constructor() {
    super()
    this.state = {
      accepted: [],
      rejected: []
    }
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <div style={{ border: 'solid 1px black' }}>
            <Dropzone
              accept="image/jpeg, image/png"
              onDrop={(accepted, rejected) => {
                console.log(accepted)
                const bodyFormData = new FormData()
                if (accepted) {
                  console.log(accepted)
                  accepted.forEach(file => {
                    // my_field represents your custom field, makeRandomString() make a random string
                    bodyFormData.append('my_field', makeRandomString())
                    bodyFormData.append('files', file)
                  })

                  axios({
                    method: 'post',
                    url: 'http://localhost:4000/files/',
                    data: bodyFormData,
                    config: {
                      headers: { 'Content-Type': 'multipart/form-data' }
                    }
                  })
                    .then(function(response) {
                      //handle success
                      console.log(response)
                    })
                    .catch(function(response) {
                      //handle error
                      console.log(response)
                    })
                }
                this.setState({ accepted, rejected })
              }}
            >
              {({ getRootProps, getInputProps }) => {
                return (
                  <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    <p>
                      Try dropping some files here, or click to select files to
                      upload.
                    </p>
                    <p>Only *.jpeg and *.png images will be accepted</p>
                  </div>
                )
              }}
            </Dropzone>
          </div>
        </div>
        <aside>
          <h4>Accepted files</h4>
          <ul>
            {this.state.accepted.map(f => (
              <li key={f.name}>
                {f.name} - {f.size} bytes
              </li>
            ))}
          </ul>
          <h4>Rejected files</h4>
          <ul>
            {this.state.rejected.map(f => (
              <li key={f.name}>
                {f.name} - {f.size} bytes
              </li>
            ))}
          </ul>
        </aside>
      </section>
    )
  }
}

export default MyDropzone
