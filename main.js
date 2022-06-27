/**
 * decoration tools
 */
const scriptUrl = 'https://script.google.com/macros/s/AKfycbz4AuOmbYvzZsrcBOe6FO7EY3pVEAFISk8IegMIBk_iUARLarnK28nK1QroSJsAObXDEw/exec'; // Ссылка на развернутое веб-приложение gas

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
     * 1: Показать все записи addGotData(JSON data)                     ?COMPLETED?
     * 2: Добавления addPostData()
     * 3: Редактирования editContactFunction(HTMLButtonElement object)
     * 4: Удаления deleteContactFunction(HTMLButtonElement object)      ?COMPLETED?
     * 5: Поиск searchContact(string field)
     * 6: Экспорт exportContacts(string pathToFile)
     * 7: Импорт importContacts()
     * 8: Напоминалка reminder()
     */

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

function showAllContacts() { 
    fetch(scriptUrl)
        .then(res => res.json())
        .then(data => {
            addGotData(data);
        })
}
showAllContacts();

function addGotData(data) {
   listOfContact.innerHTML = "";
   data.forEach((row, index) => {
       if(index != 0 && row.name != '' && row.phone != '' && row.email != '') // По индексу 0 приходят названия столбцов. Остальное проверка важных ячеек, чтоб не выводилась пустота
       {
           listOfContact.innerHTML += "<li class=\"list-group-item mb1\">\n" +
           "            <div class=\"d-flex flex-row align-items-center\">\n" +
           "                <a class=\"nav-link d-flex flex-fill\" data-bs-toggle=\"collapse\" href=\"#id" + index + "\">\n" +
           row.name +
           "                </a>\n" +
           "                <button type=\"button\" class=\"btn btn-icon\" onclick=\"editContactFunction(this)\" data-phone='" + row.phone + "'>🖊</span>Edit</button>\n" +
           "                <button type=\"button\" class=\"btn btn-icon\" onclick=\"deleteContactFunction(this)\" data-phone='" + row.phone + "'>🗑</span>Delete</button>\n" +
           "            </div>\n" +
           "            <div class=\"collapse\" id=\"id" + index + "\">\n" +
           "                <div class=\"card card-body\">\n" +
           "                    <p>Company: " + row.company +
           "                    </p><p>Group: " + row.group +
           "                    </p><p>Birthday: " + row.birthday +
           "                    </p><p>Phone: " + row.phone +
           "                    </p><p>Email: " + row.email +
           "                    </p><p>Address: " + row.address +
           "                    </p><p>Last Call: " + row.lastCall +
           "                    </p><p>Addition Info: " + row.addition +
           "                    </p><p>Description: " + row.description +
           "                </div>\n" +
           "            </div>\n" +
           "        </li>"
       }
   })
}

function editContactFunction(object) {
    listOfContact.style.display = "none";
    contactForm.style.display = "block";
    //edit item by phone
    window.alert(object.getAttribute("data-phone"));
}

function deleteContactFunction(object) {
    //delete item by phone
    const formData = new FormData();
    formData.append('operation', 'deleteContact');
    formData.append('phone', object.getAttribute("data-phone"));
    fetch(scriptUrl,{
        method: 'POST',
        body: formData
    })
        .then(res => res.json())          
        .then(data => {
            showAllContacts();
        })
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