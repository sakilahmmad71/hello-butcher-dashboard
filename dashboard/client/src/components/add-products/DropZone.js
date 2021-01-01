import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './DropZone.css';

const DropZone = ({ title }) => {
    const onDrop = useCallback((acceptedFiles) => {}, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <div className="productform__file">
                    <h5>
                        Drag and drop some files here, or click to select files
                        (Maximum 4 products).
                    </h5>
                </div>
            )}
        </div>
    );
};

export default DropZone;
