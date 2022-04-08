const miles = document.getElementById("distance-miles");
const km = document.getElementById("distance-km");
const lbs = document.getElementById("weight-lbs");
const kg = document.getElementById("weight-kg");
const far = document.getElementById("temp-far");
const cel = document.getElementById("temp-cel");

function main() {
    switch (this.id) {
        case miles.id:
            km.value =
                this.value === ""
                    ? ""
                    : Math.round(parseFloat(miles.value, 10) * 1.609 * 10000) /
                      10000;
            break;
        case km.id:
            miles.value =
                this.value === ""
                    ? ""
                    : Math.round((parseFloat(km.value, 10) / 1.609) * 10000) /
                      10000;
            break;
        case kg.id:
            lbs.value =
                this.value === ""
                    ? ""
                    : Math.round(parseFloat(kg.value, 10) * 2.205 * 10000) /
                      10000;
            break;
        case lbs.id:
            kg.value =
                this.value === ""
                    ? ""
                    : Math.round((parseFloat(lbs.value, 10) / 2.205) * 10000) /
                      10000;
            break;
        case far.id:
            cel.value =
                this.value === ""
                    ? ""
                    : Math.round(
                          ((parseFloat(far.value, 10) - 32)* 5) / 9 * 10000
                      ) / 10000;
            break;
        case cel.id:
            far.value =
                this.value === ""
                    ? ""
                    : Math.round(
                          ((parseFloat(cel.value, 10) * 9) / 5 + 32) * 10000
                      ) / 10000;
            break;
    }
}
[miles, km, lbs, kg, far, cel].map((v) => v.addEventListener("input", main));

// function main(obj1, inp1, inp2, func) {
//     console.log(obj1);
//     if (obj1.id === inp1.id) {
//         inp2.value = func(parseFloat(inp1.value, 10));
//     }
// }

// miles.addEventListener("input", function (e) {
//     main(e.currentTarget, miles, km, (x) => x / 1.6);
// });
// km.addEventListener("input", function (e) {
//     main(e.currentTarget, km, miles, (x) => x * 1.6);
// });
