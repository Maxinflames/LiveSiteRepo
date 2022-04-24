// IIFE -- Immediately Invoked Function Express
// AKA anonymous self-executing function

"use strict";
(function () {
  function AuthGuard(): void {
    let protected_routes = ["/contact-list", "/edit"];

    if (protected_routes.indexOf(location.pathname) > -1) {
      // check if user is logged in
      if (!sessionStorage.getItem("user")) {
        // if not...change the active link to "login"
        location.href = "/login";
      }
    }
  }

  function DisplayHome(): void {
    console.log("Home Page");
    $("#AboutUsButton").on("click", () => {
      location.href = "/about";
    });

    $("main").append(
      `<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`
    );

    $("main").append(`
        <article>
            <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>
            </article>`);
  }

  function DisplayProjectsPage(): void {
    console.log("Projects Page");

    // Configure the created Element
    $("main").append(
      `<div><p id="MainParagraph" class="h5 mt-3 "> This page shows Mr. Face Book's most well known creations.<br>
      -------------------------------------------------------------------------------------------------<br></p>`
    );
    $("main").append(
      `<img src="./Assets/Images/Facebook-normal-page.jpg" alt="Original Project"  width="500" height="300">`
    );
    $("main").append(
      `<p class="h7 mt-3 "> The original successful build, very diversely used across the world by clientelle.<br>
      -------------------------------------------------------------------------------------------------<br></p>`
    );
    $("main").append(
      `<img src="./Assets/Images/Instagram-Template.png" alt="Acquired Project">`
    );
    $("main")
      .append(`<p class="h7 mt-3 "> A clip from Instagram... Not exactly Mr. Face Books work, but he owns it now so its success is his<br>
      -------------------------------------------------------------------------------------------------<br></p>`);
      $("main").append(
        `<img src="./Assets/Images/metaverse-picture.png" alt="Template Project"  width="500" height="300">`
      );
    $("main")
      .append(`<p class="h7 mt-3 "> The promised future project currently in the works. Very much in Beta as of the moment<br><br>The end of showcase.</p></div>`);
  }

  function DisplayServicesPage(): void {
    console.log("Services Page");
    // Create reference to entry point for insertion/deletion
    let MainContent = document.getElementsByTagName("main")[0];

    // Create HTML Element in memory
    let MainParagraph = document.createElement("p");
    let FirstParagraph = document.createElement("p");
    let SecondParagraph = document.createElement("p");
    let ThirdParagraph = document.createElement("p");

    // Configure the created Element
    $("main").append(
      `<p id="MainParagraph" class="h5 mt-3 "> These are the 3 best things that set us apart from many.</a>`
    );
    $("main")
      .append(`<p class="h7 mt-3 ">-------------------------------------------------------------------------------------------------<br>
                                      Specializes in developing social media markets, having worked on many different forms in the past<br>
                                      built to bring people together, originally from within universities, but slowly expanded his <br>
                                      clientelle to the mass market.</p>`);
    $("main")
      .append(`<p class="h7 mt-3 ">-------------------------------------------------------------------------------------------------<br>
                                      He has recently started working on more specific media formats, such as online dating websites, 
                                      or fan pages. Though he is still learning how to effectively use it.</p>`);
    $("main")
      .append(`<p class="h7 mt-3 ">-------------------------------------------------------------------------------------------------<br>
                                      Most recently however, he has been dreaming of making his whole own virtual world... It is still
                                      a work in progress to say the least.</p>`);
  }

  function DisplayAboutPage(): void {
    console.log("About Page");

    // Configure the created Element
    $("main").append(
      `<p id="MainParagraph" class="h5 mt-3 "> Meet the Programmer!</p>`
    );
    $("main").append(
      `<img src="./Assets/Images/Me1.png" alt="Solo Picture"  width="300" height="400">`
    );
    $("main")
      .append(`<p class="h7 mt-3 ">-------------------------------------------------------------------------------------------------<br>
                                       Face Book, 17 years old, works out of Menlo Park, California
                                       <br>Constantly changing and adapting to keep up with the times, he is always working on his abilities
                                       <br>to please all his clientelle, to keep them from going to any competition.</p>`);
  }

  /**
   * Adds a Contact Object to localStorage
   *
   * @param {string} fullName
   * @param {string} contactNumber
   * @param {string} emailAddress
   */
  function AddContact(
    fullName: string,
    contactNumber: string,
    emailAddress: string
  ) {
    let contact = new core.Contact(fullName, contactNumber, emailAddress);
    if (contact.serialize()) {
      let key = contact.FullName.substring(0, 1) + Date.now();

      localStorage.setItem(key, contact.serialize());
    }
  }

  /**
   * This method validates an input text field in the form and displays
   * an error in the message area
   *
   * @param {string} input_field_ID
   * @param {RegExp} regular_expression
   * @param {string} error_message
   */
  function ValidateField(
    input_field_ID: string,
    regular_expression: RegExp,
    error_message: string
  ) {
    let messageArea = $("#messageArea").hide();

    $("#" + input_field_ID).on("blur", function () {
      let inputFieldText: string = $(this).val() as string;

      if (!regular_expression.test(inputFieldText)) {
        $(this).trigger("focus").trigger("select");
        messageArea.addClass("alert alert-danger").text(error_message).show();
      } else {
        messageArea.removeAttr("class").hide();
      }
    });
  }

  function ContactFormValidation() {
    ValidateField(
      "fullName",
      /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]{1,})+([\s,-]([A-Z][a-z]{1,}))*$/,
      "Please enter a valid Full Name."
    );
    ValidateField(
      "contactNumber",
      /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/,
      "Please enter a valid Contact Number."
    );
    ValidateField(
      "emailAddress",
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,
      "Please enter a valid Email Address."
    );
  }

  function DisplayContactPage() {
    console.log("Contact Us Page");

    $("a[data='contact-list']").off("click");
    $("a[data='contact-list']").on("click", function () {
      location.href = "/contact-list";
    });

    ContactFormValidation();

    let sendButton = document.getElementById("sendButton") as HTMLElement;
    let subscribeCheckbox = document.getElementById(
      "subscribeCheckbox"
    ) as HTMLInputElement;

    sendButton.addEventListener("click", function () {
      if (subscribeCheckbox.checked) {
        let fullName = document.forms[0].fullName.value as string;
        let contactNumber = document.forms[0].contactNumber.value as string;
        let emailAddress = document.forms[0].emailAddress.value as string;

        AddContact(fullName, contactNumber, emailAddress);
      }
    });
  }

  function DisplayContactListPage() {
    console.log("Contact-List Page");

    $("a.delete").on("click", function (event) {
      if (!confirm("Are you sure?")) {
        event.preventDefault();
        // refresh after deleting
        location.href = "/contact-list";
      }
    });
  }

  function DisplayEditPage() {
    console.log("Edit Page");

    ContactFormValidation();
  }

  function CheckLogin() {
    // if user is logged in, then...
    if (sessionStorage.getItem("user")) {
      // swap out the login link for logout
      $("#login").html(
        `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
      );

      $("#logout").on("click", function () {
        // perform logout
        sessionStorage.clear();

        // swap out the logout link for login
        $("#login").html(
          `<a class="nav-link" href="/login"><i class="fas fa-sign-in-alt"></i> Login</a>`
        );

        // redirect back to login page
        location.href = "/login";
      });
    }
  }

  function DisplayLoginPage() {
    console.log("Login Page");
  }

  function DisplayRegisterPage() {
    console.log("Register Page");

    //TODO: implement some data entry validation
  }

  function Display404() {}

  function Start() {
    console.log("App Started!!");

    let page_id = $("body")[0].getAttribute("id");

    switch (page_id) {
      case "home":
        DisplayHome();
        break;
      case "about":
        DisplayAboutPage();
        break;
      case "products":
        DisplayProjectsPage();
        break;
      case "services":
        DisplayServicesPage();
        break;
      case "contact-list":
        DisplayContactListPage();
        break;
      case "contact":
        DisplayContactPage();
        break;
      case "edit":
        DisplayEditPage();
        break;
      case "add":
        DisplayEditPage();
        break;
      case "login":
        DisplayLoginPage();
        break;
      case "register":
        DisplayRegisterPage();
        break;
      case "404":
        Display404();
        break;
    }
  }

  window.addEventListener("load", Start);
})();
