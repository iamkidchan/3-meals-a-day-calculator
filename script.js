function formatNumberWithCommas(number) {
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get input values
    const currentAge = parseInt(document.getElementById('current_age').value);
    const retirementAge = parseInt(document.getElementById('retirement_age').value);
    const lifeExpectancy = parseInt(document.getElementById('life_expectancy').value);
    const dailyBreakfast = parseFloat(document.getElementById('daily_breakfast').value);
    const dailyLunch = parseFloat(document.getElementById('daily_lunch').value);
    const dailyDinner = parseFloat(document.getElementById('daily_dinner').value);
    const spouse = parseInt(document.getElementById('spouse').value);

    // Constants
    const inflationRate = 0.04;
    let totalAmountNeeded = 0;
    let annualBudget = (dailyBreakfast + dailyLunch + dailyDinner) * 365;
    if (spouse === 1) annualBudget *= 2;  // If spouse is Yes (1), double the budget

    const yearsInRetirement = lifeExpectancy - retirementAge;
    let currentAnnualBudget = annualBudget;

    for (let year = 0; year < yearsInRetirement; year++) {
        totalAmountNeeded += currentAnnualBudget;
        currentAnnualBudget *= (1 + inflationRate);  // Adjust for inflation
    }

    const yearsUntilRetirement = retirementAge - currentAge;
    const annualSavingsNeeded = totalAmountNeeded / yearsUntilRetirement;
    const monthlySavingsNeeded = annualSavingsNeeded / 12;
    const dailySavingsNeeded = annualSavingsNeeded / 365;

    // Display the results with comma separators
    document.getElementById('results').innerHTML = `
        <h2>Calculation Results</h2>
        <p><strong>Assumptions:</strong></p>
        <ul>
            <li>Inflation Rate: 4% per annum</li>
            <li>Spouse: ${spouse === 1 ? 'Yes' : 'No'}</li>
        </ul>
        <p><strong>Total Amount Needed:</strong> RM${formatNumberWithCommas(totalAmountNeeded)}</p>
        <p><strong>Annual Savings Needed:</strong> RM${formatNumberWithCommas(annualSavingsNeeded)}</p>
        <p><strong>Monthly Savings Needed:</strong> RM${formatNumberWithCommas(monthlySavingsNeeded)}</p>
        <p><strong>Daily Savings Needed:</strong> RM${formatNumberWithCommas(dailySavingsNeeded)}</p>
    `;

    console.log("Total Amount Needed:", formatNumberWithCommas(totalAmountNeeded));
    console.log("Annual Savings Needed:", formatNumberWithCommas(annualSavingsNeeded));
    console.log("Monthly Savings Needed:", formatNumberWithCommas(monthlySavingsNeeded));
    console.log("Daily Savings Needed:", formatNumberWithCommas(dailySavingsNeeded));
});
