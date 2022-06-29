/**
 * decoration tools
 */
const scriptUrl = 'https://script.google.com/macros/s/AKfycbza2vNeT_CPPD4yjzvcFVgSlseaDflsJJOBOXww-VBTthZ1iTcG6fkVOElSSYl_DBboDg/exec'; // Ссылка на развернутое веб-приложение gas
let dataOnSite; // Данные которые сейчас на экране
window.onload = () => {
    const importContactForm = document.getElementById("importContactForm");
    contactForm.classList.add("collapse");
    importContactForm.classList.add("collapse");

    showAllContacts(); // Показать все контакты
}

// Функция для вывода формы добавления контакта
function AdderSettings() {
    // вывод формы добавления контакта
    listOfContact.classList.add("collapse");
    importContactForm.classList.add("collapse");
    contactForm.classList.remove("collapse");
    // Установка полей пустыми
    document.getElementById("name").setAttribute('value', '');
    document.getElementById("company").setAttribute('value', '');
    document.getElementById("group").setAttribute('value', '');
    document.getElementById("birthday").setAttribute('value', '');
    document.getElementById("phone").setAttribute('value', '');
    document.getElementById("email").setAttribute('value', '');
    document.getElementById("address").setAttribute('value', '');
    document.getElementById("additionalInfo").setAttribute('value', '');
    document.getElementById("description").setAttribute('value', '');
}

// Функция для обработки нажатия на кнопку добавления/изменения контакта
function SubmitBtn() {
    // Установка полей
    const nameInput = document.getElementById("name");
    const companyInput = document.getElementById("company");
    const groupInput = document.getElementById("group");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const addressInput = document.getElementById("address");
    const birthdayInput = document.getElementById("birthday");
    const additionalInput = document.getElementById("additionalInfo");
    const descriptionInput = document.getElementById("description");
    // Вызов функции добавления/изменения
    addPostData(nameInput, companyInput, groupInput, phoneInput, emailInput, addressInput, birthdayInput, additionalInput, descriptionInput);
}

