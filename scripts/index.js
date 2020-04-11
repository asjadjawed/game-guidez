const guideList = document.querySelector(".guides");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const adminLinks = document.querySelectorAll(".admin");
const accountDetails = document.querySelector(".account-details");

const setupUI = (user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        let html = `
      <div>Logged in as ${user.email}</div>
      <div>${doc.data().bio}</div>
      <div class="pink-text">${user.admin ? "Admin" : ""}</div>
      `;
        accountDetails.innerHTML = html;
      });
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
    if (user.admin)
      adminLinks.forEach((item) => (item.style.display = "block"));
  } else {
    accountDetails.innerHTML = "";
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
    adminLinks.forEach((item) => (item.style.display = "none"));
  }
};

const setupGuides = (data) => {
  if (!data.length) {
    guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
    return;
  }

  let html = "";
  data.forEach((doc) => {
    const guide = doc.data();
    const li = `<li>
      <div class="collapsible-header grey lighten-4">${guide.title}</div>
      <div class="collapsible-body white">${guide.content}</div>
    </li>`;
    html += li;
  });

  guideList.innerHTML = html;
};

// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
