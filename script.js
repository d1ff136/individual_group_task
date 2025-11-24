const popup = document.getElementById("quick-order-popup");
const popupClose = document.querySelector(".popup-close");
const popupModelName = document.getElementById("model-name");
const form = document.getElementById('quick-order-form');

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        console.log("Clicked:", card.dataset.model);
        const model = card.dataset.model || "-";

        popupModelName.textContent = model;

        popup.classList.add('open');
        popup.setAttribute('aria-hidden', 'false');
    });
});

popupClose.addEventListener('click', () => {
    popup.classList.remove('open');
    popup.setAttribute('aria-hidden', 'true');

});

popup.addEventListener('click', e => {
   if(e.target === popup) {
    popup.classList.remove("open");
    popup.setAttribute("aria-hidden", "true");
   }
});

// Form Submit

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    

    const formData = {
        model: popupModelName.textContent,
        name: form.name.value,
        phone: form.phone.value,
        address: form.address.value
    };

    if (!formData.name || !formData.phone) {
        alert("Будь ласка, заповніть обов'язкові поля.");
        return;
    }
    
    console.log("Sending:", formData);

    try {
        const response = await fetch("https://individual-group-task.free.beeceptor.com/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error("Server error");

        alert("Замовлення відправлено!");
        popup.classList.remove("open");

        form.reset();

    } catch (err) {
        alert("Помилка при відправці: " + err.message);
    }
});
