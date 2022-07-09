const id = '1izn5fZ1-Iurdz9EKH4lxSu72BZVtOKfpoQpzLVqHpL0';      // id нужной таблицы google.
const sheet = SpreadsheetApp.openById(id).getSheetByName('l1'); // Нужный лист таблицы.

let date = new Date();
let dateNow = String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear(); // Получение даты на сегодня.

var lastRow = sheet.getLastRow();        // Последняя строка листа.
var lastColumn = sheet.getLastColumn();  // Последний столбец листа.
 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
function doGet(e)                                           // GET запрос.
{
  const holder = [];                                        // Данные для отправки.
  for(var row = 2; row <= lastRow; row = row + 1)           // Прохождение по всему листу.
    {
      const temp = {                                        // Полученные данные засунуть во временную переменную.
      name: sheet.getRange(row,1).getValue(),
      company: sheet.getRange(row,2).getValue(),
      group: sheet.getRange(row,3).getValue(),
      birthday: new Date(sheet.getRange(row,4).getValue()),
      phone: sheet.getRange(row,5).getValue(),
      email: sheet.getRange(row,6).getValue(),
      address: sheet.getRange(row,7).getValue(),
      lastCall: new Date(sheet.getRange(row,8).getValue()),
      addition: sheet.getRange(row,9).getValue(),
      description: sheet.getRange(row,10).getValue()
    }
    holder.push(temp);                                      // Затолкнуть временную переменную в массив.
    } 
  return ContentService.createTextOutput(JSON.stringify(holder)).setMimeType(ContentService.MimeType.JSON);  // Вернуть массив в JSON.
}


function doPost(e)                                                 // POST запрос.   
{
  try
  {
      switch(e.parameter['operation'])                             // Получение типо операции из параметров.
      {
        case 'addPostData':                                        // Операция Добавления пользователя.
        addPostData(e);                                            // Вызов нужной функции.
        break;

        case 'deleteContact':                                      // Операция Удаления пользователя.
        deleteContact(e);                                          // Вызов нужной функции.
        break;

        case 'searchContact':                                      // Операция Поиска пользователя.
        const holder = searchContact(e);                           // Вызов нужной функции и получение данных.
        return ContentService.createTextOutput(JSON.stringify(holder)).setMimeType(ContentService.MimeType.JSON);  // Вернуть данные.

        case 'updateLastCall':                                     // Операция Обновления последнего звонка.
        updateLastCall(e);                                         // Вызов нужной функции.
        break;

        case 'importContacts':                                     // Операция Импорта контактов.
        importContacts(e);                                         // Вызов нужной функции.
        break;

        case 'reminder':                                           // Операция Напоминания последних звонков и дней рождения.
        checkLastCallAndBirthday();                                // Вызов нужной функции из другого файла в проекте.
        break;
      }
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'success': 1 }))  // В случае успеха вернуть строку success.
      .setMimeType(ContentService.MimeType.JSON);
  }
  catch(e)
  {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 0 }))      // В случае ошибки вернуть строку error.
      .setMimeType(ContentService.MimeType.JSON);
  }
}


function addPostData(e)                                                             // Функция добавления пользователя по номеру телефона.
{
  var foundName = '';                                                               // Найденное имя. 
  for(var index = 1; index <= lastRow; index = index + 1)                           // Пройтись по листу.
      {
        var nam = sheet.getRange(index,1).getValue();                             // Получить имя контакта.
        if(nam == e.parameter['name'])                                            // Если телефон нужный, значит, контакт существет и его надо изменить.
          {
            sheet.getRange(index,2).setValue(e.parameter['company']); 
            sheet.getRange(index,3).setValue(e.parameter['group']); 
            sheet.getRange(index,4).setValue(new Date(e.parameter['birthday'])); 
            sheet.getRange(index,5).setValue(e.parameter['phone']); 
            sheet.getRange(index,6).setValue(e.parameter['email']); 
            sheet.getRange(index,7).setValue(e.parameter['address']); 
            sheet.getRange(index,9).setValue(e.parameter['addition']); 
            sheet.getRange(index,10).setValue(e.parameter['description']); 
            foundName = nam;                                                      // Записать в найденное.
          }
      }
      if(foundName == '')                                                          // А если такого имени найдено не было - добавить новый контакт в конец.
      {
      sheet.appendRow([e.parameter['name'],e.parameter['company'],e.parameter['group'], e.parameter['birthday'], e.parameter['phone'], e.parameter['email'], e.parameter['address'], '', e.parameter['addition'], e.parameter['description']]);
      }
}


