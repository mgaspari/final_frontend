import React from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
const CLOUDINARY_UPLOAD_PRESET = 'orjfjaxj';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/mgaspari/upload';

export default class ImageHandler extends React.Component {
  state = {
      uploadedFileCloudinaryUrl: ''
    }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        }, () => this.props.setPicture(this.state.uploadedFileCloudinaryUrl));
      }
    });
  }

  render() {
    return(
      <div className="ui items">
      <div className="FileUpload">
        <div className="item">
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.onImageDrop.bind(this)}
          >
          <p>Drop an image or click to select a file to upload.</p>
        </Dropzone>
      </div>
      </div>

      <div>
        {this.state.uploadedFileCloudinaryUrl === '' ? null :
        <div>

          <div className="item">
            <p>{this.state.uploadedFile.name}</p>

   <div className="ui tiny image">
     <img src={this.state.uploadedFileCloudinaryUrl} />
   </div>
 </div>
        </div>}
      </div>
    </div>
  )
  }
}
