// Не общался дней с:
const daysForFriend = 10;    // Друзьями.
const daysForRelative = 5;   // Родственниками.
const daysForColleague = 15; // Коллегами.

const yourEmail = ''; // Почта человека, который пользуется приложением.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkLastCallAndBirthday()                                          // Выполнить проверку последнего звонка и дня рождения.
{

  let day_1 = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Сегодняшний день.
  let day = String(date.getDate());                                          // Сегодняшний день в другом формате.
  let month = String(date.getMonth() + 1);                                   // Сегодняшний месяц.

  var holderForLastCallFriend = [];                                          // Массив последнего звонка друзьям.
  var holderForLastCallRelative = [];                                        // Массив последнего звонка родственникам.
  var holderForLastCallColleague = [];                                       // Массив последнего звонка коллегам.
  var holderForBirthday = [];                                                // Массив дней рождения.

  for(var i = 2; i <= lastRow; i = i + 1)                                    // Прохождение по всему листу.
  {////
    let day_2 = sheet.getRange(i,8).getValue();                              // День последнего звонка.
    let group = sheet.getRange(i,3).getValue();                              // Группа.
    if(typeof day_2 !== 'undefined' && day_2 !== '')                         // Если последний звонок заполнен.
    {//
      let differenceOfDays = diffDates(day_1, day_2);                        // Получение разницы дней.
      if(group == 'friend' && differenceOfDays > daysForFriend)              // Если это друзья и разница дней больше установленной.
      {
        holderForLastCallFriend.push(sheet.getRange(i,1).getValue());        // Вношу имя.
      }
      if(group == 'relative' && differenceOfDays > daysForRelative)          // Если это родственники и разница дней больше установленной.
      {
        holderForLastCallRelative.push(sheet.getRange(i,1).getValue());      // Вношу имя.
      }
      if(group == 'colleague' && differenceOfDays > daysForColleague)        // Если это коллеги и разница дней больше установленной.
      {
        holderForLastCallColleague.push(sheet.getRange(i,1).getValue());     // Вношу имя.
      }
    }//

    let gotBirth = new Date(sheet.getRange(i,4).getValue()).toLocaleDateString();  // Получение дня рождения человека.
    if(gotBirth.match(day) && gotBirth.match(month))                               // Сравнение с сегодняшней датой
    {
      holderForBirthday.push(sheet.getRange(i,1).getValue());                      // Вношу имя.
    }
  }////

  if(holderForLastCallFriend.length > 0)    // Если хоть 1 человек в группе друзей.
  {
    // Отправить соответствующее чообщение на почту.
      MailApp.sendEmail(yourEmail, "Contact Manager", "Вы не звонили друзьям " + holderForLastCallFriend + " уже больше " + daysForFriend + " дней. Не забывайте делать звонки друзьям!");
  }

  if(holderForLastCallRelative.length > 0)  // Если хоть 1 человек в группе родственников.
  {
    // Отправить соответствующее чообщение на почту.
      MailApp.sendEmail(yourEmail, "Contact Manager", "Вы не звонили родственникам " + holderForLastCallRelative + " уже больше " + daysForRelative + " дней. Не забывайте делать звонки близким людям!");
  }

  if(holderForLastCallColleague.length > 0) // Если хоть 1 человек в группе коллег.
  {
    // Отправить соответствующее чообщение на почту.
      MailApp.sendEmail(yourEmail, "Contact Manager", "Вы не звонили коллегам " + holderForLastCallColleague + " уже больше " + daysForColleague + " дней. Не забывайте делать звонки коллегам!");
  }

  if(holderForBirthday.length > 0)          // Если хоть у 1 человека сегодня день рождения.  
  {
    // Отправить соответствующее чообщение на почту.
      MailApp.sendEmail(yourEmail, "Contact Manager", "Сегодня у " + holderForBirthday + " день рождения. Не забудьте поздравить с днем рождения!");
  }

}

function diffDates(day_one, day_two)  // Функция расчета разницы двух дат в днях.
{
    return (new Date(day_one) - new Date(day_two)) / (60 * 60 * 24 * 1000);  // Вернуть полученный результат.
}


