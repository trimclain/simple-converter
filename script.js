// left column
const distance_input_left = document.getElementById('dist-input-left');
const distance_selector_left = document.getElementById('dist-select-left');

const weight_input_left = document.getElementById('weight-input-left');
const weight_selector_left = document.getElementById('weight-select-left');

const temp_input_left = document.getElementById('temp-input-left');
const temp_selector_left = document.getElementById('temp-select-left');

// rigth column
const distance_input_right = document.getElementById('dist-input-right');
const distance_selector_right = document.getElementById('dist-select-right');

const weight_input_right = document.getElementById('weight-input-right');
const weight_selector_right = document.getElementById('weight-select-right');

const temp_input_right = document.getElementById('temp-input-right');
const temp_selector_right = document.getElementById('temp-select-right');

function convertDistance(from_dist, to_dist, input_value) {
    // input_value is a string
    // miles
    if (from_dist === 'mi') {
        if (to_dist === 'km') {
            return (
                Math.round(parseFloat(input_value, 10) * 1.609 * 10000) / 10000
            );
        } else if (to_dist === 'mi') {
            return input_value;
        } else if (to_dist === 'm') {
            return (
                Math.round(parseFloat(input_value, 10) * 1609 * 10000) / 10000
            );
        } else if (to_dist === 'cm') {
            return (
                Math.round(parseFloat(input_value, 10) * 160900 * 10000) / 10000
            );
        }
    }
    // kilometer
    if (from_dist === 'km') {
        if (to_dist === 'km') {
            return input_value;
        } else if (to_dist === 'mi') {
            return (
                Math.round((parseFloat(input_value, 10) / 1.609) * 10000) /
                10000
            );
        } else if (to_dist === 'm') {
            return (
                Math.round(parseFloat(input_value, 10) * 1000 * 10000) / 10000
            );
        } else if (to_dist === 'cm') {
            return (
                Math.round(parseFloat(input_value, 10) * 100000 * 10000) / 10000
            );
        }
    }
    // meter
    if (from_dist === 'm') {
        if (to_dist === 'km') {
            return (
                Math.round((parseFloat(input_value, 10) / 1000) * 10000) / 10000
            );
        } else if (to_dist === 'mi') {
            return (
                Math.round((parseFloat(input_value, 10) / 1609) * 10000) / 10000
            );
        } else if (to_dist === 'm') {
            return input_value;
        } else if (to_dist === 'cm') {
            return (
                Math.round(parseFloat(input_value, 10) * 100 * 10000) / 10000
            );
        }
    }
    // centimeter
    if (from_dist === 'cm') {
        if (to_dist === 'km') {
            return (
                Math.round((parseFloat(input_value, 10) / 1000) * 10000) / 10000
            );
        } else if (to_dist === 'mi') {
            return Math.round(
                ((parseFloat(input_value, 10) / 160900) * 10000) / 10000
            );
        } else if (to_dist === 'm') {
            return (
                Math.round((parseFloat(input_value, 10) / 100) * 10000) / 10000
            );
        } else if (to_dist === 'cm') {
            return input_value;
        }
    }
}

function convertWeight(from_weight, to_weight, input_value) {
    // pounds
    if (from_weight === 'lb') {
        if (to_weight === 'kg') {
            return (
                Math.round(parseFloat(input_value, 10) * 0.453592 * 10000) /
                10000
            );
        } else if (to_weight === 'lb') {
            return input_value;
        } else if (to_weight === 'g') {
            return (
                Math.round(parseFloat(input_value, 10) * 453.592 * 10000) /
                10000
            );
        } else if (to_weight === 'mg') {
            return (
                Math.round(parseFloat(input_value, 10) * 453592 * 10000) / 10000
            );
        }
    }
    // kilogram
    if (from_weight === 'kg') {
        if (to_weight === 'kg') {
            return input_value;
        } else if (to_weight === 'lb') {
            return (
                Math.round(parseFloat(input_value, 10) * 2.20462 * 10000) /
                10000
            );
        } else if (to_weight === 'g') {
            return (
                Math.round(parseFloat(input_value, 10) * 1000 * 10000) / 10000
            );
        } else if (to_weight === 'mg') {
            return (
                Math.round(parseFloat(input_value, 10) * 1000000 * 10000) /
                10000
            );
        }
    }
    // gram
    if (from_weight === 'g') {
        if (to_weight === 'kg') {
            return (
                Math.round((parseFloat(input_value, 10) / 1000) * 10000) / 10000
            );
        } else if (to_weight === 'lb') {
            return (
                Math.round(parseFloat(input_value, 10) * 0.00220462 * 10000) /
                10000
            );
        } else if (to_weight === 'g') {
            return input_value;
        } else if (to_weight === 'mg') {
            return (
                Math.round(parseFloat(input_value, 10) * 1000 * 10000) / 10000
            );
        }
    }
    // miligram
    if (from_weight === 'mg') {
        if (to_weight === 'kg') {
            return;
        } else if (to_weight === 'lb') {
            return (
                Math.round(
                    parseFloat(input_value, 10) * 0.00000220462 * 10000
                ) / 10000
            );
        } else if (to_weight === 'g') {
            return (
                Math.round((parseFloat(input_value, 10) / 1000) * 10000) / 10000
            );
        } else if (to_weight === 'mg') {
            return input_value;
        }
    }
}

