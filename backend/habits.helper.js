import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePathDatabase = path.join(__dirname, "database.json");

let databaseContent = { habits: [] };
const dateToday = new Date().toISOString().slice(0, 10);

const loadDatabase = async () => {
  try {
    const data = await fs.promises.readFile(filePathDatabase, "utf8");
    databaseContent = JSON.parse(data);
    console.log("Base de données chargée avec succès");
  } catch (err) {
    console.error("Erreur lors du chargement de la base de données:", err);
    databaseContent = { habits: [] };
  }
};

const checkDatabaseContent = async () => {
  await loadDatabase();
};

const getHabits = async () => {
  await checkDatabaseContent();
  return databaseContent.habits;
};

const writeFile = async (content) => {
  try {
    await fs.promises.writeFile(filePathDatabase, content, "utf8");
    console.log("Fichier JSON écrit avec succès !");
  } catch (err) {
    console.error("Erreur lors de l'écriture du fichier :", err);
    throw err;
  }
};

const getTodayHabits = async () => {
  await checkDatabaseContent();

  const habitTrueToday = databaseContent.habits.map((habit) => {
    return {
      id: habit.id,
      title: habit.title,
      isDoneToday: habit.daysDone[dateToday] || false,
    };
  });

  return habitTrueToday;
};

const updateHabit = async (id, done = false) => {
  await checkDatabaseContent();

  const habit = databaseContent.habits.find((h) => h.id === parseInt(id));

  if (!habit) {
    throw new Error(`Habitude avec l'ID ${id} non trouvée`);
  }

  habit.daysDone[dateToday] = done;

  const updateDate = JSON.stringify(databaseContent, null, 2);
  await writeFile(updateDate);

  return habit;
};

const addHabit = async (title) => {
  await checkDatabaseContent();

  // Trouver le plus grand ID existant
  const maxId = databaseContent.habits.reduce(
    (max, habit) => (habit.id > max ? habit.id : max),
    0
  );

  const content = {
    id: maxId + 1,
    title: title,
    daysDone: {},
  };

  databaseContent.habits.push(content);

  const newHabit = JSON.stringify(databaseContent, null, 2);
  await writeFile(newHabit);

  return content;
};

const deleteHabit = async (id) => {
  await checkDatabaseContent();
  const idNum = Number(id);
  console.log(
    "ID reçu pour suppression:",
    id,
    "(après conversion:",
    idNum,
    ")"
  );
  console.log(
    "Liste des IDs existants:",
    databaseContent.habits.map((h) => h.id)
  );

  // On compare toujours en nombre pour éviter les soucis de type
  const habitIndex = databaseContent.habits.findIndex(
    (h) => Number(h.id) === idNum
  );

  if (habitIndex === -1) {
    throw new Error(`Habitude avec l'ID ${id} non trouvée`);
  }

  const deletedHabit = databaseContent.habits[habitIndex];
  databaseContent.habits.splice(habitIndex, 1);

  const updatedContent = JSON.stringify(databaseContent, null, 2);
  await writeFile(updatedContent);

  return deletedHabit;
};

export { getHabits, getTodayHabits, updateHabit, addHabit, deleteHabit };

/*const main = async () => {
  await getHabits();
  await getTodayHabits();
  await addHabit("Faire du sport");
  await updateHabit(6, true);
};

main();*/
