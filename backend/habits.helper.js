import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePathDatabase = path.join(__dirname, "database.json");

let databaseContent = [];
const dateToday = new Date().toISOString().slice(0, 10);

const loadDatabase = async () => {
  try {
    const data = await fs.promises.readFile(filePathDatabase, "utf8");
    databaseContent = JSON.parse(data);
    console.log("Base de données chargée avec succès");
  } catch (err) {
    console.error("Erreur lors du chargement de la base de données:", err);
    databaseContent = [];
  }
};

const checkDatabaseContent = async () => {
  if (databaseContent.length === 0) {
    await loadDatabase();
  }
};

const getHabits = async () => {
  checkDatabaseContent();

  return databaseContent.habits;
};

const writeFile = async (content) => {
  fs.writeFile(filePathDatabase, content, "utf8", (err) => {
    if (err) {
      console.error("Erreur lors de l'écriture du fichier :", err);
    } else {
      console.log("Fichier JSON écrit avec succès !");
    }
  });
};

const getTodayHabits = async () => {
  checkDatabaseContent();

  const habitTrueToday = databaseContent.habits.map((habit) => {
    return {
      id: habit.id,
      title: habit.title,
      isDoneToday: habit.daysDone[dateToday],
    };
  });

  return habitTrueToday;
};

const updateHabit = async (id, done = false) => {
  checkDatabaseContent();

  const habit = databaseContent.habits.find((h) => h.id === id);

  if (!habit) {
    console.error(`Habitude avec l'ID ${id} non trouvée`);
    return;
  }

  if (done === true) {
    habit.daysDone[dateToday] = true;
  } else {
    habit.daysDone[dateToday] = false;
  }

  console.log(databaseContent);

  const updateDate = JSON.stringify(databaseContent, null, 2);

  await writeFile(updateDate);
};

const addHabit = async (title) => {
  checkDatabaseContent();

  if (!databaseContent.habits) {
    databaseContent.habits = [];
  }

  const content = {
    id: databaseContent.habits.length + 1,
    title: title,
    daysDone: {},
  };

  databaseContent.habits.push(content);

  const newHabit = JSON.stringify(databaseContent, null, 2);

  await writeFile(newHabit);
};

const deleteHabit = async (id) => {
  checkDatabaseContent();

  const habitIndex = databaseContent.habits.findIndex((h) => h.id === id);

  if (habitIndex === -1) {
    throw new Error(`Habitude avec l'ID ${id} non trouvée`);
  }

  databaseContent.habits.splice(habitIndex, 1);

  const updatedContent = JSON.stringify(databaseContent, null, 2);
  await writeFile(updatedContent);
};

/*const main = async () => {
  await getHabits();
  await getTodayHabits();
  await addHabit("Faire du sport");
  await updateHabit(6, true);
};

main();*/
