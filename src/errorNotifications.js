const errorNotifications = async (err) => {
    if(err.status >= 400 && err.status < 600) {
        const errorJSON = await err.json();
        // const errorJSON = err;
  
        console.log("ERRORJSON!!!", errorJSON);
  
        const errorsContainer = document.querySelector(".errors-container");
  
        let errorsHtml = [
            `<li>
                Something went wrong. Please try again.
            </li>`,
        ];
  
        const { errors } = errorJSON;
  
        if(errors && Array.isArray(errors)) {
            errorsHtml = errors.map(
                (message) => {
                    console.log("MESSAGE!!!", message);
                    return (`
                        <li>
                            ${ message }
                        </li>
                    `)
                }
            )
        }
        errorsContainer.innerHTML = errorsHtml.join("");
  
    } else {
        alert(
            "Something went wrong. Please check your internet connection and try again!"
        );
  
    }
  };
  
  export default errorNotifications;