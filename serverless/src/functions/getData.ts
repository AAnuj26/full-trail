import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function getData(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  //   const requesting = await request.json();

  const userData = {
    name: "Anuj Bhagat",
    age: 25,
    location: "India",
    email: "anuj@gmail.com",
    phone: "123456789",
    address: "e1/17/c-10 sector 3 rohini delhi 110085",
    company: "google",
    designation: "sde2",
  };

  return {
    headers: {
      "Content-Type": "application/json",
    },
    jsonBody: {
      status: 200,
      message: "success",
      userData,
    },
  };
}

app.http("getData", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: getData,
});
