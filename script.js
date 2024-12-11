document.addEventListener('DOMContentLoaded', () => {
    // Форма 1
    const form1 = document.getElementById('form1');
    const quantityInput = document.getElementById('quantity');
    const productSelect = document.getElementById('product-select');
    const resultElement = document.getElementById('res');
    const calculateButton1 = document.getElementById('calculate-button-1');

    const quantityPattern = /^[1-9][0-9]*$/;

    calculateButton1.addEventListener('click', (event) => {
        event.preventDefault();

        const quantity = quantityInput.value.trim();
        const productPrice = productSelect.value;

        if (!quantityPattern.test(quantity)) {
            resultElement.innerText = "Ошибка: введите корректное количество (целое положительное число).";
            return;
        }

        const total = quantity * productPrice;
        resultElement.innerText = "Итоговая стоимость товара: " + total + " руб.";
    });

    // Форма 2
    const serviceQuantityInput = document.getElementById('service-quantity');
    const serviceTypeRadios = document.getElementsByName('service-type');
    const optionContainer = document.getElementById('option-container');
    const serviceOptionSelect = document.getElementById('service-option');
    const propertyContainer = document.getElementById('property-container');
    const propertyCheckbox1 = document.getElementById('property-checkbox1');
    const propertyCheckbox2 = document.getElementById('property-checkbox2');
    const calculateButton2 = document.getElementById('calculate-button-2');
    const totalPriceElement = document.getElementById('total-price');

    const updateFormVisibility = () => {
        const selectedType = Array.from(serviceTypeRadios).find(radio => radio.checked).value;

        if (selectedType === 'type1') {
            optionContainer.style.display = 'none';
            propertyContainer.style.display = 'none';
        } else if (selectedType === 'type2') {
            optionContainer.style.display = 'block';
            propertyContainer.style.display = 'none';
        } else if (selectedType === 'type3') {
            optionContainer.style.display = 'none';
            propertyContainer.style.display = 'block';
        }
    };

    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', updateFormVisibility);
    });

    updateFormVisibility();

    calculateButton2.addEventListener('click', () => {
        const quantity = parseInt(serviceQuantityInput.value);
        const selectedType = Array.from(serviceTypeRadios).find(radio => radio.checked).value;

        if (isNaN(quantity) || quantity <= 0) {
            totalPriceElement.innerText = "Ошибка: введите корректное количество.";
            return;
        }

        let totalPrice = 0;

        if (selectedType === 'type1') {
            totalPrice = 500;
        } else if (selectedType === 'type2') {
            totalPrice = 700;
            totalPrice += parseInt(serviceOptionSelect.value);
        } else if (selectedType === 'type3') {
            totalPrice = 900;
            if (propertyCheckbox1.checked) {
                totalPrice += 300;
            }
            if(propertyCheckbox2.checked){
                totalPrice += 200;
            }
        }

        totalPrice *= quantity;
        totalPriceElement.innerText = `Итоговая стоимость услуги: ${totalPrice} руб.`;
    });
});
