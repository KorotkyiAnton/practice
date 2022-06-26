/**
 * decoration tools
 */
window.onload = () => {
    //main logo
    const mainLogo = document.getElementById("main");

    //menu fields
    const addContact = document.getElementById("addContact");
    const importContact = document.getElementById("import");
    const exportContact = document.getElementById("export");
    const searchForm = document.getElementById("searchForm");

    //<ul> element
    const listOfContact = document.getElementById("listOfContact");

    //<form> element to add and edit contact
    const contactForm = document.getElementById("contactForm");

    //<form> element to import contact as a JSON file
    const importContactForm = document.getElementById("importContactForm");

    //hide {contactForm; importContactForm} forms
    contactForm.style.display = "none";
    importContactForm.style.display = "none";

    //two display controllers
    addContact.addEventListener("click", function () {
        listOfContact.style.display = "none";
        importContactForm.style.display = "none";
        contactForm.style.display = "block";
    })

    importContact.addEventListener("click", function () {
        listOfContact.style.display = "none";
        contactForm.style.display = "none";
        importContactForm.style.display = "block";
    })


    /**
     * main functionality
     * 1: Показать все записи addGotData(JSON data)
     * 2: Добавления addPostData()
     * 3: Редактирования editContactFunction(HTMLButtonElement object)
     * 4: Удаления deleteContactFunction(HTMLButtonElement object)
     * 5: Поиск searchContact(string field)
     * 6: Экспорт exportContacts(string pathToFile)
     * 7: Импорт importContacts()
     * 8: Напоминалка reminder()
     */

    //тут надо дописать ссылку и нормально соеденить его с addGotData(data)
    // function showAllContacts() {
    //     fetch("")
    //         .then(res => res.json())
    //         .then(data => {
    //             //addGotData(data);
    //         })
    // }
    //showAllContacts();

    function addGotData(data) {
        listOfContact.innerHTML = "";
        data.forEach((row, index) => {
            listOfContact.innerHTML += "<li class=\"list-group-item\">\n" +
                "            <div class=\"d-flex flex-row align-items-center\">\n" +
                "                <a class=\"nav-link d-flex flex-fill\" data-bs-toggle=\"collapse\" href=\"#id" + index + "\">\n" +
                row.first +
                "                </a>\n" +
                "                <button type=\"button\" class=\"btn btn-icon\" onclick=\"editContactFunction(this)\" data-phone='" + row.fifth + "'>🖊</span>Edit</button>\n" +
                "                <button type=\"button\" class=\"btn btn-icon\" onclick=\"deleteContactFunction(this)\" data-phone='" + row.fifth + "'>🗑</span>Delete</button>\n" +
                "            </div>\n" +
                "            <div class=\"collapse\" id=\"id" + index + "\">\n" +
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

    /**
     * debugging
     * Это потом сотрете
     */
    let data = '[{"first":"Anton", "second":"university", "third":"friend", "fourth":"2002.01.02", "fifth":"380664236782", "sixth":"anton.korotkyi@nure.ua", "seventh":"Barabolkina st.", "eighth":"2022.06.01", "ninth":"sdfsdf", "tenth":"fsdfsdf"}, {"first":"Daniil", "second":"university", "third":"friend", "fourth":"01.03.2002", "fifth":"380996327334", "sixth":"daniil.hurenko@nure.ua", "seventh":"Dostoevskii st.", "eighth":"2022.06.28", "ninth":"sdfsdf", "tenth":"fsdfsdf"}]';
    addGotData(JSON.parse(data));
    /**
     * end of debugging
     */

    function addPostData() {
        //Тут наверное можно получить объект формы и запревентить сабмит, потом с помощью фетча отправить
    }
}

function editContactFunction(object) {
    listOfContact.style.display = "none";
    contactForm.style.display = "block";
    //edit item by phone
    window.alert(object.getAttribute("data-phone"));
}

function deleteContactFunction(object) {
    //delete item by phone
    window.alert(object.getAttribute("data-phone"));
}

function searchContact(field) {
    //field будет указывать по какому полю производить поиск
}

function exportContacts(path) {
    //я думаю, что надо просто выбрать все данные из таблицы, запихнуть их в JSON и все
}

function importContacts() {

}

function reminder() {

}


