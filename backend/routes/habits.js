import {
  getHabits,
  getTodayHabits,
  addHabit,
  updateHabit,
  deleteHabit,
} from "../habits.helper.js";

export async function habitsRoute(fastify) {
  // GET /habits
  fastify.get("/", async (request, reply) => {
    const habits = await getHabits();
    return reply.send(habits);
  });

  fastify.get("/today", async (request, reply) => {
    const habits = await getTodayHabits();
    return reply.send(habits);
  });

  // POST /habits
  fastify.post("/", async (request, reply) => {
    const { title } = request.body;
    if (!title) {
      return reply.code(400).send({ error: "Le titre est requis" });
    }
    await addHabit(title);
    return reply.code(201).send({ message: "Habitude créée avec succès" });
  });

  // PATCH /habits/:id
  fastify.patch("/:id", async (request, reply) => {
    const { id } = request.params;
    const { done } = request.body;

    if (typeof done === "undefined") {
      return reply.code(400).send({ error: '"done" est requis' });
    }

    try {
      await updateHabit(parseInt(id), done);
      return reply.send({ message: "Habitude mise à jour avec succès" });
    } catch (error) {
      return reply.code(404).send({ error: error.message });
    }
  });

  // DELETE /habits/:id
  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params;

    try {
      await deleteHabit(parseInt(id));
      return reply.send({ message: "Habitude supprimée avec succès" });
    } catch (error) {
      return reply.code(404).send({ error: error.message });
    }
  });
}
