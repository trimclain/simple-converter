const list_of_ids = [
    'dist-input-left',
    'dist-select-left',
    'weight-input-left',
    'weight-select-left',
    'temp-input-left',
    'temp-select-left',
    'dist-input-right',
    'dist-select-right',
    'weight-input-right',
    'weight-select-right',
    'temp-input-right',
    'temp-select-right',
];

[
    distance_input_left,
    distance_selector_left,
    weight_input_left,
    weight_selector_left,
    temp_input_left,
    temp_selector_left,
    distance_input_right,
    distance_selector_right,
    weight_input_right,
    weight_selector_right,
    temp_input_right,
    temp_selector_right,
] = list_of_ids.map((id) => document.getElementById(id));

const distance_convert_table = {
    // from miles
    mikm: 1.609,
    mimi: 1,
    mim: 1609,
    micm: 160934.4,
    mimm: 1609344,
    miin: 63360,

    // from kilometers
    kmkm: 1,
    kmmi: 1 / 1.609,
    kmm: 1000,
    kmcm: 100000,
    kmmm: 1000000,
    kmin: 39370.1,

    // from meters
    mkm: 1 / 1000,
    mmi: 1 / 1609,
    mm: 1,
    mcm: 100,
    mmm: 1000,
    min: 39.3701,

    // from centimeters
    cmkm: 1 / 100000,
    cmmi: 1 / 160934.4,
    cmm: 1 / 100,
    cmcm: 1,
    cmmm: 10,
    cmin: 1 / 2.54,

    // from milimeters
    mmkm: 1 / 1000000,
    mmmi: 1 / 1609344,
    mmm: 1 / 1000,
    mmcm: 10,
    mmmm: 1,
    mmin: 1 / 25.4,

    // from inches
    inkm: 1 / 39370.1,
    inmi: 0.000015783,
    inm: 1 / 39.37,
    incm: 2.54,
    inmm: 25.4,
    inin: 1,
};

const weight_convert_table = {
    // from pounds
    lbkg: 0.453592,
    lblb: 1,
    lbg: 453.592,
    lbmg: 453592,

    // from kilograms
    kgkg: 1,
    kglb: 2.20462,
    kgg: 1000,
    kgmg: 1000000,

    // from grams
    gkg: 1 / 1000,
    glb: 0.00220462,
    gg: 1,
    gmg: 1000,

    // from miligrams
    mgkg: 1 / 1000000,
    mglb: 0.00000220462,
    mgg: 1 / 1000,
    mgmg: 1,
};

const temperature_convert_table = {
    // from Farenheit
    FC: [-32, 5 / 9], // +[0] * [1]
    FF: 1,
    FK: [-32, 5 / 9, 273.15], // +[0] * [1] + [2]

    // from Celcius
    CC: 1,
    CF: [9 / 5, 32], // * [0] + 1
    CK: [273.15, 1], // +[0] * [1]

    // from Kelvin
    KC: [-273.15, 1], // +[0] * [1]
    KF: [-273.15, 9 / 5], // +[0] * [1]
    KK: 1,
};

class Converter {
    constructor(from_unit, to_unit, unit_value) {
        this.from_unit = from_unit;
        this.to_unit = to_unit;
        this.unit_value = unit_value;
    }

    convert() {
        return (
            Math.round(
                parseFloat(this.unit_value, 10) * this.get_convert_arg() * 10000
            ) / 10000
        );
    }

    get_convert_arg() {
        return 1;
    }
}

class Distance extends Converter {
    constructor(from_unit, to_unit, unit_value) {
        super(from_unit, to_unit, unit_value);
    }

    get_convert_arg() {
        return distance_convert_table[this.from_unit + this.to_unit];
    }
}

// const d = new Distance('mi', 'km', 10);
// console.log(d.convert());

class Weight extends Converter {
    constructor(from_unit, to_unit, unit_value) {
        super(from_unit, to_unit, unit_value);
    }

    get_convert_arg() {
        return weight_convert_table[this.from_unit + this.to_unit];
    }
}

// const d = new Weight('lb', 'kg', 300);
// console.log(d.convert());

class Temperature extends Converter {
    constructor(from_unit, to_unit, unit_value) {
        super(from_unit, to_unit, unit_value);
    }

    get_convert_arg() {
        return temperature_convert_table[this.from_unit + this.to_unit];
    }

    convert() {
        const arg = this.get_convert_arg();
        if (arg == 1) {
            return this.unit_value;
        } else if (arg.length == 3) {
            return (
                Math.round(
                    ((parseFloat(this.unit_value, 10) + arg[0]) * arg[1] +
                        arg[2]) *
                        10000
                ) / 10000
            );
        } else if (this.from_unit + this.to_unit === 'CF') {
            return (
                Math.round(
                    (parseFloat(this.unit_value, 10) * arg[0] + arg[1]) * 10000
                ) / 10000
            );
        } else {
            return (
                Math.round(
                    (parseFloat(this.unit_value, 10) + arg[0]) * arg[1] * 10000
                ) / 10000
            );
        }
    }
}

// const d = new Temperature('F', 'K', 69);
// console.log(d.convert());

/* Convert values*/
function convert() {
    switch (this.id) {
        case distance_input_left.id:
        case distance_selector_left.id:
        // feels more natural to have this here
        case distance_selector_right.id:
            distance_input_right.value =
                distance_input_left.value === ''
                    ? ''
                    : new Distance(
                          distance_selector_left.value,
                          distance_selector_right.value,
                          distance_input_left.value
                      ).convert();
            break;
        case distance_input_right.id:
            distance_input_left.value =
                distance_input_right.value === ''
                    ? ''
                    : new Distance(
                          distance_selector_right.value,
                          distance_selector_left.value,
                          distance_input_right.value
                      ).convert();
            break;
        case weight_input_left.id:
        case weight_selector_left.id:
        case weight_selector_right.id:
            weight_input_right.value =
                weight_input_left.value === ''
                    ? ''
                    : new Weight(
                          weight_selector_left.value,
                          weight_selector_right.value,
                          weight_input_left.value
                      ).convert();
            break;
        case weight_input_right.id:
            weight_input_left.value =
                weight_input_right.value === ''
                    ? ''
                    : new Weight(
                          weight_selector_right.value,
                          weight_selector_left.value,
                          weight_input_right.value
                      ).convert();
            break;
        case temp_input_left.id:
        case temp_selector_left.id:
        case temp_selector_right.id:
            temp_input_right.value =
                temp_input_left.value === ''
                    ? ''
                    : new Temperature(
                          temp_selector_left.value,
                          temp_selector_right.value,
                          temp_input_left.value
                      ).convert();
            break;
        case temp_input_right.id:
            temp_input_left.value =
                temp_input_right.value === ''
                    ? ''
                    : new Temperature(
                          temp_selector_right.value,
                          temp_selector_left.value,
                          temp_input_right.value
                      ).convert();
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

// Media Styling
const temp_tag = document.getElementById('temp-tag');
const changeTempValue = (x) => {
    // If media query matches
    if (x.matches) {
        temp_tag.innerHTML = 'Temp';
    } else {
        temp_tag.innerHTML = 'Temperature';
    }
};
const media_event = window.matchMedia('(max-width: 450px)');
changeTempValue(media_event); // Call listener function at run time
media_event.addEventListener('change', changeTempValue); // Attach listener function on state changes

// Button
button = document.getElementById('clear-button');
const clearValues = () => {
    for (let input of inputs) {
        if (input.value) {
            input.value = null;
        }
    }
    button.disabled = true;
};

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
