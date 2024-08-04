let btn = document.querySelector('#cal');
let resetBtn = document.querySelector('#reset');

btn.addEventListener('click', () => {
    const inp1 = document.getElementById("oddSem");
    const marks1 = parseFloat(inp1.value);
    const inp2 = document.getElementById("evenSem");
    const marks2 = parseFloat(inp2.value);

    const inp3 = document.getElementById("totalMarks");
    const total = inp3.value;

    let avg1 = ((marks1 + marks2) / 2);
    const avg = avg1.toPrecision(4);

    const ans1 = (avg1 * 10) - 5;
    const percentage = ans1.toPrecision(4);

    const obtainedMarks = (percentage * total) / 100;

    document.getElementById('one').innerText = `Your Total Marks: ${total}`;
    document.getElementById('two').innerText = `Marks Obtained: ${obtainedMarks}`;
    document.getElementById('three').innerText = `Percentage: ${percentage}`;
    document.getElementById('warning').innerText = `** Result may be wrong, recheck yourself`;
});

resetBtn.addEventListener('click', () => {
    document.getElementById('one').innerText = `Your Total Marks: `;
    document.getElementById('two').innerText = `Marks Obtained: `;
    document.getElementById('three').innerText = `Percentage: `;
    document.getElementById('warning').innerText = ``;
});
