/**
 * decoration tools
 */
const scriptUrl = 'https://script.google.com/macros/s/AKfycbzvprywA1m-k49L6hCtNhlXW6ddvdM93DaAEN_T4zfTv851YPhGpJhMu-iei9BOg3VQiw/exec'; // Ссылка на развернутое веб-приложение gas
let dataOnSite; // Данные которые сейчас на экране

window.onload = () => {
    const importContactForm = document.getElementById("importContactForm");
    const sortForm = document.getElementById("sortForm");
    contactForm.classList.add("collapse");
    importContactForm.classList.add("collapse");
    showAllContacts(); // Показать все контакты\
}

// Функция для вывода формы добавления контакта
function AdderSettings() {
    // вывод формы добавления контакта
    listOfContact.classList.add("collapse");
    importContactForm.classList.add("collapse");
    contactForm.classList.remove("collapse");
    sortForm.classList.add("collapse");
    document.getElementById("Label-phone").classList.remove("collapse");
    document.getElementById("phone").classList.remove("collapse");
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
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    if(nameInput){
        console.log(nameInput)
        alert("Введите имя")
        return;
    }
    if(phoneInput){
        console.log(phoneInput)
        alert("Введите телефон")
        return;
    }
    if(emailInput){
        console.log(emailInput)
        alert("Введите почту")
        return;
    }
    // Установка полей
    const companyInput = document.getElementById("company");
    const groupInput = document.getElementById("group");
    const addressInput = document.getElementById("address");
    const birthdayInput = document.getElementById("birthday");
    const additionInput = document.getElementById("additionalInfo");
    const descriptionInput = document.getElementById("description");
    // Вызов функции добавления/изменения
    addPostData(nameInput, companyInput, groupInput, phoneInput, emailInput, addressInput, birthdayInput, additionInput, descriptionInput);
}

// Функция добавления/изменения контакта
function addPostData(nameInput, companyInput, groupInput, phoneInput, emailInput, addressInput, birthdayInput, additionInput, descriptionInput) {
    base();
    const formData = new FormData();
    let dataOnSite = JSON.parse(localStorage.getItem("dataOnSite"));
    if ("index" in localStorage) {
        dataOnSite[localStorage.getItem("index")] = {
            "name": nameInput.value,
            "company": companyInput.value,
            "group": groupInput.value,
            "birthday": birthdayInput.value,
            "phone": parseInt(phoneInput.value),
            "email": emailInput.value,
            "address": addressInput.value,
            "lastCall": null,
            "addition": additionInput.value,
            "description": descriptionInput.value
        };
        localStorage.removeItem("index")
        localStorage.setItem("dataOnSite", JSON.stringify(dataOnSite));
    } else {
        dataOnSite.unshift({
            "name": nameInput.value,
            "company": companyInput.value,
            "group": groupInput.value,
            "birthday": birthdayInput.value,
            "phone": parseInt(phoneInput.value),
            "email": emailInput.value,
            "address": addressInput.value,
            "lastCall": null,
            "addition": additionInput.value,
            "description": descriptionInput.value
        });
        localStorage.setItem("dataOnSite", JSON.stringify(dataOnSite));
    }

function base(){
    listOfContact.classList.remove("collapse");
    importContactForm.classList.remove("collapse");
    contactForm.classList.add("collapse");
    sortForm.classList.remove("collapse");
}

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
    formData.append('addition', additionInput.value);
    formData.append('description', descriptionInput.value);
    localStorage.setItem("size", dataOnSite.length);
    addGotData(dataOnSite);
// Передача данных
    fetch(scriptUrl, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
        })
}

// Функция вывода всех контактов
function showAllContacts() {
    let dataLocal = JSON.parse(localStorage.getItem("dataOnSite"))
    if (("dataOnSite" in localStorage)&&(dataLocal.length==JSON.parse(localStorage.getItem("size")))) {
        sort()
    } else {
        // Отправляется запрос
        fetch(scriptUrl)//
            .then(res => res.json())
            .then(data => {
                data = data.reverse();
                localStorage.setItem("size", data.length);
                localStorage.setItem("dataOnSite", JSON.stringify(data));
                console.log(JSON.stringify(data));
                // Получаем данные
                dataOnSite = data;
                sort()
            })
    }
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
                "                <button type=\"button\" class=\"btn btn-icon\" onclick=\"editContactFunction(this)\" data-name='" + row.name + "'data-company='" + row.company + "'data-group='" + row.group + "'data-birthday='" + row.birthday + "'data-phone='" + row.phone + "'data-email='" + row.email + "'data-address='" + row.address + "'data-lastCall='" + row.lastCall + "'data-addition='" + row.addition + "'data-description='" + row.description + "'data-id='" + index + "' ><span class='pen me-1'></span>Edit</button>\n" +
                //Кнопка удаления контакта
                "                <button type=\"button\" class=\"btn btn-icon\" onclick=\"deleteContactFunction(this)\" data-phone='" + row.phone + "'><span class='trash me-1'></span>Delete</button>\n" +
                "            </div>\n" +
                "            <div class=\"collapse\" id=\"id" + index + "\">\n" +
                "                <div class=\"card card-body\">\n" +
                "                    <p>Company: " + row.company +
                "                    </p><p>Group: " + row.group +
                "                    </p><p>Birthday: " + new Date(row.birthday).toLocaleDateString() +
                "                    </p><p>Phone: " + row.phone +
                "                    </p><p>Email: " + row.email +
                "                    </p><p>Address: " + row.address +
                "                    </p><p>Last Call: " + new Date(row.lastCall).toLocaleDateString() +
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
    sortForm.classList.add("collapse");
    contactForm.classList.remove("collapse");

    document.getElementById("Label-phone").classList.add("collapse");
    document.getElementById("phone").classList.add("collapse");

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
    //let tmp = ('{"name":"' + object.getAttribute("data-name") + '","company":"' + object.getAttribute("data-company") + '","group":"' + object.getAttribute("data-group") + '","birthday":"' + object.getAttribute("data-birthday") + '","phone":' + object.getAttribute("data-phone") + ',"email":"' + object.getAttribute("data-email") + '","address":"' + object.getAttribute("data-address") + '","lastCall":' + JSON.stringify(object.getAttribute("data-lastCall")) + ',"addition":"' + object.getAttribute("data-addition") + '","description":"' + object.getAttribute("data-description") + '"}')
    localStorage.setItem("index", object.getAttribute("data-id"));
}

