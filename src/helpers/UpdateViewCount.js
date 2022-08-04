import axios from 'axios';

export const updateViewCount = ({ token, musicId }) => {
  console.log(token);
  let response = axios.put(
    'http://localhost:3000/music/' + musicId + '/views',
    {},
    { headers: { Authorization: 'Bearer ' + token } }
  );
  console.log(response);
  let data = response.data;
  console.log(data.success);
  if (data.success !== true) {
    console.log(data.msg);
  }
};
