const list_of_ids = [
    "dist-input-left",
    "dist-select-left",
    "weight-input-left",
    "weight-select-left",
    "temp-input-left",
    "temp-select-left",
    "dist-input-right",
    "dist-select-right",
    "weight-input-right",
    "weight-select-right",
    "temp-input-right",
    "temp-select-right",
    "height-ft",
    "height-in",
    "height-cm",
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
    height_ft,
    height_in,
    height_cm,
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
    lboz: 16,

    // from kilograms
    kgkg: 1,
    kglb: 2.20462,
    kgg: 1000,
    kgmg: 1000000,
    kgoz: 35.274,

    // from grams
    gkg: 1 / 1000,
    glb: 0.00220462,
    gg: 1,
    gmg: 1000,
    goz: 1 / 28.34952,

    // from miligrams
    mgkg: 1 / 1000000,
    mglb: 0.00000220462,
    mgg: 1 / 1000,
    mgmg: 1,
    mgoz: 1 / 28349.52,

    // from ounces
    ozkg: 1 / 35.274,
    ozlb: 1 / 16,
    ozg: 28.34952,
    ozmg: 28349.52,
    ozoz: 1,
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
                parseFloat(this.unit_value, 10) *
                    this.get_convert_arg() *
                    10000,
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

class Weight extends Converter {
    constructor(from_unit, to_unit, unit_value) {
        super(from_unit, to_unit, unit_value);
    }

    get_convert_arg() {
        return weight_convert_table[this.from_unit + this.to_unit];
    }
}

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
                        10000,
                ) / 10000
            );
        } else if (this.from_unit + this.to_unit === "CF") {
            return (
                Math.round(
                    (parseFloat(this.unit_value, 10) * arg[0] + arg[1]) * 10000,
                ) / 10000
            );
        } else {
            return (
                Math.round(
                    (parseFloat(this.unit_value, 10) + arg[0]) * arg[1] * 10000,
                ) / 10000
            );
        }
    }
}

// Convert Height
function us_to_normal(feet, inches) {
    const l_part = Math.round(parseFloat(feet, 10) * 30.48 * 10000) / 10000;
    const r_part = Math.round(parseFloat(inches, 10) * 2.54 * 10000) / 10000;
    return Math.floor(l_part + r_part);
}

function normal_to_us(cm) {
    const length = Math.round((parseFloat(cm, 10) / 2.54) * 10000) / 10000;
    const feet = Math.floor(length / 12);
    const inches = Math.floor(length - feet * 12);
    return [feet, inches];
}

