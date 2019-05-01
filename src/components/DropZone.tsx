/**
 * DropZone component
 *
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { useDropzone } from 'react-dropzone'

/**
 * Interface for image file
 */
interface IImage extends File {
    preview: string
}

/**
 * DropZone component
 */
const DropZone: React.FC = () => {
    const [images, setImages] = React.useState<IImage[]>([])

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedImages => {
            setImages(
                acceptedImages.map(image => ({
                    ...image,
                    preview: URL.createObjectURL(image)
                }))
            )
        }
    })

    const thumbs = images.map((image: IImage) => (
        <div key={image.name}>
            <img src={image.preview} />
        </div>
    ))

    React.useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            images.forEach((image: IImage) =>
                URL.revokeObjectURL(image.preview)
            )
        },
        [images]
    )

    return (
        <section>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some images here, or click to select images</p>
            </div>
            <aside>{thumbs}</aside>
        </section>
    )
}

export default DropZone
