/**
 * PhotoUploadPage component
 *
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import * as UrlQuery from '../../vendor/UrlQuery'
import DropZone from './DropZone'

/**
 * PhotoUploadPage component
 */
const PhotoUploadPage: React.FC = () => {
    UrlQuery.parse()
    const producer = UrlQuery.getValue('producer')

    return (
        <>
            <h1>{producer}</h1>
            <DropZone producer={producer} />
        </>
    )
}

export default PhotoUploadPage
