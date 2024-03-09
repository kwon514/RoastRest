import axios from "axios";

function getCoffeeData(coffeeId) {
    return axios.get(`http://localhost:4000/api/coffee/${coffeeId}`,
        { withCredentials: true }
    ).then((res) => {
        return res.data;
    });
}

export default getCoffeeData;