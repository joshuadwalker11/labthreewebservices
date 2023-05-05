window.onload = async () => {


    const response = await fetch("http://localhost:5234/api/TodoItems/xml");
    const data = await response.text();


    console.log(data);
}