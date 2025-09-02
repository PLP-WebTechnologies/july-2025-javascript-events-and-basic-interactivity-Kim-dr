 // =============================================
        // PART 1: EVENT HANDLING - Theme Toggle
        // =============================================
        
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        // Theme toggle event listener
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                themeToggle.textContent = '☀️';
            } else {
                themeToggle.textContent = '🌙';
            }
        });

        // =============================================
        // PART 1: TABLE COUNTER WITH EVENT HANDLING
        // =============================================
        
        let tableCount = 25;
        const tableCounter = document.getElementById('tableCounter');
        const tableMessage = document.getElementById('tableMessage');
        const addTableBtn = document.getElementById('addTable');
        const removeTableBtn = document.getElementById('removeTable');
        const resetTablesBtn = document.getElementById('resetTables');

        // Function to update the counter display
        function updateTableCounter() {
            tableCounter.textContent = tableCount;
            
            // Show different messages based on table count
            if (tableCount === 0) {
                tableMessage.textContent = "😔 Sorry, we're fully booked!";
                tableMessage.style.color = '#e74c3c';
            } else if (tableCount < 5) {
                tableMessage.textContent = "⚠️ Only a few tables left!";
                tableMessage.style.color = '#f39c12';
            } else if (tableCount < 15) {
                tableMessage.textContent = "✅ Good availability!";
                tableMessage.style.color = '#27ae60';
            } else {
                tableMessage.textContent = "🎉 Plenty of tables available!";
                tableMessage.style.color = '#3498db';
            }
        }

        // Add table button event listener
        addTableBtn.addEventListener('click', function() {
            if (tableCount < 50) { // Maximum 50 tables
                tableCount++;
                updateTableCounter();
            } else {
                alert("Maximum capacity reached! (50 tables)");
            }
        });

        // Remove table button event listener
        removeTableBtn.addEventListener('click', function() {
            if (tableCount > 0) {
                tableCount--;
                updateTableCounter();
            } else {
                alert("No more tables to remove!");
            }
        });

        // Reset tables button event listener
        resetTablesBtn.addEventListener('click', function() {
            tableCount = 25;
            updateTableCounter();
        });

        // Initialize counter message
        updateTableCounter();

        // =============================================
        // PART 2: INTERACTIVE ELEMENTS - Menu Tabs
        // =============================================
        
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        // Add click event listeners to all tab buttons
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });

        // =============================================
        // PART 2: FAQ TOGGLE FUNCTION
        // =============================================
        
        function toggleFAQ(element) {
            const faqItem = element.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = element;
            
            // Toggle the answer visibility
            answer.classList.toggle('active');
            
            // Change the arrow direction
            if (answer.classList.contains('active')) {
                icon.innerHTML = icon.innerHTML.replace('▼', '▲');
            } else {
                icon.innerHTML = icon.innerHTML.replace('▲', '▼');
            }
        }

        // =============================================
        // PART 3: FORM VALIDATION WITH JAVASCRIPT
        // =============================================
        
        const form = document.getElementById('reservationForm');
        const overlay = document.getElementById('overlay');
        const successPopup = document.getElementById('successPopup');

        // Validation functions for each field
        function validateName() {
            const nameField = document.getElementById('customerName');
            const nameError = document.getElementById('nameError');
            const nameSuccess = document.getElementById('nameSuccess');
            const name = nameField.value.trim();
            
            if (name === '') {
                showError(nameError, 'Name is required');
                hideSuccess(nameSuccess);
                return false;
            } else if (name.length < 2) {
                showError(nameError, 'Name must be at least 2 characters');
                hideSuccess(nameSuccess);
                return false;
            } else if (!/^[a-zA-Z\s]+$/.test(name)) {
                showError(nameError, 'Name can only contain letters and spaces');
                hideSuccess(nameSuccess);
                return false;
            } else {
                hideError(nameError);
                showSuccess(nameSuccess);
                return true;
            }
        }

        function validateEmail() {
            const emailField = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const emailSuccess = document.getElementById('emailSuccess');
            const email = emailField.value.trim();
            
            if (email === '') {
                showError(emailError, 'Email is required');
                hideSuccess(emailSuccess);
                return false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError(emailError, 'Please enter a valid email address');
                hideSuccess(emailSuccess);
                return false;
            } else {
                hideError(emailError);
                showSuccess(emailSuccess);
                return true;
            }
        }

        function validatePhone() {
            const phoneField = document.getElementById('phone');
            const phoneError = document.getElementById('phoneError');
            const phoneSuccess = document.getElementById('phoneSuccess');
            const phone = phoneField.value.trim();
            
            if (phone === '') {
                showError(phoneError, 'Phone number is required');
                hideSuccess(phoneSuccess);
                return false;
            } else if (!/^[\d\s\-\(\)]+$/.test(phone) || phone.length < 10) {
                showError(phoneError, 'Please enter a valid phone number');
                hideSuccess(phoneSuccess);
                return false;
            } else {
                hideError(phoneError);
                showSuccess(phoneSuccess);
                return true;
            }
        }

        function validatePartySize() {
            const partySizeField = document.getElementById('partySize');
            const partySizeError = document.getElementById('partySizeError');
            const partySizeSuccess = document.getElementById('partySizeSuccess');
            
            if (partySizeField.value === '') {
                showError(partySizeError, 'Please select party size');
                hideSuccess(partySizeSuccess);
                return false;
            } else {
                hideError(partySizeError);
                showSuccess(partySizeSuccess);
                return true;
            }
        }

        function validateDate() {
            const dateField = document.getElementById('reservationDate');
            const dateError = document.getElementById('dateError');
            const dateSuccess = document.getElementById('dateSuccess');
            const selectedDate = new Date(dateField.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time to start of day
            
            if (dateField.value === '') {
                showError(dateError, 'Reservation date is required');
                hideSuccess(dateSuccess);
                return false;
            } else if (selectedDate < today) {
                showError(dateError, 'Please select a future date');
                hideSuccess(dateSuccess);
                return false;
            } else {
                hideError(dateError);
                showSuccess(dateSuccess);
                return true;
            }
        }

        // Helper functions to show/hide error and success messages
        function showError(element, message) {
            element.textContent = message;
            element.style.display = 'block';
        }

        function hideError(element) {
            element.style.display = 'none';
        }

        function showSuccess(element) {
            element.style.display = 'block';
        }

        function hideSuccess(element) {
            element.style.display = 'none';
        }

        // Real-time validation - add event listeners to form fields
        document.getElementById('customerName').addEventListener('blur', validateName);
        document.getElementById('email').addEventListener('blur', validateEmail);
        document.getElementById('phone').addEventListener('blur', validatePhone);
        document.getElementById('partySize').addEventListener('change', validatePartySize);
        document.getElementById('reservationDate').addEventListener('change', validateDate);

        // Also validate on input for immediate feedback
        document.getElementById('customerName').addEventListener('input', validateName);
        document.getElementById('email').addEventListener('input', validateEmail);
        document.getElementById('phone').addEventListener('input', validatePhone);

        // Form submission event listener
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            
            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isPhoneValid = validatePhone();
            const isPartySizeValid = validatePartySize();
            const isDateValid = validateDate();
            
            // If all validations pass, show success popup
            if (isNameValid && isEmailValid && isPhoneValid && isPartySizeValid && isDateValid) {
                overlay.style.display = 'block';
                successPopup.style.display = 'block';
                form.reset(); // Reset the form
                
                // Hide all success messages after form reset
                hideSuccess(document.getElementById('nameSuccess'));
                hideSuccess(document.getElementById('emailSuccess'));
                hideSuccess(document.getElementById('phoneSuccess'));
                hideSuccess(document.getElementById('partySizeSuccess'));
                hideSuccess(document.getElementById('dateSuccess'));
            } else {
                alert('Please fix all errors before submitting the form.');
            }
        });

        // Function to close the success popup
        function closePopup() {
            overlay.style.display = 'none';
            successPopup.style.display = 'none';
        }

        // Close popup when clicking on overlay
        overlay.addEventListener('click', closePopup);
    