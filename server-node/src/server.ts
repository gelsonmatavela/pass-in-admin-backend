import fastify  from "fastify";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

import fastifyCors from "@fastify/cors";

import {serializerCompiler, validatorCompiler, jsonSchemaTransform, ZodTypeProvider} from "fastify-type-provider-zod";
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";
import { errorHandler } from "./error-handler";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: '*',
    // origin: 'http://meufrontend.com', colocamos o dominio do local onde estara hospedado o frontend
})

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'pass.in',
            description: 'Especificacao de API para o backend da aplicacao pass.in construida pela SimplicitY 2024',
            version: '1.0.0'
        },
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUI,{
    routePrefix:'/docs',
})

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);

app.setErrorHandler(errorHandler);

// servidor, e porta a consumir no localhost
app.listen({
    port: 3333,
    host: '0.0.0.0'
}).then(()=>{
    console.log("HTTP server running!")
})