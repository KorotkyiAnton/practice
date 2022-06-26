window.onload = () => {
    //decoration tools
    //main logo
    const mainLogo = document.getElementById("main");

    //menu fields
    const addContact = document.getElementById("addContact");
    const importContact = document.getElementById("import");
    const exportContact = document.getElementById("export");
    const searchForm = document.getElementById("searchForm");

    //<ul> element
    const listOfContact = document.getElementById("listOfContact");
    //options in <li> element
    const redactContact = document.getElementById("edit");
    const deleteContact = document.getElementById("delete");

    //<form> element to add and edit contact
    const contactForm = document.getElementById("contactForm");

    //<form> element to import contact as a JSON file
    const importContactForm = document.getElementById("importContactForm");

    //hide {contactForm; importContactForm} forms
    contactForm.style.display = "none";
    importContactForm.style.display = "none";

    //three display controllers
    addContact.addEventListener("click", function () {
        listOfContact.style.display = "none";
        contactForm.style.display = "block";
    })

    redactContact.addEventListener("click", function () {
        listOfContact.style.display = "none";
        contactForm.style.display = "block";
    })

    importContact.addEventListener("click", function () {
        listOfContact.style.display = "none";
        importContactForm.style.display = "block";
    })

    // main functionality
    //showAllContacts();
    // function showAllContacts() {
    //     let url = "";
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => {
    //             //addGotData(data);
    //         })
    // }

    function addGotData(data) {
        listOfContact.innerHTML = "";
        data.forEach((row, index) => {
            listOfContact.innerHTML += "<li class=\"list-group-item\">\n" +
                "            <div class=\"d-flex flex-row align-items-center\">\n" +
                "                <a class=\"nav-link d-flex flex-fill\" data-bs-toggle=\"collapse\" href=\"#id"+index+"\">\n" +
                                     row.first +
                "                </a>\n" +
                "                <button type=\"button\" class=\"btn btn-icon\" id=\"edit\">🖊</span>Edit</button>\n" +
                "                <button type=\"button\" class=\"btn btn-icon\" id=\"delete\">🗑</span>Delete</button>\n" +
                "            </div>\n" +
                "            <div class=\"collapse\" id=\"id"+index+"\">\n" +
                "                <div class=\"card card-body\">\n" +
                "                    <p>Company: " + row.second +
                "                    </p><p>Group: " + row.third +
                "                    </p><p>Birthday: " + row.fourth +
                "                    </p><p>Phone: " + row.fifth +
                "                    </p><p>Email: " + row.sixth +
                "                    </p><p>Address: " + row.seventh +
                "                    </p><p>Last Call: " + row.eighth +
                "                    </p><p>Addition Info: " + row.ninth +
                "                    </p><p>Description: " + row.tenth +
                "                </div>\n" +
                "            </div>\n" +
                "        </li>"
        })
    }

    let data = '[{"first":"Anton", "second":"university", "third":"friend", "fourth":"2002.01.02", "fifth":"380664236782", "sixth":"anton.korotkyi@nure.ua", "seventh":"Barabolkina st.", "eighth":"2022.06.01", "ninth":"sdfsdf", "tenth":"fsdfsdf"}, {"first":"Daniil", "second":"university", "third":"friend", "fourth":"2002.01.02", "fifth":"380664236782", "sixth":"anton.korotkyi@nure.ua", "seventh":"Barabolkina st.", "eighth":"2022.06.01", "ninth":"sdfsdf", "tenth":"fsdfsdf"}]';

    addGotData(JSON.parse(data));
}