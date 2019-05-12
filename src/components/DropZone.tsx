/**
 * DropZone component
 *
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { IProducer } from '../interfaces/IProducer'

/**
 * Interface for image file
 */
interface IImage {
    name: string
    preview: string
}

/**
 * Interface for props
 */
interface IProps {
    producer: IProducer
}

/**
 * DropZone component
 */
const DropZone: React.FC<IProps> = props => {
    const { producer } = props
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
        // Clears preview images
        setImages([])

        files.forEach((file: File, index: number) => {
            const formData = new FormData()
            formData.append('producerImages', file)
            formData.append('name', producer.short_name)
            formData.append('country', producer.country)
            formData.append('region', producer.region)
            formData.append('district', producer.district)
            formData.append('village', producer.village)
            formData.append('index', (++index).toString())

            const uri = './upload_producer_image.php'
            const method = 'POST'
            const headers = { Accept: 'text/html' }
            fetch(uri, { method, headers, body: formData })
                .then(() => {
                    alert(`Uploaded file ${index}!!`)
                })
                .catch(error => {
                    alert(error.stack)
                })
        })
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
                <button onClick={() => window.close()}>Close</button>
            </div>
        </section>
    )
}

export default DropZone
