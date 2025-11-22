const cardInserted = true; // Указывает, что карта вставлена
const balance = 500; // Доступная сумма

const amount = 1000; // Ввод суммы операции

if (cardInserted) {
  if (amount <= balance) {
    console.log("Операция выполняется");
  } else {
    console.log("Операция отклонена");
  }
} else {
  console.log("Операция отклонена");
}
