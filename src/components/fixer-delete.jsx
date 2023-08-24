import { useState } from 'react'
import './App.scss'
import PropTypes from 'proptypes'

import { magazineIssues } from './issues'


const gridFormatValues = [1, 12, 13]

const sortDate = function (a, b) {
  return b.date - a.date;
};


const Buttons = () => {

  const style = {
    backgroundColor: "#025d9a",
    color: "white",
    padding: '3px',
    margin: '0 2px'
  }
  return <><div style={{
    display: "flex",
    justifyContent: 'start',
    width: "100%"
  }}>
    <button style={style} type='button'> Subscribe</button>
    <button style={style} type='button'> Digital Edition</button>
    <button style={style} type='button'> Archives</button>
    <button style={style} type='button'> Renewal</button>
  </div>
  </>
}



const SingleImages = ({ sortedIssues, widthPerImage, imageMargin }) => {
  return <>{
    sortedIssues.map((issue) => {
      return <img
        alt={issue.alt}
        key={issue.url}
        src={issue.url}
        style={{
          maxWidth: widthPerImage,
          margin: imageMargin + 'px',

        }} />
    })
  }
  </>
}

const ImagesGrid = () => {

  const [gridFormat, setGridFormat] = useState(gridFormatValues[2])
  const [availableSpace, setAvailableSpace] = useState(window.innerWidth)

  const imageMargin = 7
  let widthPerImage

  if (gridFormat === 13) {
    // widthPerImage = (window.innerWidth / 8) - imageMargin * 2
    widthPerImage = (availableSpace / 8) - imageMargin * 2

  } else if (gridFormat === 12) {
    widthPerImage = (availableSpace / 4) - imageMargin * 2
  } else if (gridFormat === 1) {
    widthPerImage = '100%'
  }

  if (availableSpace < 480) {
    widthPerImage = '100%'
  }

  const sortedIssues = magazineIssues.sort(sortDate)

  const handleSelectChange = (event) => {
    setGridFormat(parseInt(event.target.value))

  }

  const handleInputChange = (event) => {
    setAvailableSpace(parseInt(event.target.value))
  }


  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(sortedIssues[0].date);
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(sortedIssues[0].date);

  return (
    <>
      <label className={'boldFont'}>
        Grid Format:
      <select
          onChange={handleSelectChange}
          value={gridFormat}
        >
          {gridFormatValues.map((value) => <option value={value} key={value}>
            {value}
          </option>
          )}
        </select>
      </label>
      &nbsp;&nbsp;
      <label className={'boldFont'}>
        Available Space in px:
        <input type='number' onChange={handleInputChange} value={availableSpace} min={200} />
      </label>

      {(gridFormat === 1 || availableSpace < 480) &&
        <div className='loneImage' >
          {sortedIssues.map((issue) => {
            return <img
              alt={issue.alt}
              key={issue.url}
              src={issue.url}
              style={{
                maxWidth: widthPerImage,
                margin: imageMargin + 'px',
                width: 'max-content'
              }} />
          })}

        </div>
      }

      {
        gridFormat !== 1 &&
        <div className='centerOnScreen' style={{
          // width: availableSpace,
          width: "100%",
          margin: '0 auto'
        }}>
          <div style={{
            width: availableSpace,
            display: "flex",
            // width: "1000px",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>


            {gridFormat === 12 && <SingleImages sortedIssues={sortedIssues} widthPerImage={widthPerImage} imageMargin={imageMargin} />}
            {(() => {
              if (gridFormat === 13) {
                return <>
                  <div className='leftImage' style={{
                    margin: imageMargin + 'px',

                  }} >
                    <img
                      alt={sortedIssues[0].alt}
                      key={sortedIssues[0].url}
                      src={sortedIssues[0].url}

                      style={{
                        margin: imageMargin + 'px',
                        width: widthPerImage * 3.2,
                      }} />
                    <br />
                    <span className='boldFont'>{month}, {year}</span>
                  </div>

                  <div className='halfScreen' style={{
                    maxWidth: 4 * (widthPerImage + 2 * imageMargin + 1),
                    // minWidth: "200px"


                  }}>
                    <SingleImages sortedIssues={sortedIssues} widthPerImage={widthPerImage} imageMargin={imageMargin} />
                  </div>

                </>
              }
            })()
            }
          </div>
          <Buttons />
        </div >
      }
    </>)
}


function App() {
  return (
    <ImagesGrid availableSpace={1200} gridFormat={13} />
  )
}

ImagesGrid.propTypes = {
  // gridFormat: PropTypes.oneOf([1, 12, 13]).isRequired,
  availableSpace: PropTypes.number
}

export default App
