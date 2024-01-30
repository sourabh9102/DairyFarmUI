import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";


function UpdateProfile() {

    const [file, setFile] = useState();
    const navigate = useNavigate();

    const handleUpload = (e) => {
        const formdata = new FormData();
        formdata.append('file', file);
        axios.post('http://localhost:5001/auth/upload', formdata)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const handleBack = () => {
        navigate('/userprofile')
    }

    return (
        <>
            <Card className="pt-11 mt-6 w-96">
                <CardHeader color="white" className="relative">
                    <Typography variant="h5" color="black" className='text-center mt-2 mb-2'>
                        Change Your Profile Photo
                    </Typography>
                </CardHeader>
                <CardBody>
                    <Typography className='flex' color="black">
                        <input type='file' onChange={e => setFile(e.target.files[0])} />
                        <button type='submit' className="bg-white hover:bg-gray-100 ml-11 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={handleUpload}>Upload</button>
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button onClick={handleBack}>Back to Profile Page</Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default UpdateProfile