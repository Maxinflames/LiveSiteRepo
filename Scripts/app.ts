/**
 * Author: Maximus Vanhaarlem
 * Student ID: 100758975
 * Date: 3/23/2022
 */

// IIFE -- Immediately Invoked Function Expression
// AKA -- Anonymous Self-Executing Function
(function () {
  function AuthGuard(): void {
    let protected_routes: string[] = ["contact-list", "task-list"];

    if (protected_routes.indexOf(router.ActiveLink) > -1) {
      // check if user is logged in
      if (!sessionStorage.getItem("user")) {
        // if not...change the active link to the  login page
        router.ActiveLink = "login";
      }
    }
  }

  function LoadLink(link: string, data: string = ""): void {
    router.ActiveLink = link;

    AuthGuard();

    router.LinkData = data;
    history.pushState({}, "", router.ActiveLink);

    // capitalize active link and set document title to it
    document.title =
      router.ActiveLink.substring(0, 1).toUpperCase() +
      router.ActiveLink.substring(1);

    // remove all active Nav Links
    $("ul>li>a").each(function () {
      $(this).removeClass("active");
    });

    $(`li>a:contains(${document.title})`).addClass("active"); // updates the Active link on Navigation items

    CheckLogin();

    LoadContent();
  }

  function AddNavigationEvents(): void {
    let NavLinks = $("ul>li>a"); // find all Navigation Links

    NavLinks.off("click");
    NavLinks.off("mouseover");

    // loop through each Navigation link and load appropriate content on click
    NavLinks.on("click", function () {
      LoadLink($(this).attr("data") as string);
    });

    NavLinks.on("mouseover", function () {
      $(this).css("cursor", "pointer");
    });
  }

  function AddLinkEvents(link: string): void {
    let linkQuery = $(`a.link[data=${link}]`);
    // remove all link events
    linkQuery.off("click");
    linkQuery.off("mouseover");
    linkQuery.off("mouseout");

    // css adjustments for links
    linkQuery.css("text-decoration", "underline");
    linkQuery.css("color", "blue");

    // add link events
    linkQuery.on("click", function () {
      LoadLink(`${link}`);
    });

    linkQuery.on("mouseover", function () {
      $(this).css("cursor", "pointer");
      $(this).css("font-weight", "bold");
    });

    linkQuery.on("mouseout", function () {
      $(this).css("font-weight", "normal");
    });
  }

  /**
   * This function loads the header.html content into a page
   *
   * @returns {void}
   */
  function LoadHeader(): void {
    // use AJAX to load the header content
    $.get("./Views/components/header.html", function (html_data) {
      // inject Header content into the page
      $("header").html(html_data);

      AddNavigationEvents();

      CheckLogin();
    });
  }

  /**
   *
   *
   * @returns {void}
   */
  function LoadContent(): void {
    let page_name = router.ActiveLink; // alias for the Active Link
    let callback = ActiveLinkCallBack(); // returns a reference to the correct function
    $.get(`./Views/content/${page_name}.html`, function (html_date) {
      $("main").html(html_date);
      callback(); // calling the correct function
    });
  }

  /**
   *
   * @returns {void}
   */
  function LoadFooter(): void {
    $.get(`./Views/components/footer.html`, function (html_date) {
      $("footer").html(html_date);
    });
  }

  function DisplayHomePage(): void {
    console.log("Home Page");
    $("#AboutUsButton").on("click", () => {
      LoadLink("about");
    });

    $("main").append(
      `<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`
    );
    $("main").append(`<article>
        <p id="ArticleParagraph" class ="mt-3">This is the Article Paragraph</p>
        </article>`);
  }

  function DisplayProductsPage(): void {
    console.log("Products Page");

    // Configure the created Element
    $("main").append(
      `<p id="MainParagraph" class="h5 mt-3 "> This page displays my favourite projects that I have worked on.</a>`
    );
    $("main").append(
      `<img src="./Images/Project.PNG" alt="This Project"  width="700" height="400">`
    );
    $("main")
      .append(`<p class="h7 mt-3 ">This website, made using HTML, Javascript and Node has been thoroughly enjoyable, 
                                    <br>and I have learned alot from it due to my profs enjoyable teaching style (Not trying to get 
                                    <br>brownie points I legitimately feel this way lol).</p>`);
    $("main")
      .append(`<p class="h7 mt-3 ">Another Project I enjoyed working on was my first attempt to recreate the once 
                                    <br>very popular game "Tetris". It was a project I attempted before beginning college, and failed 
                                    <br>disasterously, but I learned alot on how Object Oriented Programming works, and had I have had 
                                    <br>the time, I believe I would have completed it once restarting.</p>`);
    $("main")
      .append(`<p class="h7 mt-3 ">A project I did not explicitly enjoy doing, but was proud of the end result 
                                    <br>was my WEBD-3201 website. It was a painful journey but it ended up working exactly how I had
                                    <br>wanted, and looked in my opinion quite stunning, unfortunately I have no pictures of the end result/p>`);
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
                                    Our programmers are skilled with many different types of programming languages, some of which
                                    <br>being, C++, C#, Java, JavaScript, SQL, PHP, HTML, Python, COBOL. As such we are skilled in
                                    <br>many different regions of programming and give you the best options for what you are looking for.</p>`);
    $("main")
      .append(`<p class="h7 mt-3 ">-------------------------------------------------------------------------------------------------<br>
                                    We look to give a one on one experience with any clients we accumulate, and strive to give you 
                                    <br>what your looking for in your website. Whether it be design or functionality, I am certain 
                                    <br>we will give you what your looking for through our personal touch and details.</p>`);
    $("main")
      .append(`<p class="h7 mt-3 ">-------------------------------------------------------------------------------------------------<br>
                                    We are very detail oriented, and find ourselves unable to sleep with details on our minds,
                                    <br>and as such, we can assure you that you will get the best product we can come up with.</p>`);
  }

  function DisplayAboutPage(): void {
    console.log("About Page");

    // Configure the created Element
    $("main").append(
      `<p id="MainParagraph" class="h5 mt-3 "> Meet the Programmer!</a>`
    );
    $("main").append(
      `<img src="./Images/Me1.jpg" alt="Solo Picture"  width="300" height="400">  <img src="./Images/Me2.jpg" alt="Picture with Little Sister"  width="300" height="400">`
    );
    $("main")
      .append(`<p class="h7 mt-3 ">-------------------------------------------------------------------------------------------------<br>
                                     Maximus Vanhaarlem, 20 years old, currently enrolled at Durham College in Computer Programming for IT
                                     <br>Taught in C++, C#, Java, JavaScript, SQL, PHP, HTML, Python, COBOL. Looking to make a name for himself
                                     <br>the world, and enjoy his life, whilst being unable to take a good photo to save his life.
                                     <br><a href="./DownloadItems/MVResume.pdf" download><img src="./Images/PDFPicture.png" alt="Resume" width="60" height="60"></a></p>`);
  }

  /**
   *This function adds a Contact object to localStorage
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

      localStorage.setItem(key, contact.serialize() as string);
    }
  }

  /**
   * This method validates a field in the form and displays an error in the message area div element
   *
   * @param {string} fieldID
   * @param {RegExp} regular_expression
   * @param {string} error_message
   */
  function ValidateField(
    fieldID: string,
    regular_expression: RegExp,
    error_message: string
  ) {
    let messageArea = $("#messageArea").hide();

    $("#" + fieldID).on("blur", function () {
      let text_value = $(this).val() as string;
      if (!regular_expression.test(text_value)) {
        $(this).trigger("focus").trigger("select");
        messageArea.addClass("alert alert-danger").text(error_message).show();
      } else {
        messageArea.removeAttr("class").hide();
      }
    });
  }

  function ContactFormValidation(): void {
    ValidateField(
      "fullName",
      /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)([A-Z][a-z]{1,})$/,
      "Please enter a valid Full Name. This must include at least a Capitalized First Name and a Capitalized Last Name."
    );
    ValidateField(
      "contactNumber",
      /^(\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Please enter a valid Contact Number. Example: (416) 555-5555"
    );
    ValidateField(
      "emailAddress",
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,
      "Please enter a valid Email Address."
    );
  }

  function DisplayContactPage(): void {
    console.log("Contact Page");

    if (sessionStorage.getItem("user")) {
      // Set contact-list-btn to be visible if user is logged in
      $("#contact-list-btn").show();
    } else {
      // Set contact-list-btn to be invisible if user is not logged in
      $("#contactList").hide();
    }
    $("a[data='contact-list']").off("click");
    $("a[data='contact-list']").on("click", function () {
      LoadLink("contact-list");
    });

    ContactFormValidation();

    let sendButton = document.getElementById("sendButton") as HTMLElement;
    let subscribeCheckbox = document.getElementById(
      "subscribeCheckbox"
    ) as HTMLInputElement;

    sendButton.addEventListener("click", function (event) {
      if (subscribeCheckbox.checked) {
        let fullName = document.forms[0].fullName.value;
        let contactNumber = document.forms[0].contactNumber.value;
        let emailAddress = document.forms[0].emailAddress.value;

        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
          let key = contact.FullName.substring(0, 1) + Date.now();

          localStorage.setItem(key, contact.serialize() as string);
        }
      }
    });
  }

  function DisplayContactListPage(): void {
    if (localStorage.length > 0) {
      let contactList = document.getElementById("contactList") as HTMLElement;

      let data = "";

      let keys = Object.keys(localStorage); // returns a list of keys from localStorage

      let index = 1;

      // for every key in the keys string array
      for (const key of keys) {
        if (key.substring(0, 3) != "TLK") {
          let contactData = localStorage.getItem(key) as string; // get localStorage data value

          let contact = new core.Contact(); // create an empty Contact object
          contact.deserialize(contactData);

          data += `<tr>
                    <th scope="row" class="text-center">${index}</th>
                    <td>${contact.FullName}</td>
                    <td>${contact.ContactNumber}</td>
                    <td>${contact.EmailAddress}</td>
                    <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                    <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                    </tr>`;

          index++;
        }
      }

      contactList.innerHTML = data;

      $("button.delete").on("click", function () {
        if (confirm("Are you sure?")) {
          localStorage.removeItem($(this).val() as string);
        }
        LoadLink("contact-list");
      });

      $("button.edit").on("click", function () {
        LoadLink("edit", $(this).val() as string);
      });
    }

    $("#addButton").on("click", () => {
      LoadLink("edit", "add");
    });
  }

  /**
   * This function allows JavaScript to work on the Edit Page
   */
  function DisplayEditPage(): void {
    console.log("Edit Page");

    ContactFormValidation();

    let page = router.LinkData;

    switch (page) {
      case "add":
        {
          $("main>h1").text("Add Contact");

          $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);

          $("#editButton").on("click", (event) => {
            event.preventDefault();

            let fullName = document.forms[0].fullName.value;
            let contactNumber = document.forms[0].contactNumber.value;
            let emailAddress = document.forms[0].emailAddress.value;

            AddContact(fullName, contactNumber, emailAddress);
            LoadLink("contact-list");
          });

          $("#cancelButton").on("click", () => {
            LoadLink("contact-list");
          });
        }
        break;
      default:
        {
          // get contact info from localStorage
          let contact = new core.Contact();
          contact.deserialize(localStorage.getItem(page) as string);

          // display the contact in the edit form
          $("#fullName").val(contact.FullName);
          $("#contactNumber").val(contact.ContactNumber);
          $("#emailAddress").val(contact.EmailAddress);

          $("#editButton").on("click", (event) => {
            event.preventDefault();

            // get changes from the page
            contact.FullName = $("#fullName").val() as string;
            contact.ContactNumber = $("#contactNumber").val() as string;
            contact.EmailAddress = $("#emailAddress").val() as string;

            // replace the item in local storage
            localStorage.setItem(page, contact.serialize() as string);
            // go back to the contact list page (refresh)
            LoadLink("contact-list");
          });

          $("#cancelButton").on("click", () => {
            LoadLink("contact-list");
          });
        }
        break;
    }
  }

  function CheckLogin(): void {
    // if user is logged in
    if (sessionStorage.getItem("user")) {
      // swap out the login link for logout
      $("#login").html(
        `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
      );

      $("#task-list").show();

      $("#logout").on("click", function () {
        // perform logout
        sessionStorage.clear();

        // swap out the logout link for login
        $("#login").html(
          `<a class="nav-link" data="login"><i class="fas fa-sign-in-alt"></i> Login</a>`
        );

        AddNavigationEvents();

        // redirect back to login
        LoadLink("login");
      });
    } else {
      $("#task-list").hide();
    }
  }

  function DisplayLoginPage(): void {
    console.log("Login Page");
    let messageArea = $("#messageArea");
    messageArea.hide();

    AddLinkEvents("register");

    $("#loginButton").on("click", function () {
      let success = false;
      // create an empty user object
      let newUser = new core.User();

      // uses jQuery shortcut to load the users.json file
      $.get("./Data/users.json", function (data) {
        // for every user in the users.json file
        for (const user of data.users) {
          let username = document.forms[0].username.value;
          let password = document.forms[0].password.value;

          // check if the username and password entered in the form matches this user
          if (username == user.Username && password == user.Password) {
            // get the user data from the file and assign to our empty user object
            newUser.fromJSON(user);
            success = true;
            break;
          }
        }

        // if username and password matches - success.. the perform the login sequence
        if (success) {
          // add user to session storage
          sessionStorage.setItem("user", newUser.serialize() as string);

          // hide any error message
          messageArea.removeAttr("class").hide();

          // redirect the user to the secure area of our site - contact-list.html
          LoadLink("contact-list");
        }
        // else if bad credentials were entered...
        else {
          // display an error message
          $("#username").trigger("focus").trigger("select");
          messageArea
            .addClass("alert alert-danger")
            .text("Error: Invalid Login Information")
            .show();
        }
      });
    });

    $("#cancelButton").on("click", function () {
      // clear the login form
      document.forms[0].reset();

      // return to the home page
      LoadLink("home");
    });
  }

  function DisplayRegisterPage(): void {
    console.log("Register Page");

    AddLinkEvents("login");
  }

  function Display404Page(): void {}

  /**
   * This function adds a new Task to the TaskList
   */
  function AddNewTask() {
    let messageArea = $("#messageArea");
    messageArea.hide();
    let taskInput = $("#taskTextInput");
    let taskInputValue = taskInput.val() as string;

    if (taskInput.val() != "" && taskInputValue.charAt(0) != " ") {
      let key = "TLK" + Date.now();

      localStorage.setItem(key, taskInput.val() as string);
    } else {
      taskInput.trigger("focus").trigger("select");
      messageArea
        .show()
        .addClass("alert alert-danger")
        .text("Please enter a valid Task.");
    }

    LoadLink("task-list");
  }

  /**
   * This function is the Callback function for the TaskList
   *
   */
  function DisplayTaskList() {
    let messageArea = $("#messageArea");
    messageArea.hide();
    let taskInput = $("#taskTextInput");

    // add a new Task to the Task List
    $("#newTaskButton").on("click", function () {
      AddNewTask();
    });

    taskInput.on("keypress", function (event) {
      if (event.key == "Enter") {
        AddNewTask();
      }
    });

    let taskList = document.getElementById("taskList") as HTMLElement;

    let data = "";

    let keys = Object.keys(localStorage);

    // for every key in the keys string array
    for (const key of keys) {
      if (key.substring(0, 3) == "TLK") { // Checks if value begins with "TLK" (Signifying the key is a "Task List Key")
        let taskData = localStorage.getItem(key) as string; // get localStorage data value

        data += `
                    <li class="list-group-item" id="task">
                        <span id="taskText">${taskData}</span>
                        <span class="float-end">
                            <button value="${key}" class="btn btn-outline-primary btn-sm editButton"><i class="fas fa-edit"></i>
                            <button value="${key}" class="btn btn-outline-danger btn-sm deleteButton"><i class="fas fa-trash-alt"></i></button>
                        </span>
                        <input type="text" class="form-control edit-task editTextInput">
                    </li>
                  `;
      }
    }

    taskList.innerHTML = data;

    // Edit an Item in the Task List
    $("ul").on("click", ".editButton", function () {
      let editText = $(this).parent().parent().children(".editTextInput");
      let text = $(this).parent().parent().text().trim();
      editText.val(text).show().trigger("select");
      let key = $(this).val() as string;

      editText.on("keypress", function (event) {
        if (event.key == "Enter") {
          let editTextValue = editText.val() as string;
          if (editText.val() != "" && editTextValue.charAt(0) != " ") {
            editText.hide();
            messageArea.removeAttr("class").hide();

            // replace the item in local storage
            localStorage.setItem(key, editText.val() as string);

            LoadLink("task-list");
          } else {
            editText.trigger("focus").trigger("select");
            messageArea
              .show()
              .addClass("alert alert-danger")
              .text("Please enter a valid Task.");
          }
        }
      });
    });

    // Delete a Task from the Task List
    $("ul").on("click", ".deleteButton", function () {
      if (confirm("Are you sure?")) {
        localStorage.removeItem($(this).val() as string);
      }
      LoadLink("task-list");
    });
  }

  /**
   * This method returns the appropriate function callback relative to the Active Link
   *
   * @returns {Function}
   */
  function ActiveLinkCallBack(): Function {
    switch (router.ActiveLink) {
      case "home":
        return DisplayHomePage;
      case "about":
        return DisplayAboutPage;
      case "products":
        return DisplayProductsPage;
      case "services":
        return DisplayServicesPage;
      case "contact":
        return DisplayContactPage;
      case "contact-list":
        return DisplayContactListPage;
      case "edit":
        return DisplayEditPage;
      case "login":
        return DisplayLoginPage;
      case "register":
        return DisplayRegisterPage;
      case "task-list":
        return DisplayTaskList;
      case "404":
        return Display404Page;
      default:
        console.error("ERROR: callback does not exist: " + router.ActiveLink);
        return new Function();
    }
  }

  // named function option

  /**
   * This is the entry point to the web application
   *
   */
  function Start(): void {
    console.log("App Started!");

    LoadHeader();

    LoadLink("home");

    LoadFooter();
  }

  window.addEventListener("load", Start);
})();
