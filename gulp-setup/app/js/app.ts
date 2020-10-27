document.querySelector<HTMLFormElement>('form').addEventListener('submit', (e) => {
    e.preventDefault()

    function totalBorrowed (borrowed: number): number {
        if (borrowed > 9000) {
            return borrowed + 1000
        } else if (borrowed > 8000) {
            return borrowed + 500
        } else {
            return borrowed
        }
    }

    let borrowed: number = document.querySelector<HTMLInputElement>('#amount-to-borrow').valueAsNumber
    let salary: number = document.querySelector<HTMLInputElement>('#expected-salary').valueAsNumber
    let percentage: number = document.querySelector<HTMLInputElement>('#repayment-percentage').valueAsNumber
    let monthlyPayment: number = (percentage / 100) * (salary / 12)
    let timeTaken: number = Math.ceil((totalBorrowed(borrowed) / monthlyPayment))
    let adminFee: number = (totalBorrowed(borrowed) * 0.05)

    if( borrowed &&
        salary &&
        percentage) {
        document.querySelector<HTMLElement>('#error-message').textContent = ''

        if ((borrowed > 10000) || (borrowed === 0) || (borrowed < 0) || ((percentage < 10) || (percentage > 100))) {
            (document.querySelector('#error-message') as HTMLInputElement).textContent = 'Please enter an amount to borrow between £1 and £10000 and a % between 10 and 100.'
        } else {
            if (monthlyPayment > borrowed){
                monthlyPayment = borrowed
            }
            if (timeTaken < 1) {
                timeTaken = 1
            }
            document.querySelector<HTMLElement>('#admin-fee').textContent = `Admin fee payable upfront: £${adminFee.toFixed(2)}.`
            document.querySelector<HTMLElement>('#total-borrowed').textContent = `You will have borrowed this amount in total: £${(totalBorrowed(borrowed)).toFixed(2)}.`
            document.querySelector<HTMLElement>('#pay-off').textContent = `It will take you this long to pay off: ${timeTaken.toString()} months at £${monthlyPayment.toFixed(2)} a month.`
        }
    } else {
        document.querySelector<HTMLElement>('#error-message').textContent = 'Please complete all fields.'
    }
})
