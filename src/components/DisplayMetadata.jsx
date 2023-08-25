import React from 'react'
import { Context } from '../Context'

/**
 * A component to show word and metadata if available. 
 * At the moment, shows definitions and synonyms. 
 * 
 * @param {*} param0 
 * @returns 
 */
export const DisplayMetadata = () => {
  const {
    wordMetadata
  } = React.useContext(Context)

  return wordMetadata && <section className="definitions">

    <p className='word'><b>{wordMetadata.word}</b> </p>

    {wordMetadata.synonymsAndDefs && wordMetadata.synonymsAndDefs.map((obj, idx, arr1) => {

      // using fragment because of key restriction
      return <div key={obj.definition} className=''>
        
        {obj.definition && <p className='defined'><b>Definition:</b> {obj.definition}</p>}

        {obj.synonyms &&
          <p className='defined'><b>Synonyms:</b>  {obj.synonyms.map((synonym, i, arr2) => {
            // add a comma if not last one
            return synonym + (i === arr2.length - 1 ? "" : ", ")
          }
          )}
          </p>
        }

        {/* do not draw the last line */}
        {idx !== arr1.length - 1 && <hr />}
      </ div>
    })}

  </section>
}
