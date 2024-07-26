document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const currentAge = parseInt(document.getElementById('current_age').value);
    const retirementAge = parseInt(document.getElementById('retirement_age').value);
    const lifeExpectancy = parseInt(document.getElementById('life_expectancy').value);
    const dailyBreakfast = parseFloat(document.getElementById('daily_breakfast').value);
    const dailyLunch = parseFloat(document.getElementById('daily_lunch').value);
    const dailyDinner = parseFloat(document.getElementById('daily_dinner').value);
    const spouse = document.getElementById('spouse').value.toLowerCase() === 'yes';
    
    // Calculate the results
    const inflationRate = 0.04;
    let totalAmountNeeded = 0;
    let annualBudget = (dailyBreakfast + dailyLunch + dailyDinner) * 365;
    if (spouse) annualBudget *= 2;

    const yearsInRetirement = lifeExpectancy - retirementAge;
    for (let year = 0; year < yearsInRetirement; year++) {
        totalAmountNeeded += annualBudget;
        annualBudget *= (1 + inflationRate);
    }

    const yearsUntilRetirement = retirementAge - currentAge;
    const annualSavingsNeeded = totalAmountNeeded / yearsUntilRetirement;
    const monthlySavingsNeeded = annualSavingsNeeded / 12;

    // Display the results
    document.getElementById('results').innerHTML = `
        <h2>Calculation Results</h2>
        <p>Total Amount Needed: RM${totalAmountNeeded.toFixed(2)}</p>
        <p>Annual Savings Needed: RM${annualSavingsNeeded.toFixed(2)}</p>
        <p>Monthly Savings Needed: RM${monthlySavingsNeeded.toFixed(2)}</p>
    `;
});
