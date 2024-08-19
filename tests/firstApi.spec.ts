import { test, expect } from "@playwright/test";

test("should post data", async ({ request }) => {
  const postData = await request.post(`/api/v1/getData`, {
    data: {
      //   body: {
      name: "John Doe",
      phone: "1234567890",
      age: 30,
      email: "aanuj@gmail.com",
      password: "password",
      //   },
    },
  });
  expect(postData.ok()).toBeTruthy();
  //   expect(await postData.json()).toEqual({ data: "Expected Data" });

  //   const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
  //   expect(issues.ok()).toBeTruthy();
  //   expect(await issues.json()).toContainEqual(
  //     expect.objectContaining({
  //       title: "[Bug] report 1",
  //       body: "Bug description",
  //     })
  //   );
});
