
function handleSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  alert(`Thank you, ${name}! You’ve been added to the TrueBlend waiting list.`);
}
