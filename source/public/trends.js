
let habitGrid = document.getElementById("habit-grid");
for (let i = 0; i < 31; i++) {
    let habitCircle = document.createElement("div");
    habitCircle.className = "rounded-full border-none bg-gray-200";
    habitGrid.appendChild(habitCircle);
}