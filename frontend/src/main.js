import "./input.css";

class NewHabit {
  constructor() {}

  addNew() {
    const buttonAdd = document.querySelector("#add-new-habit");
    const dialog = document.querySelector("#add-new-habit-dialog");
    const buttonClose = document.querySelector("#close-dialog");
    const input = document.querySelector("#input-add");

    buttonAdd.addEventListener("click", () => {
      dialog.showModal();
    });

    buttonClose.addEventListener("click", () => {
      input.value = "";
      dialog.close();
    });
  }
}

class History {
  constructor() {}

  show() {
    const buttonHistory = document.querySelector("#open-history");
    const dialogHistory = document.querySelector("#history-dialog");
    const closeHistory = document.querySelector("#close-history");

    buttonHistory.addEventListener("click", () => {
      dialogHistory.showModal();
    });

    closeHistory.addEventListener("click", () => {
      dialogHistory.close();
    });
  }
}

class AddHabit {
  constructor() {
    this.todayHabit = null;
  }

  setTodayHabit(todayHabit) {
    this.todayHabit = todayHabit;
  }

  add() {
    const input = document.querySelector("#input-add");
    const form = document.querySelector("#add-new-habit-form");
    const dialogAdd = document.querySelector("#add-new-habit-dialog");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = input.value;

      this.toggleNewHabit(title);
      input.value = "";
      dialogAdd.close();
    });
  }

  toggleNewHabit(title) {
    fetch(`http://localhost:3000/habits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Nouvelle habitude ajoutée", data);
        return fetch("http://localhost:3000/habits/today");
      })
      .then((response) => response.json())
      .then((habits) => {
        const newHabit = habits.find((habit) => habit.title === title);
        if (newHabit && this.todayHabit) {
          this.todayHabit.addSingleHabit(newHabit);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour:", error);
      });
  }
}

class TodayHabit {
  constructor() {}

  createHabitList(habits) {
    const dateToday = new Date().toISOString().slice(0, 10);
    const div = document.querySelector("#today-habits");
    const ul = document.createElement("ul");
    ul.classList.add("habits");

    habits.forEach((habit) => {
      const li = document.createElement("li");
      li.textContent = habit.title;
      li.classList.add("habit-square");

      if (habit.isDoneToday === true) {
        li.classList.add("habit-done");
      }

      li.addEventListener("click", () => {
        const valid = li.classList.contains("habit-done");

        if (valid) {
          this.toggleHabitStatus(habit.id, false);
          li.classList.remove("habit-done");
        } else {
          this.toggleHabitStatus(habit.id, true);
          li.classList.add("habit-done");
        }
      });

      ul.appendChild(li);
    });

    div.appendChild(ul);
  }

  toggleHabitStatus(habitId, status) {
    fetch(`http://localhost:3000/habits/${habitId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done: status }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Habitude mise à jour:", data);
        return data;
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour:", error);
      });
  }

  habits() {
    fetch("http://localhost:3000/habits/today")
      .then((response) => response.json())
      .then((habits) => {
        this.removeLoading();
        this.createHabitList(habits);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des habitudes", error);
      });
  }

  removeLoading() {
    const p = document.querySelector("#loading");
    p?.remove();
  }

  addSingleHabit(habit) {
    const ul = document.querySelector(".habits");
    if (!ul) return;

    const li = document.createElement("li");
    li.textContent = habit.title;
    li.classList.add("habit-square");
    li.dataset.habitId = habit.id;

    if (habit.isDoneToday === true) {
      li.classList.add("habit-done");
    }

    li.addEventListener("click", () => {
      const valid = li.classList.contains("habit-done");
      const habitId = parseInt(li.dataset.habitId);

      if (isNaN(habitId)) {
        console.error("ID d'habitude invalide:", habitId);
        return;
      }

      if (valid) {
        this.toggleHabitStatus(habitId, false);
        li.classList.remove("habit-done");
      } else {
        this.toggleHabitStatus(habitId, true);
        li.classList.add("habit-done");
      }
    });

    ul.appendChild(li);
  }
}

class Main {
  constructor() {
    this.new = new NewHabit();
    this.history = new History();
    this.todayHabit = new TodayHabit();
    this.add = new AddHabit();
  }

  init() {
    this.new.addNew();
    this.history.show();
    this.todayHabit.habits();
    this.add.setTodayHabit(this.todayHabit);
    this.add.add();
  }
}

const main = new Main();

main.init();
