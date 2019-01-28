import React from 'react'
import {Modal, ModalHeader, Carousel, ModalBody, FormGroup, Label, Button} from 'reactstrap';

const MAX_LENGTH = 23

 class Images extends React.Component {
    state = {
        currentImage: "",
        modalIsOpen: false,
        photos: [
          {url: 'img/crying-face-dawson.jpg'},
          {url: 'img/First-World-Problems.jpg'},
          {url: 'img/mad-arthur.jpg'},
          {url: 'img/side-eye-chloe.jpg'},
          {url: 'img/Successful_kid_meme.png'},
          {url: 'img/Think-About-It.jpg'},
          {url: 'img/Unimpressed_kid.jpg'},
          {url: 'img/Everywhere-ToyStory.jpg'},
          {url: 'img/Am-I-The-Only-One-Around-Here.jpg'},
          {url: 'img/grandma-computer.png'},
          {url: 'img/Is-This-A-Pigeon.jpg'},
          {url: 'img/skeleton_bench.jpg'},
          {url: 'img/Yo-Dawg-Heard-You.jpg'},
          {url: 'img/spongebob.jpg'},
          {url: 'img/Face-You-Make.jpg'},
          {url: 'img/kevin_hart.jpeg'},
          {url: 'img/Girl-Wat.jpg'},
          {url: 'img/Futurama-Fry.jpg'},
          {url: 'img/Peter-Griffin-News.jpg'},
          {url: 'img/Young-Cardi-B.jpg'}
        ],
        
        currentImagebase64: null,
        toptext: "",
        bottomtext: "",
        isTopDragging: false,
        isBottomDragging: false,
        topY: "10%",
        topX: "50%",
        bottomX: "50%",
        bottomY: "90%",
    };

    // componentDidMount(){
    //   this.getMeme()
    // }
    // getMeme = async() => {
    //   const api_call = await fetch('https://api.imgflip.com/get_memes')
    //   const data = await api_call.json();
    //     this.setState({
    //       photos: data.data.memes
    //     })
    // }
   

    changeText = (event) => {
        this.setState({
          [event.currentTarget.name]: event.currentTarget.value
        });
      }


    openImage (url){ 
      const base_image = new Image();
      base_image.src = url;
      const base64 = this.getBase64Image(base_image);  
        this.setState({
            currentImagebase64: base64,
            currentImage: url,
            modalIsOpen: true,       
        })
    }


    toggle = () => {
        this.setState(prevState => ({
            modalIsOpen: !prevState.modalIsOpen,
            toptext: "",
            bottomtext: "",

        }))
    }

    convertSvgToImage = () => {
      const svg = this.svgRef;
      let svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      canvas.setAttribute("id", "canvas");
      const svgSize = svg.getBoundingClientRect();
      canvas.width = svgSize.width;
      canvas.height = svgSize.height;
      const img = document.createElement("img");
      img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
      img.onload = function() {
        canvas.getContext("2d").drawImage(img, 0, 0);
        const canvasdata = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.download = "meme.png";
        a.href = canvasdata;
        document.body.appendChild(a);
        a.click();
      };
    }

    getBase64Image(img) {
      // This function converts image to data URI
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
      var dataURL = canvas.toDataURL("image/png");
      return dataURL;
    }

  render() {
    const url = this.state.currentImage;
    const base_image = new Image();
    base_image.src = url;
    base_image.src = url;
    var newWidth = 450;
    var newHeight = 400;
    const textStyle = {
      fontFamily: "Impact",
      fontSize: "40px",
      textTransform: "uppercase",
      fill: "#FFF",
      stroke: "#000",
      userSelect: "none"
    }

    return (

      <div className="main-content">
          <div className="content">
          {this.state.photos.map((image, index) => (
          <div className="image" key={image.url}>
            <span className="top-text caption">Top text</span>
            <img
              alt={index}
              src={image.url}
              onClick={() => this.openImage(image.url) /* Determines current image */}
            />
            <span className="bottom-text caption">Bottom text</span>
          </div>
        ))}</div>
          
          <Modal className="meme-gen-modal" isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggle}>Make-a-Meme</ModalHeader>        
          <ModalBody>
          <svg
               width={newWidth}
               height={newHeight}
               ref={el => { this.svgRef = el }}
               id="svg_ref"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnshlink="http://www.w3.org/1999/xlink">
              <image
                ref={el => { this.imageRef = el }}
                xlinkHref={this.state.currentImagebase64}
                height={newHeight}
                width={newWidth}
              /> 

             <text style={textStyle} className="toptext"
                dominatbaseline="middle"
                textAnchor="middle"
                x={this.state.topX}
                y={this.state.topY}
                >
                { `${this.state.toptext.substring(0, MAX_LENGTH)}`}
            </text>

            <text style={textStyle} className="bottomtext"
              dominatbaseline="middle"
              textAnchor="middle"
                x={this.state.bottomX}
                y={this.state.bottomY}
                >
          { `${this.state.bottomtext.substring(0, MAX_LENGTH)}`}

            </text>
         </svg>    
             <div className="meme-form">
              <FormGroup>
                <Label for="toptext">Top Text</Label>
                <input className="form-control" type="text" name="toptext" id="toptext" placeholder="Add text to the top" onChange={this.changeText} />
              </FormGroup>
              <FormGroup>
                <Label for="bottomtext">Bottom Text</Label>
                <input className="form-control" type="text" name="bottomtext" id="bottomtext" placeholder="Add text to the bottom" onChange={this.changeText} />
              </FormGroup>
              <Button onClick={() => this.convertSvgToImage()} className="btn btn-primary">Download Meme!</Button>
              </div>
          </ModalBody>
          </Modal>

      </div>
    
    )

  }
}
 export default Images;