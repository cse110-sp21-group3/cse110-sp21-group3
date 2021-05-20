let form = document.getElementById("set-name");

form.addEventListener("submit", () => {
    let name = document.getElementById("journal-name").value;
    let e = document.getElementById("error");

    // sends an error msg on bad input
    if (name == null || name.trim() === "") {
        e.innerHTML = "Please enter a valid name.";
    } else {
        e.innerHTML = "";
    }


    console.log(name);
});