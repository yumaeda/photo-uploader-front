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
interface IImage {
    name: string
    preview: string
}

/**
 * DropZone component
 */
const DropZone: React.FC = () => {
    const [images, setImages] = React.useState<IImage[]>([])
    const [files, setFiles] = React.useState<File[]>([])

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedImages => {
            setImages(
                acceptedImages.map((image: File) => ({
                    name: image.name,
                    preview: URL.createObjectURL(image)
                }))
            )
            setFiles(acceptedImages)
        }
    })

    /**
     * Upload selected images
     */
    const handleSubmit = () => {
        for (const file of files) {
            const formData = new FormData()
            formData.append('producerImages', file)

            const uri = './upload_producer_image.php'
            const method = 'POST'
            const headers = { Accept: 'text/html' }

            fetch(uri, { method, headers, body: formData }).catch(error => {
                alert(error.stack)
            })
        }
    }

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
            <aside>
                {images.map((image: IImage) => (
                    <div key={image.name}>
                        <img src={image.preview} />
                    </div>
                ))}
            </aside>
            <div>
                <button onClick={handleSubmit}>Upload</button>
            </div>
        </section>
    )
}

export default DropZone
