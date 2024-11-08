import { MongoClient } from "mongodb";

const MONGO_URL = Deno.env.get("MONGO_URL")
if(!MONGO_URL){
  console.error("No conectado");
  Deno.exit(1);
}

const client = new MongoClient(MONGO_URL);
await client.connect();
console.info("Conectado a Mongo");

const db = client.db ("Examen");
const PersonasCollection = db.collection("Personas");

const handler = async (req: Request): Promise<Response> =>{
  const method = req.method;
  const url = new URL (req.url);
  const path = url.pathname;

  if(method === "GET"){

  }else if(method === "POST"){

  }else if(method === "PUT"){

  }else if(method === "DELETE"){

  }

  new Response("Endopoint not found", {status: 404});
};

Deno.serve({port:3000}, handler);