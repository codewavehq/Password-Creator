document.addEventListener("DOMContentLoaded", function () {
    let includeUppercaseLetters = document.getElementById("uppercase");
    let includeLowercaseLetters = document.getElementById("lowercase");
    let includeNumbers = document.getElementById("numbers");
    let includeSymbols = document.getElementById("special");
    let passwordLengthInput = document.getElementById("password-length");
    let passwordWordInput = document.getElementById("password-word");
    let output = document.getElementById("output");
    let notes = document.getElementById("notes-code");
    let submit = document.getElementById("generate-password-Code");

    submit.addEventListener("click", function () {
        let upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
        let numbers = "0123456789";
        let symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

        output.value = ""; // إعادة تعيين الحقل
        
        let wordlength = parseInt(passwordLengthInput.value);

        // التحقق من صحة الطول
        if (wordlength < 6 || wordlength > 20) {
            passwordLengthInput.value = 8;  // إصلاح اسم المتغير
            let form = document.querySelector("form"); // البحث بطريقة أفضل

            if (form) {
                form.style.animation = "errorAnimation 0.5s ease-in-out";

                // إزالة الأنيميشن بعد انتهاءه
                setTimeout(() => {
                    form.style.animation = "none";
                }, 500);
            }

            notes.style.color = "red";
            notes.style.fontSize = "15px";
            notes.textContent = "The password length must be between 6 and 20 characters.";
            return;
        }

        let characterPool = "";
        if (includeUppercaseLetters.checked) characterPool += upperAlphabet;
        if (includeLowercaseLetters.checked) characterPool += lowerAlphabet;
        if (includeNumbers.checked) characterPool += numbers;
        if (includeSymbols.checked) characterPool += symbols;

        let passwordWord = passwordWordInput.value.trim();
        
        // التحقق إذا كانت الخيارات فارغة ولم يتم إدخال كلمة مرور
        if (!characterPool && !passwordWord) {
            let form = document.querySelector("form"); // البحث بطريقة أفضل
            if (form) {
                form.style.animation = "errorAnimation 0.5s ease-in-out";

                // إزالة الأنيميشن بعد انتهاءه
                setTimeout(() => {
                    form.style.animation = "none";
                }, 500);
            }
            notes.style.color = "red";
            notes.textContent = "Please select at least one option or enter a word!";
            return;
        }

        let password = "";

        // إذا تم إدخال كلمة في passwordWordInput ولكن لم يتم اختيار خيارات، استخدم الكلمة فقط
        if (passwordWord && !characterPool) {
            password = passwordWord;
        } else {
            // توليد كلمة مرور باستخدام الخيارات المحددة
            for (let i = 0; i < wordlength - passwordWord.length; i++) {
                let randomIndex = Math.floor(Math.random() * characterPool.length);
                password += characterPool[randomIndex];
            }

            let position = Math.floor(Math.random() * (password.length + 1));
            password = password.slice(0, position) + passwordWord + password.slice(position);
        }

        output.value = password;
        notes.style.color = "black";
        notes.textContent = "Password generated successfully!";
    });

    document.getElementById("copy_button").addEventListener("click", function () {
        let password = output.value;
        if (password) {
            navigator.clipboard.writeText(password).then(() => {
                alert("Password copied to clipboard!");
            }).catch(err => {
                console.error("Failed to copy: ", err);
            });
        } else {
            alert("No password to copy!");
        }
    });
});