function deleteContact(e)                                                            // Функция удаления пользователя по номеру телефона.
{
  for(var index = 1; index <= lastRow; index = index + 1)                            // Пройтись по листу.
      {
        var gotName = sheet.getRange(index,1).getValue();                          // Получить имя контакта.
        if(gotName == e.parameter['name'])                                         // Если имя нужное, значит, контакт надо удалить.
          {
            sheet.deleteRow(index);
          }
      }
}


function searchContact(e)                                                                  // Функция поиска пользователя по номеру телефона.
{
  const holder = [];                                                                       // Данные для отправки.  
  if(e.parameter['value'] != '')                                                           // Если передаваемое значение того, что ищется, не пустое.
  {
    for(var column = 1; column <= lastColumn; column = column + 1)                         // Пройтись по столбцам.     
    {
      if(sheet.getRange(1,column).getValue() == e.parameter['column'])                     // Если нашелся нужный столбец.
      {
          for(var row = 1; row <= lastRow; row = row + 1)                                  // Пройтись по ячейкам столбца.
          {
            var first = sheet.getRange(row,column).getValue().toString();                  // Получить значение с ячейки.
            var second = e.parameter['value'].toString();                                  // Получить передаваемое значение.
            if(first.toLowerCase().match(second.toLowerCase()))                            // Проверить на соответствие, если подходит - затолкнуть в массив.
            {
                const temp = {                                                              
                name: sheet.getRange(row,1).getValue(),
                company: sheet.getRange(row,2).getValue(),
                group: sheet.getRange(row,3).getValue(),
                birthday: sheet.getRange(row,4).getValue(),
                phone: sheet.getRange(row,5).getValue(),
                email: sheet.getRange(row,6).getValue(),
                address: sheet.getRange(row,7).getValue(),
                lastCall: sheet.getRange(row,8).getValue(),
                addition: sheet.getRange(row,9).getValue(),
                description: sheet.getRange(row,10).getValue()
              }
              holder.push(temp);
            }
          }
      }
    }
  }
  else                                                                                      // Если пользователь ничего не вписывал в поиск - вернуть весь список.
  {
    for(var row = 2; row <= lastRow; row = row + 1) 
    {
      const temp = {
      name: sheet.getRange(row,1).getValue(),
      company: sheet.getRange(row,2).getValue(),
      group: sheet.getRange(row,3).getValue(),
      birthday: sheet.getRange(row,4).getValue(),
      phone: sheet.getRange(row,5).getValue(),
      email: sheet.getRange(row,6).getValue(),
      address: sheet.getRange(row,7).getValue(),
      lastCall: sheet.getRange(row,8).getValue(),
      addition: sheet.getRange(row,9).getValue(),
      description: sheet.getRange(row,10).getValue()
    }
    holder.push(temp);
    }
  }
    return holder;                                                                         // Вернуть список.
}


function updateLastCall(e)                                         // Функция обновления последнего звонка по телефону.
{
  for(var index = 1; index <= lastRow; index = index + 1)          // Пройтись по листу.
      {
        var gotName = sheet.getRange(index,1).getValue();          // Получить имя контакта.
        if(gotName == e.parameter['name'])                      // Если то, что надо - изменить ячейку Last Call сегодняшней датой.
          {
            sheet.getRange(index,8).setValue(dateNow + " " + date.getHours() + ":" + date.getMinutes() + ":" +date.getSeconds()); 
          }
      }
}

function importContacts(e)                                         // Функция Импорта контактов.
{
  const data = JSON.parse(e.parameter['data']);                    // Получить передаваемые данные.
  sheet.clear();                                                   // Очистить лист.
  sheet.appendRow(['Name', 'Company', 'Group', 'Birthday', 'Phone', 'Email', 'Address', 'Last Call', 'Additional Info', 'Description']);  // Добавить надписи столбцов.
  for(var index = 0; index < data.length; index = index + 1)       // Добавить каждый объект из полученных данных в таблицу.
  {
    sheet.appendRow([data[index]['name'], data[index]['company'], data[index]['group'], new Date(data[index]['birthday']).toLocaleDateString(), data[index]['phone'], data[index]['email'], data[index]['address'], new Date(data[index]['lastCall']).toLocaleString(), data[index]['addition'], data[index]['description']]);
  }
}