// Функция удаления контакта
function deleteContactFunction(object) {
    data=JSON.parse(localStorage.getItem("dataOnSite"));
    date = new Date();
    dateNow = String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear();
    Index=data.findIndex(o=>o.phone==object.getAttribute("data-phone"))
    data.splice(Index,1);
    localStorage.setItem("dataOnSite", JSON.stringify(data));
    const formData = new FormData();
    // Указание типа операции
    formData.append('operation', 'deleteContact');
    // Передача номера в качестве параметра
    formData.append('phone', object.getAttribute("data-phone"));
    addGotData(data);
    localStorage.setItem("size", data.length);
    // Запрос
    fetch(scriptUrl, {
        method: 'POST',
        body: formData
    })

        .then(res => res.json())
        .then(data => {

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
    sortForm.classList.remove("collapse");
}

// Функция экспорта контактов
function exportContacts(path) {
    //Создаём файл со значением наших данных
    let a = document.createElement("a");
    let file = new Blob([JSON.stringify(dataOnSite.reverse())], {type: "application/json"});
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
    const mainLogo = document.getElementById("main");
    getImportFile()
    //Когда нашли:
    fileInput.onchange = function (e) {
        //Валидируем получение файла
        if (!fileInput) {
            alert("Um, couldn't find the fileinput element.");
        } else if (!fileInput.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
        } else if (!fileInput.files[0]) {
            alert("Please select a file before clicking 'Load'");
        } else {
            // Перезагружаем страницу
            //Файл корректен, читаем данные, отправляем данные в таблицу
            file = fileInput.files[0];
            fr = new FileReader();
            fr.onload = receivedText;
            fr.readAsText(file);
        }

        //Функция отправки данных импорта
        function receivedText(e) {
            //Парсим данные
            let lines = JSON.parse(e.target.result);
            localStorage.setItem("dataOnSite", JSON.stringify(lines.reverse()));
            ; // показать все данные в таблице
            localStorage.setItem("size", data.length);
            lines = e.target.result
            sort()
            //Добавляем данные в форму
            const formData = new FormData();
            formData.append('operation', 'importContacts'); // тип операции
            formData.append('data', lines); // номер телефона
            //Отправляем запрос с формой в параметре
            fetch(scriptUrl, {
                method: 'POST',
                body: formData
            })
                .then(() => {
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
        .then(data => {
        })
}

// Устанавливаем интервал напоминания
setInterval(reminder, 86400000);

//Функция, которая обновляет дату последниего звонка
function updateLastCall(object) {
    data=JSON.parse(localStorage.getItem("dataOnSite"));
    date = new Date();
    dateNow = String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear();
    console.log(dateNow)
    Index=data.findIndex(o=>o.phone==object.getAttribute("data-phone"))
    data[Index].lastCall=dateNow;
    console.log(data[Index].lastCall)
    localStorage.setItem("dataOnSite", JSON.stringify(data));
    const formData = new FormData();
    // Указываем операцию
    formData.append('operation', 'updateLastCall');
    // Указываем номер телефона
    formData.append('phone', object.getAttribute("data-phone"));
    // Отображаем данные в тегах
    sort()
    // Отправляем запрос
    fetch(scriptUrl, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
        })
}

function sort() {
    let sortType = document.getElementById("sortParam");
    sortType.value;
    let data = JSON.parse(localStorage.getItem("dataOnSite"));
    console.log(sortType.value);
    console.log(data);
    if(sortType.value == "name"){
    data.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
    })
    }else if(sortType.value == "lastCall"){
        data.sort(function(a, b){
            date1 = new Date(a.lastCall).toLocaleDateString('en-US')
            date2 = new Date(b.lastCall).toLocaleDateString('en-US')
            if(date1 < date2) { return -1; }
            if(date1 > date2) { return 1; }
            return 0;
        }) 
    }
    localStorage.setItem("dataOnSite", JSON.stringify(data));
    addGotData(data)
}