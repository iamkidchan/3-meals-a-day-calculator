function formatNumber(number) {
    return number.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function calculateRetirement() {
    // Get input values
    const currentAge = parseInt(document.getElementById('currentAge').value);
    const retirementAge = parseInt(document.getElementById('retirementAge').value);
    const lifeExpectancy = parseInt(document.getElementById('lifeExpectancy').value);
    const currentIncome = parseFloat(document.getElementById('currentIncome').value);
    const desiredIncome = parseFloat(document.getElementById('desiredIncome').value);
    const currentSavings = parseFloat(document.getElementById('currentSavings').value);
    const returnRate = parseFloat(document.getElementById('returnRate').value) / 100;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100;

    // Calculate years until retirement and years in retirement
    const yearsUntilRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;

    // Calculate total retirement savings needed
    const realReturnRate = (1 + returnRate) / (1 + inflationRate) - 1;
    const totalSavingsNeeded = desiredIncome * ((1 - Math.pow(1 + realReturnRate, -yearsInRetirement)) / realReturnRate);

    // Calculate annual savings needed
    const annualSavingsNeeded = (totalSavingsNeeded - currentSavings * Math.pow(1 + realReturnRate, yearsUntilRetirement)) /
        ((1 - Math.pow(1 + realReturnRate, -yearsUntilRetirement)) / realReturnRate);

    // Calculate monthly savings needed
    const monthlySavingsNeeded = annualSavingsNeeded / 12;

    // Update the result spans with formatted numbers
    document.getElementById('totalSavings').textContent = '$' + formatNumber(totalSavingsNeeded);
    document.getElementById('annualSavings').textContent = '$' + formatNumber(annualSavingsNeeded);
    document.getElementById('monthlySavings').textContent = '$' + formatNumber(monthlySavingsNeeded);
}
