const setupEmail = () => {
    const form = document.getElementById("contact-form");
    const submitBtn = document.getElementById("contact-submit");
    const clearBtn = document.getElementById("contact-clear");
    const inputName = document.getElementById("from_name");
    const inputEmail = document.getElementById("from_email");
    const inputMessage = document.getElementById("message");

    const clearFields = () => {
        submitBtn.value = "Send Message";
        inputName.value = "";
        inputEmail.value = "";
        inputMessage.value = "";
    };

    const findParamError = data => {
        if(data.from_name.length === 0) {
            return "Name required"
        } else if(!data.from_email.includes("@") || !data.from_email.includes(".")) {
            return "Invalid email"
        } else if(data.message.length < 30) {
            return "Message is too short"
        } else {
            return null;
        }
    };

    form.addEventListener("submit", e => {
        e.preventDefault();
        submitBtn.value = "Sending...";
        const params = {
            from_name: inputName.value,
            from_email: inputEmail.value,
            message: inputMessage.value
        }
        const error = findParamError(params);
        if(error) {
            submitBtn.value = "Send Message"
            alert(error);
        } else {
            emailjs.send("service_6nuptr3", "template_3dzk28u", params)
                .then(res => {
                    submitBtn.value = "Send Message"
                    alert("Email sent successfully!");
                    clearFields();
                }, err => {
                    submitBtn.value = "Send Message"
                    alert(JSON.stringify(err));
                });
        }
    })

    clearBtn.addEventListener("click", e => {
        e.preventDefault();
        clearFields();
    });
};

setupEmail();
