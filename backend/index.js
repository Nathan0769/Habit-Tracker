import cors from "@fastify/cors";
import Fastify from "fastify";
import { habitsRoute } from "./routes/habits.js";

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

// Enregistrement de la route habits
await fastify.register(habitsRoute, { prefix: "/habits" });

// Run the server!
try {
  // ⚠️ CHANGEMENT ICI : utiliser le port de Render
  const port = process.env.PORT || 3000;
  await fastify.listen({ port, host: "0.0.0.0" });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
