// Define your AuthListener function
function AuthListener(callback) {
  const auth = getAuth();
  return onAuthStateChanged(auth, callback);
}