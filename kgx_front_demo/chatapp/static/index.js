window.addEventListener("DOMContentLoaded", (event) => {
  const textarea = document.getElementById("text");
  textarea.addEventListener("input", autoResize, false);

  function autoResize() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  // Add event listener for 'Enter' key
  textarea.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      // Trigger form submit
      this.form.submit();
    }
  });
});
