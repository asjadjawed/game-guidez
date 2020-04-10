// track auth status
let unsubscribe = null;
auth.onAuthStateChanged((user) => {
  setupUI(user);
  if (user) {
    unsubscribe = db.collection("guides").onSnapshot(
      (snapshot) => {
        setupGuides(snapshot.docs);
      },
      (err) => console.log(err.message)
    );
  } else {
    if (unsubscribe) unsubscribe();
    setupGuides([]);
  }
});

// create new guide
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = createForm["title"].value;
  const content = createForm["content"].value;
  db.collection("guides")
    .add({ title, content })
    .then(() => {
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch((error) => console.log(error.message));
});

// signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  const bio = signupForm["signup-bio"].value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => db.collection("users").doc(cred.user.uid).set({ bio }))
    .then(() => {
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
