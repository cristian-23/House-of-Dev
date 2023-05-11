const cookie = () => {
    const cookieJWT = JSON.parse(localStorage.getItem("cookie"));
    return cookieJWT.token;
  };
  export default cookie;