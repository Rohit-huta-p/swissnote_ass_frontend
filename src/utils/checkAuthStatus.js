
export const checkAuthStatus = (isLoggedIn, setIsLoggedIn) => {
    const token = localStorage.getItem("authToken");
    const expiryTime = localStorage.getItem("authTokenExpiry");
  
    if (token && expiryTime) {
      const now = Date.now();
  
      if (now < parseInt(expiryTime, 10)) {
        // Token is valid
        setIsLoggedIn(true );
      } else {
        // Token expired
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenExpiry");
       setIsLoggedIn(false);
      }
    } else {
      // No token
      setIsLoggedIn(false);
    }
  };
  