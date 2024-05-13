import {
  registerForEvent
} from "./chunk-3PQ4EGUC.mjs";
import {
  errorHandler
} from "./chunk-L5T2CGPG.mjs";
import {
  checkIn
} from "./chunk-EFMAK5UM.mjs";
import {
  createEvent
} from "./chunk-MYSBOPZL.mjs";
import "./chunk-T5GIYAOF.mjs";
import {
  getAttendeeBadge
} from "./chunk-O233PKKL.mjs";
import {
  getEventAttendees
} from "./chunk-YAJ7SPYI.mjs";
import {
  getEvent
} from "./chunk-TRLO5NFC.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
var app = fastify().withTypeProvider();
app.register(fastifyCors, {
  origin: "*"
  // origin: 'http://meufrontend.com', colocamos o dominio do local onde estara hospedado o frontend
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especificacao de API para o backend da aplicacao pass.in construida pela SimplicitY 2024",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({
  port: 3333,
  host: "0.0.0.0"
}).then(() => {
  console.log("HTTP server running!");
});