function convertTemperature(from_temp, to_temp, input_value) {
    // Farenheit
    if (from_temp === '°F') {
        if (to_temp === '°C') {
            return (
                Math.round(
                    (((parseFloat(input_value, 10) - 32) * 5) / 9) * 10000
                ) / 10000
            );
        } else if (to_temp === '°F') {
            return input_value;
        } else if (to_temp === 'K') {
            return (
                Math.round(
                    ((parseFloat(input_value, 10) - 32) * 5) / 9 +
                        273.15 * 10000
                ) / 10000
            );
        }
    }
    // Celcius
    if (from_temp === '°C') {
        if (to_temp === '°C') {
            return input_value;
        } else if (to_temp === '°F') {
            return (
                Math.round(
                    ((parseFloat(input_value, 10) * 9) / 5 + 32) * 10000
                ) / 10000
            );
        } else if (to_temp === 'K') {
            return (
                Math.round((parseFloat(input_value, 10) + 273.15) * 10000) /
                10000
            );
        }
    }
    // Kelvin
    if (from_temp === 'K') {
        if (to_temp === '°C') {
            return (
                Math.round((parseFloat(input_value, 10) - 273.15) * 10000) /
                10000
            );
        } else if (to_temp === '°F') {
            return (
                Math.round(
                    (((parseFloat(input_value, 10) - 273.15) * 9) / 5 + 32) *
                        10000
                ) / 10000
            );
        } else if (to_temp === 'K') {
            return input_value;
        }
    }
}

function convert() {
    switch (this.id) {
        case distance_input_left.id:
        case distance_selector_left.id:
            distance_input_right.value =
                distance_input_left.value === ''
                    ? ''
                    : convertDistance(
                          distance_selector_left.value,
                          distance_selector_right.value,
                          distance_input_left.value
                      );
            break;
        case distance_input_right.id:
        case distance_selector_right.id:
            distance_input_left.value =
                distance_input_right.value === ''
                    ? ''
                    : convertDistance(
                          distance_selector_right.value,
                          distance_selector_left.value,
                          distance_input_right.value
                      );
            break;
        case weight_input_left.id:
        case weight_selector_left.id:
            weight_input_right.value =
                weight_input_left.value === ''
                    ? ''
                    : convertWeight(
                          weight_selector_left.value,
                          weight_selector_right.value,
                          weight_input_left.value
                      );
            break;
        case weight_input_right.id:
        case weight_selector_right.id:
            weight_input_left.value =
                weight_input_right.value === ''
                    ? ''
                    : convertWeight(
                          weight_selector_right.value,
                          weight_selector_left.value,
                          weight_input_right.value
                      );
            break;
        case temp_input_left.id:
        case temp_selector_left.id:
            temp_input_right.value =
                temp_input_left.value === ''
                    ? ''
                    : convertTemperature(
                          temp_selector_left.value,
                          temp_selector_right.value,
                          temp_input_left.value
                      );
            break;
        case temp_input_right.id:
        case temp_selector_right.id:
            temp_input_left.value =
                temp_input_right.value === ''
                    ? ''
                    : convertTemperature(
                          temp_selector_right.value,
                          temp_selector_left.value,
                          temp_input_right.value
                      );
            break;
    }
}

const inputs = [
    distance_input_left,
    distance_input_right,
    weight_input_left,
    weight_input_right,
    temp_input_left,
    temp_input_right,
];
inputs.map((input) => input.addEventListener('input', convert));
inputs.map((input) => input.addEventListener('input', disableButton));

const selectors = [
    distance_selector_left,
    distance_selector_right,
    weight_selector_left,
    weight_selector_right,
    temp_selector_left,
    temp_selector_right,
];
selectors.map((selector) => selector.addEventListener('change', convert));

function print() {
    console.log(this.id + ' selector changed');
}

// Styling
const temp_tag = document.getElementById('temp-tag');
const changeTempValue = (x) => {
    if (x.matches) {
        // If media query matches
        temp_tag.innerHTML = 'Temp';
    } else {
        // If media query matches
        temp_tag.innerHTML = 'Temperature';
    }
};

const media_event = window.matchMedia('(max-width: 450px)');
changeTempValue(media_event); // Call listener function at run time
media_event.addEventListener('change', changeTempValue); // Attach listener function on state changes

// Button
button = document.createElement('button');
button.type = 'reset';
button.innerHTML = 'Clear All';
document.getElementById('main').appendChild(button);

const clearValues = () => {
    for (let input of inputs) {
        if (input.value) {
            input.value = null;
        }
    }
    button.disabled = true;
};

button.disabled = true;
function disableButton() {
    disable = true;
    for (let input of inputs) {
        if (input.value) {
            disable = false;
            break;
        }
    }
    disable ? (button.disabled = true) : (button.disabled = false);
}

button.addEventListener('click', clearValues);
