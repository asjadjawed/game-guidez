// track auth status
auth.onAuthStateChanged((user) => {
  setupUI(user);
  if (user) {
    db.collection("guides")
      .get()
      .then((snapshot) => {
        setupGuides(snapshot.docs);
      });
  } else setupGuides([]);
});

// signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
