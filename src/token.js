import React from 'react';
import axios from 'axios';

const token = async(data) => {
    return await axios.post("http://localhost:8080/api/auth/login", {
        email : "test@test.com",
        password : "05a671c66aefea124cc08b76ea6d30bb",
    })
};

export default token;
