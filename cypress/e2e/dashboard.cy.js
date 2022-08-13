describe("Dashboard page", () => {
  it("Do Login with Correct value", () => {
    cy.visit("https://taufanfadhilah.github.io/react-gallery");
    const email = cy.get("input[name='email']");
    email.type("user@react.test");

    const password = cy.get("input[name='password']");
    password.type("password");

    const button = cy.get("button");
    button.click();

    cy.on("window:alert", (text) => {
      expect(text).to.contains("welcome");
    });

    cy.url().should("eq", "https://taufanfadhilah.github.io/react-gallery/dashboard");
  });

  it("Website contains found 0 photo text", () => {
    cy.contains("Found 0 photo");
  })

  it("Contains image url and description input and publish button", () => {
    //check image
    const image = cy.get("input[name='image']");
    image.should("be.visible");
    image.should("have.attr", "type", "url");
    image.should("have.attr", "required", "required");
    image.should("have.attr", "placeholder", "Image URL");

    const description = cy.get("input[name='desc']");
    description.should("be.visible");
    description.should("have.attr", "type", "text");
    description.should("have.attr", "required", "required");
    description.should("have.attr", "placeholder", "What's on your mind?");

    //check button
    const button = cy.get("button[type='submit']");
    button.should("be.visible");
    button.contains("Publish");
    button.should("have.css", "background-color", "rgb(79, 70, 229)");
    button.should("have.css", "color", "rgb(255, 255, 255)");
  })

  it("Upload photos", () => {
    const photo = [
      {
        imageValue: "https://images.unsplash.com/photo-1660089766072-3e34d3397fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
        descriptionValue: "image 1. Lorem ipsum",
      },
      {
        imageValue: "https://images.unsplash.com/photo-1660029865414-4a8f3c6ccc0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80",
        decriptionValue: "image 2. Lorem ipsum",
      }
    ];

    photo.forEach(({ imageValue, descriptionValue }) => {
      const image = cy.get("input[name='image']");
      image.type(imageValue);

      const description = cy.get("input[name='desc']");
      description.type(descriptionValue);

      const button = cy.get("button");
      button.click();

      //check uploaded image existing
      cy.get("img").should("have.attr", "src", imageValue);
      cy.contains(descriptionValue);
    });
    cy.contains(`Found ${photo.length} photos`)
  })
})