// Функция добавления/изменения контакта 
function addPostData(nameInput, companyInput, groupInput, phoneInput, emailInput, addressInput, birthdayInput) {
    const formData = new FormData();
    const mainLogo = document.getElementById("main");
    // Указание типа операции
    formData.append('operation', 'addPostData');
    // Добавление данных
    formData.append('name', nameInput.value);
    formData.append('company', companyInput.value);
    formData.append('group', groupInput.value);
    formData.append('phone', phoneInput.value);
    formData.append('email', emailInput.value);
    formData.append('address', addressInput.value);
    formData.append('birthday', birthdayInput.value);
    formData.append('additionalInfo', additionalInput.value);
    formData.append('description', descriptionInput.value);
    // Передача данных
    fetch(scriptUrl, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(() => {
            // Перезагружаем страницу
            mainLogo.click();
        })
}

// Функция вывода всех контактов
function showAllContacts() {
    // Отправляется запрос
    fetch(scriptUrl)//
        .then(res => res.json())
        .then(data => {
            // Получаем данные
            dataOnSite = data;
            // Отображаем данные в тегах
            addGotData(dataOnSite);
        })
}

// Функция отображения всех контактов
function addGotData(data) {
    listOfContact.innerHTML = "";
    //За каждую строку в таблице получаем по ряду
    data.forEach((row, index) => {
        if (row.name !== '' && row.phone !== '' && row.email !== '') // Проверка важных ячеек, чтоб не выводилась пустота
        {
            listOfContact.innerHTML += "<li class=\"list-group-item mb-1\">\n" +
                "            <div class=\"d-flex flex-row align-items-center\">\n" +
                "                <a class=\"nav-link d-flex flex-fill\" data-bs-toggle=\"collapse\" href=\"#id" + index + "\">\n" +
                row.name +
                "                </a>\n" +
                //Кнопка звонка
                "               <button type=\"button\" class=\"btn btn-icon\" onclick=\"updateLastCall(this)\" data-phone='" + row.phone + "'><span class='phone me-1'></span>Call</button>\n" +
                //Кнопка изменения контакта
                "                <button type=\"button\" class=\"btn btn-icon\" onclick=\"editContactFunction(this)\" data-name='" + row.name + "' data-company='" + row.company + "' data-group='" + row.group + "' data-birthday='" + row.birthday + "' data-phone='" + row.phone + "' data-email='" + row.email + "' data-address='" + row.address + "' data-lastCall='" + row.lastCall + "' data-addition='" + row.addition + "' data-Description='" + row.description + "'><span class='pen me-1'></span>Edit</button>\n" +
                //Кнопка удаления контакта
                "                <button type=\"button\" class=\"btn btn-icon\" onclick=\"deleteContactFunction(this)\" data-phone='" + row.phone + "'><span class='trash me-1'></span>Delete</button>\n" +
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

// Функция изменения контакта
function editContactFunction(object) {
    // Выводим форму для заполнения
    listOfContact.classList.add("collapse");
    importContactForm.classList.add("collapse");
    contactForm.classList.remove("collapse");
    // Заполняем поля уже имеющимися данными
    document.getElementById("name").setAttribute('value', object.getAttribute("data-name"));
    document.getElementById("company").setAttribute('value', object.getAttribute("data-company"));
    document.getElementById("group").setAttribute('value', object.getAttribute("data-group"));
    document.getElementById("birthday").setAttribute('value', object.getAttribute("data-birthday"));
    document.getElementById("phone").setAttribute('value', object.getAttribute("data-phone"));
    document.getElementById("email").setAttribute('value', object.getAttribute("data-email"));
    document.getElementById("address").setAttribute('value', object.getAttribute("data-address"));
    document.getElementById("additionalInfo").setAttribute('value', object.getAttribute("data-addition"));
    document.getElementById("description").setAttribute('value', object.getAttribute("data-description"));
}

// Функция удаления контакта
function deleteContactFunction(object) {
    const formData = new FormData();
    // Указание типа операции
    formData.append('operation', 'deleteContact');
    // Передача номера в качестве параметра
    formData.append('phone', object.getAttribute("data-phone"));
    // Запрос
    fetch(scriptUrl, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(() => {
            // Выводим все контакты
            showAllContacts();
        })
}

// Функция поиска данных
function searchContact() {
    const searchSelect = document.getElementById("searchSelect");
    const searchInput = document.getElementById("searchInput");
    const formData = new FormData();
    // Указываем операцию
    formData.append('operation', 'searchContact');
    // Указываем колонку по которой идёт поиск
    formData.append('column', searchSelect.value);
    // Указываем значение по которому идёт поиск
    formData.append('value', searchInput.value);
    // Посылаем запрос
    fetch(scriptUrl, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            //Получаем данные
            dataOnSite = data;
            //Выводим данные
            addGotData(dataOnSite);
        })
    listOfContact.classList.remove("collapse");
    importContactForm.classList.add("collapse");
    contactForm.classList.add("collapse");
}

// Функция экспорта контактов
function exportContacts() {
    //Создаём файл со значением наших данных
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(dataOnSite)], {type: "application/json"});
    a.href = URL.createObjectURL(file);
    a.download = "export.json";
    //Инициируем скачивание
    a.click();
}

//Функция поиска файла для импорта
function getImportFile() {
    //Инициируем нажатие на fileInput
    fileInput = document.getElementById("file");
    fileInput.click();
}

//Функция импорта
function importContacts() {
    //Ищем файл
    fileInput = document.getElementById("file");
    getImportFile()
    //Когда нашли:
    fileInput.onchange = function () {
        //Валидируем получение файла
        if (!fileInput) {
            alert("Um, couldn't find the fileinput element.");
        } else if (!fileInput.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
        } else if (!fileInput.files[0]) {
            alert("Please select a file before clicking 'Load'");
        } else {
            //Файл корректен, читаем данные, отправляем данные в таблицу
            file = fileInput.files[0];
            fr = new FileReader();
            fr.onload = receivedText;
            fr.readAsText(file);
        }

        //Функция отправки данных импорта
        function receivedText(e) {
            //Парсим данные
            let lines = e.target.result;
            //Добавляем данные в форму
            const formData = new FormData();
            formData.append('operation', 'importContacts'); // тип операции
            formData.append('data', lines); // номер телефона
            //Отправляем запрос с формой в параметре
            fetch(scriptUrl, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(() => {
                    showAllContacts(); // показать все данные в таблице
                })
        }
    };
}

//Функция, реализующая напоминание
function reminder() {
    const formData = new FormData();
    // Указываем операцию
    formData.append('operation', 'reminder');
    // Делаем запрос напоминания
    fetch(scriptUrl, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(() => {
        })
}

// Устанавливаем интервал напоминания
setInterval(reminder, 86400000);

//Функция, которая обновляет дату последниего звонка
function updateLastCall(object) {
    const formData = new FormData();
    // Указываем операцию
    formData.append('operation', 'updateLastCall');
    // Указываем номер телефона
    formData.append('phone', object.getAttribute("data-phone"));
    // Отправляем запрос
    fetch(scriptUrl, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(() => {
            showAllContacts();// показать все данные в таблице
        })
}