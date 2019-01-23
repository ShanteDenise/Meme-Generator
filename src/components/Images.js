import React from 'react'

const initialState = {
    toptext: "",
    bottomtest: "",
    isTopDragging: false,
    isBottomDragging: false,
    topY: "10%",
    topX: "50%",
    bottomX: "50%",
    bottomY: "90%"
}

 class Images extends React.Component {
         state = {
             currentImage: 0,
             modalIsOpen: false,
             ...initialState
         };
     
  render() {
    return (
      <div>
          <h1>Images Will be Here</h1>
      </div>
    )
  }
}
 export default Images;