document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    function totalBorrowed(borrowed) {
        if (borrowed > 9000) {
            return borrowed + 1000;
        }
        else if (borrowed > 8000) {
            return borrowed + 500;
        }
        else {
            return borrowed;
        }
    }
    var borrowed = document.querySelector('#amount-to-borrow').valueAsNumber;
    var salary = document.querySelector('#expected-salary').valueAsNumber;
    var percentage = document.querySelector('#repayment-percentage').valueAsNumber;
    var monthlyPayment = (percentage / 100) * (salary / 12);
    var timeTaken = Math.ceil((totalBorrowed(borrowed) / monthlyPayment));
    var adminFee = (totalBorrowed(borrowed) * 0.05);
    if (borrowed &&
        salary &&
        percentage) {
        document.querySelector('#error-message').textContent = '';
        if ((borrowed > 10000) || (borrowed === 0) || (borrowed < 0) || ((percentage < 10) || (percentage > 100))) {
            document.querySelector('#error-message').textContent = 'Please enter an amount to borrow between £1 and £10000 and a % between 10 and 100.';
            document.querySelector('#admin-fee').textContent = '';
            document.querySelector('#total-borrowed').textContent = '';
            document.querySelector('#pay-off').textContent = '';
        }
        else {
            if (monthlyPayment > borrowed) {
                monthlyPayment = borrowed;
            }
            if (timeTaken < 1) {
                timeTaken = 1;
            }
            document.querySelector('#admin-fee').textContent = "Admin fee payable upfront: \u00A3" + adminFee.toFixed(2) + ".";
            document.querySelector('#total-borrowed').textContent = "You will have borrowed this amount in total: \u00A3" + (totalBorrowed(borrowed)).toFixed(2) + ".";
            document.querySelector('#pay-off').textContent = "It will take you this long to pay off: " + timeTaken.toString() + " months at \u00A3" + monthlyPayment.toFixed(2) + " a month.";
        }
    }
    else {
        document.querySelector('#error-message').textContent = 'Please complete all fields.';
    }
});
