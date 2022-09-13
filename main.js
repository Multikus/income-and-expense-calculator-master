//доходы
const incomeSalary = document.querySelector('#income-salary');
const incomeFreelance = document.querySelector('#income-freelance');
const incomeExtra1 = document.querySelector('#income-extra-1');
const incomeExtra2 = document.querySelector('#income-extra-2');
const inputsIncome = document.querySelectorAll('.inputs-income input');

//копилка
const savingUpRange = document.querySelector('.range-savingUp');

//расходы
const costsFlat = document.querySelector('#costs-flat');
const costsHouseServices = document.querySelector('#costs-house-services');
const costsTransport = document.querySelector('#costs-transport');
const costsCredit = document.querySelector('#costs-credit');
const inputsCosts = document.querySelectorAll('.inputs-costs input');

//информация
const totalMonth = document.querySelector('#total-month');
const totalDay = document.querySelector('#total-day');
const totalYear = document.querySelector('#total-year');
const costsAndIncomeInputs = document.querySelectorAll('.jsInputsArr input');
const textInfo = document.querySelector('.info');

//результат
const accumulation = document.querySelector('#accumulation');
const spend = document.querySelector('#spend');

//вспомогательные переменные
let incomeTotalMonth = 0;//доступно в мес
let accumulationValuePrev = 0;//предыдущее значение для накопления

//получаем текущий месяц
let date = new Date;
let presentMonth = date.getMonth();

function resAccumulation() {//отслеживает изменения в инпутах доходов
    let monthMoney = 0;
    for(let incomeInput of inputsIncome){
        monthMoney = Number(monthMoney) + Number(incomeInput.value);
    }
    return monthMoney;
}

function obligatoryCosts() { //отслеживает изменения в инпутах расходов
    let monthCosts= 0;
    for(let costInput of inputsCosts){
        monthCosts = Number(monthCosts) + Number(costInput.value);
    }
    return monthCosts;
}

costsAndIncomeInputs.forEach(function(itemInput){//считает доступное в месяц
    itemInput.addEventListener('input', function(){
        checkNegativeNumber();
        totalMonth.value = (resAccumulation() - obligatoryCosts() - Number(accumulation.value)).toFixed(2);
        spend.value = obligatoryCosts();
        incomeTotalMonth = Number(totalMonth.value);

        if(totalMonth.value < 0){
            totalMonth.style.color = 'red';
            totalDay.style.color = 'red';
            alert('Пожалуйста, скорректируйте значения доходов и расходов!')
        } else if(totalMonth.value > 0){
            totalMonth.style.color = 'black';
            totalDay.style.color = 'black';
        }
        getAvailablePerDay();
    });
} );

savingUpRange.addEventListener('change', function(){//отображение накоплений
    accumulationValuePrev = Number(accumulation.value); //предыдущее значение
    accumulation.value = ((resAccumulation() / 100) * Number(savingUpRange.value)).toFixed(2);
    totalYear.value = (Number(accumulation.value) * 12).toFixed(2);
    getAvailablePerMonth();
});

savingUpRange.addEventListener('input', function() { //показывает подсказку для рйнджа
    textInfo.textContent = savingUpRange.value + '%';
});

savingUpRange.addEventListener('mouseup', function() {//убирает подсказку рэйнджа
    textInfo.textContent = '';
});

function getAvailablePerMonth(){ //расчёт доступного в мес с учетом копилки
    let presentValue = (resAccumulation() / 100) * Number(savingUpRange.value);
    let calcOfAccumulation = 0;

    if(accumulationValuePrev < presentValue){
        calcOfAccumulation = presentValue - accumulationValuePrev;
        totalMonth.value = (Number(totalMonth.value) - calcOfAccumulation).toFixed(2);
        getAvailablePerDay();

    } else if (accumulationValuePrev < presentValue && accumulationValuePrev != 0){
        calcOfAccumulation = presentValue - accumulationValuePrev;
        totalMonth.value = (Number(totalMonth.value) - calcOfAccumulation).toFixed(2);
        getAvailablePerDay();

    } else if(accumulationValuePrev > presentValue) {
        calcOfAccumulation = accumulationValuePrev - presentValue;
        totalMonth.value = (Number(totalMonth.value) + calcOfAccumulation).toFixed(2);
        getAvailablePerDay();
    }
};

function getAvailablePerDay(){//доступно в день с учетом месяца
    if(presentMonth == 0 || presentMonth == 2 || presentMonth == 4 || presentMonth == 6 || presentMonth == 7 || presentMonth == 9 || presentMonth == 11){
        totalDay.value = (Number(totalMonth.value) / 31).toFixed(2);
    } else if(presentMonth == 3 || presentMonth == 5 || presentMonth == 8 || presentMonth == 10){
        totalDay.value = (Number(totalMonth.value) / 30).toFixed(2);
    } else {
        totalDay.value = (Number(totalMonth.value) / 28).toFixed(2);
    }
};

function checkNegativeNumber(){
    costsAndIncomeInputs.forEach(function(item){
        if(item.value < 0 ){
            item.value = '';
            alert('Значение не может быть меньше 0. Пожалуйста, введите корректное значение');
        }
    });
}


