/**
 * PhotoUploadPage component
 *
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import * as UrlQuery from '../lib/UrlQuery'
import { IProducer } from '../interfaces/IProducer'
import defaultProducer from '../states'
import DropZone from './DropZone'

/**
 * PhotoUploadPage component
 */
const PhotoUploadPage: React.FC = () => {
    const [producer, setProducer] = React.useState<IProducer>(defaultProducer)
    UrlQuery.parse()
    const name = UrlQuery.getValue('producer')

    React.useEffect(() => {
        const uri = `./producers.php?name=${name}`
        fetch(uri)
            .then(response => response.json())
            .then(response => {
                setProducer(response)
            })
            .catch(error => {
                alert(error.stack)
            })
    }, [])

    return (
        <>
            <h1>{name}</h1>
            <DropZone producer={producer} />
        </>
    )
}

export default PhotoUploadPage
