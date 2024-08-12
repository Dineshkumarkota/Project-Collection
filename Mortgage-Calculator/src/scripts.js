document
  .getElementById("mortgage-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const amount = parseFloat(document.getElementById("amount").value);
    const term = parseFloat(document.getElementById("term").value) * 12; // Convert years to months
    const rate = parseFloat(document.getElementById("rate").value) / 100 / 12; // Monthly interest rate
    const type = document.querySelector('input[name="type"]:checked').value;

    let monthlyRepayment = 0;
    let totalRepayment = 0;

    // Calculate repayments based on mortgage type
    if (type === "repayment") {
      if (rate > 0) {
        monthlyRepayment =
          (amount * rate * Math.pow(1 + rate, term)) /
          (Math.pow(1 + rate, term) - 1);
      } else {
        monthlyRepayment = amount / term; // Special case for 0% interest
      }
      totalRepayment = monthlyRepayment * term;
    } else if (type === "interest-only") {
      monthlyRepayment = amount * rate;
      totalRepayment = monthlyRepayment * term + amount;
    }

    // Update the results
    document.getElementById(
      "monthly-repayment"
    ).textContent = `Monthly Repayment: £${monthlyRepayment.toFixed(2)}`;
    document.getElementById(
      "total-repayment"
    ).textContent = `Total Repayment: £${totalRepayment.toFixed(2)}`;
  });
document.getElementById("clear-all").addEventListener("click", function () {
  // Clear all input fields
  document.getElementById("amount").value = "";
  document.getElementById("term").value = "";
  document.getElementById("rate").value = "";
  document.querySelector(
    'input[name="type"][value="repayment"]'
  ).checked = true; // Reset to default radio button

  // Clear results
  document.getElementById("monthly-repayment").textContent = "";
  document.getElementById("total-repayment").textContent = "";
});
