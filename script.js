const calendar = document.querySelector(".calendar");

const date = new Date();
//const date = new Date("06-08-2021");

const weeks = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

// Cria e exibe a div que mostra o mês e ano
const displayMonth = document.createElement("div");
displayMonth.classList.add("display-month");

const buttonBackMonth = document.createElement("button");
buttonBackMonth.classList.add("button-back-month");
buttonBackMonth.innerHTML = "<";

const textMonth = document.createElement("span");
textMonth.classList.add("text-month");

const buttonNextMonth = document.createElement("button");
buttonNextMonth.classList.add("button-next-month");
buttonNextMonth.innerHTML = ">";

displayMonth.appendChild(buttonBackMonth);
displayMonth.appendChild(textMonth);
displayMonth.appendChild(buttonNextMonth);

calendar.appendChild(displayMonth);

const weeksDiv = document.createElement("div");
weeksDiv.classList.add("weeks");

for (const week of weeks) {
  const dayWeekDiv = document.createElement("div");
  dayWeekDiv.classList.add("week");
  dayWeekDiv.classList.add(
    week
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
  );
  dayWeekDiv.innerHTML = week;
  weeksDiv.appendChild(dayWeekDiv);
}

calendar.appendChild(weeksDiv);

let arrayMonth = [];

// Cria variável auxiliar para manipular a data
let date2 = date;

textMonth.innerHTML = `${months[date2.getMonth()]} ${date2.getFullYear()}`;

// pega o último dia do mes atual
// E guarda em lastDay
date2.setMonth(date2.getMonth() + 1);
date2.setDate(1);

const lastDay = new Date(date2.setDate(date2.getDate() - 1));

// Define o dia para o primeiro do mês
date2.setDate(1);
console.log("date2", date2);
const handlePopulateArrayDate = (arrayMonth, currentDay) => {
  // adiciona o dia com mês e semana no array
  arrayMonth.push({
    day: currentDay.getDate(),
    week: currentDay.getDay(),
    month: currentDay.getMonth(),
    year: currentDay.getFullYear(),
  });

  currentDay = new Date(currentDay.setDate(currentDay.getDate() + 1));
};

// verifica se o primeiro dia é no meio da semana
if (date2.getDay() + 1 > date2.getDate()) {
  // define o dia para o primeiro dia dessa semana
  date2.setDate(date2.getDate() - date2.getDay());
}
let currentDay = date2;

while (currentDay <= lastDay) {
  handlePopulateArrayDate(arrayMonth, currentDay);
}

if (currentDay.getDay() !== 0) {
  for (let i = currentDay.getDay(); i <= 6; i++) {
    handlePopulateArrayDate(arrayMonth, currentDay);
  }
}

const days = document.createElement("div");
days.classList.add("days");

for (const item of arrayMonth) {
  const day = document.createElement("div");
  day.classList.add("day");
  day.dataset.day = item.day;
  day.dataset.month = item.month;
  day.dataset.year = item.year;
  if (date.getMonth() !== item.month + 1) {
    day.dataset.unfocused = true;
  }
  day.innerHTML = item.day;
  days.appendChild(day);
}
for (let i = 0; i < 31; i++) {}

calendar.appendChild(days);
