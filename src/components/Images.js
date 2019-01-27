import React from 'react'
import {Modal, ModalHeader, Carousel, ModalBody, FormGroup, Label, Button} from 'reactstrap';

const MAX_LENGTH = 30


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
          {url: 'img/kevin_hart.jpeg'}
        ],
        
        currentImagebase64: null,
        toptext: "",
        bottomtext: "",
        isTopDragging: false,
        isBottomDragging: false,
        topY: "10%",
        topX: "50%",
        bottomX: "0%",
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
      console.log(base_image)     
      base_image.src = url;
      const currentImagebase64 = this.getBase64Image(base_image);  
        this.setState({
            currentImagebase64: currentImagebase64,
            currentImage: url,
            modalIsOpen: true,       
        })
    }


    toggle = () => {
        this.setState(prevState => ({
            modalIsOpen: !prevState.modalIsOpen
        }))
    }

    convertSvgToImage = () => {
      const svg = this.svgRef;
      console.log(svg)
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
      img.crossOrigin = "Anonymous";
      canvas.width = '600';
      canvas.height = '600';
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
      var dataURL = canvas.toDataURL("image/png");
      return dataURL;
    }


  render() {
    return (

      <div className="main-content">
          <div className="content">
          {this.state.photos.map((image, index) => (
          <div className="image" key={image.url}>
            <span className="top-text caption">Top text</span>
            {/* <Carousel>
  <Carousel.Item>
    <img width={900} height={500} alt="900x500" src={image.url} />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  </Carousel> */}
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
               height='600px'
               ref={el => { this.svgRef = el }}
               id="svg_ref"
               width='600px'
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnshlink="http://www.w3.org/1999/xlink">
              <image
                ref={el => { this.imageRef = el }}
                xlinkHref={this.state.currentImagebase64}
                height="100%"
                width="100%" 
              /> 

             <text className="toptext"
                dominatbaseline="middle"
                textAnchor="middle"
                x={this.state.topX}
                y={this.state.topY}
                onMouseDown={event => this.handleMouseDown(event, 'top')}
                onMouseUp={event => this.handleMouseUp(event, 'top')}
                >
                { `${this.state.toptext.substring(0, MAX_LENGTH)}`}
            </text>

            <text className="bottomtext"
                x={this.state.bottomX}
                y={this.state.bottomY}
                onMouseDown={event => this.handleMouseDown(event, 'bottom')}
                onMouseUp={event => this.handleMouseUp(event, 'bottom')}
                >
                 {this.state.bottomtext}
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