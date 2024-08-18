import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://anuj-user:anuj-user@cluster-1.75t5ayt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// const userData = {
//   name: "Anuj Bhagat",
//   age: 25,
//   location: "India",
//   email: "anuj@gmail.com",
//   phone: "123456789",
//   address: "e1/17/c-10 sector 3 rohini delhi 110085",
//   company: "google",
//   designation: "sde2",
// };
export async function getData(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    await client.connect();
    const fetchedData = await client
      .db("testing")
      .collection("users")
      .find()
      .toArray();
    return {
      headers: {
        "Content-Type": "application/json",
      },
      jsonBody: {
        status: 200,
        message: "success",
        fetchedData,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: "Internal Server Error",
      jsonBody: {
        status: 500,
        message: "Internal Server Error",
      },
    };
  }
}

export async function postData(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const data = await request.formData();
  const name = data.get("name");

  const phone = data.get("phone");

  const age = data.get("age");

  const email = data.get("email");

  const password = data.get("password");

  console.log(name, phone, age, email, password);

  const document = {
    name: name,
    phone: phone,
    age: age,
    email: email,
    password: password,
  };

  try {
    await client.connect();
    const result = await client
      .db("testing")
      .collection("users")
      .insertOne(document);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      jsonBody: {
        status: 200,
        message: "success",
        result,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: "Internal Server Error",
      jsonBody: {
        status: 500,
        message: "Internal Server Error",
      },
    };
  }
}

app.http("getData", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: getData,
  route: "v1/getData",
});

app.http("postData", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: postData,
  route: "v1/postData",
});