/* Convert values */
function convert() {
    switch (this.id) {
        case distance_input_left.id:
        case distance_selector_left.id:
        case distance_selector_right.id:
            distance_input_right.value =
                distance_input_left.value === ""
                    ? ""
                    : new Distance(
                          distance_selector_left.value,
                          distance_selector_right.value,
                          distance_input_left.value,
                      ).convert();
            break;
        case distance_input_right.id:
            distance_input_left.value =
                distance_input_right.value === ""
                    ? ""
                    : new Distance(
                          distance_selector_right.value,
                          distance_selector_left.value,
                          distance_input_right.value,
                      ).convert();
            break;

        case weight_input_left.id:
        case weight_selector_left.id:
        case weight_selector_right.id:
            weight_input_right.value =
                weight_input_left.value === ""
                    ? ""
                    : new Weight(
                          weight_selector_left.value,
                          weight_selector_right.value,
                          weight_input_left.value,
                      ).convert();
            break;
        case weight_input_right.id:
            weight_input_left.value =
                weight_input_right.value === ""
                    ? ""
                    : new Weight(
                          weight_selector_right.value,
                          weight_selector_left.value,
                          weight_input_right.value,
                      ).convert();
            break;

        case temp_input_left.id:
        case temp_selector_left.id:
        case temp_selector_right.id:
            temp_input_right.value =
                temp_input_left.value === ""
                    ? ""
                    : new Temperature(
                          temp_selector_left.value,
                          temp_selector_right.value,
                          temp_input_left.value,
                      ).convert();
            break;
        case temp_input_right.id:
            temp_input_left.value =
                temp_input_right.value === ""
                    ? ""
                    : new Temperature(
                          temp_selector_right.value,
                          temp_selector_left.value,
                          temp_input_right.value,
                      ).convert();
            break;

        case height_ft.id:
        case height_in.id:
            height_cm.value =
                height_ft.value === "" && height_in.value === ""
                    ? ""
                    : us_to_normal(
                          height_ft.value === "" ? 0 : height_ft.value,
                          height_in.value === "" ? 0 : height_in.value,
                      );
            break;
        case height_cm.id:
            if (height_cm.value === "") {
                height_ft.value = "";
                height_in.value = "";
                break;
            }
            const [feet, inches] = normal_to_us(height_cm.value);
            height_ft.value = feet;
            height_in.value = inches;
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
    height_ft,
    height_in,
    height_cm,
];
inputs.map((input) => input.addEventListener("input", convert));
inputs.map((input) => input.addEventListener("input", disableButton));

const selectors = [
    distance_selector_left,
    distance_selector_right,
    weight_selector_left,
    weight_selector_right,
    temp_selector_left,
    temp_selector_right,
];
selectors.map((selector) => selector.addEventListener("change", convert));

///////////////////////////////////////////////////////////////////////////////
// Media Styling
///////////////////////////////////////////////////////////////////////////////
const media_event = window.matchMedia("(max-width: 450px)");
const temp_tag = document.getElementById("temp-tag");
const dist_tag = document.getElementById("dist-tag");
const weight_tag = document.getElementById("weight-tag");
const height_tag = document.getElementById("height-tag");

// Change Distance tag for width less than 450px
const changeDistValue450 = (x) => {
    // If media query matches
    if (x.matches) {
        dist_tag.innerHTML = "Dist";
    } else {
        dist_tag.innerHTML = "Distance";
    }
};
media_event.addEventListener("change", changeDistValue450); // Attach listener function on state changes

// Change Temperature tag for width less than 450px
const changeTempValue450 = (x) => {
    // If media query matches
    if (x.matches) {
        temp_tag.innerHTML = "Temp";
    } else {
        temp_tag.innerHTML = "Temperature";
    }
};
media_event.addEventListener("change", changeTempValue450); // Attach listener function on state changes

///////////////////////////////////////////////////////////////////////////////
const media_event2 = window.matchMedia("(max-width: 350px)");

// Change Distance tag for width less than 350px
const changeDistValue350 = (x) => {
    // If media query matches
    if (x.matches) {
        dist_tag.innerHTML = "D";
    } else {
        dist_tag.innerHTML = "Dist";
    }
};
media_event2.addEventListener("change", changeDistValue350); // Attach listener function on state changes

// Change Weight tag for width less than 350px
const changeWeightValue350 = (x) => {
    // If media query matches
    if (x.matches) {
        weight_tag.innerHTML = "W";
    } else {
        weight_tag.innerHTML = "Weight";
    }
};
changeWeightValue350(media_event2); // Call listener function at run time
media_event2.addEventListener("change", changeWeightValue350); // Attach listener function on state changes

// Change Temperature tag for width less than 350px
const changeTempValue350 = (x) => {
    // If media query matches
    if (x.matches) {
        temp_tag.innerHTML = "T";
    } else {
        temp_tag.innerHTML = "Temp";
    }
};
media_event2.addEventListener("change", changeTempValue350); // Attach listener function on state changes

// Change Height tag for width less than 350px
const changeHeightValue350 = (x) => {
    // If media query matches
    if (x.matches) {
        height_tag.innerHTML = "H";
    } else {
        height_tag.innerHTML = "Height";
    }
};
changeHeightValue350(media_event2); // Call listener function at run time
media_event2.addEventListener("change", changeHeightValue350); // Attach listener function on state changes

///////////////////////////////////////////////////////////////////////////////
// Call listener functions on startup
const initTempValue = (x, y) => {
    if (x.matches) {
        temp_tag.innerHTML = "T";
    } else if (y.matches) {
        temp_tag.innerHTML = "Temp";
    } else {
        temp_tag.innerHTML = "Temperature";
    }
};
initTempValue(media_event2, media_event);

const initDistValue = (x, y) => {
    if (x.matches) {
        dist_tag.innerHTML = "D";
    } else if (y.matches) {
        dist_tag.innerHTML = "Dist";
    } else {
        dist_tag.innerHTML = "Distance";
    }
};
initDistValue(media_event2, media_event);

///////////////////////////////////////////////////////////////////////////////
// Button
///////////////////////////////////////////////////////////////////////////////
button = document.getElementById("clear-button");
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

button.addEventListener("click", clearValues);
