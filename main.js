/**
 * decoration tools
 */
 const scriptUrl = 'https://script.google.com/macros/s/AKfycbza2vNeT_CPPD4yjzvcFVgSlseaDflsJJOBOXww-VBTthZ1iTcG6fkVOElSSYl_DBboDg/exec'; // Ссылка на развернутое веб-приложение gas
 var dataOnSite; // Данные которые сейчас на экране 
 window.onload = () => {
     //menu fields
     const addContact = document.getElementById("addContact");
     const importContact = document.getElementById("import");
     const exportContact = document.getElementById("export");
     const searchForm = document.getElementById("searchForm");
     const searchBtn = document.getElementById("searchBtn");       // Кнопка поиска
     const searchSelect = document.getElementById("searchSelect"); // селект поиска
     const searchInput = document.getElementById("searchInput");   // инпут поиска

     //<ul> element
     const listOfContact = document.getElementById("listOfContact");
 
     //<form> element to add and edit contact
     const contactForm = document.getElementById("contactForm");
     const submitBtn = document.getElementById("btnSubmit");       // Кнопка Submit
     const nameInput = document.getElementById("name");
     const companyInput = document.getElementById("company");
     const groupInput = document.getElementById("group");
     const phoneInput = document.getElementById("phone");
     const emailInput = document.getElementById("email");
     const addressInput = document.getElementById("address");
     const birthdayInput = document.getElementById("birthday");   
     
 
     //<form> element to import contact as a JSON file
     const importContactForm = document.getElementById("importContactForm");

     //hide {contactForm; importContactForm} forms
     contactForm.classList.add("collapse");
     importContactForm.classList.add("collapse");
 
     //two display controllers
     addContact.addEventListener("click", function () {
         listOfContact.classList.add("collapse");
         importContactForm.classList.add("collapse");
         contactForm.classList.remove("collapse");
         document.getElementById("name").setAttribute('value','');
         document.getElementById("company").setAttribute('value','');
         document.getElementById("group").setAttribute('value','');
         document.getElementById("birthday").setAttribute('value','');
         document.getElementById("phone").setAttribute('value','');
         document.getElementById("email").setAttribute('value','');
         document.getElementById("address").setAttribute('value','');
     })
 
     importContact.addEventListener("click", function () {
         importContacts()
     })
 
 
     /**
      * main functionality
      * 1: Показать все записи addGotData(JSON data)                     ?COMPLETED?
      * 2: Добавления addPostData()                                      ?COMPLETED?
      * 3: Редактирования editContactFunction(HTMLButtonElement object)  ?COMPLETED?
      * 4: Удаления deleteContactFunction(HTMLButtonElement object)      ?COMPLETED?
      * 5: Поиск searchContact(string field)                             ?COMPLETED?
      * 6: Экспорт exportContacts(string pathToFile)
      * 7: Импорт importContacts()
      * 8: Напоминалка reminder()
      * 9: Обновить дату последнего звонка updateLastCall()              ?COMPLETED?
      */

     searchBtn.addEventListener('click', (e)=>{ // Поиск контакта по выбранной категории и введенному значению
        searchContact(searchSelect, searchInput);
    })
    submitBtn.addEventListener('click', (e)=>{ // Поиск контакта по выбранной категории и введенному значению
        addPostData(nameInput, companyInput, groupInput, phoneInput, emailInput, addressInput, birthdayInput);
    })
    showAllContacts(); // Показать все контакты
 }

 function addPostData(nameInput, companyInput, groupInput, phoneInput, emailInput, addressInput, birthdayInput) { // Добавить Контакт
    const formData = new FormData();
    console.log(nameInput.value);
    console.log(nameInput.value);
    console.log(nameInput.value);
    const mainLogo = document.getElementById("main");
    formData.append('operation', 'addPostData'); // передаю тип операции
    formData.append('name', nameInput.value);
    formData.append('company', companyInput.value);
    formData.append('group', groupInput.value);
    formData.append('phone', phoneInput.value);
    formData.append('email', emailInput.value);
    formData.append('address', addressInput.value);
    formData.append('birthday', birthdayInput.value);
    fetch(scriptUrl,{
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        mainLogo.click(); // показать все контакты
    })
}
 
 function showAllContacts() {  // Показать все контакты
     fetch(scriptUrl)
         .then(res => res.json())
         .then(data => {
             dataOnSite = data;      // Сохранить данные
             addGotData(dataOnSite); // Отобразить данные в тегах
         })
 }

 
 function addGotData(data) {  // Отобразить данные в тегах
    console.log(dataOnSite);
    listOfContact.innerHTML = "";
    data.forEach((row, index) => {
        if(row.name !== '' && row.phone !== '' && row.email !== '') // Проверка важных ячеек, чтоб не выводилась пустота
        {
            listOfContact.innerHTML += "<li class=\"list-group-item mb-1\">\n" +
            "            <div class=\"d-flex flex-row align-items-center\">\n" +
            "                <a class=\"nav-link d-flex flex-fill\" data-bs-toggle=\"collapse\" href=\"#id" + index + "\">\n" +
            row.name +
            "                </a>\n" +
            "               <button type=\"button\" class=\"btn btn-icon\" onclick=\"updateLastCall(this)\" data-phone='" + row.phone + "'>🕿</span>Call</button>\n" +
            "                <button type=\"button\" class=\"btn btn-icon\" onclick=\"editContactFunction(this)\" data-name='" + row.name +"'data-company='" + row.company +"'data-group='" + row.group +"'data-birthday='" + row.birthday +"'data-phone='" + row.phone +"'data-email='" + row.email +"'data-address='" + row.address +"'data-lastCall='" + row.lastCall +"'data-additionInfo='" + row.additionInfo +"'data-Description='" + row.Description +  "'>🖊</span>Edit</button>\n" +
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
 
 function editContactFunction(object) { // Изменить контакт
     listOfContact.classList.add("collapse");
     importContactForm.classList.add("collapse");
     contactForm.classList.remove("collapse");
     document.getElementById("name").setAttribute('value',object.getAttribute("data-name"));
     document.getElementById("company").setAttribute('value',object.getAttribute("data-company"));
     document.getElementById("group").setAttribute('value',object.getAttribute("data-group"));
     document.getElementById("birthday").setAttribute('value',object.getAttribute("data-birthday"));
     document.getElementById("phone").setAttribute('value',object.getAttribute("data-phone"));   
     document.getElementById("email").setAttribute('value',object.getAttribute("data-email"));
     document.getElementById("address").setAttribute('value',object.getAttribute("data-address"));
     //document.getElementById("lastCall").setAttribute('value',object.getAttribute("data-lastCall"));   
     //document.getElementById("additionInfo").setAttribute('value',object.getAttribute("data-additionInfo"));
     //document.getElementById("description").setAttribute('value',object.getAttribute("data-description"));
     //console.log(field);
     //edit item by phone
     //window.alert(field);
     //добавить обработку submit
 }

 function deleteContactFunction(object) {  // Удалить контакт по номеру телефона
     //delete item by phone
     const formData = new FormData();
     formData.append('operation', 'deleteContact'); // передаю тип операции
     formData.append('phone', object.getAttribute("data-phone")); // передаю номер телефона
     fetch(scriptUrl,{
         method: 'POST',
         body: formData
     })
         .then(res => res.json())          
         .then(data => {
             showAllContacts(); // показать все контакты
         })
 }
 
 function searchContact(searchSelect, searchInput) { // Поиск контакта по выбранной категории и введенному значению
    const formData = new FormData();
     formData.append('operation', 'searchContact'); // типо операции
     formData.append('column', searchSelect.value); // выбранный столбец
     formData.append('value', searchInput.value); // введенное значение
     fetch(scriptUrl,{
         method: 'POST',
         body: formData
     })
         .then(res => res.json())          
         .then(data => {
            dataOnSite = data; // сохранить в переменную
            addGotData(dataOnSite); // вывести
         })
 }
 
 function exportContacts(path) { // Экспорт контактов, которые на экране
     var a = document.createElement("a");
     var file = new Blob([JSON.stringify(dataOnSite)], {type: "application/json"});
     a.href = URL.createObjectURL(file);
     a.download = "export.json";
     a.click();
 }
 
 function getImportFile() {
     fileInput=document.getElementById("file");
     fileInput.click();
 }
 
 function importContacts() { // Импорт контактов
     fileInput=document.getElementById("file");
     getImportFile()  
     fileInput.onchange = function(e) { 
 
         if (!fileInput) {
             alert("Um, couldn't find the fileinput element.");
           }
           else if (!fileInput.files) {
             alert("This browser doesn't seem to support the `files` property of file inputs.");
           }
           else if (!fileInput.files[0]) {
             alert("Please select a file before clicking 'Load'");
           }
           else {
             file = fileInput.files[0];
             fr = new FileReader();
             fr.onload = receivedText;
             fr.readAsText(file);
           }
       
           function receivedText(e) {
             let lines = e.target.result;
             var newArr = JSON.parse(lines); 
             const formData = new FormData();
             formData.append('operation', 'importContacts'); // тип операции
             formData.append('data', lines); // номер телефона
             fetch(scriptUrl,{
                method: 'POST',
                body: formData
            })
                .then(res => res.json())          
                .then(data => {
                    showAllContacts(); // показать все
                })
           }
       };
 }
 
 function reminder() {  // напоминалка
    const formData = new FormData();
     formData.append('operation', 'reminder'); // тип операции
     fetch(scriptUrl,{
         method: 'POST',
         body: formData
     })
         .then(res => res.json())          
         .then(data => {
         })
 }
 setInterval(reminder, 86400000);
 
 function updateLastCall(object) { // Обновить последний звонок
    //update last call by phone
    const formData = new FormData();
     formData.append('operation', 'updateLastCall'); // тип операции
     formData.append('phone', object.getAttribute("data-phone")); // номер телефона
     fetch(scriptUrl,{
         method: 'POST',
         body: formData
     })
         .then(res => res.json())          
         .then(data => {
             showAllContacts(); // показать все
         })
 }